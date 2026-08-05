import { BRAND } from "@/constants/brand";

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND.name,
    legalName: BRAND.legalName,
    url: BRAND.url,
    logo: `${BRAND.url}${BRAND.logo}`,
    description: BRAND.tagline,
    email: BRAND.contact.email,
    telephone: BRAND.contact.phones[0],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Avenida Tancredo Neves, 1632, Sala 193 — Torre Sul",
      addressLocality: "Salvador",
      addressRegion: "BA",
      addressCountry: "BR",
    },
    sameAs: [getWhatsAppSameAs()],
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Bahia",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

function getWhatsAppSameAs() {
  return `https://wa.me/${BRAND.contact.whatsapp}`;
}
