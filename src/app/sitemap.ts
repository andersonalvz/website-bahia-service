import type { MetadataRoute } from "next";
import { BRAND } from "@/constants/brand";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/sobre", "/servicos", "/clientes", "/contato"];

  return routes.map((route) => ({
    url: `${BRAND.url}${route}`,
    lastModified: new Date("2026-08-05"),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
