"use client";

import type { Khutba } from "@/lib/khutbas";
import { useAudioPlayer } from "@/components/audio-player";

export function SharedMoment({ track, second }: { track: Khutba; second: number }) {
  const { toggle } = useAudioPlayer();
  const label = `${Math.floor(second / 60)}:${String(second % 60).padStart(2, "0")}`;
  return (
    <aside className="shared-moment">
      <div><span>Вам отправили этот момент</span><strong>{label}</strong></div>
      <button className="button button-primary" type="button" disabled={!track.audioUrl} onClick={() => toggle(track, second)}>
        Слушать с {label}
      </button>
    </aside>
  );
}
