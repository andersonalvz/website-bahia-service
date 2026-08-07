import type { ServiceIconName } from "@/types/service";
import { ServiceIcon } from "./ServiceIcon";

interface ProposalServiceProps {
  title: string;
  description: string;
  image: string;
  icon: ServiceIconName;
  serviceLabels: string[];
}

export function ProposalService({
  title,
  description,
  image,
  icon,
  serviceLabels,
}: ProposalServiceProps) {
  return (
    <section className="proposal-service space-y-5">
      <div className="overflow-hidden rounded-2xl">
        <div className="proposal-service-hero relative w-full bg-slate-100">
          {/*
            img em fluxo + data-src para o motor de print (mobile = desktop).
            Sem next/image fill (absoluto), que falha no WebKit print.
          */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={title}
            data-print-image="service-hero"
            className="service-hero-image block aspect-[4/3] h-auto w-full object-cover object-center sm:aspect-[16/9] lg:aspect-[21/9]"
          />
          <div className="proposal-service-hero-overlay absolute inset-0 bg-gradient-to-t from-bs-primary/70 via-bs-primary/20 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3 flex items-end gap-2.5 text-white sm:bottom-4 sm:left-4 sm:right-4 sm:gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm sm:h-10 sm:w-10">
              <ServiceIcon name={icon} className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/80 sm:text-[11px]">
                {serviceLabels.length > 1
                  ? "Serviços propostos"
                  : "Serviço proposto"}
              </p>
              <h2 className="font-display text-lg font-bold leading-tight break-words sm:text-xl md:text-2xl">
                {title}
              </h2>
            </div>
          </div>
        </div>
      </div>

      {serviceLabels.length > 1 ? (
        <div className="flex flex-wrap gap-2">
          {serviceLabels.map((label) => (
            <span
              key={label}
              className="rounded-full bg-bs-primary/5 px-3 py-1 text-xs font-semibold text-bs-primary"
            >
              {label}
            </span>
          ))}
        </div>
      ) : null}

      <div>
        <h3 className="font-display text-lg font-semibold text-bs-primary">
          Descrição do serviço
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          {description}
        </p>
      </div>
    </section>
  );
}
