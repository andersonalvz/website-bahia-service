import Image from "next/image";
import { SERVICES } from "@/data/services";
import { Button } from "@/components/ui/Button";
import { ServiceIcon } from "@/components/ui/ServiceIcon";

export function ServiceDetailList() {
  return (
    <div className="space-y-10">
      {SERVICES.map((service) => (
        <article
          key={service.id}
          id={service.id}
          className="scroll-mt-28 overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_10px_40px_rgba(27,54,93,0.06)]"
        >
          <div className="grid lg:grid-cols-2">
            <div className="relative aspect-[21/9] bg-slate-100 lg:aspect-auto lg:min-h-[320px]">
              <Image
                src={service.image}
                alt={service.title}
                fill
                quality={90}
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bs-primary/70 via-bs-primary/20 to-transparent" />
              <div className="absolute bottom-4 left-4 flex items-center gap-3 text-white">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm">
                  <ServiceIcon name={service.icon} className="h-5 w-5" />
                </span>
                <p className="font-display text-xl font-bold">{service.shortTitle}</p>
              </div>
            </div>

            <div className="flex flex-col p-6 sm:p-8">
              <h2 className="font-display text-2xl font-bold text-bs-primary">
                {service.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {service.description}
              </p>

              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                  <h3 className="font-display text-base font-semibold text-bs-primary">
                    Benefícios
                  </h3>
                  <ul className="mt-2 space-y-2">
                    {service.benefits.slice(0, 3).map((benefit) => (
                      <li
                        key={benefit}
                        className="flex gap-2 text-sm leading-relaxed text-slate-600"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-bs-secondary" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-display text-base font-semibold text-bs-primary">
                    Diferenciais
                  </h3>
                  <ul className="mt-2 space-y-2">
                    {service.differentials.slice(0, 3).map((item) => (
                      <li
                        key={item}
                        className="flex gap-2 text-sm leading-relaxed text-slate-600"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-bs-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-auto pt-6">
                <Button href="/contato">Solicitar proposta</Button>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
