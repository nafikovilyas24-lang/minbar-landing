"use client";

import QRCode from "qrcode";
import { useCallback, useEffect, useRef, useState } from "react";

type MosquePosterProps = { mosque: string; city: string; pageUrl: string };

function wrap(context: CanvasRenderingContext2D, text: string, maxWidth: number) {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (!line || context.measureText(candidate).width <= maxWidth) line = candidate;
    else { lines.push(line); line = word; }
  }
  if (line) lines.push(line);
  return lines;
}

export function MosquePoster({ mosque, city, pageUrl }: MosquePosterProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [open, setOpen] = useState(false);

  const drawPoster = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    await document.fonts?.ready;
    canvas.width = 1240;
    canvas.height = 1754;
    const context = canvas.getContext("2d");
    if (!context) return;

    context.fillStyle = "#111310";
    context.fillRect(0, 0, canvas.width, canvas.height);
    const glow = context.createRadialGradient(1010, 180, 10, 1010, 180, 520);
    glow.addColorStop(0, "rgba(201,242,118,.18)");
    glow.addColorStop(1, "rgba(201,242,118,0)");
    context.fillStyle = glow;
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.strokeStyle = "#c9f276";
    context.lineWidth = 4;
    context.beginPath();
    context.arc(116, 116, 54, 0, Math.PI * 2);
    context.stroke();
    context.fillStyle = "#f3f2ec";
    context.textAlign = "center";
    context.font = "600 50px Georgia, serif";
    context.fillText("M", 116, 133);
    context.textAlign = "left";
    context.font = "700 42px Inter, Arial, sans-serif";
    context.fillText("Minbar", 196, 110);
    context.fillStyle = "#858a80";
    context.font = "600 21px Inter, Arial, sans-serif";
    context.fillText("ЦИФРОВОЙ АРХИВ ХУТБ", 196, 146);

    context.fillStyle = "#c9f276";
    context.font = "700 25px Inter, Arial, sans-serif";
    context.fillText("СЛУШАЙТЕ ХУТБЫ НАШЕЙ МЕЧЕТИ", 90, 350);
    context.fillStyle = "#f3f2ec";
    context.font = "600 78px Inter, Arial, sans-serif";
    const mosqueLines = wrap(context, mosque, 1050).slice(0, 3);
    mosqueLines.forEach((line, index) => context.fillText(line, 90, 470 + index * 92));
    const afterTitle = 470 + mosqueLines.length * 92;
    context.fillStyle = "#9b9f96";
    context.font = "500 34px Inter, Arial, sans-serif";
    context.fillText(city, 90, afterTitle + 20);

    const qrCanvas = document.createElement("canvas");
    await QRCode.toCanvas(qrCanvas, pageUrl, { width: 460, margin: 3, color: { dark: "#111310", light: "#f3f2ec" }, errorCorrectionLevel: "H" });
    const qrX = 90;
    const qrY = 1040;
    context.fillStyle = "#f3f2ec";
    context.fillRect(qrX - 22, qrY - 22, 504, 504);
    context.drawImage(qrCanvas, qrX, qrY, 460, 460);

    context.fillStyle = "#f3f2ec";
    context.font = "650 38px Inter, Arial, sans-serif";
    context.fillText("Наведите камеру", 640, 1150);
    context.fillStyle = "#a1a59c";
    context.font = "500 29px Inter, Arial, sans-serif";
    context.fillText("Слушайте записи бесплатно", 640, 1210);
    context.fillText("на сайте и в Telegram-боте.", 640, 1255);
    context.fillStyle = "#c9f276";
    context.font = "700 29px Inter, Arial, sans-serif";
    context.fillText("minbararhive.ru", 640, 1370);

    context.strokeStyle = "#34372f";
    context.beginPath();
    context.moveTo(90, 1640);
    context.lineTo(1150, 1640);
    context.stroke();
    context.fillStyle = "#858a80";
    context.font = "500 23px Inter, Arial, sans-serif";
    context.fillText("Слушайте · Размышляйте · Делитесь", 90, 1690);
  }, [city, mosque, pageUrl]);

  useEffect(() => { if (open) void drawPoster(); }, [open, drawPoster]);

  const download = () => {
    canvasRef.current?.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `minbar-${mosque.toLocaleLowerCase("ru").replace(/\s+/g, "-")}-qr.png`;
      anchor.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }, "image/png");
  };

  return (
    <>
      <button className="button button-primary" type="button" onClick={() => setOpen(true)}>QR-плакат для мечети</button>
      {open && (
        <div className="share-card-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
          <section className="share-card-dialog poster-dialog" role="dialog" aria-modal="true" aria-labelledby="poster-title">
            <div className="share-card-heading">
              <div><p className="eyebrow">Для печати и публикации</p><h2 id="poster-title">QR-плакат готов</h2></div>
              <button className="share-card-close" type="button" aria-label="Закрыть" onClick={() => setOpen(false)}>×</button>
            </div>
            <canvas ref={canvasRef} className="poster-canvas" aria-label={`QR-плакат мечети ${mosque}`} />
            <div className="share-card-actions"><button className="button button-primary" type="button" onClick={download}>Скачать PNG</button></div>
          </section>
        </div>
      )}
    </>
  );
}
