import Image from "next/image";
import Link from "next/link";
import type { ServiceIconName } from "@/types/service";
import { ServiceIcon } from "./ServiceIcon";

interface FeatureCardProps {
  title: string;
  description: string;
  image: string;
  icon: ServiceIconName;
  href: string;
  ctaLabel?: string;
}

export function FeatureCard({
  title,
  description,
  image,
  icon,
  href,
  ctaLabel = "Saiba mais",
}: FeatureCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_10px_40px_rgba(27,54,93,0.06)] transition hover:shadow-[0_16px_50px_rgba(27,54,93,0.08)]">
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <Image
          src={image}
          alt={title}
          fill
          quality={90}
          className="object-cover object-center transition duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bs-primary/70 via-bs-primary/20 to-transparent" />
        <span className="absolute bottom-4 left-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-white backdrop-blur-sm">
          <ServiceIcon name={icon} className="h-5 w-5" />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="font-display text-lg font-semibold text-bs-primary">
          {title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 line-clamp-3">
          {description}
        </p>
        <Link
          href={href}
          className="mt-4 inline-flex min-h-10 items-center text-sm font-semibold text-bs-secondary transition hover:text-bs-primary"
        >
          {ctaLabel} →
        </Link>
      </div>
    </article>
  );
}
