import type { Metadata } from "next";
import { ArchiveExplorer } from "./archive-explorer";
import { loadKhutbas } from "@/lib/supabase-khutbas";

export const metadata: Metadata = {
  title: "Архив хутб",
  description: "Поиск хутб по языку, городу, мечети, хазрату и теме.",
};

export default async function ArchivePage() {
  const items = await loadKhutbas();
  return (
    <main className="page-main">
      <section className="page-intro section-shell archive-intro">
        <div><p className="eyebrow">Медиаархив</p><h1>Архив хутб</h1></div>
        <p>Ищите запись по теме, языку, городу, мечети или имени хазрата.</p>
      </section>
      <ArchiveExplorer items={items} />
    </main>
  );
}
