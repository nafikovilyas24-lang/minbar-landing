"use client";

import Link from "next/link";
import { useState } from "react";
import { CloseIcon } from "@/components/icons";

export function Brand() {
  return (
    <Link href="/" className="brand" aria-label="Minbar — главная">
      <svg className="brand-mark" width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
        <rect x="1" y="1" width="32" height="32" rx="9" fill="currentColor" />
        <path d="M9.5 23.5V11.2l7.5 7.2 7.5-7.2v12.3" stroke="#151515" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="brand-copy"><strong>Minbar</strong><small>архив хутб</small></span>
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="header-inner section-shell">
        <Brand />
        <nav className={`main-nav${open ? " is-open" : ""}`} aria-label="Главная навигация">
          <div className="mobile-nav-top"><Brand /><button className="icon-button" onClick={close} aria-label="Закрыть меню"><CloseIcon /></button></div>
          <Link href="/archive" onClick={close}>Архив</Link>
          <Link href="/upload" onClick={close}>Загрузить</Link>
          <a className="telegram-link" href="https://t.me/minbar_archive_bot" target="_blank" rel="noreferrer">Telegram <span aria-hidden="true">↗</span></a>
        </nav>
        <button className="menu-button" onClick={() => setOpen(true)} aria-label="Открыть меню"><span /><span /></button>
      </div>
    </header>
  );
}
