"use client";

import { useEffect, useState } from "react";

const RAMADAN_START = new Date("2027-02-08T00:00:00+03:00").getTime();

type TimeLeft = { days: number; hours: number; minutes: number; seconds: number };

function getTimeLeft(): TimeLeft {
  const distance = Math.max(0, RAMADAN_START - Date.now());
  return {
    days: Math.floor(distance / 86_400_000),
    hours: Math.floor((distance / 3_600_000) % 24),
    minutes: Math.floor((distance / 60_000) % 60),
    seconds: Math.floor((distance / 1_000) % 60),
  };
}

export function RamadanCountdown() {
  const [time, setTime] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const update = () => setTime(getTimeLeft());
    update();
    const timer = window.setInterval(update, 1_000);
    return () => window.clearInterval(timer);
  }, []);

  const values = time ?? { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return (
    <aside className="ramadan-card" aria-labelledby="ramadan-title">
      <div className="ramadan-topline"><span>Рамадан 1448</span><span>8 февраля 2027</span></div>
      <div className="ramadan-card-copy">
        <p className="eyebrow">Осталось до начала</p>
        <h2 id="ramadan-title">До Рамадана</h2>
        <p>Готовимся к священному месяцу вместе.</p>
      </div>
      <div className="countdown countdown-hero" aria-live="polite" aria-label={`${values.days} дней, ${values.hours} часов, ${values.minutes} минут, ${values.seconds} секунд`}>
        <div><strong>{values.days}</strong><span>дней</span></div>
        <div><strong>{String(values.hours).padStart(2, "0")}</strong><span>часов</span></div>
        <div><strong>{String(values.minutes).padStart(2, "0")}</strong><span>минут</span></div>
        <div><strong>{String(values.seconds).padStart(2, "0")}</strong><span>секунд</span></div>
      </div>
      <p className="ramadan-note">Дата предварительная и зависит от наблюдения луны.</p>
    </aside>
  );
}
