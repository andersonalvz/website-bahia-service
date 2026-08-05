interface StatCardProps {
  value: string;
  label: string;
}

export function StatCard({ value, label }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white px-5 py-6 text-center shadow-[0_10px_40px_rgba(27,54,93,0.06)]">
      <p className="font-display text-3xl font-bold text-bs-primary sm:text-4xl">
        {value}
      </p>
      <p className="mt-2 text-sm font-medium text-slate-500">{label}</p>
    </div>
  );
}
