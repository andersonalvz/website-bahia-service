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
    <section className={cn("relative", className)}>
      <div
        className={cn(
          "relative w-full overflow-hidden bg-slate-100",
          compact
            ? "aspect-[16/10] min-h-[280px] max-h-[420px] sm:aspect-[21/9] sm:min-h-[260px]"
            : "aspect-[4/3] min-h-[360px] max-h-[720px] sm:aspect-[16/9] lg:aspect-[3076/1376] lg:min-h-[420px]"
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
        <div className="absolute inset-0 bg-gradient-to-t from-bs-primary/85 via-bs-primary/40 to-bs-primary/15" />

        <Container className="absolute inset-0 flex flex-col justify-end pb-6 sm:pb-10 lg:pb-14">
          <div className="max-w-2xl text-white animate-fade-up">
            {eyebrow ? (
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/80">
                {eyebrow}
              </p>
            ) : null}
            <h1
              className={cn(
                "font-display font-bold tracking-tight text-balance",
                compact
                  ? "mt-2 text-2xl sm:text-3xl md:text-4xl"
                  : "mt-2 text-2xl sm:text-4xl md:text-5xl lg:text-6xl"
              )}
            >
              {title}
            </h1>
            {description ? (
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/85 sm:mt-4 sm:text-base animate-fade-up-delay-1">
                {description}
              </p>
            ) : null}
            {actions ? (
              <div className="mt-5 flex flex-wrap gap-3 sm:mt-7 animate-fade-up-delay-2">
                {actions}
              </div>
            ) : null}
          </div>
        </Container>
      </div>
    </section>
  );
}
