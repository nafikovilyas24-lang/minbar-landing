"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type ShareKhutbaCardProps = {
  id: number;
  title: string;
  summary: string;
  imam: string;
  mosque: string;
  city: string;
};

const CARD_WIDTH = 1080;
const CARD_HEIGHT = 1350;

function wrapText(context: CanvasRenderingContext2D, text: string, maxWidth: number) {
  const words = text.trim().split(/\s+/);
  const lines: string[] = [];
  let line = "";

  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (context.measureText(candidate).width <= maxWidth || !line) {
      line = candidate;
    } else {
      lines.push(line);
      line = word;
    }
  }

  if (line) lines.push(line);
  return lines;
}

function drawLines(
  context: CanvasRenderingContext2D,
  lines: string[],
  x: number,
  y: number,
  lineHeight: number,
  maxLines: number,
) {
  const visibleLines = lines.slice(0, maxLines);
  visibleLines.forEach((line, index) => {
    const isLastTruncatedLine = index === maxLines - 1 && lines.length > maxLines;
    context.fillText(isLastTruncatedLine ? `${line.replace(/[.,;:!?]$/, "")}…` : line, x, y + index * lineHeight);
  });
  return y + visibleLines.length * lineHeight;
}

function makeCard(
  canvas: HTMLCanvasElement,
  khutba: Omit<ShareKhutbaCardProps, "id">,
) {
  canvas.width = CARD_WIDTH;
  canvas.height = CARD_HEIGHT;
  const context = canvas.getContext("2d");
  if (!context) return;

  const background = context.createLinearGradient(0, 0, CARD_WIDTH, CARD_HEIGHT);
  background.addColorStop(0, "#191b18");
  background.addColorStop(1, "#0d0e0d");
  context.fillStyle = background;
  context.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);

  context.fillStyle = "rgba(201, 242, 118, 0.06)";
  context.beginPath();
  context.arc(900, 175, 360, 0, Math.PI * 2);
  context.fill();

  context.strokeStyle = "rgba(201, 242, 118, 0.9)";
  context.lineWidth = 3;
  context.beginPath();
  context.arc(105, 105, 45, 0, Math.PI * 2);
  context.stroke();
  context.fillStyle = "#f4f2ea";
  context.font = "600 42px Georgia, serif";
  context.textAlign = "center";
  context.fillText("M", 105, 120);

  context.textAlign = "left";
  context.font = "700 34px Inter, Arial, sans-serif";
  context.fillText("Minbar", 175, 98);
  context.fillStyle = "#868a80";
  context.font = "600 18px Inter, Arial, sans-serif";
  context.letterSpacing = "4px";
  context.fillText("АРХИВ ХУТБ", 175, 130);

  context.fillStyle = "#c9f276";
  context.font = "700 22px Inter, Arial, sans-serif";
  context.letterSpacing = "3px";
  context.fillText("МЫСЛЬ ИЗ ХУТБЫ", 80, 300);

  context.fillStyle = "#f4f2ea";
  context.font = "600 58px Inter, Arial, sans-serif";
  context.letterSpacing = "-2px";
  const summaryLines = wrapText(context, khutba.summary, 900);
  const summaryBottom = drawLines(context, summaryLines, 80, 405, 76, 6);

  const dividerY = Math.max(900, summaryBottom + 95);
  context.strokeStyle = "#363932";
  context.lineWidth = 2;
  context.beginPath();
  context.moveTo(80, dividerY);
  context.lineTo(1000, dividerY);
  context.stroke();

  context.fillStyle = "#9a9e94";
  context.font = "500 24px Inter, Arial, sans-serif";
  context.letterSpacing = "0px";
  context.fillText("ХУТБА", 80, dividerY + 70);

  context.fillStyle = "#f4f2ea";
  context.font = "650 38px Inter, Arial, sans-serif";
  context.letterSpacing = "-1px";
  const titleLines = wrapText(context, khutba.title, 900);
  const titleBottom = drawLines(context, titleLines, 80, dividerY + 130, 50, 2);

  context.fillStyle = "#a9aca3";
  context.font = "500 25px Inter, Arial, sans-serif";
  context.letterSpacing = "0px";
  context.fillText(`${khutba.imam} · ${khutba.mosque}, ${khutba.city}`, 80, titleBottom + 30);

  context.fillStyle = "#c9f276";
  context.font = "700 25px Inter, Arial, sans-serif";
  context.fillText("minbararhive.ru", 80, 1260);
  context.fillStyle = "#72766d";
  context.font = "500 21px Inter, Arial, sans-serif";
  context.textAlign = "right";
  context.fillText("Слушайте · Размышляйте · Делитесь", 1000, 1260);
}

