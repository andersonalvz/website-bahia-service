import type { ReactNode } from "react";
import { Section } from "@/components/ui/Section";

interface SectionWrapperProps {
  children: ReactNode;
  id?: string;
  className?: string;
  tone?: "default" | "muted" | "primary";
}

/** Alias around Section for layout composition. */
export function SectionWrapper({
  children,
  id,
  className,
  tone = "default",
}: SectionWrapperProps) {
  return (
    <Section id={id} className={className} tone={tone}>
      {children}
    </Section>
  );
}
