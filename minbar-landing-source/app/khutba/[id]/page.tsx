import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PlayButton } from "@/components/audio-player";
import { khutbas } from "@/lib/khutbas";
import { loadKhutba } from "@/lib/supabase-khutbas";

type PageProps = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const khutba = await loadKhutba(Number(id));
  if (!khutba) return { title: "Хутба не найдена", openGraph: { images: [] }, twitter: { images: [] } };
  return {
    title: khutba.title,
    description: `${khutba.imam}, ${khutba.mosque}, ${khutba.city}. ${khutba.summary}`,
    openGraph: { title: khutba.title, description: khutba.summary, images: [] },
    twitter: { title: khutba.title, description: khutba.summary, images: [] },
  };
}

export default async function KhutbaPage({ params }: PageProps) {
  const { id } = await params;
  const khutba = await loadKhutba(Number(id));
  if (!khutba) notFound();
  return (
    <main className="page-main">
      <article className="detail section-shell">
        <Link className="back-link" href="/archive">← Вернуться в архив</Link>
        <div className="detail-header">
          <div><div className="detail-tags"><span>{khutba.language}</span><span>{khutba.topic}</span></div><h1>{khutba.title}</h1><p>{khutba.summary}</p></div>
          <PlayButton track={khutba} label="Слушать хутбу" large />
        </div>
        <div className="detail-player">
          <div className="waveform" aria-hidden="true">{Array.from({ length: 72 }, (_, index) => <i key={index} style={{ height: `${22 + ((index * 17) % 53)}%` }} />)}</div>
          <div className="detail-player-labels"><span>0:00</span><span>{khutba.duration}</span></div>
        </div>
        <div className="detail-content">
          <section><p className="eyebrow">О хутбе</p><h2>{khutba.topic}</h2><p>{khutba.summary} Эта запись опубликована в Minbar, чтобы к ней можно было вернуться в удобное время и поделиться с близкими.</p></section>
          <dl>
            <div><dt>Хазрат</dt><dd>{khutba.imam}</dd></div><div><dt>Мечеть</dt><dd>{khutba.mosque}</dd></div><div><dt>Город</dt><dd>{khutba.city}</dd></div><div><dt>Дата</dt><dd>{khutba.date}</dd></div><div><dt>Язык</dt><dd>{khutba.language}</dd></div><div><dt>Длительность</dt><dd>{khutba.duration}</dd></div>
          </dl>
        </div>
      </article>
    </main>
  );
}

export function generateStaticParams() { return khutbas.map((khutba) => ({ id: String(khutba.id) })); }
