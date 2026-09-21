"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { libers } from "@/data/codex";
import { BrandSeal } from "./Ornaments";

const mainLinks = [
  ["/", "Home"],
  ["/codex", "The Codex"],
  ["/archive", "Archive"],
  ["/about", "About"],
  ["/sources", "Sources"],
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="site-header">
      <a className="skip-link" href="#main">Skip to archive content</a>
      <div className="header-inner">
        <Link href="/" className="brand" aria-label="Codex Nocturnum home">
          <BrandSeal compact />
          <span className="brand-wordmark"><strong>CODEX NOCTURNUM</strong><small>Archive of Witchcraft, Ritual & Lore</small></span>
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {mainLinks.slice(0,3).map(([href,label]) => <Link key={href} href={href} className={pathname === href ? "is-current" : ""}>{label}</Link>)}
          <details className="liber-menu">
            <summary>LIBER</summary>
            <div className="liber-menu__panel">
              {libers.map((liber) => <Link key={liber.slug} href={`/liber/${liber.slug}`}><span>{liber.roman}</span>{liber.shortTitle}</Link>)}
            </div>
          </details>
          {mainLinks.slice(3).map(([href,label]) => <Link key={href} href={href} className={pathname === href ? "is-current" : ""}>{label}</Link>)}
          <Link className="nav-search" href="/search" aria-label="Search the Codex">⌕ <span>Search</span></Link>
        </nav>
        <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="mobile-codex-index" onClick={() => setOpen(v => !v)}><span>{open ? "Close" : "Index"}</span><i aria-hidden="true" /></button>
      </div>
      <div id="mobile-codex-index" className={`mobile-index ${open ? "is-open" : ""}`} onClick={() => setOpen(false)}>
        <div className="mobile-index__inner">
          <p className="eyebrow">Codex index</p>
          <div className="mobile-index__main">
            {mainLinks.map(([href,label]) => <Link key={href} href={href}>{label}</Link>)}
            <Link href="/search">Search the Codex</Link>
          </div>
          <div className="mobile-index__libers">
            {libers.map((liber) => <Link key={liber.slug} href={`/liber/${liber.slug}`}><span>LIBER {liber.roman}</span><strong>{liber.shortTitle}</strong></Link>)}
          </div>
        </div>
      </div>
    </header>
  );
}
