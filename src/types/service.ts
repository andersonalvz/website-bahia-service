export type ServiceId = "limpeza" | "jardinagem" | "portaria";

export interface ServiceContent {
  id: ServiceId;
  title: string;
  shortTitle: string;
  description: string;
  benefits: string[];
  differentials: string[];
  image: string;
  icon: ServiceIconName;
}

export type ServiceIconName = "sparkles" | "leaf" | "shield";
