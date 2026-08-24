import Link from "next/link";
import { Brand } from "@/components/site-header";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="section-shell footer-grid">
        <div><Brand /><p>Хутбы из разных мечетей в одном аккуратном и понятном архиве.</p></div>
        <nav aria-label="Навигация в подвале"><Link href="/archive">Архив</Link><Link href="/upload">Добавить запись</Link><a href="https://t.me/minbar_archive_bot" target="_blank" rel="noreferrer">Telegram-бот</a></nav>
        <div className="footer-contact"><a className="footer-telegram" href="https://t.me/hwee1r" target="_blank" rel="noreferrer">По сотрудничеству <b aria-hidden="true">↗</b></a><small>Казань · 2026</small></div>
      </div>
    </footer>
  );
}
