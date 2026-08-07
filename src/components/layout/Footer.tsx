import Image from "next/image";
import Link from "next/link";
import { BRAND, getWhatsAppUrl } from "@/constants/brand";
import { FOOTER_NAV_ITEMS } from "@/data/navigation";
import { Container } from "@/components/ui/Container";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200/70 bg-white">
      <Container className="py-12 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Image
              src={BRAND.logo}
              alt={BRAND.name}
              width={160}
              height={50}
              className="h-12 w-auto object-contain"
            />
            <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-600">
              {BRAND.tagline}. Terceirização de mão de obra e gestão de facilities
              com excelência operacional em toda a Bahia.
            </p>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-bs-secondary">
              Navegação
            </p>
            <ul className="mt-4 space-y-2">
              {FOOTER_NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-600 transition hover:text-bs-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-bs-secondary">
              Contato
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li>
                <a
                  href={`tel:${BRAND.contact.phones[0].replace(/\D/g, "")}`}
                  className="break-words transition hover:text-bs-primary"
                >
                  {BRAND.contact.phones.join(" · ")}
                </a>
              </li>
              <li>
                <a
                  href={getWhatsAppUrl(
                    "Olá! Gostaria de saber mais sobre os serviços da Bahia Service."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-bs-primary"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${BRAND.contact.email}`}
                  className="break-all transition hover:text-bs-primary"
                >
                  {BRAND.contact.email}
                </a>
              </li>
              <li className="leading-relaxed break-words">{BRAND.contact.address}</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-slate-200/80 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p className="break-words">
            © {year} {BRAND.legalName}
          </p>
          <p>
            Desenvolvido por{" "}
            <span className="font-medium text-slate-600">
              Anderson Alves | Techiando
            </span>
          </p>
        </div>
      </Container>
    </footer>
  );
}
