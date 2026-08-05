import { todayISODate } from "@/lib/dates";
import type { ProposalFormData } from "@/types/proposal";
import type { ServiceId } from "@/types/service";

let lineSequence = 0;

export function createLineId() {
  lineSequence += 1;
  return `svc-${lineSequence}`;
}

/** Dados de exemplo para demonstração imediata. */
export function createDefaultProposal(): ProposalFormData {
  return {
    companyName: "Grupo Atlântico Empreendimentos S.A.",
    contactName: "Carlos Eduardo Mendes",
    city: "Salvador",
    date: todayISODate(),
    services: [
      {
        id: "svc-default-1",
        serviceId: "portaria",
        positions: 5,
        unitValue: 4850,
      },
    ],
    contractTerm: "12 meses",
  };
}

export function createEmptyServiceLine(serviceId: ServiceId = "limpeza") {
  return {
    id: createLineId(),
    serviceId,
    positions: 1,
    unitValue: 3500,
  };
}