export function ShareKhutbaCard({ id, title, summary, imam, mosque, city }: ShareKhutbaCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [notice, setNotice] = useState("");

  const renderCard = useCallback(async () => {
    if (!canvasRef.current) return;
    await document.fonts?.ready;
    makeCard(canvasRef.current, { title, summary, imam, mosque, city });
  }, [title, summary, imam, mosque, city]);

  useEffect(() => {
    if (isOpen) void renderCard();
  }, [isOpen, renderCard]);

  useEffect(() => {
    if (!isOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  const getBlob = () => new Promise<Blob | null>((resolve) => canvasRef.current?.toBlob(resolve, "image/png"));
  const pageUrl = typeof window === "undefined" ? `https://minbararhive.ru/khutba/${id}` : window.location.href;

  const shareCard = async () => {
    const blob = await getBlob();
    if (!blob) return;
    const file = new File([blob], `minbar-hutba-${id}.png`, { type: "image/png" });

    try {
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          title: `${title} — Minbar`,
          text: `${summary}\n\nСлушать хутбу: ${pageUrl}`,
          files: [file],
        });
      } else if (navigator.share) {
        await navigator.share({ title: `${title} — Minbar`, text: summary, url: pageUrl });
      } else {
        downloadCard(blob);
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setNotice("Не получилось открыть меню отправки. Карточку можно скачать.");
    }
  };

  const downloadCard = (providedBlob?: Blob) => {
    const finishDownload = (blob: Blob | null) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `minbar-hutba-${id}.png`;
      anchor.click();
      URL.revokeObjectURL(url);
      setNotice("Карточка сохранена.");
    };
    if (providedBlob) finishDownload(providedBlob);
    else void getBlob().then(finishDownload);
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl);
      setNotice("Ссылка на хутбу скопирована.");
    } catch {
      setNotice("Не удалось скопировать ссылку.");
    }
  };

  return (
    <>
      <button className="button button-secondary" type="button" onClick={() => { setNotice(""); setIsOpen(true); }}>
        Поделиться карточкой
      </button>
      {isOpen && (
        <div className="share-card-backdrop" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setIsOpen(false);
        }}>
          <section className="share-card-dialog" role="dialog" aria-modal="true" aria-labelledby="share-card-title">
            <div className="share-card-heading">
              <div>
                <p className="eyebrow">Поделиться мыслью</p>
                <h2 id="share-card-title">Карточка готова</h2>
              </div>
              <button className="share-card-close" type="button" aria-label="Закрыть" onClick={() => setIsOpen(false)}>×</button>
            </div>
            <canvas ref={canvasRef} className="share-card-canvas" aria-label={`Карточка хутбы «${title}»`} />
            <div className="share-card-actions">
              <button className="button button-primary" type="button" onClick={() => void shareCard()}>Отправить</button>
              <button className="button button-secondary" type="button" onClick={() => downloadCard()}>Скачать PNG</button>
              <button className="button button-secondary" type="button" onClick={() => void copyLink()}>Скопировать ссылку</button>
            </div>
            {notice && <p className="share-card-notice" role="status">{notice}</p>}
          </section>
        </div>
      )}
    </>
  );
}
