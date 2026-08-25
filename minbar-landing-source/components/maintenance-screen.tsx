import { Brand } from "@/components/site-header";
import type { MaintenanceState } from "@/lib/maintenance";

function formatReturnTime(until: string | null) {
  if (!until) return "Вернитесь немного позже";
  const date = new Date(until);
  if (Number.isNaN(date.getTime())) return "Вернитесь немного позже";
  return `Планируем вернуться к ${new Intl.DateTimeFormat("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Moscow",
  }).format(date)} по Москве`;
}

export function MaintenanceScreen({ state }: { state: MaintenanceState }) {
  return (
    <main className="maintenance-screen">
      <div className="maintenance-topline">
        <Brand />
        <span><i /> Технические работы</span>
      </div>
      <section className="maintenance-copy">
        <p className="eyebrow">Minbar скоро вернётся</p>
        <h1>Мы ненадолго<br />закрыли архив.</h1>
        <p>
          Сейчас проводим технические работы, чтобы Minbar оставался быстрым и надёжным.
          Все записи сохранены — пожалуйста, зайдите чуть позже.
        </p>
      </section>
      <div className="maintenance-footer">
        <strong>{formatReturnTime(state.until)}</strong>
        <a href="https://t.me/minbar_archive_bot" target="_blank" rel="noreferrer">Minbar в Telegram ↗</a>
      </div>
    </main>
  );
}
