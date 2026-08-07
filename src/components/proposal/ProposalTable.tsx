import { getServiceById } from "@/data/services";
import { formatCurrency } from "@/lib/currency";
import type { ProposalLineTotal } from "@/types/proposal";

interface ProposalTableProps {
  lines: ProposalLineTotal[];
  monthlyValue: number;
  annualValue: number;
  contractTerm: string;
}

export function ProposalTable({
  lines,
  monthlyValue,
  annualValue,
  contractTerm,
}: ProposalTableProps) {
  return (
    <section className="proposal-table">
      <h3 className="font-display text-lg font-semibold text-bs-primary">
        Tabela financeira
      </h3>
      <p className="mt-1 text-sm text-slate-500">
        Valores estimados com base nos parâmetros informados nesta proposta.
      </p>

      <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200">
        <table className="w-full min-w-[300px] text-sm sm:min-w-0">
          <thead>
            <tr className="bg-bs-primary text-left text-white">
              <th className="px-3 py-3 font-medium sm:px-4">Serviço</th>
              <th className="px-2 py-3 text-right font-medium">Postos</th>
              <th className="hidden px-2 py-3 text-right font-medium sm:table-cell">
                Unitário
              </th>
              <th className="px-3 py-3 text-right font-medium whitespace-nowrap sm:px-4">
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
                  <td className="px-3 py-3 text-slate-700 sm:px-4">
                    {service.shortTitle}
                  </td>
                  <td className="px-2 py-3 text-right font-medium text-slate-800">
                    {line.positions || 0}
                  </td>
                  <td className="hidden px-2 py-3 text-right whitespace-nowrap text-slate-600 sm:table-cell">
                    {formatCurrency(line.unitValue)}
                  </td>
                  <td className="px-3 py-3 text-right font-semibold whitespace-nowrap text-slate-800 sm:px-4">
                    {formatCurrency(line.monthlyValue)}
                  </td>
                </tr>
              );
            })}
            <tr className="border-t border-slate-200 bg-slate-50">
              <td
                colSpan={2}
                className="px-3 py-3 font-medium text-slate-600 sm:hidden"
              >
                Investimento mensal
              </td>
              <td
                colSpan={3}
                className="hidden px-3 py-3 font-medium text-slate-600 sm:table-cell sm:px-4"
              >
                Investimento mensal
              </td>
              <td className="px-3 py-3 text-right font-bold whitespace-nowrap text-bs-primary sm:px-4">
                {formatCurrency(monthlyValue)}
              </td>
            </tr>
            <tr className="bg-white">
              <td
                colSpan={2}
                className="px-3 py-3 font-medium text-slate-600 sm:hidden"
              >
                Investimento anual
              </td>
              <td
                colSpan={3}
                className="hidden px-3 py-3 font-medium text-slate-600 sm:table-cell sm:px-4"
              >
                Investimento anual
              </td>
              <td className="px-3 py-3 text-right font-bold whitespace-nowrap text-bs-primary sm:px-4">
                {formatCurrency(annualValue)}
              </td>
            </tr>
            <tr className="bg-slate-50">
              <td
                colSpan={2}
                className="px-3 py-3 font-medium text-slate-600 sm:hidden"
              >
                Prazo do contrato
              </td>
              <td
                colSpan={3}
                className="hidden px-3 py-3 font-medium text-slate-600 sm:table-cell sm:px-4"
              >
                Prazo do contrato
              </td>
              <td className="px-3 py-3 text-right font-semibold whitespace-nowrap text-slate-800 sm:px-4">
                {contractTerm || "—"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
