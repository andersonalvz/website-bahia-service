import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface BadgeProps {
  children: ReactNode;
  className?: string;
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-bs-primary/5 px-3 py-1 text-xs font-semibold text-bs-primary",
        className
      )}
    >
      {children}
    </span>
  );
}
