 import { Resend } from "https://esm.sh/resend@4.0.0";
 
 const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
 
 const corsHeaders = {
   "Access-Control-Allow-Origin": "*",
   "Access-Control-Allow-Headers":
     "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
 };
 
 interface ContactRequest {
   name: string;
   email: string;
   phone?: string;
   message: string;
 }
 
 const validateContactRequest = (data: unknown): data is ContactRequest => {
   if (typeof data !== "object" || data === null) return false;
   const contact = data as Record<string, unknown>;
 
   if (typeof contact.name !== "string" || contact.name.trim().length === 0) return false;
   if (typeof contact.name !== "string" || contact.name.length > 100) return false;
   
   if (typeof contact.email !== "string" || contact.email.trim().length === 0) return false;
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   if (!emailRegex.test(contact.email)) return false;
   if (contact.email.length > 255) return false;
   
   if (typeof contact.message !== "string" || contact.message.trim().length === 0) return false;
   if (contact.message.length > 5000) return false;
   
   if (contact.phone !== undefined && typeof contact.phone !== "string") return false;
   if (typeof contact.phone === "string" && contact.phone.length > 20) return false;
 
   return true;
 };
 
 const sanitize = (str: string): string => {
   return str
     .replace(/&/g, "&amp;")
     .replace(/</g, "&lt;")
     .replace(/>/g, "&gt;")
     .replace(/"/g, "&quot;")
     .replace(/'/g, "&#x27;");
 };
 
 const handler = async (req: Request): Promise<Response> => {
   console.log("Received contact email request");
 
   if (req.method === "OPTIONS") {
     return new Response("ok", { headers: corsHeaders });
   }
 
   try {
     const body = await req.json();
     console.log("Contact data received:", { name: body.name, email: body.email, hasPhone: !!body.phone });
 
     if (!validateContactRequest(body)) {
       console.error("Invalid contact data");
       return new Response(
         JSON.stringify({ error: "Données de contact invalides" }),
         { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
       );
     }
 
     const messageRef = `MSG-${Date.now().toString(36).toUpperCase()}`;
     const messageDate = new Date().toLocaleString("fr-FR", {
       timeZone: "Africa/Casablanca",
       dateStyle: "full",
       timeStyle: "short",
     });
 
     const emailHtml = `
 <!DOCTYPE html>
 <html lang="fr">
 <head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
 </head>
 <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8f9fa;">
   <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
     <!-- Header -->
     <div style="background: linear-gradient(135deg, #d4a853 0%, #c9a04a 100%); padding: 32px; text-align: center;">
       <h1 style="color: #1a1a1a; margin: 0; font-size: 28px; font-weight: 700;">💬 Nouveau Message!</h1>
       <p style="color: #1a1a1a; margin: 8px 0 0; font-size: 14px; opacity: 0.8;">Réf: ${messageRef}</p>
     </div>
     
     <!-- Message Date -->
     <div style="background-color: #f8f5f0; padding: 16px 32px; border-bottom: 1px solid #e8e0d5;">
       <p style="margin: 0; color: #666; font-size: 14px;">📅 ${sanitize(messageDate)}</p>
     </div>
     
     <!-- Sender Info -->
     <div style="padding: 32px;">
       <h2 style="color: #1a1a1a; font-size: 18px; margin: 0 0 20px; border-bottom: 2px solid #d4a853; padding-bottom: 10px;">👤 Expéditeur</h2>
       <table style="width: 100%; border-collapse: collapse;">
         <tr>
           <td style="padding: 10px 0; color: #666; width: 30%;">Nom:</td>
           <td style="padding: 10px 0; color: #1a1a1a; font-weight: 600;">${sanitize(body.name)}</td>
         </tr>
         <tr>
           <td style="padding: 10px 0; color: #666;">Email:</td>
           <td style="padding: 10px 0;">
             <a href="mailto:${sanitize(body.email)}" style="color: #d4a853; text-decoration: none; font-weight: 600;">${sanitize(body.email)}</a>
           </td>
         </tr>
         ${body.phone ? `
         <tr>
           <td style="padding: 10px 0; color: #666;">Téléphone:</td>
           <td style="padding: 10px 0;">
             <a href="tel:${sanitize(body.phone)}" style="color: #d4a853; text-decoration: none; font-weight: 600;">${sanitize(body.phone)}</a>
           </td>
         </tr>
         ` : ""}
       </table>
     </div>
     
     <!-- Message Content -->
     <div style="padding: 0 32px 32px;">
       <h2 style="color: #1a1a1a; font-size: 18px; margin: 0 0 20px; border-bottom: 2px solid #d4a853; padding-bottom: 10px;">✉️ Message</h2>
       <div style="background-color: #faf8f5; border-radius: 12px; padding: 24px; border-left: 4px solid #d4a853;">
         <p style="margin: 0; color: #1a1a1a; line-height: 1.7; white-space: pre-wrap;">${sanitize(body.message)}</p>
       </div>
     </div>
     
     <!-- Quick Reply -->
     <div style="padding: 24px 32px; background-color: #1a1a1a; text-align: center;">
       <a href="mailto:${sanitize(body.email)}?subject=Re: Votre message à Ma7alkom" 
          style="display: inline-block; background: linear-gradient(135deg, #d4a853 0%, #c9a04a 100%); color: #1a1a1a; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">
         📧 Répondre rapidement
       </a>
     </div>
     
     <!-- Footer -->
     <div style="padding: 24px 32px; text-align: center; background-color: #f8f5f0;">
       <p style="color: #888; margin: 0; font-size: 12px;">Ma7alkom - Votre boutique de confiance au Maroc</p>
       <p style="color: #aaa; margin: 8px 0 0; font-size: 11px;">© ${new Date().getFullYear()} Ma7alkom. Tous droits réservés.</p>
     </div>
   </div>
 </body>
 </html>
     `;
 
     console.log("Sending contact email via Resend...");
 
     const emailResponse = await resend.emails.send({
       from: "Ma7alkom Contact <onboarding@resend.dev>",
       to: ["contact@ma7alkom.com"],
       replyTo: body.email,
       subject: `💬 Nouveau message de ${sanitize(body.name)} - ${messageRef}`,
       html: emailHtml,
     });
 
     console.log("Contact email sent successfully:", emailResponse);
 
     return new Response(
       JSON.stringify({ success: true, messageRef, emailId: emailResponse.data?.id }),
       { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
     );
   } catch (error: unknown) {
     const errorMessage = error instanceof Error ? error.message : "Unknown error";
     console.error("Error sending contact email:", errorMessage);
     
     return new Response(
       JSON.stringify({ error: "Erreur lors de l'envoi du message" }),
       { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
     );
   }
 };
 
 Deno.serve(handler);