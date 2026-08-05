import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface CardProps {
  children: ReactNode;
  className?: string;
  padded?: boolean;
}

export function Card({ children, className, padded = true }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-slate-200/80 bg-white shadow-[0_10px_40px_rgba(27,54,93,0.06)]",
        padded && "p-5 sm:p-6",
        className
      )}
    >
      {children}
    </div>
  );
}
