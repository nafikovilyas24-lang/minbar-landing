"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { Khutba } from "@/lib/khutbas";
import { PauseIcon, PlayIcon } from "@/components/icons";

type PlayerState = {
  current: Khutba | null;
  playing: boolean;
  progress: number;
  toggle: (track: Khutba, startAtSeconds?: number) => void;
  seek: (value: number) => void;
};

const PlayerContext = createContext<PlayerState | null>(null);

export function AudioPlayerProvider({ children }: { children: React.ReactNode }) {
  const [current, setCurrent] = useState<Khutba | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const requestedStartRef = useRef<number | null>(null);

  useEffect(() => {
    if (!playing || !current) return;
    if (!current.audioUrl) return;

    const expectedUrl = new URL(current.audioUrl, window.location.href).href;
    if (!audioRef.current || audioRef.current.src !== expectedUrl) {
      audioRef.current?.pause();
      audioRef.current = new Audio(current.audioUrl);
      audioRef.current.preload = "metadata";
    }

    const audio = audioRef.current;
    const applyRequestedStart = () => {
      if (requestedStartRef.current === null || !Number.isFinite(audio.duration)) return;
      audio.currentTime = Math.min(requestedStartRef.current, Math.max(0, audio.duration - 1));
      requestedStartRef.current = null;
    };
    if (audio.readyState >= 1) applyRequestedStart();
    else audio.addEventListener("loadedmetadata", applyRequestedStart, { once: true });
    const onTime = () => {
      if (audio.duration) setProgress((audio.currentTime / audio.duration) * 100);
    };
    const onEnded = () => {
      setPlaying(false);
      setProgress(100);
    };
    const onError = () => setPlaying(false);

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("error", onError);
    void audio.play().catch(() => setPlaying(false));

    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("error", onError);
      audio.removeEventListener("loadedmetadata", applyRequestedStart);
    };
  }, [playing, current]);

  useEffect(() => {
    if (!playing) audioRef.current?.pause();
  }, [playing]);

  const value = useMemo<PlayerState>(() => ({
    current,
    playing,
    progress,
    toggle: (track, startAtSeconds) => {
      if (typeof startAtSeconds === "number" && startAtSeconds >= 0) {
        requestedStartRef.current = startAtSeconds;
      }
      if (current?.id === track.id) {
        if (typeof startAtSeconds === "number") {
          if (audioRef.current?.duration) {
            audioRef.current.currentTime = Math.min(startAtSeconds, Math.max(0, audioRef.current.duration - 1));
            requestedStartRef.current = null;
          }
          setPlaying(true);
        } else {
          setPlaying((value) => !value);
        }
        return;
      }
      audioRef.current?.pause();
      setCurrent(track);
      setProgress(0);
      setPlaying(true);
    },
    seek: (next) => {
      setProgress(next);
      if (audioRef.current?.duration) audioRef.current.currentTime = (next / 100) * audioRef.current.duration;
    },
  }), [current, playing, progress]);

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}

export function useAudioPlayer() {
  const context = useContext(PlayerContext);
  if (!context) throw new Error("useAudioPlayer must be used inside AudioPlayerProvider");
  return context;
}

export function PlayButton({ track, label, large = false }: { track: Khutba; label?: string; large?: boolean }) {
  const { current, playing, toggle } = useAudioPlayer();
  const active = current?.id === track.id && playing;
  const buttonLabel = active ? "Пауза" : (label ?? "Слушать");
  return (
    <button className={`play-button${large ? " play-button-large" : ""}${active ? " is-playing" : ""}`} onClick={() => toggle(track)} aria-label={`${buttonLabel}: ${track.title}`} disabled={!track.audioUrl} title={track.audioUrl ? undefined : "Аудио пока не загружено"}>
      {active ? <PauseIcon /> : <PlayIcon />}{large && <span>{buttonLabel}</span>}
    </button>
  );
}

export function GlobalPlayer() {
  const { current, playing, progress, seek } = useAudioPlayer();
  if (!current) return null;
  return (
    <aside className="global-player" aria-label="Аудиоплеер">
      <div className="global-player-inner">
        <PlayButton track={current} />
        <div className="player-track-info"><Link href={`/khutba/${current.id}`}>{current.title}</Link><span>{current.imam} · {current.city}</span></div>
        <div className="player-timeline">
          <span>{formatTime(progress, current.durationSeconds)}</span>
          <input type="range" min="0" max="100" step="0.1" value={progress} onChange={(event) => seek(Number(event.target.value))} aria-label="Позиция воспроизведения" style={{ "--progress": `${progress}%` } as React.CSSProperties} />
          <span>{current.duration}</span>
        </div>
        <span className="player-status">{playing ? "Воспроизводится" : "Пауза"}</span>
      </div>
    </aside>
  );
}

function formatTime(progress: number, duration: number) {
  const seconds = Math.floor((progress / 100) * duration);
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}
