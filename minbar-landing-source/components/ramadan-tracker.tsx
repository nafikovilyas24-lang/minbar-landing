"use client";

import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "minbar:ramadan-tracker:1448";
const RAMADAN_START = new Date("2027-02-08T00:00:00+03:00");

const tasks = [
  { id: "fajr", label: "Фаджр", group: "Намаз" },
  { id: "dhuhr", label: "Зухр", group: "Намаз" },
  { id: "asr", label: "Аср", group: "Намаз" },
  { id: "maghrib", label: "Магриб", group: "Намаз" },
  { id: "isha", label: "Иша", group: "Намаз" },
  { id: "quran", label: "Коран", group: "Духовная практика" },
  { id: "dhikr", label: "Зикр и дуа", group: "Духовная практика" },
  { id: "kindness", label: "Доброе дело", group: "Духовная практика" },
] as const;

type TaskId = (typeof tasks)[number]["id"];
type DayProgress = Partial<Record<TaskId, boolean>>;
type TrackerProgress = Record<string, DayProgress>;

function getSuggestedDay() {
  const distance = Math.floor((Date.now() - RAMADAN_START.getTime()) / 86_400_000) + 1;
  return Math.min(30, Math.max(1, distance));
}

export function RamadanTracker() {
  const [selectedDay, setSelectedDay] = useState(getSuggestedDay);
  const [progress, setProgress] = useState<TrackerProgress>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let savedProgress: TrackerProgress | null = null;
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) savedProgress = JSON.parse(saved) as TrackerProgress;
    } catch {
      // The tracker still works when storage is unavailable.
    }
    const timer = window.setTimeout(() => {
      if (savedProgress) setProgress(savedProgress);
      setReady(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Keep the in-memory state for this visit.
    }
  }, [progress, ready]);

  const completed = useMemo(
    () => Object.values(progress).reduce(
      (total, day) => total + Object.values(day).filter(Boolean).length,
      0,
    ),
    [progress],
  );
  const total = 30 * tasks.length;
  const percentage = Math.round((completed / total) * 100);
  const selectedProgress = progress[String(selectedDay)] ?? {};
  const selectedCompleted = Object.values(selectedProgress).filter(Boolean).length;

  function toggleTask(taskId: TaskId) {
    setProgress((current) => ({
      ...current,
      [String(selectedDay)]: {
        ...current[String(selectedDay)],
        [taskId]: !current[String(selectedDay)]?.[taskId],
      },
    }));
  }

  return (
    <section className="tracker-shell" aria-labelledby="tracker-title">
      <div className="tracker-overview">
        <div>
          <p className="eyebrow">Мой путь</p>
          <h2 id="tracker-title">30 дней в ритме</h2>
          <p>Без соревнования и давления. Отмечайте то, что помогает сохранить намерение.</p>
        </div>
        <div className="tracker-score" aria-label={`Общий прогресс ${percentage} процентов`}>
          <strong>{percentage}%</strong>
          <span>{completed} из {total} отметок</span>
        </div>
      </div>

      <div className="tracker-progress" aria-hidden="true">
        <span style={{ width: `${percentage}%` }} />
      </div>

      <div className="tracker-days" aria-label="Дни Рамадана">
        {Array.from({ length: 30 }, (_, index) => {
          const day = index + 1;
          const dayDone = Object.values(progress[String(day)] ?? {}).filter(Boolean).length;
          const isComplete = dayDone === tasks.length;
          return (
            <button
              key={day}
              className={`${day === selectedDay ? "is-selected" : ""}${isComplete ? " is-complete" : ""}`}
              type="button"
              onClick={() => setSelectedDay(day)}
              aria-pressed={day === selectedDay}
              aria-label={`День ${day}, выполнено ${dayDone} из ${tasks.length}`}
            >
              <span>{day}</span>
              <i aria-hidden="true" />
            </button>
          );
        })}
      </div>

      <div className="tracker-day-panel">
        <div className="tracker-day-heading">
          <div><span>День</span><strong>{String(selectedDay).padStart(2, "0")}</strong></div>
          <p>{selectedCompleted} из {tasks.length} выполнено</p>
        </div>

        <div className="tracker-task-groups">
          {["Намаз", "Духовная практика"].map((group) => (
            <div key={group} className="tracker-task-group">
              <p>{group}</p>
              <div>
                {tasks.filter((task) => task.group === group).map((task) => {
                  const checked = Boolean(selectedProgress[task.id]);
                  return (
                    <button
                      key={task.id}
                      className={checked ? "is-checked" : ""}
                      type="button"
                      onClick={() => toggleTask(task.id)}
                      aria-pressed={checked}
                    >
                      <span aria-hidden="true">{checked ? "✓" : ""}</span>
                      {task.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="tracker-privacy">Отметки сохраняются только в этом браузере и не передаются на сервер.</p>
    </section>
  );
}
