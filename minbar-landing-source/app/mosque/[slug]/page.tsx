import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { KhutbaList } from "@/components/khutba-list";
import { MosquePoster } from "@/components/mosque-poster";
import { loadKhutbas } from "@/lib/supabase-khutbas";
import { entitySlug, uniqueEntities } from "@/lib/slugs";

type PageProps = { params: Promise<{ slug: string }> };

async function loadMosque(slug: string) {
  const items = await loadKhutbas();
  const mosque = uniqueEntities(items.map((item) => item.mosque)).find((value) => entitySlug(value) === slug);
  return mosque ? { mosque, items: items.filter((item) => item.mosque === mosque) } : null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const result = await loadMosque(slug);
  if (!result) return { title: "Мечеть не найдена" };
  const city = result.items[0]?.city ?? "";
  return {
    title: `Хутбы мечети ${result.mosque}`,
    description: `Слушайте пятничные хутбы мечети ${result.mosque}${city ? `, ${city}` : ""} в архиве Minbar.`,
    alternates: { canonical: `/mosque/${slug}` },
  };
}

export default async function MosquePage({ params }: PageProps) {
  const { slug } = await params;
  const result = await loadMosque(slug);
  if (!result) notFound();
  const city = result.items[0]?.city ?? "";
  const pageUrl = `https://minbararhive.ru/mosque/${slug}`;

  return (
    <main className="page-main">
      <section className="page-intro section-shell directory-intro">
        <div><p className="eyebrow">Страница мечети</p><h1>{result.mosque}</h1></div>
        <div className="directory-intro-side">
          {city && <Link href={`/city/${entitySlug(city)}`}>{city} ↗</Link>}
          <p>{result.items.length} записей. Откройте QR-плакат, чтобы посетители мечети могли быстро найти архив.</p>
          <MosquePoster mosque={result.mosque} city={city} pageUrl={pageUrl} />
        </div>
      </section>
      <section className="archive-body section-shell"><KhutbaList items={result.items} /></section>
    </main>
  );
}

export async function generateStaticParams() {
  const items = await loadKhutbas();
  return uniqueEntities(items.map((item) => item.mosque)).map((mosque) => ({ slug: entitySlug(mosque) }));
}
