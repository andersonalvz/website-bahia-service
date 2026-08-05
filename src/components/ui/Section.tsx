import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./Container";

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  containerClassName?: string;
  tone?: "default" | "muted" | "primary";
}

const toneClasses = {
  default: "",
  muted: "bg-slate-50/80",
  primary: "bg-bs-primary text-white",
} as const;

export function Section({
  children,
  id,
  className,
  containerClassName,
  tone = "default",
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn("py-16 sm:py-20 lg:py-24", toneClasses[tone], className)}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
