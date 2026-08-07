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
        className="field-input min-w-0"
      />
    </div>
  );
}
