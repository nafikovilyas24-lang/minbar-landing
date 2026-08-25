"use client";

import Link from "next/link";
import { useState } from "react";
import type { Khutba } from "@/lib/khutbas";
import { PlayButton, useAudioPlayer } from "@/components/audio-player";

export function KhutbaList({ items, compact = false }: { items: Khutba[]; compact?: boolean }) {
  const { current } = useAudioPlayer();
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <div className={`khutba-list${compact ? " is-compact" : ""}`}>
      {items.map((khutba, index) => {
        const selected = selectedId === khutba.id || (selectedId === null && current?.id === khutba.id);

        return (
          <article
            className={`khutba-row${selected ? " is-selected" : ""}`}
            key={khutba.id}
            onPointerDown={() => setSelectedId(khutba.id)}
            onFocusCapture={() => setSelectedId(khutba.id)}
          >
            <span className="row-number">{String(index + 1).padStart(2, "0")}</span>
            <PlayButton track={khutba} />
            <div className="khutba-primary"><Link href={`/khutba/${khutba.id}`}>{khutba.title}</Link><span>{khutba.imam}</span></div>
            <div className="khutba-place"><strong>{khutba.mosque}</strong><span>{khutba.city}</span></div>
            <span className="khutba-language">{khutba.language}</span>
            <div className="khutba-date"><strong>{khutba.date}</strong><span>{khutba.duration}</span></div>
            <Link className="row-arrow" href={`/khutba/${khutba.id}`} aria-label={`Открыть: ${khutba.title}`}>↗</Link>
          </article>
        );
      })}
    </div>
  );
}
