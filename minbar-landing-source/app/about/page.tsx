import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "О проекте",
  description: "Что такое Minbar, почему архив удобен и как им пользоваться.",
};

export default function AboutPage() {
  return (
    <main className="page-main">
      <section className="about-hero section-shell">
        <p className="eyebrow">О Minbar</p>
        <h1>Важные слова не должны теряться после пятничной молитвы.</h1>
        <p>
          Minbar — это единый аудиоархив хутб. Он помогает сохранить запись вместе с её контекстом:
          языком, городом, мечетью, именем хазрата и датой.
        </p>
      </section>

      <section className="section-shell" style={{ paddingBlock: "68px 34px" }}>
        <p className="eyebrow">Почему Minbar удобен</p>
        <h2 style={{ maxWidth: "820px", margin: "15px 0 0", fontSize: "clamp(2.65rem, 5vw, 4.9rem)", lineHeight: 1.04, letterSpacing: "-0.06em", fontWeight: 550 }}>
          Не лента сообщений, а понятный архив.
        </h2>
      </section>

      <section className="about-principles section-shell">
        <article>
          <span>01</span>
          <h2>Ничего не теряется</h2>
          <p>Хутба остаётся в каталоге и не исчезает среди пересланных сообщений, файлов и старых публикаций.</p>
        </article>
        <article>
          <span>02</span>
          <h2>Легко найти</h2>
          <p>Поиск и фильтры помогают выбрать запись по теме, языку, городу, мечети или имени хазрата.</p>
        </article>
        <article>
          <span>03</span>
          <h2>Удобно слушать</h2>
          <p>Запись открывается в простом плеере на телефоне или компьютере — без лишних экранов и действий.</p>
        </article>
      </section>

      <section className="section-shell" style={{ paddingBlock: "84px 34px" }}>
        <p className="eyebrow">Как пользоваться</p>
        <h2 style={{ maxWidth: "760px", margin: "15px 0 0", fontSize: "clamp(2.65rem, 5vw, 4.9rem)", lineHeight: 1.04, letterSpacing: "-0.06em", fontWeight: 550 }}>
          Три простых шага.
        </h2>
      </section>

      <section className="about-principles section-shell">
        <article>
          <span>01</span>
          <h2>Откройте архив</h2>
          <p>Введите название или используйте фильтры, чтобы быстро сузить список подходящих записей.</p>
        </article>
        <article>
          <span>02</span>
          <h2>Выберите хутбу</h2>
          <p>Посмотрите хазрата, мечеть, город, язык и дату, затем нажмите кнопку прослушивания.</p>
        </article>
        <article>
          <span>03</span>
          <h2>Добавьте запись</h2>
          <p>Если у вас есть MP3 хутбы, заполните основные сведения и отправьте запись в архив.</p>
        </article>
      </section>

      <section id="telegram" className="about-cta section-shell">
        <div>
          <p className="eyebrow">Пополнить архив</p>
          <h2>Есть запись хутбы?</h2>
        </div>
        <div>
          <p>Загрузите MP3 через сайт или перейдите в Telegram-бот Minbar.</p>
          <div>
            <Link className="button button-primary" href="/upload">Загрузить хутбу</Link>
            <a className="button button-secondary" href="https://t.me/minbar_archive_bot" target="_blank" rel="noreferrer">Telegram</a>
          </div>
        </div>
      </section>
    </main>
  );
}
