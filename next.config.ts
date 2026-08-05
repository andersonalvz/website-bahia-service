import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Exportação estática (HTML/CSS/JS em /out) — compatível com hospedagem sem Node.
  output: "export",
  // next/image sem Image Optimization API (obrigatório com output: 'export').
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
