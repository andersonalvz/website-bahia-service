import { COMMERCIAL_CONDITIONS } from "@/constants/commercial";

export function ProposalConditions() {
  return (
    <section className="proposal-conditions">
      <h3 className="font-display text-lg font-semibold text-bs-primary">
        Condições comerciais
      </h3>
      <ol className="mt-3 space-y-2">
        {COMMERCIAL_CONDITIONS.map((condition, index) => (
          <li
            key={condition}
            className="flex gap-3 text-sm leading-relaxed text-slate-600"
          >
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-bs-primary/10 text-[11px] font-semibold text-bs-primary">
              {index + 1}
            </span>
            {condition}
          </li>
        ))}
      </ol>
    </section>
  );
}
