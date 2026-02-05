 import { Resend } from "https://esm.sh/resend@4.0.0";
 
 const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
 
 const corsHeaders = {
   "Access-Control-Allow-Origin": "*",
   "Access-Control-Allow-Headers":
     "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
 };
 
 interface OrderRequest {
   customerName: string;
   phone: string;
   city: string;
   address: string;
   productName: string;
   productPrice: number;
   quantity: number;
   flavorSelections?: string;
   shippingPrice: number;
   deliveryTime: string;
   total: number;
 }
 
 const validateOrderRequest = (data: unknown): data is OrderRequest => {
   if (typeof data !== "object" || data === null) return false;
   const order = data as Record<string, unknown>;
 
   if (typeof order.customerName !== "string" || order.customerName.trim().length === 0) return false;
   if (typeof order.phone !== "string" || order.phone.trim().length === 0) return false;
   if (typeof order.city !== "string" || order.city.trim().length === 0) return false;
   if (typeof order.address !== "string" || order.address.trim().length === 0) return false;
   if (typeof order.productName !== "string" || order.productName.trim().length === 0) return false;
   if (typeof order.productPrice !== "number" || order.productPrice < 0) return false;
   if (typeof order.quantity !== "number" || order.quantity < 1) return false;
   if (typeof order.shippingPrice !== "number" || order.shippingPrice < 0) return false;
   if (typeof order.deliveryTime !== "string") return false;
   if (typeof order.total !== "number" || order.total < 0) return false;
 
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
   console.log("Received order email request");
 
   if (req.method === "OPTIONS") {
     return new Response("ok", { headers: corsHeaders });
   }
 
   try {
     const body = await req.json();
     console.log("Order data received:", JSON.stringify(body, null, 2));
 
     if (!validateOrderRequest(body)) {
       console.error("Invalid order data:", body);
       return new Response(
         JSON.stringify({ error: "Données de commande invalides" }),
         { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
       );
     }
 
     const orderRef = `MA7-${Date.now().toString(36).toUpperCase()}`;
     const orderDate = new Date().toLocaleString("fr-FR", {
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
       <h1 style="color: #1a1a1a; margin: 0; font-size: 28px; font-weight: 700;">🛒 Nouvelle Commande!</h1>
       <p style="color: #1a1a1a; margin: 8px 0 0; font-size: 14px; opacity: 0.8;">Réf: ${orderRef}</p>
     </div>
     
     <!-- Order Date -->
     <div style="background-color: #f8f5f0; padding: 16px 32px; border-bottom: 1px solid #e8e0d5;">
       <p style="margin: 0; color: #666; font-size: 14px;">📅 ${sanitize(orderDate)}</p>
     </div>
     
     <!-- Customer Info -->
     <div style="padding: 32px;">
       <h2 style="color: #1a1a1a; font-size: 18px; margin: 0 0 20px; border-bottom: 2px solid #d4a853; padding-bottom: 10px;">👤 Informations Client</h2>
       <table style="width: 100%; border-collapse: collapse;">
         <tr>
           <td style="padding: 10px 0; color: #666; width: 40%;">Nom complet:</td>
           <td style="padding: 10px 0; color: #1a1a1a; font-weight: 600;">${sanitize(body.customerName)}</td>
         </tr>
         <tr>
           <td style="padding: 10px 0; color: #666;">Téléphone:</td>
           <td style="padding: 10px 0; color: #1a1a1a; font-weight: 600;">
             <a href="tel:${sanitize(body.phone)}" style="color: #d4a853; text-decoration: none;">${sanitize(body.phone)}</a>
           </td>
         </tr>
         <tr>
           <td style="padding: 10px 0; color: #666;">Ville:</td>
           <td style="padding: 10px 0; color: #1a1a1a; font-weight: 600;">${sanitize(body.city)}</td>
         </tr>
         <tr>
           <td style="padding: 10px 0; color: #666; vertical-align: top;">Adresse:</td>
           <td style="padding: 10px 0; color: #1a1a1a; font-weight: 600;">${sanitize(body.address)}</td>
         </tr>
       </table>
     </div>
     
     <!-- Order Details -->
     <div style="padding: 0 32px 32px;">
       <h2 style="color: #1a1a1a; font-size: 18px; margin: 0 0 20px; border-bottom: 2px solid #d4a853; padding-bottom: 10px;">📦 Détails de la Commande</h2>
       <div style="background-color: #faf8f5; border-radius: 12px; padding: 20px;">
         <table style="width: 100%; border-collapse: collapse;">
           <tr>
             <td style="padding: 12px 0; color: #666;">Produit:</td>
             <td style="padding: 12px 0; color: #1a1a1a; font-weight: 600; text-align: right;">${sanitize(body.productName)}</td>
           </tr>
           ${body.flavorSelections ? `
           <tr>
             <td style="padding: 12px 0; color: #666;">Saveurs:</td>
             <td style="padding: 12px 0; color: #1a1a1a; text-align: right;">${sanitize(body.flavorSelections)}</td>
           </tr>
           ` : ""}
           <tr>
             <td style="padding: 12px 0; color: #666;">Prix unitaire:</td>
             <td style="padding: 12px 0; color: #1a1a1a; text-align: right;">${body.productPrice} DH</td>
           </tr>
           <tr>
             <td style="padding: 12px 0; color: #666;">Quantité:</td>
             <td style="padding: 12px 0; color: #1a1a1a; text-align: right;">${body.quantity}</td>
           </tr>
           <tr style="border-top: 1px dashed #e0d6c8;">
             <td style="padding: 12px 0; color: #666;">Sous-total:</td>
             <td style="padding: 12px 0; color: #1a1a1a; font-weight: 600; text-align: right;">${body.productPrice * body.quantity} DH</td>
           </tr>
           <tr>
             <td style="padding: 12px 0; color: #666;">🚚 Livraison (${sanitize(body.deliveryTime)}):</td>
             <td style="padding: 12px 0; color: #1a1a1a; text-align: right;">${body.shippingPrice} DH</td>
           </tr>
         </table>
       </div>
     </div>
     
     <!-- Total -->
     <div style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); padding: 24px 32px; text-align: center;">
       <p style="color: #999; margin: 0 0 8px; font-size: 14px;">TOTAL À PAYER</p>
       <p style="color: #d4a853; margin: 0; font-size: 36px; font-weight: 700;">${body.total} DH</p>
       <p style="color: #888; margin: 8px 0 0; font-size: 12px;">💵 Paiement à la livraison</p>
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
 
     console.log("Sending order email via Resend...");
 
     const emailResponse = await resend.emails.send({
       from: "Ma7alkom <onboarding@resend.dev>",
       to: ["contact@ma7alkom.ma"],
       subject: `🛒 Nouvelle Commande ${orderRef} - ${sanitize(body.productName)}`,
       html: emailHtml,
     });
 
     console.log("Email sent successfully:", emailResponse);
 
     return new Response(
       JSON.stringify({ success: true, orderRef, emailId: emailResponse.data?.id }),
       { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
     );
   } catch (error: unknown) {
     const errorMessage = error instanceof Error ? error.message : "Unknown error";
     console.error("Error sending order email:", errorMessage);
     
     return new Response(
       JSON.stringify({ error: "Erreur lors de l'envoi de la commande" }),
       { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
     );
   }
 };
 
 Deno.serve(handler);