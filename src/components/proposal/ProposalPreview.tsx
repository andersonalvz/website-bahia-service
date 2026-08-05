import { COMPANY_SUMMARY } from "@/constants/commercial";
import { summarizeServices } from "@/lib/services-summary";
import type { ProposalFormData, ProposalTotals } from "@/types/proposal";
import { ProposalClients } from "./ProposalClients";
import { ProposalConditions } from "./ProposalConditions";
import { ProposalFooter } from "./ProposalFooter";
import { ProposalHeader } from "./ProposalHeader";
import { ProposalService } from "./ProposalService";
import { ProposalTable } from "./ProposalTable";

interface ProposalPreviewProps {
  data: ProposalFormData;
  totals: ProposalTotals;
}

export function ProposalPreview({ data, totals }: ProposalPreviewProps) {
  const summary = summarizeServices(data.services);

  return (
    <div className="proposal-preview-shell">
      <div className="mb-3 flex items-center justify-between no-print">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-bs-secondary">
            Preview
          </p>
          <h2 className="font-display text-xl font-bold text-bs-primary">
            Proposta em tempo real
          </h2>
        </div>
        <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-500 ring-1 ring-slate-200">
          A4 · Impressão
        </span>
      </div>

      <article
        id="proposal-document"
        className="proposal-document mx-auto w-full max-w-[210mm] origin-top rounded-3xl border border-slate-200/80 bg-white p-6 shadow-[0_16px_50px_rgba(27,54,93,0.08)] sm:p-8 lg:p-10"
      >
        <ProposalHeader
          companyName={data.companyName}
          contactName={data.contactName}
          city={data.city}
          date={data.date}
        />

        <section className="proposal-summary my-6">
          <h3 className="font-display text-lg font-semibold text-bs-primary">
            Resumo da empresa
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            {COMPANY_SUMMARY}
          </p>
        </section>

        <ProposalClients />

        <ProposalService
          title={summary.title}
          description={summary.description}
          benefits={summary.benefits}
          differentials={summary.differentials}
          image={summary.image}
          icon={summary.icon}
          serviceLabels={summary.services.map((service) => service.shortTitle)}
        />

        {/* Página da planilha + condições (cresce com mais serviços) */}
        <section className="proposal-finance-page my-6 space-y-6">
          <ProposalTable
            lines={totals.lines}
            monthlyValue={totals.monthlyValue}
            annualValue={totals.annualValue}
            contractTerm={data.contractTerm}
          />
          <ProposalConditions />
        </section>

        {/* Página exclusiva do SLA + contato */}
        <ProposalFooter />
      </article>
    </div>
  );
}
