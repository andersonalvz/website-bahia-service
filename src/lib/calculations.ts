import type {
  ProposalFormData,
  ProposalLineTotal,
  ProposalTotals,
} from "@/types/proposal";

export function calculateLineMonthly(
  positions: number,
  unitValue: number
): number {
  const safePositions = Math.max(0, positions || 0);
  const safeUnit = Math.max(0, unitValue || 0);
  return safePositions * safeUnit;
}

export function getProposalTotals(data: ProposalFormData): ProposalTotals {
  const lines: ProposalLineTotal[] = data.services.map((line) => {
    const monthlyValue = calculateLineMonthly(line.positions, line.unitValue);
    return {
      id: line.id,
      serviceId: line.serviceId,
      positions: line.positions,
      unitValue: line.unitValue,
      monthlyValue,
    };
  });

  const monthlyValue = lines.reduce((sum, line) => sum + line.monthlyValue, 0);
  const totalPositions = lines.reduce((sum, line) => sum + (line.positions || 0), 0);

  return {
    lines,
    monthlyValue,
    annualValue: monthlyValue * 12,
    totalPositions,
  };
}
