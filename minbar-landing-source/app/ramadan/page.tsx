import type { Metadata } from "next";
import Link from "next/link";
import { RamadanCountdown } from "@/components/ramadan-countdown";
import { RamadanTracker } from "@/components/ramadan-tracker";

export const metadata: Metadata = {
  title: "Ramadan Tracker — Minbar",
  description: "Личный трекер поклонения на 30 дней Рамадана.",
};

export default function RamadanPage() {
  return (
    <main className="page-main ramadan-page">
      <div className="section-shell ramadan-hero">
        <div className="ramadan-hero-copy">
          <Link className="back-link" href="/">← На главную</Link>
          <p className="eyebrow">Рамадан 1448</p>
          <h1>Небольшие шаги.<br /><em>Каждый день.</em></h1>
          <p>Личное пространство, чтобы замечать ритм поклонения и бережно возвращаться к намерению.</p>
        </div>
        <RamadanCountdown />
      </div>

      <div className="section-shell">
        <RamadanTracker />
      </div>

      <section className="section-shell ramadan-verse">
        <p className="eyebrow">Аят о Рамадане</p>
        <blockquote>«Месяц Рамадан, в который был ниспослан Коран…»</blockquote>
        <a href="https://quran.com/2/185" target="_blank" rel="noreferrer">Коран, 2:185 <span aria-hidden="true">↗</span></a>
      </section>
    </main>
  );
}
