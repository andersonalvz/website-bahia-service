import Image from "next/image";
import { CLIENT_PLACEHOLDERS, CLIENTS_SECTION } from "@/data/clients";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";

interface ClientsShowcaseProps {
  showPlaceholders?: boolean;
  showViewAll?: boolean;
}

export function ClientsShowcase({
  showPlaceholders = false,
  showViewAll = true,
}: ClientsShowcaseProps) {
  return (
    <Section>
      <Heading
        as="h2"
        eyebrow="Clientes"
        description={CLIENTS_SECTION.description}
        align="center"
        className="mx-auto max-w-2xl"
      >
        {CLIENTS_SECTION.title}
      </Heading>

      <div className="clients-logos-frame mt-10 overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_10px_40px_rgba(27,54,93,0.06)] sm:p-6">
        <div className="relative mx-auto h-[320px] w-full max-w-3xl sm:h-[420px] lg:h-[480px]">
          <Image
            src={CLIENTS_SECTION.image}
            alt={CLIENTS_SECTION.imageAlt}
            fill
            className="object-contain object-center"
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>
      </div>

      {showPlaceholders ? (
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {CLIENT_PLACEHOLDERS.map((client) => (
            <div
              key={client.id}
              className="flex h-24 items-center justify-center rounded-2xl border border-slate-200/80 bg-slate-50/70 px-3 text-center"
            >
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {client.name}
              </span>
            </div>
          ))}
        </div>
      ) : null}

      {showViewAll ? (
        <div className="mt-8 text-center">
          <Button href="/clientes" variant="outline">
            Ver clientes
          </Button>
        </div>
      ) : null}
    </Section>
  );
}
