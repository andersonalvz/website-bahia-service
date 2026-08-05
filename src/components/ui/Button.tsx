import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "inverted";
type ButtonSize = "sm" | "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-bs-primary text-white shadow-lg shadow-bs-primary/20 hover:bg-bs-primary/95 focus:ring-bs-secondary",
  secondary:
    "bg-bs-primary/5 text-bs-primary hover:bg-bs-primary/10 focus:ring-bs-secondary",
  ghost: "bg-transparent text-bs-primary hover:bg-bs-primary/5 focus:ring-bs-secondary",
  outline:
    "border border-slate-200 bg-white text-bs-primary hover:bg-slate-50 focus:ring-bs-secondary",
  inverted:
    "bg-white text-bs-primary shadow-none hover:bg-slate-100 focus:ring-white",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "rounded-full px-3 py-1.5 text-xs font-semibold",
  md: "rounded-2xl px-5 py-3 text-sm font-semibold",
  lg: "rounded-2xl px-6 py-3.5 text-sm font-semibold",
};

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
}

type ButtonAsButton = ButtonBaseProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof ButtonBaseProps> & {
    href?: undefined;
  };

type ButtonAsLink = ButtonBaseProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, keyof ButtonBaseProps> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 transition focus:outline-none focus:ring-2 focus:ring-offset-2",
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  if ("href" in props && props.href) {
    const { href, ...linkProps } = props;
    const isExternal = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");

    if (isExternal) {
      const { target, rel, ...anchorProps } = linkProps as ComponentPropsWithoutRef<"a">;
      return (
        <a
          href={href}
          className={classes}
          target={target ?? "_blank"}
          rel={rel ?? "noopener noreferrer"}
          {...anchorProps}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} {...linkProps}>
        {children}
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButton;
  return (
    <button type={buttonProps.type ?? "button"} className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
