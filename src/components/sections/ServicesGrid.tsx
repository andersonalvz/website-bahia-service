import { SERVICES } from "@/data/services";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

interface ServicesGridProps {
  limit?: number;
  showViewAll?: boolean;
  eyebrow?: string;
  title?: string;
  description?: string;
}

export function ServicesGrid({
  limit,
  showViewAll = false,
  eyebrow = "Serviços",
  title = "Soluções completas em facilities",
  description = "Limpeza e conservação, jardinagem e portaria com equipes treinadas e gestão profissional para cada operação.",
}: ServicesGridProps) {
  const items = limit ? SERVICES.slice(0, limit) : SERVICES;

  return (
    <Section tone="muted">
      <Heading
        as="h2"
        eyebrow={eyebrow}
        description={description}
        align="center"
        className="mx-auto max-w-2xl"
      >
        {title}
      </Heading>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((service) => (
          <FeatureCard
            key={service.id}
            title={service.shortTitle}
            description={service.description}
            image={service.image}
            icon={service.icon}
            href={`/servicos#${service.id}`}
            ctaLabel="Ver detalhes"
          />
        ))}
      </div>

      {showViewAll ? (
        <div className="mt-10 text-center">
          <Button href="/servicos" variant="outline">
            Ver todos os serviços
          </Button>
        </div>
      ) : null}
    </Section>
  );
}
