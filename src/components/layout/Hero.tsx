import Image from "next/image";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";

interface HeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  image: string;
  imageAlt?: string;
  actions?: ReactNode;
  compact?: boolean;
  className?: string;
}

export function Hero({
  eyebrow,
  title,
  description,
  image,
  imageAlt = "",
  actions,
  compact = false,
  className,
}: HeroProps) {
  return (
    <section className={cn("relative overflow-hidden", className)}>
      {/* Aspect matches company-hero.png (3076×1376) to avoid distortion */}
      <div
        className={cn(
          "relative w-full bg-slate-100",
          compact
            ? "aspect-[21/9] min-h-[240px] max-h-[420px]"
            : "aspect-[3076/1376] min-h-[280px] max-h-[720px]"
        )}
      >
        <Image
          src={image}
          alt={imageAlt || title}
          fill
          priority
          quality={92}
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bs-primary/80 via-bs-primary/35 to-bs-primary/10" />

        <Container className="absolute inset-0 flex flex-col justify-end pb-8 sm:pb-12 lg:pb-14">
          <div className="max-w-2xl text-white animate-fade-up">
            {eyebrow ? (
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/80">
                {eyebrow}
              </p>
            ) : null}
            <h1
              className={cn(
                "font-display font-bold tracking-tight",
                compact
                  ? "mt-2 text-3xl sm:text-4xl"
                  : "mt-3 text-3xl sm:text-5xl lg:text-6xl"
              )}
            >
              {title}
            </h1>
            {description ? (
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/85 sm:mt-4 sm:text-base animate-fade-up-delay-1">
                {description}
              </p>
            ) : null}
            {actions ? (
              <div className="mt-7 flex flex-wrap gap-3 animate-fade-up-delay-2">
                {actions}
              </div>
            ) : null}
          </div>
        </Container>
      </div>
    </section>
  );
}
