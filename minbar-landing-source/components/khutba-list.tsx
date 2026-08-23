import Link from "next/link";
import type { Khutba } from "@/lib/khutbas";
import { PlayButton } from "@/components/audio-player";

export function KhutbaList({ items, compact = false }: { items: Khutba[]; compact?: boolean }) {
  return (
    <div className={`khutba-list${compact ? " is-compact" : ""}`}>
      {items.map((khutba, index) => (
        <article className="khutba-row" key={khutba.id}>
          <span className="row-number">{String(index + 1).padStart(2, "0")}</span>
          <PlayButton track={khutba} />
          <div className="khutba-primary"><Link href={`/khutba/${khutba.id}`}>{khutba.title}</Link><span>{khutba.imam}</span></div>
          <div className="khutba-place"><strong>{khutba.mosque}</strong><span>{khutba.city}</span></div>
          <span className="khutba-language">{khutba.language}</span>
          <div className="khutba-date"><strong>{khutba.date}</strong><span>{khutba.duration}</span></div>
          <Link className="row-arrow" href={`/khutba/${khutba.id}`} aria-label={`Открыть: ${khutba.title}`}>↗</Link>
        </article>
      ))}
    </div>
  );
}
