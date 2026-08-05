import type { Metadata } from "next";
import {
  AboutTeaser,
  ClientsShowcase,
  ContactCTA,
  Differentials,
  HomeHero,
  ServicesGrid,
  Stats,
} from "@/components/sections";
import { BRAND } from "@/constants/brand";

export const metadata: Metadata = {
  title: "Home",
  description: `${BRAND.name} — ${BRAND.tagline}. Terceirização e facilities com excelência em Salvador e em toda a Bahia.`,
  openGraph: {
    title: `${BRAND.name} | ${BRAND.tagline}`,
    description: `${BRAND.name} — soluções completas em facilities e terceirização de serviços.`,
  },
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <AboutTeaser />
      <ServicesGrid showViewAll />
      <Differentials />
      <Stats />
      <ClientsShowcase />
      {/* Depoimentos ocultos temporariamente */}
      <ContactCTA />
    </>
  );
}
