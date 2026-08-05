import { Button } from "./Button";

interface CTAProps {
  eyebrow?: string;
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  primaryExternal?: boolean;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export function CTA({
  eyebrow = "Fale conosco",
  title,
  description,
  primaryLabel,
  primaryHref,
  primaryExternal = false,
  secondaryLabel,
  secondaryHref,
}: CTAProps) {
  return (
    <div className="rounded-3xl bg-[#1B365D] px-6 py-10 sm:px-10 sm:py-12">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#5BA3D9]">
        {eyebrow}
      </p>
      <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
        {title}
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base">
        {description}
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button
          href={primaryHref}
          variant="inverted"
          {...(primaryExternal
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {primaryLabel}
        </Button>
        {secondaryLabel && secondaryHref ? (
          <Button
            href={secondaryHref}
            variant="outline"
            className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"
          >
            {secondaryLabel}
          </Button>
        ) : null}
      </div>
    </div>
  );
}
