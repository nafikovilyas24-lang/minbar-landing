import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "О проекте", description: "Зачем создан Minbar и как устроен архив хутб." };

export default function AboutPage() {
  return (
    <main className="page-main">
      <section className="about-hero section-shell"><p className="eyebrow">О Minbar</p><h1>Важные слова не должны теряться после пятничной молитвы.</h1><p>Minbar сохраняет хутбы и делает их доступными по понятным признакам: язык, тема, город, мечеть, хазрат и дата.</p></section>
      <section className="about-principles section-shell">
        <article><span>01</span><h2>Доступность</h2><p>Запись можно найти и услышать в удобное время — дома, в дороге или вместе с близкими.</p></article>
        <article><span>02</span><h2>Точность</h2><p>Мы сохраняем контекст каждой хутбы: кто читал, где, когда и на каком языке.</p></article>
        <article><span>03</span><h2>Уважение</h2><p>Интерфейс остаётся тихим: на первом месте голос, смысл и внимательное слушание.</p></article>
      </section>
      <section id="telegram" className="about-cta section-shell">
        <div><p className="eyebrow">Присоединиться</p><h2>Помогите архиву расти.</h2></div>
        <div><p>Отправьте запись через сайт или откройте Minbar в Telegram.</p><div><Link className="button button-primary" href="/upload">Загрузить хутбу</Link><a className="button button-secondary" href="https://t.me/minbar_archive_bot" target="_blank" rel="noreferrer">Telegram</a></div></div>
      </section>
    </main>
  );
}
