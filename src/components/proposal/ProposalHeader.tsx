import Image from "next/image";
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
    <header className="proposal-header border-b border-slate-200 pb-6">
      <div className="flex flex-col gap-4 print:flex-row print:items-start print:justify-between print:gap-6 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <div className="flex min-w-0 items-center gap-4">
          <Image
            src={BRAND.logo}
            alt={BRAND.name}
            width={180}
            height={56}
            className="h-12 w-auto max-w-full object-contain print:h-14 sm:h-14"
            priority
          />
        </div>

        <div className="min-w-0 text-left print:text-right sm:text-right">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-bs-secondary">
            Documento comercial
          </p>
          <h1 className="mt-1 font-display text-xl font-bold tracking-tight text-bs-primary print:text-3xl sm:text-2xl md:text-3xl">
            Proposta Comercial
          </h1>
          <p className="mt-1 text-sm text-slate-500">{BRAND.tagline}</p>
        </div>
      </div>

      <div className="proposal-meta-grid mt-6 grid gap-3 rounded-2xl bg-slate-50 p-4 print:grid-cols-2 sm:grid-cols-2">
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
        <div className="proposal-meta-date print:text-right sm:text-right">
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
