import { COMPANY } from "@/data/company";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";

export function AboutTeaser() {
  return (
    <Section>
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Heading
          as="h2"
          eyebrow="Sobre a empresa"
          description={COMPANY.summary}
        >
          Parceiros estratégicos em facilities
        </Heading>
        <div className="space-y-4">
          <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
            {COMPANY.qualityCommitment.description}
          </p>
          <ul className="space-y-2">
            {COMPANY.qualityCommitment.points.slice(0, 3).map((point) => (
              <li
                key={point}
                className="flex gap-2 text-sm leading-relaxed text-slate-600"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-bs-secondary" />
                {point}
              </li>
            ))}
          </ul>
          <Button href="/sobre" variant="secondary" size="sm" className="mt-2">
            Conheça nossa história
          </Button>
        </div>
      </div>
    </Section>
  );
}
