import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface SelectProps extends ComponentPropsWithoutRef<"select"> {
  label: string;
  id: string;
  children: ReactNode;
}

export function Select({
  label,
  id,
  className,
  required,
  children,
  ...props
}: SelectProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-sm font-medium text-slate-700">
        {label}
        {required ? <span className="text-bs-secondary"> *</span> : null}
      </label>
      <select
        id={id}
        required={required}
        className={cn("field-input", className)}
        {...props}
      >
        {children}
      </select>
    </div>
  );
}
