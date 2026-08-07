import type { ServiceContent, ServiceId } from "@/types/service";

export const SERVICES: ServiceContent[] = [
  {
    id: "limpeza",
    title: "Limpeza e Conservação",
    shortTitle: "Limpeza e Conservação",
    description:
      "Serviço profissional de limpeza e conservação com processos padronizados, produtos adequados a cada ambiente e equipes capacitadas. Garantimos higiene, apresentação e conforto em escritórios, áreas comuns, indústrias e espaços institucionais.",
    benefits: [
      "Limpeza diária de áreas internas e externas",
      "Conservação de pisos, vidros e sanitários",
      "Uso de EPIs e produtos certificados",
      "Cronograma de serviços e checklists de qualidade",
      "Atendimento a demandas emergenciais",
    ],
    differentials: [
      "Metodologia de limpeza por zonas e criticidade",
      "Supervisão técnica com indicadores de qualidade",
      "Equipes treinadas em boas práticas e sustentabilidade",
      "Uniformes e equipamentos profissionais",
    ],
    image: "/images/services/servico-limpeza.jpg",
    icon: "sparkles",
  },
  {
    id: "jardinagem",
    title: "Jardinagem e Paisagismo",
    shortTitle: "Jardinagem",
    description:
      "Cuidado completo de áreas verdes com manutenção preventiva, poda, irrigação e conservação paisagística. Mantemos jardins, canteiros e espaços externos com aparência impecável e alinhada ao padrão do empreendimento.",
    benefits: [
      "Poda, corte de grama e limpeza de canteiros",
      "Controle de pragas e adubação programada",
      "Manutenção de sistemas de irrigação",
      "Conservação de áreas externas e acessos",
      "Planejamento sazonal de manutenção",
    ],
    differentials: [
      "Equipes com experiência em áreas corporativas",
      "Uso de equipamentos profissionais e EPIs",
      "Cronograma preventivo com visitas programadas",
      "Atenção estética e segurança no entorno",
    ],
    image: "/images/services/servico-jardinagem.jpg",
    icon: "leaf",
  },
  {
    id: "portaria",
    title: "Portaria e Controle de Acesso",
    shortTitle: "Portaria e Controle de Acesso",
    description:
      "Solução completa de portaria com profissionais treinados para controle de acesso, recepção de visitantes, monitoramento de câmeras e registro de ocorrências. Atuamos com protocolos claros, postura institucional e integração com sistemas de segurança do cliente.",
    benefits: [
      "Controle rigoroso de entrada e saída de pessoas e veículos",
      "Monitoramento de CFTV e comunicação com equipes internas",
      "Registro digital de ocorrências e rondas",
      "Atendimento cordial e padronizado ao público",
      "Cobertura em turnos conforme necessidade operacional",
    ],
    differentials: [
      "Equipes uniformizadas e identificadas",
      "Treinamento contínuo em atendimento e segurança",
      "Supervisão periódica e relatórios gerenciais",
      "Flexibilidade de escala (12x36, 5x2 e especiais)",
    ],
    image: "/images/services/servico-portaria.jpg",
    icon: "shield",
  },
];

/** Foto única da seção de serviço na proposta (preview + PDF). */
export const SERVICE_SECTION_IMAGE = "/images/services/servico.jpg";

export function getServiceById(id: ServiceId): ServiceContent {
  const service = SERVICES.find((item) => item.id === id);
  if (!service) {
    return SERVICES[0];
  }
  return service;
}

export const SERVICE_OPTIONS = SERVICES.map((service) => ({
  value: service.id,
  label: service.shortTitle,
}));
