export interface NavItem {
  label: string;
  href: string;
}

/** Public navigation — `/proposta` is intentionally excluded. */
export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Sobre", href: "/sobre" },
  { label: "Serviços", href: "/servicos" },
  { label: "Clientes", href: "/clientes" },
  { label: "Contato", href: "/contato" },
];

export const FOOTER_NAV_ITEMS: NavItem[] = NAV_ITEMS.filter(
  (item) => item.href !== "/"
);
