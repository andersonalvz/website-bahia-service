import type { MetadataRoute } from "next";
import { BRAND } from "@/constants/brand";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/sobre", "/servicos", "/clientes", "/contato"];

  return routes.map((route) => ({
    url: `${BRAND.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
