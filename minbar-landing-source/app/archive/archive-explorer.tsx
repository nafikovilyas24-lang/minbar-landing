"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { KhutbaList } from "@/components/khutba-list";
import { SearchIcon } from "@/components/icons";
import type { Khutba } from "@/lib/khutbas";

export function ArchiveExplorer({ items }: { items: Khutba[] }) {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState("Все языки");
  const [city, setCity] = useState("Все города");
  const [mosque, setMosque] = useState("Все мечети");
  const topic = searchParams.get("topic") ?? "";

  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("ru");
    return items.filter((item) => {
      const haystack = [item.title, item.topic, item.imam, item.mosque, item.city].join(" ").toLocaleLowerCase("ru");
      return (!normalized || haystack.includes(normalized))
        && (!topic || item.topic === topic)
        && (language === "Все языки" || item.language === language)
        && (city === "Все города" || item.city === city)
        && (mosque === "Все мечети" || item.mosque === mosque);
    });
  }, [query, language, city, mosque, topic, items]);

  const reset = () => {
    setQuery(""); setLanguage("Все языки"); setCity("Все города"); setMosque("Все мечети");
    window.history.replaceState({}, "", "/archive");
  };

  return (
    <section className="archive-body section-shell">
      <div className="filter-bar">
        <label className="search-field"><SearchIcon /><span className="sr-only">Поиск по архиву</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Название, тема или хазрат" /></label>
        <select value={language} onChange={(event) => setLanguage(event.target.value)} aria-label="Язык"><option>Все языки</option><option>Русский</option><option>Татарский</option></select>
        <select value={city} onChange={(event) => setCity(event.target.value)} aria-label="Город"><option>Все города</option><option>Казань</option><option>Москва</option><option>Уфа</option></select>
        <select value={mosque} onChange={(event) => setMosque(event.target.value)} aria-label="Мечеть"><option>Все мечети</option><option>Кул Шариф</option><option>Нур</option><option>Ихлас</option><option>Азимовская мечеть</option><option>Ярдэм</option><option>Ляля-Тюльпан</option></select>
      </div>
      <div className="archive-results-head">
        <p>{filtered.length} {filtered.length === 1 ? "запись" : "записей"}{topic ? ` · ${topic}` : ""}</p>
        {(query || topic || language !== "Все языки" || city !== "Все города" || mosque !== "Все мечети") && <button onClick={reset}>Сбросить фильтры</button>}
      </div>
      {filtered.length ? <KhutbaList items={filtered} /> : (
        <div className="empty-state"><span>Ничего не найдено</span><h2>Попробуйте изменить запрос или убрать один из фильтров.</h2><button className="button button-secondary" onClick={reset}>Сбросить фильтры</button></div>
      )}
    </section>
  );
}
