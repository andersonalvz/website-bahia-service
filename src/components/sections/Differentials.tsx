import { COMPANY } from "@/data/company";
import { Heading } from "@/components/ui/Heading";
import { IconCard } from "@/components/ui/IconCard";
import { Section } from "@/components/ui/Section";

const ICONS = [
  <PathIcon key="1" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />,
  <PathIcon key="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />,
  <PathIcon key="3" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />,
  <PathIcon key="4" d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />,
];

export function Differentials() {
  return (
    <Section>
      <Heading
        as="h2"
        eyebrow="Diferenciais"
        description="O que torna a Bahia Service o parceiro certo para a operação do seu negócio."
        align="center"
        className="mx-auto max-w-2xl"
      >
        Por que escolher a Bahia Service
      </Heading>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {COMPANY.differentials.map((item, index) => (
          <IconCard
            key={item.title}
            icon={ICONS[index] ?? ICONS[0]}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </Section>
  );
}

function PathIcon({ d }: { d: string }) {
  return (
    <svg
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d={d} />
    </svg>
  );
}
