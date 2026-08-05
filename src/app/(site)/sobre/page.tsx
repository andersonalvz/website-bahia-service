import type { Metadata } from "next";
import { BRAND } from "@/constants/brand";
import { COMPANY } from "@/data/company";
import { Hero } from "@/components/layout/Hero";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { IconCard } from "@/components/ui/IconCard";
import { Section } from "@/components/ui/Section";
import { ContactCTA } from "@/components/sections";

export const metadata: Metadata = {
  title: "Sobre",
  description: `Conheça a história, missão, visão e valores da ${BRAND.name}.`,
};

export default function SobrePage() {
  return (
    <>
      <Hero
        compact
        eyebrow="Sobre nós"
        title="Quem somos"
        description="Excelência em facilities e parceria estratégica para a operação do seu negócio."
        image={BRAND.hero}
      />

      <Section>
        <Heading as="h2" eyebrow="História">
          {COMPANY.history.title}
        </Heading>
        <div className="mt-6 max-w-3xl space-y-4">
          {COMPANY.history.paragraphs.map((paragraph) => (
            <p
              key={paragraph.slice(0, 32)}
              className="text-sm leading-relaxed text-slate-600 sm:text-base"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </Section>

      <Section tone="muted">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-bs-secondary">
              Missão
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold text-bs-primary">
              {COMPANY.mission.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              {COMPANY.mission.description}
            </p>
          </Card>
          <Card>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-bs-secondary">
              Visão
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold text-bs-primary">
              {COMPANY.vision.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              {COMPANY.vision.description}
            </p>
          </Card>
        </div>
      </Section>

      <Section>
        <Heading
          as="h2"
          eyebrow="Valores"
          description="Princípios que guiam nossa operação e o relacionamento com clientes e equipes."
          align="center"
          className="mx-auto max-w-2xl"
        >
          Nossos valores
        </Heading>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {COMPANY.values.map((value) => (
            <IconCard
              key={value.title}
              icon={<ValueIcon />}
              title={value.title}
              description={value.description}
            />
          ))}
        </div>
      </Section>

      <Section tone="muted">
        <Heading as="h2" eyebrow="Qualidade">
          {COMPANY.qualityCommitment.title}
        </Heading>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
          {COMPANY.qualityCommitment.description}
        </p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {COMPANY.qualityCommitment.points.map((point) => (
            <li
              key={point}
              className="flex gap-2 rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-sm leading-relaxed text-slate-600 shadow-[0_10px_40px_rgba(27,54,93,0.06)]"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-bs-secondary" />
              {point}
            </li>
          ))}
        </ul>
      </Section>

      <ContactCTA />
    </>
  );
}

function ValueIcon() {
  return (
    <svg
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}
