const BASE_URL = "https://ma7alkom.com";

// Organization schema used across all pages
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Ma7alkom",
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  description: "Boutique en ligne de confiance au Maroc - Produits de qualité, livraison rapide partout au Maroc",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Casablanca",
    addressCountry: "MA",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+212-780-712-169",
    contactType: "customer service",
    availableLanguage: ["French", "Arabic"],
  },
  sameAs: [
    "https://www.instagram.com/ma7alkom",
    "https://www.facebook.com/ma7alkom",
  ],
};

// LocalBusiness schema for local SEO
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Ma7alkom",
  image: `${BASE_URL}/logo.png`,
  url: BASE_URL,
  telephone: "+212-780-712-169",
  email: "contact@ma7alkom.ma",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Casablanca",
    addressCountry: "MA",
  },
  priceRange: "$$",
  openingHours: "Mo-Fr 09:00-18:00, Sa 09:00-14:00",
  paymentAccepted: "Cash on Delivery",
  currenciesAccepted: "MAD",
};

// Website schema with search action
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Ma7alkom",
  url: BASE_URL,
  description: "Boutique en ligne N°1 au Maroc - Hygiène, soins personnels et accessoires cuisine",
  potentialAction: {
    "@type": "SearchAction",
    target: `${BASE_URL}/produits?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

// Breadcrumb generator
export const generateBreadcrumbSchema = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: `${BASE_URL}${item.url}`,
  })),
});

// Product schema generator
export const generateProductSchema = (product: {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: product.name,
  description: product.description,
  image: `${BASE_URL}${product.image}`,
  category: product.category,
  brand: {
    "@type": "Brand",
    name: "Ma7alkom",
  },
  offers: {
    "@type": "Offer",
    price: product.price,
    priceCurrency: "MAD",
    availability: "https://schema.org/InStock",
    url: `${BASE_URL}/produit/${product.id}`,
    seller: {
      "@type": "Organization",
      name: "Ma7alkom",
    },
    priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    shippingDetails: {
      "@type": "OfferShippingDetails",
      shippingDestination: {
        "@type": "DefinedRegion",
        addressCountry: "MA",
      },
      deliveryTime: {
        "@type": "ShippingDeliveryTime",
        handlingTime: {
          "@type": "QuantitativeValue",
          minValue: 1,
          maxValue: 2,
          unitCode: "DAY",
        },
        transitTime: {
          "@type": "QuantitativeValue",
          minValue: 1,
          maxValue: 3,
          unitCode: "DAY",
        },
      },
    },
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "127",
    bestRating: "5",
    worstRating: "1",
  },
});

// Page-specific SEO data
export const pageSEO = {
  home: {
    title: "Ma7alkom - Boutique en Ligne N°1 au Maroc | Livraison Rapide",
    description: "Découvrez Ma7alkom, votre boutique en ligne de confiance au Maroc. Produits d'hygiène et soins personnels de qualité. Livraison rapide partout au Maroc, paiement à la livraison.",
    keywords: "boutique en ligne maroc, achat en ligne maroc, livraison rapide maroc, paiement à la livraison maroc, hygiène maroc, soins personnels maroc",
    canonical: "/",
  },
  products: {
    title: "Nos Produits - Ma7alkom | Hygiène & Soins au Maroc",
    description: "Explorez notre collection de produits d'hygiène et soins personnels. Fil dentaire, spray buccal, tondeuse et accessoires cuisine. Livraison partout au Maroc.",
    keywords: "produits hygiène maroc, soins personnels maroc, acheter en ligne maroc, fil dentaire, spray buccal, tondeuse, accessoires cuisine",
    canonical: "/produits",
  },
  contact: {
    title: "Contact Ma7alkom - Service Client Maroc",
    description: "Contactez Ma7alkom pour toute question. Notre équipe est disponible pour vous aider. Service client réactif basé à Casablanca, Maroc.",
    keywords: "contact ma7alkom, service client maroc, boutique en ligne contact, aide commande maroc",
    canonical: "/contact",
  },
  about: {
    title: "À Propos de Ma7alkom - Votre Boutique de Confiance au Maroc",
    description: "Découvrez l'histoire de Ma7alkom, votre partenaire de confiance pour des produits de qualité au Maroc. Plus de 1000 clients satisfaits partout au Maroc.",
    keywords: "à propos ma7alkom, boutique confiance maroc, histoire ma7alkom, qui sommes nous",
    canonical: "/a-propos",
  },
};

// Product-specific SEO data
export const productSEO: Record<string, { title: string; description: string; keywords: string }> = {
  "fil-dentaire": {
    title: "Fil Dentaire Jetable 50 Pcs - Achat en Ligne Maroc | Ma7alkom",
    description: "Fil dentaire jetable portable, lot de 50 pièces. Hygiène buccale optimale, format pratique pour voyage. Livraison rapide partout au Maroc. Prix: 49 DH.",
    keywords: "fil dentaire maroc, fil dentaire jetable, hygiène buccale maroc, acheter fil dentaire en ligne maroc, fil dentaire portable",
  },
  "spray-buccal": {
    title: "Spray Buccal Rafraîchissant 6 Saveurs - Livraison Maroc | Ma7alkom",
    description: "Spray buccal rafraîchissant disponible en 6 saveurs: Pêche, Raisin, Litchi, Menthe, Pastèque, Orange. Haleine fraîche instantanée. Livraison rapide au Maroc.",
    keywords: "spray buccal maroc, spray haleine fraiche, haleine fraîche maroc, spray buccal livraison casablanca, rafraichisseur haleine",
  },
  "tondeuse-nez": {
    title: "Tondeuse Nez Oreilles Sans Fil MLLIQUEA - Ma7alkom Maroc",
    description: "Tondeuse sans fil pour nez et oreilles MLLIQUEA. Rasage sûr et indolore, design compact. Cadeau idéal pour homme. Livraison partout au Maroc. Prix: 89 DH.",
    keywords: "tondeuse nez maroc, tondeuse oreilles maroc, tondeuse nez oreilles, soins homme maroc, tondeuse pour homme maroc prix",
  },
  "protege-bruleurs": {
    title: "Protège-Brûleurs Gaz 20 Pcs - Accessoire Cuisine Maroc | Ma7alkom",
    description: "Lot de 20 protège-brûleurs jetables en aluminium. Protégez votre cuisinière des éclaboussures et graisses. Nettoyage facile. Livraison au Maroc.",
    keywords: "protège brûleur maroc, protege bruleur cuisiniere, accessoire cuisine maroc, couvercle bruleur gaz, protection cuisinière",
  },
};
