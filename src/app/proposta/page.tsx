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
    <div className="min-h-screen">
      <header className="app-chrome no-print border-b border-slate-200/70 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 lg:px-6">
          <div className="flex items-center gap-3">
            <Image
              src={BRAND.logo}
              alt={BRAND.name}
              width={140}
              height={44}
              className="h-10 w-auto object-contain"
              priority
            />
            <div className="hidden border-l border-slate-200 pl-3 sm:block">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-bs-secondary">
                Área interna
              </p>
              <p className="text-sm font-medium text-bs-primary">
                Gerador de Propostas Comerciais
              </p>
            </div>
          </div>

          <p className="text-xs text-slate-500 sm:text-sm">
            Sem login · Funciona no navegador
          </p>
        </div>
      </header>

      <main>
        <ProposalGenerator />
      </main>

      <footer className="app-chrome no-print border-t border-slate-200/70 py-6 text-center text-xs text-slate-500">
        <p className="font-medium text-slate-600">Gerador de Propostas v1.0</p>
        <p className="mt-1">
          Desenvolvido por Anderson Alves | Techiando.
        </p>
      </footer>
    </div>
  );
}
