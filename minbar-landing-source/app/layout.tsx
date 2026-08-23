import type { Metadata } from "next";
import { AudioPlayerProvider, GlobalPlayer } from "@/components/audio-player";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://minbar-khutbah-archive.hondon-bads1.chatgpt.site"),
  title: { default: "Minbar — Архив хутб", template: "%s — Minbar" },
  description: "Современный архив исламских хутб: слушайте записи по языку, городу, мечети, хазрату и теме.",
  openGraph: { title: "Minbar — Архив хутб", description: "Слушайте. Размышляйте. Делитесь.", type: "website", images: [{ url: "/og.png", width: 1731, height: 909, alt: "Minbar — Архив хутб" }] },
  twitter: { card: "summary_large_image", title: "Minbar — Архив хутб", description: "Слушайте. Размышляйте. Делитесь.", images: ["/og.png"] },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>
        <AudioPlayerProvider>
          <SiteHeader />
          {children}
          <SiteFooter />
          <GlobalPlayer />
        </AudioPlayerProvider>
      </body>
    </html>
  );
}
