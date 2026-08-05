import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  label: string;
  id: string;
}

export function Input({ label, id, className, required, ...props }: InputProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-sm font-medium text-slate-700">
        {label}
        {required ? <span className="text-bs-secondary"> *</span> : null}
      </label>
      <input
        id={id}
        required={required}
        className={cn("field-input", className)}
        {...props}
      />
    </div>
  );
}
