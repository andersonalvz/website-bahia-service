import { getServiceById } from "@/data/services";
import { formatCurrency } from "@/lib/currency";
import type { ProposalLineTotal } from "@/types/proposal";

interface ProposalTableProps {
  lines: ProposalLineTotal[];
  monthlyValue: number;
}

export function ProposalTable({
  lines,
  monthlyValue,
}: ProposalTableProps) {
  return (
    <section className="proposal-table">
      <h3 className="font-display text-lg font-semibold text-bs-primary">
        Tabela financeira
      </h3>
      <p className="mt-1 text-sm text-slate-500">
        Valores estimados com base nos parâmetros informados nesta proposta.
      </p>

      <div className="table-scroll mt-4 overflow-x-auto rounded-2xl border border-slate-200 print:overflow-visible [-webkit-overflow-scrolling:touch]">
        <table className="w-full min-w-[280px] text-xs print:min-w-0 print:text-sm sm:min-w-0 sm:text-sm">
          <thead>
            <tr className="bg-bs-primary text-left text-white">
              <th className="px-2 py-2.5 font-medium print:px-4 print:py-3 sm:px-4 sm:py-3">
                Serviço
              </th>
              <th className="px-2 py-2.5 text-right font-medium print:py-3 sm:py-3">
                Postos
              </th>
              <th className="print-show-cell hidden px-2 py-3 text-right font-medium print:table-cell sm:table-cell">
                Unitário
              </th>
              <th className="px-2 py-2.5 text-right font-medium whitespace-nowrap print:px-4 print:py-3 sm:px-4 sm:py-3">
                Mensal
              </th>
            </tr>
          </thead>
          <tbody>
            {lines.map((line, index) => {
              const service = getServiceById(line.serviceId);
              return (
                <tr
                  key={line.id}
                  className={index % 2 === 0 ? "bg-white" : "bg-slate-50"}
                >
                  <td className="px-2 py-2.5 text-slate-700 print:px-4 print:py-3 sm:px-4 sm:py-3">
                    {service.shortTitle}
                  </td>
                  <td className="px-2 py-2.5 text-right font-medium text-slate-800 print:py-3 sm:py-3">
                    {line.positions || 0}
                  </td>
                  <td className="print-show-cell hidden px-2 py-3 text-right whitespace-nowrap text-slate-600 print:table-cell sm:table-cell">
                    {formatCurrency(line.unitValue)}
                  </td>
                  <td className="px-2 py-2.5 text-right font-semibold whitespace-nowrap text-slate-800 print:px-4 print:py-3 sm:px-4 sm:py-3">
                    {formatCurrency(line.monthlyValue)}
                  </td>
                </tr>
              );
            })}
            <tr className="border-t border-slate-200 bg-slate-50">
              <td
                colSpan={2}
                className="print-hide-cell px-2 py-2.5 font-medium text-slate-600 print:hidden sm:hidden"
              >
                Investimento mensal
              </td>
              <td
                colSpan={3}
                className="print-show-cell hidden px-3 py-3 font-medium text-slate-600 print:table-cell print:px-4 sm:table-cell sm:px-4"
              >
                Investimento mensal
              </td>
              <td className="px-2 py-2.5 text-right font-bold whitespace-nowrap text-bs-primary print:px-4 print:py-3 sm:px-4 sm:py-3">
                {formatCurrency(monthlyValue)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
