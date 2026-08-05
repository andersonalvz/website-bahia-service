/** Design tokens extracted from the Proposal Generator visual language. */

export const COLORS = {
  primary: "#1B365D",
  secondary: "#3D85C6",
  accent: "#5BA3D9",
  muted: "#64748B",
  surface: "#F8FAFC",
  background: "#F4F7FB",
  foreground: "#0F172A",
  border: "#E2E8F0",
  white: "#FFFFFF",
} as const;

export const RADIUS = {
  sm: "0.75rem",
  md: "1rem",
  lg: "1.25rem",
  xl: "1.5rem",
  "2xl": "1rem",
  "3xl": "1.5rem",
  full: "9999px",
} as const;

export const SHADOWS = {
  card: "0 10px 40px rgba(27, 54, 93, 0.06)",
  elevated: "0 16px 50px rgba(27, 54, 93, 0.08)",
  button: "0 10px 15px -3px rgba(27, 54, 93, 0.2)",
  focus: "0 0 0 3px rgba(61, 133, 198, 0.18)",
} as const;

export const SPACING = {
  sectionY: "py-16 sm:py-20 lg:py-24",
  sectionGap: "gap-12 lg:gap-16",
  container: "mx-auto max-w-7xl px-4 lg:px-6",
} as const;

export const TRANSITIONS = {
  fast: "150ms ease",
  base: "200ms ease",
  slow: "300ms ease",
} as const;

export const TYPOGRAPHY = {
  eyebrow:
    "text-[11px] font-semibold uppercase tracking-[0.22em] text-bs-secondary",
  heading: "font-display font-bold tracking-tight text-bs-primary",
  body: "text-sm leading-relaxed text-slate-600",
  muted: "text-sm text-slate-500",
} as const;
