import type { Metadata } from "next";
import Image from "next/image";
import { ProposalGenerator } from "@/components/proposal/ProposalGenerator";
import { BRAND } from "@/constants/brand";

export const metadata: Metadata = {
  title: "Gerador de Propostas",
  description:
    "Gere propostas comerciais profissionais da Bahia Service diretamente no navegador.",
  robots: { index: false, follow: false },
};

export default function PropostaPage() {
  return (
    <div className="min-h-dvh w-full max-w-[100vw] overflow-x-hidden">
      <header className="app-chrome no-print border-b border-slate-200/70 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-center px-4 py-3.5 lg:justify-start lg:gap-4 lg:px-6 2xl:max-w-[90rem]">
          <div className="flex min-w-0 items-center justify-center gap-3 lg:justify-start">
            <Image
              src={BRAND.logo}
              alt={BRAND.name}
              width={140}
              height={44}
              className="h-9 w-auto max-w-[70vw] object-contain sm:h-10"
              priority
            />
            <div className="hidden min-w-0 border-l border-slate-200 pl-3 lg:block">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-bs-secondary">
                Área interna
              </p>
              <p className="truncate text-sm font-medium text-bs-primary">
                Gerador de Propostas Comerciais
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="w-full min-w-0 overflow-x-hidden">
        <ProposalGenerator />
      </main>

      <footer className="app-chrome no-print border-t border-slate-200/70 px-4 py-6 text-center text-xs text-slate-500">
        <p className="font-medium text-slate-600">Gerador de Propostas v1.0</p>
        <p className="mt-1">
          Desenvolvido por Anderson Alves | Techiando.
        </p>
      </footer>
    </div>
  );
}
