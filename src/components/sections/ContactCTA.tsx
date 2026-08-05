import { getWhatsAppUrl } from "@/constants/brand";
import { COMPANY } from "@/data/company";
import { CTA } from "@/components/ui/CTA";
import { Section } from "@/components/ui/Section";

export function ContactCTA() {
  return (
    <Section>
      <CTA
        title={COMPANY.cta.title}
        description={COMPANY.cta.description}
        primaryLabel={COMPANY.cta.primaryLabel}
        primaryHref={getWhatsAppUrl(
          "Olá! Gostaria de saber mais sobre os serviços da Bahia Service."
        )}
        primaryExternal
      />
    </Section>
  );
}
