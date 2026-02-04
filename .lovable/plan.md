
# Plan: Complete SEO Optimization for Ma7alkom.com

## Overview
Transform ma7alkom.com into a highly search-engine-optimized e-commerce site targeting Moroccan customers. This plan implements comprehensive SEO best practices including dynamic meta tags, structured data (JSON-LD), XML sitemap, enhanced robots.txt, and page-specific optimizations.

---

## What Will Be Built

### 1. SEO Head Component with Dynamic Meta Tags
A reusable component that dynamically updates `<title>`, `<meta description>`, Open Graph, Twitter Cards, and canonical URLs for each page.

**Pages and their SEO content:**

| Page | Title | Focus Keywords |
|------|-------|----------------|
| Home | Ma7alkom - Boutique en Ligne N1 au Maroc, Livraison Rapide | boutique en ligne maroc, livraison maroc |
| Products | Nos Produits - Ma7alkom, Hygiène & Soins au Maroc | produits hygiene maroc, soins personnels |
| Fil Dentaire | Fil Dentaire Jetable 50 Pcs - Achat en Ligne Maroc | fil dentaire maroc, hygiène buccale |
| Spray Buccal | Spray Buccal Rafraîchissant - 6 Saveurs, Livraison Maroc | spray haleine maroc, haleine fraiche |
| Tondeuse | Tondeuse Nez Oreilles Sans Fil - Ma7alkom Maroc | tondeuse nez maroc, soins homme |
| Protege-Bruleurs | Protège-Brûleurs Gaz 20 Pcs - Accessoire Cuisine Maroc | protege bruleur maroc, accessoire cuisine |
| Contact | Contact Ma7alkom - Service Client Maroc | contact boutique maroc |
| About | À Propos de Ma7alkom - Votre Boutique de Confiance | boutique confiance maroc |

### 2. JSON-LD Structured Data
Rich snippets for Google to display enhanced search results:

- **Organization schema** on all pages (brand info, logo, contact)
- **WebSite schema** with SearchAction (homepage)
- **Product schema** on each product page (name, price, availability, reviews)
- **BreadcrumbList** for navigation context
- **LocalBusiness** schema (Casablanca location)

### 3. XML Sitemap
Static sitemap.xml with all pages for Google/Bing indexing:

```text
public/sitemap.xml
```

**Included URLs:**
- https://ma7alkom.com/
- https://ma7alkom.com/produits
- https://ma7alkom.com/produit/fil-dentaire
- https://ma7alkom.com/produit/spray-buccal
- https://ma7alkom.com/produit/tondeuse-nez
- https://ma7alkom.com/produit/protege-bruleurs
- https://ma7alkom.com/a-propos
- https://ma7alkom.com/contact

### 4. Enhanced robots.txt
Add sitemap reference and optimize crawler directives:

```text
Sitemap: https://ma7alkom.com/sitemap.xml
```

### 5. Updated index.html
- Add canonical URL meta tag
- Add geo and language targeting for Morocco
- Add theme-color for mobile browsers
- Add proper favicon with multiple sizes
- Add alternate hreflang tags

### 6. Product Data SEO Enhancement
Extend product data with SEO-specific fields:
- `seoTitle`: Optimized page title
- `seoDescription`: 155-character meta description
- `seoKeywords`: Targeted keywords array

---

## Files to Create/Modify

| File | Action | Purpose |
|------|--------|---------|
| `src/components/SEOHead.tsx` | Create | Dynamic meta tags component |
| `src/data/seoData.ts` | Create | Centralized SEO content for all pages |
| `public/sitemap.xml` | Create | XML sitemap for search engines |
| `public/robots.txt` | Modify | Add sitemap reference |
| `index.html` | Modify | Enhanced base SEO tags |
| `src/pages/Index.tsx` | Modify | Add SEOHead component |
| `src/pages/Products.tsx` | Modify | Add SEOHead component |
| `src/pages/product/ProductPageAnimated.tsx` | Modify | Add product-specific SEOHead |
| `src/pages/product/ProductPageIOS.tsx` | Modify | Add product-specific SEOHead |
| `src/pages/Contact.tsx` | Modify | Add SEOHead component |
| `src/pages/About.tsx` | Modify | Add SEOHead component |
| `src/data/products.ts` | Modify | Add SEO fields to products |

---

## Technical Details

### SEOHead Component Structure

```tsx
// src/components/SEOHead.tsx
interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'product';
  jsonLd?: object | object[];
}
```

Uses `document.head` manipulation via `useEffect` to dynamically update:
- `<title>` tag
- `<meta name="description">`
- `<meta name="keywords">`
- `<link rel="canonical">`
- Open Graph meta tags
- Twitter Card meta tags
- JSON-LD script injection

### Product JSON-LD Schema Example

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Fil Dentaire Jetable Portable",
  "description": "Lot de 50 fils dentaires...",
  "image": "https://ma7alkom.com/images/products/fil-dentaire-1.jpg",
  "brand": {
    "@type": "Brand",
    "name": "Ma7alkom"
  },
  "offers": {
    "@type": "Offer",
    "price": "49",
    "priceCurrency": "MAD",
    "availability": "https://schema.org/InStock",
    "seller": {
      "@type": "Organization",
      "name": "Ma7alkom"
    }
  }
}
```

### Sitemap Priority Structure

| URL Pattern | Priority | Change Frequency |
|-------------|----------|------------------|
| Homepage | 1.0 | weekly |
| Product pages | 0.9 | weekly |
| Products listing | 0.8 | weekly |
| About | 0.6 | monthly |
| Contact | 0.5 | monthly |

---

## SEO Keywords Strategy (Morocco-Focused)

**Primary Keywords:**
- boutique en ligne maroc
- achat en ligne maroc
- livraison rapide maroc
- paiement a la livraison maroc

**Product-Specific Keywords:**
- fil dentaire maroc / fil dentaire jetable
- spray buccal maroc / spray haleine fraiche
- tondeuse nez oreilles maroc
- protege bruleur cuisiniere / accessoire cuisine maroc

**Long-tail Keywords (in descriptions):**
- acheter fil dentaire en ligne au maroc
- spray buccal livraison casablanca
- tondeuse pour homme maroc prix

---

## Expected Results

1. **Improved Indexability**: All pages discoverable via sitemap
2. **Rich Snippets**: Product prices and availability in Google results
3. **Better CTR**: Compelling meta descriptions in SERPs
4. **Local SEO**: Morocco-focused targeting with geo tags
5. **Social Sharing**: Proper Open Graph for Facebook/Instagram/WhatsApp shares
6. **Brand Authority**: Organization schema establishes credibility
