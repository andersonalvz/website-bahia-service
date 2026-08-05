import type { MetadataRoute } from "next";
import { BRAND } from "@/constants/brand";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/proposta"],
    },
    sitemap: `${BRAND.url}/sitemap.xml`,
  };
}
