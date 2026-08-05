import { COMPANY } from "@/data/company";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";

export function Testimonials() {
  return (
    <Section tone="muted">
      <Heading
        as="h2"
        eyebrow="Depoimentos"
        description="Em breve, avaliações reais dos nossos parceiros. Enquanto isso, deixamos espaços reservados."
        align="center"
        className="mx-auto max-w-2xl"
      >
        O que dizem nossos clientes
      </Heading>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {COMPANY.testimonials.map((item, index) => (
          <Card key={`${item.author}-${index}`} className="h-full">
            <Badge>Em breve</Badge>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 italic">
              “{item.quote}”
            </p>
            <div className="mt-6 border-t border-slate-100 pt-4">
              <p className="text-sm font-semibold text-bs-primary">{item.author}</p>
              <p className="text-xs text-slate-500">{item.role}</p>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
