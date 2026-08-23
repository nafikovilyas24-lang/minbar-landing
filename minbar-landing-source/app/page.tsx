import Link from "next/link";
import { HomeStats } from "@/components/home-stats";
import { RamadanCountdown } from "@/components/ramadan-countdown";
import { getArchiveStats } from "@/lib/archive-stats";
import { loadKhutbas } from "@/lib/supabase-khutbas";

export default async function Home() {
  const khutbas = await loadKhutbas();
  const stats = getArchiveStats(khutbas);

  return (
    <main>
      <section className="hero section-shell">
        <img className="moon-visual" src="/moon-3d.png" alt="" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow">Хутбы, которые легко найти и слушать</p>
          <h1>Слушайте.<br />Размышляйте.<br /><em>Делитесь.</em></h1>
          <p className="hero-lead">
            Собираем записи из мечетей разных городов. Находите хутбу по языку,
            имаму или мечети — и слушайте в удобное время.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/archive">Открыть архив</Link>
            <Link className="text-link" href="/upload">Добавить свою запись <span aria-hidden="true">→</span></Link>
          </div>
        </div>

        <RamadanCountdown />
      </section>

      <HomeStats recordings={stats.recordings} mosques={stats.mosques} cities={stats.cities} languages={stats.languages} />

      <section className="section-shell contribute">
        <div><p className="eyebrow">Добавить в Minbar</p><h2>У вас есть запись хутбы?</h2></div>
        <div className="contribute-copy">
          <p>Загрузите MP3 и укажите мечеть, имама, город и дату. После проверки запись появится в общем архиве.</p>
          <div className="contribute-actions"><Link className="button button-primary" href="/upload">Загрузить хутбу</Link><a className="text-link" href="https://t.me/hwee1r" target="_blank" rel="noreferrer">По сотрудничеству <span aria-hidden="true">↗</span></a></div>
        </div>
      </section>
    </main>
  );
}
