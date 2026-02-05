
# Plan: Secure Email Sending via Resend for Orders & Contact Form

## Overview
Implement a secure backend email notification system using Resend via Supabase Edge Functions. When customers place orders or submit contact messages, the admin will receive detailed, professionally formatted emails.

---

## Prerequisites

Before implementing, you'll need a **Resend API key**:
1. Sign up at https://resend.com (free tier allows 100 emails/day)
2. For production, verify your domain at https://resend.com/domains
3. Create an API key at https://resend.com/api-keys

I'll ask you for this key during implementation.

---

## What Will Be Built

### 1. Edge Function: Send Order Notification
Receives order data and sends a beautifully formatted email to the admin with all order details.

**Email Content:**
| Field | Description |
|-------|-------------|
| Customer Name | From form input |
| Phone Number | For follow-up |
| Delivery Address | Full address with city |
| Product Details | Name, quantity, price per unit |
| Flavor Selections | (if applicable) Formatted list |
| Shipping Cost | Based on city |
| Delivery Time | Estimated delay |
| Total Amount | Final price in DH |
| Order Timestamp | When order was placed |

### 2. Edge Function: Send Contact Message
Receives contact form data and forwards it to the admin email.

**Email Content:**
| Field | Description |
|-------|-------------|
| Sender Name | Customer's name |
| Email | For reply |
| Phone | Optional |
| Message | Full message content |
| Timestamp | When message was sent |

### 3. Frontend Integration
Update both forms to call the edge functions instead of just logging to console.

---

## Files to Create/Modify

| File | Action | Purpose |
|------|--------|---------|
| `supabase/config.toml` | Create | Edge function configuration |
| `supabase/functions/send-order-email/index.ts` | Create | Order notification function |
| `supabase/functions/send-contact-email/index.ts` | Create | Contact form function |
| `src/components/OrderForm.tsx` | Modify | Call order edge function |
| `src/pages/Contact.tsx` | Modify | Call contact edge function |
| `src/integrations/supabase/client.ts` | Create | Supabase client for function calls |

---

## Technical Architecture

```text
+----------------+     POST      +------------------------+     Resend API     +-------------+
|  Order Form    | ------------> | send-order-email       | -----------------> | Admin Email |
|  (Frontend)    |               | (Edge Function)        |                    |             |
+----------------+               +------------------------+                    +-------------+

+----------------+     POST      +------------------------+     Resend API     +-------------+
|  Contact Form  | ------------> | send-contact-email     | -----------------> | Admin Email |
|  (Frontend)    |               | (Edge Function)        |                    |             |
+----------------+               +------------------------+                    +-------------+
```

---

## Edge Function: send-order-email

**Endpoint:** `/functions/v1/send-order-email`

**Request Body:**
```json
{
  "customerName": "Mohammed Alami",
  "phone": "0612345678",
  "city": "Casablanca",
  "address": "123 Rue Mohammed V",
  "productName": "Spray Buccal Rafraîchissant",
  "productPrice": 20,
  "quantity": 4,
  "flavorSelections": "🍑 Pêche x2, 🌿 Menthe x2",
  "shippingPrice": 35,
  "deliveryTime": "24-48h",
  "total": 115
}
```

**Email Template Features:**
- Professional HTML styling with Ma7alkom branding
- Clear sections for customer info, order details, and totals
- Mobile-responsive design
- Order reference number (timestamp-based)

---

## Edge Function: send-contact-email

**Endpoint:** `/functions/v1/send-contact-email`

**Request Body:**
```json
{
  "name": "Fatima Benali",
  "email": "fatima@example.com",
  "phone": "0698765432",
  "message": "Je souhaite en savoir plus sur vos produits..."
}
```

---

## Security Measures

1. **Server-side only**: API key stored as secret, never exposed to frontend
2. **Input validation**: All fields validated and sanitized before processing
3. **CORS headers**: Proper configuration for browser requests
4. **Rate limiting**: Resend handles rate limiting automatically
5. **Error handling**: Graceful error responses without exposing internals

---

## Input Validation

Both edge functions will validate:
- Required fields are present and non-empty
- Phone numbers contain only valid characters
- Email format is valid (contact form)
- Numeric fields are actually numbers
- Text fields have reasonable length limits

---

## Frontend Changes

### OrderForm.tsx Updates
- Replace `console.log` with actual API call
- Add proper error handling with user-friendly messages
- Show success/error states appropriately

### Contact.tsx Updates  
- Replace simulated submission with real API call
- Add loading states and error handling
- Validate email format before submission

---

## Email Recipient

The admin email will be set to: **contact@ma7alkom.ma** (can be changed in edge function)

Using Resend's default sender: `onboarding@resend.dev` (works immediately, no domain verification needed for testing)

---

## Expected Results

1. **Instant Notifications**: Admin receives email within seconds of form submission
2. **Complete Information**: All order/contact details in one email
3. **Professional Appearance**: Branded, well-formatted emails
4. **Reliability**: Resend handles delivery with high success rate
5. **Traceability**: Timestamp and reference numbers for tracking
