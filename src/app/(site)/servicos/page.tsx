import type { Metadata } from "next";
import { BRAND } from "@/constants/brand";
import { Hero } from "@/components/layout/Hero";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { ContactCTA, ServiceDetailList } from "@/components/sections";

export const metadata: Metadata = {
  title: "Serviços",
  description: `Limpeza e conservação, jardinagem e portaria e controle de acesso — serviços da ${BRAND.name}.`,
};

export default function ServicosPage() {
  return (
    <>
      <Hero
        compact
        eyebrow="Serviços"
        title="Soluções em facilities"
        description="Equipes especializadas e gestão profissional para cada necessidade operacional."
        image="/images/services/servico-limpeza.png"
      />

      <Section>
        <Heading
          as="h2"
          eyebrow="Portfólio"
          description="Cada serviço utiliza as mesmas imagens, ícones e conteúdos aprovados no Gerador de Propostas."
          className="mb-10 max-w-2xl"
        >
          Nossas linhas de serviço
        </Heading>
        <ServiceDetailList />
      </Section>

      <ContactCTA />
    </>
  );
}
