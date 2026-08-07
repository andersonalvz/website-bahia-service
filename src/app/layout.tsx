import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#1B365D",
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL(BRAND.url),
  title: {
    default: `${BRAND.name} | ${BRAND.tagline}`,
    template: `%s | ${BRAND.name}`,
  },
  description:
    "Bahia Service — excelência em facilities e terceirização de serviços: limpeza e conservação, jardinagem e portaria e controle de acesso em Salvador e em toda a Bahia.",
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
  applicationName: BRAND.name,
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    title: BRAND.name,
    statusBarStyle: "default",
  },
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
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "android-chrome",
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
      },
      {
        rel: "android-chrome",
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
      },
    ],
  },
  other: {
    "msapplication-TileColor": "#1B365D",
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
