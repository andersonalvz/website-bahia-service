import { CLIENTS_SECTION } from "@/data/clients";

export function ProposalClients() {
  return (
    <section className="proposal-clients my-6">
      <h3 className="font-display text-lg font-semibold text-bs-primary">
        {CLIENTS_SECTION.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        {CLIENTS_SECTION.description}
      </p>

      <div className="clients-logos-frame mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 sm:p-4">
        {/*
          <img> em fluxo (sem next/image fill).
          Fill + absolute é a causa mais comum de imagem ausente / página estranha no print WebKit.
        */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={CLIENTS_SECTION.image}
          alt={CLIENTS_SECTION.imageAlt}
          className="clients-logos-image mx-auto block h-auto w-full max-w-2xl max-h-[300px] object-contain object-center sm:max-h-[380px] md:max-h-[420px] lg:max-h-[460px]"
        />
      </div>
    </section>
  );
}
