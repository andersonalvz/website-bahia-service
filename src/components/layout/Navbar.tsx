"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BRAND } from "@/constants/brand";
import { NAV_ITEMS } from "@/data/navigation";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-md">
      <Container className="flex items-center justify-between gap-4 py-3.5">
        <Link href="/" className="flex shrink-0 items-center gap-3" onClick={() => setOpen(false)}>
          <Image
            src={BRAND.logo}
            alt={BRAND.name}
            width={140}
            height={44}
            className="h-10 w-auto object-contain"
            priority
          />
          <div className="hidden border-l border-slate-200 pl-3 lg:block">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-bs-secondary">
              Facilities
            </p>
            <p className="text-sm font-medium text-bs-primary">{BRAND.tagline}</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Principal">
          {NAV_ITEMS.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm font-medium transition",
                  active
                    ? "bg-bs-primary/5 text-bs-primary"
                    : "text-slate-600 hover:bg-slate-50 hover:text-bs-primary"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button href="/contato" size="sm" className="hidden min-h-10 md:inline-flex">
            Fale conosco
          </Button>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-bs-primary md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </Container>

      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-slate-200/70 bg-white md:hidden"
        >
          <Container className="flex flex-col gap-1 py-3">
            {NAV_ITEMS.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-xl px-3 py-3 text-sm font-medium",
                    active
                      ? "bg-bs-primary/5 text-bs-primary"
                      : "text-slate-600 hover:bg-slate-50"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <Button href="/contato" className="mt-2 w-full" onClick={() => setOpen(false)}>
              Fale conosco
            </Button>
          </Container>
        </div>
      ) : null}
    </header>
  );
}

function MenuIcon() {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
