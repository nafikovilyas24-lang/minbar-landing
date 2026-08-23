"use client";

import Link from "next/link";
import { useState } from "react";

type HomeStatsProps = {
  recordings: number;
  mosques: number;
  cities: number;
  languages: number;
};

export function HomeStats({ recordings, mosques, cities, languages }: HomeStatsProps) {
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return (
      <section className="home-stats-collapsed section-shell" aria-label="Статистика архива">
        <span>Статистика архива скрыта</span>
        <button onClick={() => setVisible(true)} aria-expanded="false">Показать</button>
      </section>
    );
  }

  return (
    <section className="home-stats section-shell" aria-label="Статистика архива">
      <div><strong>{recordings}</strong><span>записей</span></div>
      <div><strong>{mosques}</strong><span>мечетей</span></div>
      <div><strong>{cities}</strong><span>города</span></div>
      <div><strong>{languages}</strong><span>языка</span></div>
      <div className="home-stats-actions">
        <Link href="/stats">Подробнее <span aria-hidden="true">→</span></Link>
        <button onClick={() => setVisible(false)} aria-expanded="true">Скрыть</button>
      </div>
    </section>
  );
}
