import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type HeadingLevel = "h1" | "h2" | "h3" | "h4";

const sizeClasses: Record<HeadingLevel, string> = {
  h1: "text-3xl sm:text-4xl lg:text-5xl",
  h2: "text-2xl sm:text-3xl",
  h3: "text-lg sm:text-xl",
  h4: "text-base sm:text-lg",
};

interface HeadingProps {
  as?: HeadingLevel;
  eyebrow?: string;
  children: ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
  descriptionClassName?: string;
}

export function Heading({
  as = "h2",
  eyebrow,
  children,
  description,
  align = "left",
  className,
  descriptionClassName,
}: HeadingProps) {
  const Tag = as as ElementType;

  return (
    <div className={cn(align === "center" && "text-center", className)}>
      {eyebrow ? (
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-bs-secondary">
          {eyebrow}
        </p>
      ) : null}
      <Tag
        className={cn(
          "font-display font-bold tracking-tight text-bs-primary",
          sizeClasses[as],
          eyebrow && "mt-2"
        )}
      >
        {children}
      </Tag>
      {description ? (
        <p
          className={cn(
            "mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base",
            align === "center" && "mx-auto",
            descriptionClassName
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
