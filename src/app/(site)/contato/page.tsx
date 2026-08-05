import type { Metadata } from "next";
import { BRAND } from "@/constants/brand";
import { Hero } from "@/components/layout/Hero";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { ContactForm, ContactInfo } from "@/components/sections";

export const metadata: Metadata = {
  title: "Contato",
  description: `Fale com a ${BRAND.name}: telefone, WhatsApp, e-mail e endereço em ${BRAND.contact.cityLabel}.`,
};

export default function ContatoPage() {
  return (
    <>
      <Hero
        compact
        eyebrow="Contato"
        title="Fale com a Bahia Service"
        description="Estamos prontos para entender sua operação e apresentar a melhor solução em facilities."
        image={BRAND.hero}
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <Heading
              as="h2"
              eyebrow="Canais"
              description="Escolha o canal de preferência ou envie uma mensagem pelo formulário."
            >
              Como podemos ajudar?
            </Heading>
            <div className="mt-8">
              <ContactInfo />
            </div>
          </div>

          <Card>
            <Heading as="h2" eyebrow="Mensagem">
              Envie sua solicitação
            </Heading>
            <p className="mt-2 text-sm text-slate-500">
              O envio abre seu e-mail ou WhatsApp com a mensagem preenchida — sem
              cadastro e sem armazenamento no servidor.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </Card>
        </div>
      </Section>
    </>
  );
}
