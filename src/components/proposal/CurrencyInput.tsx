"use client";

import { formatCurrencyInput, parseCurrencyInput } from "@/lib/currency";

interface CurrencyInputProps {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  required?: boolean;
}

export function CurrencyInput({
  id,
  label,
  value,
  onChange,
  required,
}: CurrencyInputProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-sm font-medium text-slate-700">
        {label}
        {required ? <span className="text-bs-secondary"> *</span> : null}
      </label>
      <input
        id={id}
        type="text"
        inputMode="numeric"
        value={formatCurrencyInput(value)}
        onChange={(event) => onChange(parseCurrencyInput(event.target.value))}
        className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-bs-secondary focus:ring-2 focus:ring-bs-secondary/20"
      />
    </div>
  );
}
