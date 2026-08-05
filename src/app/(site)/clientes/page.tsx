import type { Metadata } from "next";
import { BRAND } from "@/constants/brand";
import { CLIENTS_SECTION } from "@/data/clients";
import { Hero } from "@/components/layout/Hero";
import { ClientsShowcase, ContactCTA } from "@/components/sections";

export const metadata: Metadata = {
  title: "Clientes",
  description: CLIENTS_SECTION.description,
};

export default function ClientesPage() {
  return (
    <>
      <Hero
        compact
        eyebrow="Clientes"
        title={CLIENTS_SECTION.title}
        description={CLIENTS_SECTION.description}
        image={BRAND.hero}
      />
      <ClientsShowcase showPlaceholders showViewAll={false} />
      <ContactCTA />
    </>
  );
}
