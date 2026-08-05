import type { ServiceId } from "./service";

/** Linha de serviço na proposta (permite múltiplos serviços). */
export interface ProposalServiceLine {
  id: string;
  serviceId: ServiceId;
  positions: number;
  unitValue: number;
}

/**
 * Estado do formulário / proposta no navegador.
 * Preparado para evolução SaaS: campos opcionais de persistência
 * (id, number, status) podem ser preenchidos quando houver backend.
 */
export interface ProposalFormData {
  companyName: string;
  contactName: string;
  city: string;
  date: string;
  services: ProposalServiceLine[];
  contractTerm: string;
}

export type ProposalStatus =
  | "draft"
  | "generated"
  | "sent"
  | "accepted"
  | "rejected";

/** Modelo futuro para persistência em banco / histórico. */
export interface ProposalRecord extends ProposalFormData {
  id?: string;
  proposalNumber?: string;
  status?: ProposalStatus;
  monthlyValue?: number;
  annualValue?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProposalLineTotal {
  id: string;
  serviceId: ServiceId;
  positions: number;
  unitValue: number;
  monthlyValue: number;
}

export interface ProposalTotals {
  lines: ProposalLineTotal[];
  monthlyValue: number;
  annualValue: number;
  totalPositions: number;
}
