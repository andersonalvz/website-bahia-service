import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

interface TextareaProps extends ComponentPropsWithoutRef<"textarea"> {
  label: string;
  id: string;
}

export function Textarea({
  label,
  id,
  className,
  required,
  rows = 4,
  ...props
}: TextareaProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-sm font-medium text-slate-700">
        {label}
        {required ? <span className="text-bs-secondary"> *</span> : null}
      </label>
      <textarea
        id={id}
        required={required}
        rows={rows}
        className={cn("field-input min-h-[120px] resize-y", className)}
        {...props}
      />
    </div>
  );
}
