export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number.isFinite(value) ? value : 0);
}

/** Remove tudo que não é dígito e interpreta como centavos (máscara BRL). */
export function parseCurrencyInput(raw: string): number {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return 0;
  return Number(digits) / 100;
}

export function formatCurrencyInput(value: number): string {
  return formatCurrency(value);
}
