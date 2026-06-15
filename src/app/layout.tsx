import type {Metadata, Viewport} from "next";
import {Inter, Space_Grotesk} from "next/font/google";
import {getGaId, getSiteUrl} from "@/lib/env";
import {AnalyticsProvider} from "@/components/analytics/AnalyticsProvider";
import {ConsentBootstrap} from "@/components/analytics/ConsentBootstrap";
import {ConsentBanner} from "@/components/analytics/ConsentBanner";
import "./globals.css";

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap"
});

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: "WhiteBots",
  description:
    "Bots personalizados para Discord com módulos sob medida, alta qualidade visual, segurança e automação profissional.",
  applicationName: "WhiteBots",
  openGraph: {
    title: "WhiteBots",
    description: "Bots Discord personalizados, seguros e premium.",
    url: getSiteUrl(),
    siteName: "WhiteBots",
    images: ["/brand/whitebots-logo.png"],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "WhiteBots",
    description: "Bots Discord personalizados, seguros e premium.",
    images: ["/brand/whitebots-logo.png"]
  },
  icons: {
    icon: "/brand/whitebots-logo.png"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#050508"
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  const gaId = getGaId();

  return (
    <html lang="pt-BR" className={`${body.variable} ${display.variable}`}>
      <body>
        <ConsentBootstrap />
        {children}
        <ConsentBanner />
        <AnalyticsProvider gaId={gaId} />
      </body>
    </html>
  );
}
