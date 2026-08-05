import type { ServiceIconName } from "@/types/service";

interface ServiceIconProps {
  name: ServiceIconName;
  className?: string;
}

export function ServiceIcon({ name, className = "h-6 w-6" }: ServiceIconProps) {
  const common = {
    className,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    viewBox: "0 0 24 24",
    "aria-hidden": true as const,
  };

  switch (name) {
    case "shield":
      return (
        <svg {...common}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3z"
          />
        </svg>
      );
    case "sparkles":
      return (
        <svg {...common}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 12l2-2 2 2-2 2-2-2zm7-7l1.5 3.5L17 10l-3.5 1.5L12 15l-1.5-3.5L7 10l3.5-1.5L12 5zm5 9l2 2-2 2-2-2 2-2z"
          />
        </svg>
      );
    case "leaf":
      return (
        <svg {...common}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 19c8 0 12-5 14-14-9 2-14 6-14 14zm0 0c2-3 5-5 9-6"
          />
        </svg>
      );
    default:
      return null;
  }
}
