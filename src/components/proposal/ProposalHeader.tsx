import { BRAND } from "@/constants/brand";
import { formatDisplayDate } from "@/lib/dates";

interface ProposalHeaderProps {
  companyName: string;
  contactName: string;
  city: string;
  date: string;
}

export function ProposalHeader({
  companyName,
  contactName,
  city,
  date,
}: ProposalHeaderProps) {
  return (
    <header className="proposal-header border-b border-slate-200 pb-5">
      <div className="flex flex-row items-center justify-between gap-3 sm:gap-4">
        <div className="shrink-0 overflow-visible">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={BRAND.logo}
            alt={BRAND.name}
            width={160}
            height={40}
            className="proposal-brand-logo h-10 w-auto object-contain object-left"
          />
        </div>

        <div className="min-w-0 flex-1 text-right">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-bs-secondary sm:text-[11px]">
            Documento comercial
          </p>
          <h1 className="proposal-doc-title mt-0.5 font-display text-lg font-bold leading-tight tracking-tight text-bs-primary sm:text-xl md:text-2xl">
            Proposta Comercial
          </h1>
          <p className="mt-0.5 text-xs leading-snug text-slate-500 sm:text-sm">
            {BRAND.tagline}
          </p>
        </div>
      </div>

      <div className="proposal-cover-hero mt-4 overflow-hidden rounded-2xl bg-slate-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={BRAND.heroPrint}
          alt={`${BRAND.name} — facilities e serviços corporativos`}
          className="proposal-cover-hero-image block aspect-[21/9] h-auto w-full object-cover object-center"
        />
      </div>

      <div className="proposal-meta-grid mt-4 grid gap-3 rounded-2xl bg-slate-50 p-4 sm:grid-cols-2">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Cliente
          </p>
          <p className="mt-1 break-words text-base font-semibold text-bs-primary">
            {companyName || "Nome da empresa"}
          </p>
          <p className="break-words text-sm text-slate-600">
            {contactName || "Responsável"}
            {city ? ` · ${city}` : ""}
          </p>
        </div>
        <div className="proposal-meta-date text-left sm:text-right">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Data
          </p>
          <p className="mt-1 text-base font-semibold text-bs-primary">
            {formatDisplayDate(date)}
          </p>
          <p className="text-sm text-slate-600">{BRAND.contact.cityLabel}</p>
        </div>
      </div>
    </header>
  );
}
