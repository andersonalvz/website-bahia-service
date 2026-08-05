import { cn } from "@/lib/cn";

interface DividerProps {
  className?: string;
}

export function Divider({ className }: DividerProps) {
  return <hr className={cn("border-slate-200/80", className)} />;
}
