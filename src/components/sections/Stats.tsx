import { COMPANY } from "@/data/company";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { StatCard } from "@/components/ui/StatCard";

export function Stats() {
  return (
    <Section tone="muted">
      <Heading
        as="h2"
        eyebrow="Indicadores"
        description="Números que refletem nossa presença e capacidade operacional na Bahia."
        align="center"
        className="mx-auto max-w-2xl"
      >
        Bahia Service em números
      </Heading>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {COMPANY.stats.map((stat) => (
          <StatCard key={stat.label} value={stat.value} label={stat.label} />
        ))}
      </div>
    </Section>
  );
}
