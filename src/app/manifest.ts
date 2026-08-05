import type { MetadataRoute } from "next";
import { BRAND } from "@/constants/brand";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: BRAND.name,
    short_name: "Bahia Service",
    description: BRAND.tagline,
    start_url: "/",
    display: "standalone",
    background_color: "#F4F7FB",
    theme_color: "#1B365D",
    lang: "pt-BR",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
