import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { KhutbaList } from "@/components/khutba-list";
import { loadKhutbas } from "@/lib/supabase-khutbas";
import { entitySlug, uniqueEntities } from "@/lib/slugs";

type PageProps = { params: Promise<{ slug: string }> };

async function loadCity(slug: string) {
  const items = await loadKhutbas();
  const city = uniqueEntities(items.map((item) => item.city)).find((value) => entitySlug(value) === slug);
  return city ? { city, items: items.filter((item) => item.city === city) } : null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const result = await loadCity(slug);
  if (!result) return { title: "Город не найден" };
  return {
    title: `Хутбы города ${result.city}`,
    description: `Слушайте пятничные хутбы из мечетей города ${result.city} в архиве Minbar.`,
    alternates: { canonical: `/city/${slug}` },
  };
}

export default async function CityPage({ params }: PageProps) {
  const { slug } = await params;
  const result = await loadCity(slug);
  if (!result) notFound();

  const mosques = uniqueEntities(result.items.map((item) => item.mosque));
  return (
    <main className="page-main">
      <section className="page-intro section-shell directory-intro">
        <div><p className="eyebrow">Хутбы по городам</p><h1>{result.city}</h1></div>
        <p>{result.items.length} записей из {mosques.length} мечетей. Слушайте, сохраняйте и делитесь материалами Minbar.</p>
      </section>
      <section className="directory-links section-shell" aria-label="Мечети города">
        {mosques.map((mosque) => <Link key={mosque} href={`/mosque/${entitySlug(mosque)}`}>{mosque}<span>↗</span></Link>)}
      </section>
      <section className="archive-body section-shell"><KhutbaList items={result.items} /></section>
    </main>
  );
}

export async function generateStaticParams() {
  const items = await loadKhutbas();
  return uniqueEntities(items.map((item) => item.city)).map((city) => ({ slug: entitySlug(city) }));
}
