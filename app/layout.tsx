import type { ReactNode } from "react";
import type { Metadata } from "next";
import "./globals.css";
import "./threshold.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ThresholdIntro } from "@/components/ThresholdIntro";
import { getSiteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: { default: "Codex Nocturnum — An Archive of Witchcraft, Ritual & Lore", template: "%s | Codex Nocturnum" },
  description: "A scholarly, atmospheric archive of historical witchcraft, folklore, ritual, botanical lore, divination and European folk traditions.",
  keywords: ["folklore", "witchcraft history", "European folklore", "herbarium", "ritual history", "divination history", "cultural archive"],
  openGraph: { title: "Codex Nocturnum", description: "An Archive of Witchcraft, Ritual & Lore", type: "website" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <ThresholdIntro />
        <div className="ambient-glow" aria-hidden="true" />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
