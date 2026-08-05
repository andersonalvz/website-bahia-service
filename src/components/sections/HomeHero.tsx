import { BRAND } from "@/constants/brand";
import { Hero } from "@/components/layout/Hero";

export function HomeHero() {
  return (
    <Hero
      eyebrow={BRAND.name}
      title={BRAND.tagline}
      description="Soluções em limpeza e conservação, jardinagem e portaria e controle de acesso para empresas e condomínios em toda a Bahia."
      image={BRAND.hero}
      imageAlt={`${BRAND.name} — facilities e serviços corporativos`}
    />
  );
}
