export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://soft99bikes.com",
    "name": "سوفت تسعة وتسعين",
    "alternateName": "SoftNinteyNine Bikes",
    "description": "متجر متخصص في قطع الغيار الأصلية وزيوت الصيانة والإكسسوارات للدراجات النارية في جيزان",
    "url": "https://soft99bikes.com",
    "image": "https://soft99bikes.com/logo.png",
    "logo": "https://soft99bikes.com/logo.png",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "جيزان",
      "addressCountry": "SA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "16.9064",
      "longitude": "42.5525"
    },
    "openingHours": "Mo-Su 08:00-22:00",
    "telephone": "+966500000000",
    "priceRange": "$$",
    "acceptsReservations": false,
    "currenciesAccepted": "SAR",
    "paymentAccepted": "Cash, Credit Card",
    "areaServed": {
      "@type": "Place",
      "name": "جيزان، المملكة العربية السعودية"
    },
    "category": "Motorcycle Parts Store",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "قطع غيار وزيوت الدراجات النارية",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "زيوت موتول للدراجات النارية",
            "category": "Motorcycle Oil"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Product",
            "name": "فلاتر الزيت والهواء",
            "category": "Motorcycle Filters"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product", 
            "name": "بطاريات الدراجات النارية",
            "category": "Motorcycle Batteries"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "إكسسوارات وقطع غيار",
            "category": "Motorcycle Accessories"
          }
        }
      ]
    },
    "sameAs": [
      "https://www.instagram.com/soft99bikes",
      "https://twitter.com/soft99bikes"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}