import { BRAND, getWhatsAppUrl } from "@/constants/brand";
import { Card } from "@/components/ui/Card";

const ITEMS = [
  {
    label: "Telefones",
    value: BRAND.contact.phones.join(" · "),
    href: `tel:${BRAND.contact.phones[0].replace(/\D/g, "")}`,
  },
  {
    label: "WhatsApp",
    value: BRAND.contact.whatsappDisplay,
    href: getWhatsAppUrl(
      "Olá! Gostaria de saber mais sobre os serviços da Bahia Service."
    ),
    external: true,
  },
  {
    label: "E-mail",
    value: BRAND.contact.email,
    href: `mailto:${BRAND.contact.email}`,
  },
  {
    label: "Endereço",
    value: BRAND.contact.address,
  },
] as const;

export function ContactInfo() {
  return (
    <div className="space-y-4">
      {ITEMS.map((item) => (
        <Card key={item.label} className="!p-4 sm:!p-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-bs-secondary">
            {item.label}
          </p>
          {"href" in item && item.href ? (
            <a
              href={item.href}
              target={"external" in item && item.external ? "_blank" : undefined}
              rel={
                "external" in item && item.external
                  ? "noopener noreferrer"
                  : undefined
              }
              className="mt-2 block text-sm font-medium leading-relaxed text-bs-primary transition hover:text-bs-secondary"
            >
              {item.value}
            </a>
          ) : (
            <p className="mt-2 text-sm font-medium leading-relaxed text-bs-primary">
              {item.value}
            </p>
          )}
        </Card>
      ))}

      <Card padded={false} className="overflow-hidden">
        <div className="flex aspect-[16/10] items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50/60 p-6 text-center">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-bs-secondary">
              Mapa
            </p>
            <p className="mt-2 font-display text-lg font-semibold text-bs-primary">
              {BRAND.contact.cityLabel}
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Placeholder — integração com mapa em breve
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
