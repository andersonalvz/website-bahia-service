import { BRAND } from "@/constants/brand";
import { SLA_CLOSING, SLA_INTRO, SLA_ITEMS } from "@/constants/commercial";

/** Página final do PDF: SLA + contato. */
export function ProposalFooter() {
  return (
    <footer className="proposal-sla-page space-y-5">
      <section className="proposal-sla rounded-2xl border border-slate-200 bg-slate-50/80 p-4 sm:p-5">
        <h3 className="font-display text-lg font-semibold text-bs-primary">
          Acordo de Nível de Serviço (SLA)
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{SLA_INTRO}</p>

        <div className="mt-4 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Indicadores de Nível de Serviço
          </p>
          {SLA_ITEMS.map((item, index) => (
            <div
              key={item.title}
              className="sla-item rounded-xl bg-white p-3 ring-1 ring-slate-200/80"
            >
              <p className="text-sm font-semibold text-bs-primary">
                {index + 1}. {item.title}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-4 text-sm leading-relaxed text-slate-600">{SLA_CLOSING}</p>
      </section>

      <section className="proposal-contact rounded-2xl bg-bs-primary px-5 py-4 text-white">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-bs-accent">
          CONTATO COMERCIAL
        </p>
        <div className="contact-details mt-3 space-y-2 text-sm">
          <p className="break-words">
            <span className="text-white/70">Responsável: </span>
            Robson Soares
          </p>
          <p className="break-words">
            <span className="text-white/70">Telefones: </span>
            {BRAND.contact.phones.join(" · ")}
          </p>
          <p className="break-all">
            <span className="text-white/70">E-mail: </span>
            {BRAND.contact.email}
          </p>
          <p className="break-words">
            <span className="text-white/70">Instagram: </span>
            <a
              href="https://instagram.com/bahiaservice.ofc"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2"
            >
              @bahiaservice.ofc
            </a>
          </p>
          <p className="break-words">
            <span className="text-white/70">Endereço: </span>
            {BRAND.contact.address}
          </p>
        </div>
      </section>
    </footer>
  );
}
