const reminders = [
  {
    theme: "Джума",
    quote: "Устремляйтесь к поминанию Аллаха и оставьте торговлю.",
    source: "Коран, 62:9",
    href: "https://quran.com/62/9",
  },
  {
    theme: "Поминание",
    quote: "Воистину, сердца находят покой в поминании Аллаха.",
    source: "Коран, 13:28",
    href: "https://quran.com/13/28",
  },
  {
    theme: "Надежда",
    quote: "Воистину, за каждой тягостью наступает облегчение.",
    source: "Коран, 94:6",
    href: "https://quran.com/94/6",
  },
] as const;

function getWeekNumber(date: Date) {
  const start = Date.UTC(date.getUTCFullYear(), 0, 1);
  return Math.floor((date.getTime() - start) / 604_800_000);
}

export function WeeklyReminder() {
  const reminder = reminders[getWeekNumber(new Date()) % reminders.length];

  return (
    <aside style={{ width: "100%", maxWidth: "780px" }} aria-labelledby="weekly-reminder-title">
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px", color: "var(--subtle)", fontSize: "0.7rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>
        <span id="weekly-reminder-title">Цитата недели</span>
        <span aria-hidden="true">·</span>
        <span style={{ color: "var(--green)" }}>{reminder.theme}</span>
      </div>
      <blockquote style={{ margin: 0, padding: "19px 22px", borderInlineStart: "3px solid var(--green)", borderRadius: "0 8px 8px 0", background: "var(--panel)" }}>
        <p style={{ margin: 0, color: "var(--ink)", fontFamily: "Georgia, 'Times New Roman', serif", fontSize: "clamp(1.18rem, 2.2vw, 1.52rem)", lineHeight: 1.45 }}>
          {reminder.quote}
        </p>
        <footer style={{ marginTop: "10px" }}>
          <a style={{ color: "var(--muted)", fontSize: "0.76rem" }} href={reminder.href} target="_blank" rel="noreferrer">
            {reminder.source} <span aria-hidden="true" style={{ color: "var(--green)" }}>↗</span>
          </a>
        </footer>
      </blockquote>
    </aside>
  );
}
