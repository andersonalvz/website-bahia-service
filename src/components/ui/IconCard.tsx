import type { ReactNode } from "react";
import { Card } from "./Card";

interface IconCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export function IconCard({ icon, title, description }: IconCardProps) {
  return (
    <Card className="h-full">
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-bs-primary/5 text-bs-primary">
        {icon}
      </span>
      <h3 className="mt-4 font-display text-lg font-semibold text-bs-primary">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p>
    </Card>
  );
}
