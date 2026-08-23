import type { Metadata } from "next";
import Link from "next/link";
import { getArchiveStats } from "@/lib/archive-stats";
import { loadKhutbas } from "@/lib/supabase-khutbas";

export const metadata: Metadata = {
  title: "Статистика архива",
  description: "Сколько хутб, мечетей, городов и языков уже собрано в Minbar.",
};

export default async function StatsPage() {
  const khutbas = await loadKhutbas();
  const stats = getArchiveStats(khutbas);
  const metrics = [
    [stats.recordings, "записей"],
    [stats.hours, "часов аудио"],
    [stats.mosques, "мечетей"],
    [stats.cities, "городов"],
    [stats.imams, "хазратов"],
    [stats.languages, "языка"],
  ];

  return (
    <main className="page-main">
      <section className="stats-hero section-shell">
        <div><p className="eyebrow">Minbar в цифрах</p><h1>Архив растёт<br />с каждой хутбой.</h1></div>
        <p>Здесь собрана актуальная статистика записей, которые уже доступны в Minbar.</p>
      </section>

      <section className="stats-grid section-shell" aria-label="Основные показатели">
        {metrics.map(([value, label], index) => (
          <article key={String(label)}><span>{String(index + 1).padStart(2, "0")}</span><strong>{value}</strong><p>{label}</p></article>
        ))}
      </section>

      <section className="stats-breakdown section-shell">
        <div><p className="eyebrow">География</p><h2>Города</h2>{stats.byCity.map(([name, count]) => <p key={name}><span>{name}</span><strong>{count}</strong></p>)}</div>
        <div><p className="eyebrow">Языки</p><h2>Записи</h2>{stats.byLanguage.map(([name, count]) => <p key={name}><span>{name}</span><strong>{count}</strong></p>)}</div>
        <div><p className="eyebrow">Площадки</p><h2>Мечети</h2>{stats.byMosque.map(([name, count]) => <p key={name}><span>{name}</span><strong>{count}</strong></p>)}</div>
      </section>

      <section className="stats-cta section-shell"><h2>Добавьте следующую запись.</h2><div><p>Каждая опубликованная хутба делает архив полезнее.</p><Link className="button button-primary" href="/upload">Загрузить хутбу</Link></div></section>
    </main>
  );
}
