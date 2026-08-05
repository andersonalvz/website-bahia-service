"use client";

import { useState } from "react";
import { createDefaultProposal } from "@/data/defaults";
import { getProposalTotals } from "@/lib/calculations";
import type { ProposalFormData } from "@/types/proposal";
import { ProposalForm } from "./ProposalForm";
import { ProposalPreview } from "./ProposalPreview";

export function ProposalGenerator() {
  const [data, setData] = useState<ProposalFormData>(() => createDefaultProposal());
  const totals = getProposalTotals(data);

  function handleChange<K extends keyof ProposalFormData>(
    field: K,
    value: ProposalFormData[K]
  ) {
    setData((current) => ({ ...current, [field]: value }));
  }

  function handlePrint() {
    window.print();
  }

  return (
    <div className="proposal-layout mx-auto grid max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[minmax(320px,400px)_1fr] lg:gap-8 lg:px-6 lg:py-8">
      <ProposalForm
        data={data}
        totals={totals}
        onChange={handleChange}
        onPrint={handlePrint}
      />
      <ProposalPreview data={data} totals={totals} />
    </div>
  );
}
