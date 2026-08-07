"use client";

import { CONTRACT_TERM_OPTIONS } from "@/constants/commercial";
import { createEmptyServiceLine } from "@/data/defaults";
import { SERVICE_OPTIONS } from "@/data/services";
import { formatCurrency } from "@/lib/currency";
import type {
  ProposalFormData,
  ProposalServiceLine,
  ProposalTotals,
} from "@/types/proposal";
import type { ServiceId } from "@/types/service";
import { CurrencyInput } from "./CurrencyInput";

interface ProposalFormProps {
  data: ProposalFormData;
  totals: ProposalTotals;
  onChange: <K extends keyof ProposalFormData>(
    field: K,
    value: ProposalFormData[K]
  ) => void;
  onPrint: () => void;
}

export function ProposalForm({
  data,
  totals,
  onChange,
  onPrint,
}: ProposalFormProps) {
  function updateServiceLine<K extends keyof ProposalServiceLine>(
    lineId: string,
    field: K,
    value: ProposalServiceLine[K]
  ) {
    onChange(
      "services",
      data.services.map((line) =>
        line.id === lineId ? { ...line, [field]: value } : line
      )
    );
  }

  function addServiceLine() {
    const used = new Set(data.services.map((line) => line.serviceId));
    const nextService =
      SERVICE_OPTIONS.find((option) => !used.has(option.value))?.value ??
      "limpeza";
    onChange("services", [...data.services, createEmptyServiceLine(nextService)]);
  }

  function removeServiceLine(lineId: string) {
    if (data.services.length <= 1) return;
    onChange(
      "services",
      data.services.filter((line) => line.id !== lineId)
    );
  }

  return (
    <aside className="no-print flex h-full flex-col md:sticky md:top-4 md:max-h-[calc(100vh-2rem)] md:self-start">
      <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-[0_10px_40px_rgba(27,54,93,0.06)] sm:p-6 md:max-h-[calc(100vh-2rem)] md:overflow-y-auto">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-bs-secondary">
            Gerador
          </p>
          <h2 className="mt-1 font-display text-2xl font-bold text-bs-primary">
            Dados da proposta
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Inclua um ou mais serviços e acompanhe o preview em tempo real.
          </p>
        </div>

        <form
          className="space-y-6"
          onSubmit={(event) => {
            event.preventDefault();
            onPrint();
          }}
        >
          <fieldset className="space-y-4">
            <legend className="text-sm font-semibold text-bs-primary">
              Dados do cliente
            </legend>

            <Field
              id="companyName"
              label="Nome da empresa"
              value={data.companyName}
              onChange={(value) => onChange("companyName", value)}
              required
            />

            <Field
              id="contactName"
              label="Responsável"
              value={data.contactName}
              onChange={(value) => onChange("contactName", value)}
              required
            />

            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2">
              <Field
                id="city"
                label="Cidade"
                value={data.city}
                onChange={(value) => onChange("city", value)}
                required
              />

              <div className="space-y-1.5">
                <label
                  htmlFor="date"
                  className="text-sm font-medium text-slate-700"
                >
                  Data <span className="text-bs-secondary">*</span>
                </label>
                <input
                  id="date"
                  type="date"
                  value={data.date}
                  onChange={(event) => onChange("date", event.target.value)}
                  className="field-input min-w-0"
                  required
                />
              </div>
            </div>
          </fieldset>

          <fieldset className="space-y-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
              <legend className="text-sm font-semibold text-bs-primary">
                Serviços
              </legend>
              <button
                type="button"
                onClick={addServiceLine}
                className="inline-flex min-h-10 w-full items-center justify-center rounded-full bg-bs-primary/5 px-3 py-2 text-xs font-semibold text-bs-primary transition hover:bg-bs-primary/10 sm:w-auto"
              >
                + Adicionar serviço
              </button>
            </div>

            <div className="space-y-4">
              {data.services.map((line, index) => (
                <div
                  key={line.id}
                  className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50/70 p-3.5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="min-w-0 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Serviço {index + 1}
                      {index === 0 ? (
                        <span className="text-slate-400"> · principal</span>
                      ) : null}
                    </p>
                    {data.services.length > 1 ? (
                      <button
                        type="button"
                        onClick={() => removeServiceLine(line.id)}
                        className="inline-flex min-h-10 shrink-0 items-center px-2 text-xs font-medium text-red-600 hover:text-red-700"
                      >
                        Remover
                      </button>
                    ) : null}
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor={`serviceId-${line.id}`}
                      className="text-sm font-medium text-slate-700"
                    >
                      Tipo de serviço <span className="text-bs-secondary">*</span>
                    </label>
                    <select
                      id={`serviceId-${line.id}`}
                      value={line.serviceId}
                      onChange={(event) =>
                        updateServiceLine(
                          line.id,
                          "serviceId",
                          event.target.value as ServiceId
                        )
                      }
                      className="field-input"
                      required
                    >
                      {SERVICE_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2">
                    <div className="space-y-1.5">
                      <label
                        htmlFor={`positions-${line.id}`}
                        className="text-sm font-medium text-slate-700"
                      >
                        Quantidade de postos{" "}
                        <span className="text-bs-secondary">*</span>
                      </label>
                      <input
                        id={`positions-${line.id}`}
                        type="number"
                        min={1}
                        step={1}
                        value={line.positions}
                        onChange={(event) =>
                          updateServiceLine(
                            line.id,
                            "positions",
                            Number(event.target.value) || 0
                          )
                        }
                        className="field-input min-w-0"
                        required
                      />
                    </div>

                    <CurrencyInput
                      id={`unitValue-${line.id}`}
                      label="Valor unitário"
                      value={line.unitValue}
                      onChange={(value) =>
                        updateServiceLine(line.id, "unitValue", value)
                      }
                      required
                    />
                  </div>

                  <p className="text-xs text-slate-500">
                    Subtotal:{" "}
                    <span className="font-semibold text-bs-primary">
                      {formatCurrency(
                        totals.lines.find((item) => item.id === line.id)
                          ?.monthlyValue ?? 0
                      )}
                    </span>
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="contractTerm"
                className="text-sm font-medium text-slate-700"
              >
                Prazo do contrato <span className="text-bs-secondary">*</span>
              </label>
              <select
                id="contractTerm"
                value={data.contractTerm}
                onChange={(event) => onChange("contractTerm", event.target.value)}
                className="field-input"
                required
              >
                {CONTRACT_TERM_OPTIONS.map((term) => (
                  <option key={term} value={term}>
                    {term}
                  </option>
                ))}
              </select>
            </div>
          </fieldset>

          <div className="rounded-2xl border border-bs-primary/10 bg-gradient-to-br from-slate-50 to-blue-50/60 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-bs-secondary">
              Cálculo automático
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2">
              <TotalCard label="Valor mensal" value={totals.monthlyValue} />
              <TotalCard label="Valor anual" value={totals.annualValue} />
            </div>
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-bs-primary px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-bs-primary/20 transition hover:bg-bs-primary/95 focus:outline-none focus:ring-2 focus:ring-bs-secondary focus:ring-offset-2"
          >
            <PrinterIcon />
            Gerar PDF
          </button>
        </form>
      </div>
    </aside>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  required,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-sm font-medium text-slate-700">
        {label}
        {required ? <span className="text-bs-secondary"> *</span> : null}
      </label>
      <input
        id={id}
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="field-input"
        required={required}
      />
    </div>
  );
}

function TotalCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="min-w-0 rounded-xl bg-white/80 px-3.5 py-3 ring-1 ring-slate-200/80">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-0.5 break-words font-display text-base font-bold text-bs-primary sm:text-lg">
        {formatCurrency(value)}
      </p>
    </div>
  );
}

function PrinterIcon() {
  return (
    <svg
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 9V4h12v5M6 14H4a2 2 0 01-2-2v-1a2 2 0 012-2h16a2 2 0 012 2v1a2 2 0 01-2 2h-2m-12 0h12v6H6v-6z"
      />
    </svg>
  );
}
