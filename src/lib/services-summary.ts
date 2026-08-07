import { getServiceById, SERVICE_SECTION_IMAGE } from "@/data/services";
import type { ProposalServiceLine } from "@/types/proposal";
import type { ServiceContent } from "@/types/service";

function joinList(items: string[]): string {
  if (items.length <= 1) return items[0] ?? "";
  if (items.length === 2) return `${items[0]} e ${items[1]}`;
  return `${items.slice(0, -1).join(", ")} e ${items[items.length - 1]}`;
}

export function getSelectedServices(
  lines: ProposalServiceLine[]
): ServiceContent[] {
  const seen = new Set<string>();
  const services: ServiceContent[] = [];

  for (const line of lines) {
    if (seen.has(line.serviceId)) continue;
    seen.add(line.serviceId);
    services.push(getServiceById(line.serviceId));
  }

  return services;
}

const SERVICE_EXTRA_PARAGRAPH =
  "A Bahia Service estrutura a operação com planejamento de escala, supervisão contínua e indicadores de qualidade, garantindo padronização, segurança e atendimento alinhado às necessidades do cliente durante toda a vigência do contrato.";

/** Resume título/descrição dos serviços selecionados (foto única estática). */
export function summarizeServices(lines: ProposalServiceLine[]) {
  const services = getSelectedServices(lines);
  const primary = services[0] ?? getServiceById("portaria");
  const titles = services.map((service) => service.shortTitle);

  const title =
    titles.length <= 1 ? primary.title : joinList(titles);

  const baseDescription =
    services.length <= 1
      ? primary.description
      : `Esta proposta contempla os serviços de ${joinList(titles)}. A Bahia Service disponibiliza profissionais qualificados para a execução integrada dessas frentes, com supervisão operacional, padronização de processos e foco em qualidade, segurança e eficiência para o cliente.`;

  const description = `${baseDescription}\n\n${SERVICE_EXTRA_PARAGRAPH}`;

  return {
    primary,
    services,
    title,
    description,
    image: SERVICE_SECTION_IMAGE,
    icon: primary.icon,
  };
}
