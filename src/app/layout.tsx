import type { Metadata } from "next";
import { Manrope, Sora } from "next/font/google";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";
import { BRAND } from "@/constants/brand";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(BRAND.url),
  title: {
    default: `${BRAND.name} | ${BRAND.tagline}`,
    template: `%s | ${BRAND.name}`,
  },
  description:
    "Bahia Service — excelência em facilities e terceirização de serviços: portaria, limpeza, recepção, jardinagem, manutenção e apoio administrativo em Salvador e em toda a Bahia.",
  keywords: [
    "Bahia Service",
    "terceirização",
    "facilities",
    "limpeza e conservação",
    "jardinagem",
    "portaria",
    "controle de acesso",
    "Salvador",
    "Bahia",
  ],
  authors: [{ name: BRAND.name }],
  creator: "Anderson Alves | Techiando",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: BRAND.url,
    siteName: BRAND.name,
    title: `${BRAND.name} | ${BRAND.tagline}`,
    description:
      "Soluções completas em facilities e terceirização de mão de obra na Bahia.",
    images: [
      {
        url: BRAND.hero,
        width: 1200,
        height: 630,
        alt: BRAND.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND.name} | ${BRAND.tagline}`,
    description:
      "Soluções completas em facilities e terceirização de mão de obra na Bahia.",
    images: [BRAND.hero],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/icons/icon-192.png", sizes: "192x192" }],
    apple: "/icons/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${manrope.variable} ${sora.variable} antialiased`}>
        <OrganizationJsonLd />
        {children}
      </body>
    </html>
  );
}
