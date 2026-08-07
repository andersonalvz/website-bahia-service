export const BRAND = {
  name: "Bahia Service",
  legalName: "Bahia Service Terceirização de Mão de Obra Ltda.",
  tagline: "Excelência em Facilities e Serviços Corporativos",
  primary: "#1B365D",
  secondary: "#3D85C6",
  accent: "#5BA3D9",
  muted: "#64748B",
  surface: "#F8FAFC",
  border: "#E2E8F0",
  logo: "/images/logo-bs.png",
  hero: "/images/company-hero.png",
  /** Versão otimizada para PDF/print (~355KB). */
  heroPrint: "/images/company-hero-print.jpg",
  url: "https://www.bahiaservice.com.br",
  contact: {
    phones: ["(71) 99695-5341", "(71) 98769-0447"],
    /** Primary WhatsApp — (71) 98769-0447 */
    whatsapp: "5571987690447",
    whatsappDisplay: "(71) 98769-0447",
    email: "contato@bahiaservice.com.br",
    website: "www.bahiaservice.com.br",
    address:
      "Avenida Tancredo Neves, 1632, Sala 193 — Torre Sul — Caminho das Árvores — Salvador/BA",
    cityLabel: "Salvador / BA",
  },
} as const;

export function getWhatsAppUrl(message?: string) {
  const base = `https://wa.me/${BRAND.contact.whatsapp}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function getMailtoUrl(subject?: string, body?: string) {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const query = params.toString();
  return `mailto:${BRAND.contact.email}${query ? `?${query}` : ""}`;
}
