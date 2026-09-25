"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BrandSeal } from "./Ornaments";
import { MarketBadge } from "./MarketBadge";
import { useMarket } from "./PricingProvider";
import { getUi } from "@/data/i18n";

const marks = {
  codex: "Ⅶ",
  cabinet: "✦",
  intentions: "◇",
  bespoke: "⌁",
  archive: "☾",
};

export function SiteHeader() {
  const [open,setOpen] = useState(false);
  const pathname = usePathname();
  const { language } = useMarket();
  const copy = getUi(language);

  const nav = [
    ["/codex", copy.nav.codex, marks.codex],
    ["/shop", copy.nav.cabinet, marks.cabinet],
    ["/intentions", copy.nav.intentions, marks.intentions],
    ["/bespoke", copy.nav.bespoke, marks.bespoke],
    ["/archive", copy.nav.archive, marks.archive],
  ] as const;

  return (
    <header className="site-header site-header--v6">
      <a className="skip-link" href="#main">Skip to archive content</a>
      <div className="header-v6">
        <Link href="/" className="brand brand--v6" aria-label="Codex Nocturnum home">
          <BrandSeal compact />
          <span className="brand-wordmark">
            <strong>CODEX NOCTURNUM</strong>
            <small>ARCHIVUM · RITUAL · LORE</small>
          </span>
        </Link>

        <nav className="sigil-nav" aria-label="Primary navigation">
          {nav.map(([href,label,mark]) => (
            <Link href={href} key={href} className={pathname===href || (href!=="/" && pathname.startsWith(href)) ? "is-current" : ""}>
              <i aria-hidden="true">{mark}</i><span>{label}</span>
            </Link>
          ))}
        </nav>

        <div className="header-v6__tools">
          <MarketBadge />
          <Link className="header-v6__search" href="/search" aria-label={copy.nav.search}>⌕</Link>
          <button className="menu-toggle menu-toggle--v6" type="button" aria-expanded={open} onClick={()=>setOpen(v=>!v)}>
            <span>{open ? "Close" : "Index"}</span><i aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className={`mobile-v6 ${open ? "is-open" : ""}`} onClick={()=>setOpen(false)}>
        <div className="mobile-v6__inner">
          {nav.map(([href,label,mark]) => <Link href={href} key={href}><i>{mark}</i><strong>{label}</strong></Link>)}
          <div className="mobile-v6__secondary">
            <Link href="/sources">Sources & Bibliography</Link>
            <Link href="/about">About the Archive</Link>
            <Link href="/search">{copy.nav.search}</Link>
          </div>
          <MarketBadge />
        </div>
      </div>
    </header>
  );
}
