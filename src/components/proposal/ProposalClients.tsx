import Image from "next/image";
import { CLIENTS_SECTION } from "@/data/clients";

export function ProposalClients() {
  return (
    <section className="proposal-clients my-6">
      <h3 className="font-display text-lg font-semibold text-bs-primary">
        {CLIENTS_SECTION.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        {CLIENTS_SECTION.description}
      </p>

      <div className="clients-logos-frame mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 sm:p-4">
        <div className="relative mx-auto aspect-[4/3] w-full max-w-2xl max-h-[300px] sm:max-h-[380px] md:max-h-[420px] lg:max-h-[460px]">
          <Image
            src={CLIENTS_SECTION.image}
            alt={CLIENTS_SECTION.imageAlt}
            fill
            className="object-contain object-center"
            sizes="(max-width: 768px) 100vw, 640px"
            priority
          />
        </div>
      </div>
    </section>
  );
}
