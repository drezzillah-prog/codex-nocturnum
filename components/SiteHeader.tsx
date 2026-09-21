"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { libers } from "@/data/codex";
import { BrandSeal } from "./Ornaments";

const researchLinks = [
  ["/search", "Search the Codex", "Find a place, symbol, plant, period or custom"],
  ["/sources", "Sources & Bibliography", "Trace the archive back to its evidence"],
  ["/about", "About the Archive", "Method, scope and editorial principles"],
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="site-header site-header--archive">
      <a className="skip-link" href="#main">Skip to archive content</a>

      <div className="header-inner header-inner--archive">
        <Link href="/" className="brand" aria-label="Codex Nocturnum home">
          <BrandSeal compact />
          <span className="brand-wordmark">
            <strong>CODEX NOCTURNUM</strong>
            <small>Archive of Witchcraft, Ritual & Lore</small>
          </span>
        </Link>

        <nav className="archive-nav" aria-label="Primary navigation">
          <Link href="/codex" className={pathname === "/codex" ? "is-current" : ""}>
            <span>I</span>
            <strong>The Codex</strong>
            <small>Start here</small>
          </Link>

          <details className="archive-nav__group">
            <summary>
              <span>II</span>
              <strong>Volumes</strong>
              <small>Seven LIBER</small>
            </summary>
            <div className="archive-mega archive-mega--volumes">
              <div className="archive-mega__intro">
                <p className="eyebrow">Tabula librorum</p>
                <h2>The Seven Volumes</h2>
                <p>Enter the archive by subject, then follow cross-references between regions, periods and source types.</p>
              </div>
              <div className="archive-mega__grid">
                {libers.map((liber) => (
                  <Link key={liber.slug} href={`/liber/${liber.slug}`}>
                    <span>LIBER {liber.roman}</span>
                    <strong>{liber.shortTitle}</strong>
                    <small>{liber.tagline}</small>
                  </Link>
                ))}
              </div>
            </div>
          </details>

          <Link href="/archive" className={pathname.startsWith("/archive") ? "is-current" : ""}>
            <span>III</span>
            <strong>Archive</strong>
            <small>Browse all folios</small>
          </Link>

          <Link href="/shop" className={pathname.startsWith("/shop") ? "is-current" : ""}>
            <span>CABINET</span>
            <strong>Shop</strong>
            <small>Objects & editions</small>
          </Link>

          <details className="archive-nav__group">
            <summary>
              <span>IV</span>
              <strong>Research</strong>
              <small>Search & sources</small>
            </summary>
            <div className="archive-mega archive-mega--research">
              <div className="archive-mega__intro">
                <p className="eyebrow">Apparatus</p>
                <h2>Research the archive</h2>
                <p>Search the catalogue, inspect sources, and read the editorial method behind Codex Nocturnum.</p>
              </div>
              <div className="archive-mega__research-links">
                {researchLinks.map(([href, title, description]) => (
                  <Link href={href} key={href}>
                    <strong>{title}</strong>
                    <span>{description}</span>
                  </Link>
                ))}
              </div>
            </div>
          </details>
        </nav>

        <Link className="archive-search-button" href="/search" aria-label="Search the Codex">⌕</Link>

        <button
          className="menu-toggle menu-toggle--archive"
          type="button"
          aria-expanded={open}
          aria-controls="mobile-codex-index"
          onClick={() => setOpen((value) => !value)}
        >
          <span>{open ? "Close" : "Index"}</span>
          <i aria-hidden="true" />
        </button>
      </div>

      <div
        id="mobile-codex-index"
        className={`mobile-index mobile-index--archive ${open ? "is-open" : ""}`}
        onClick={() => setOpen(false)}
      >
        <div className="mobile-index__inner">
          <section className="mobile-index__section">
            <p className="eyebrow">Explore</p>
            <Link href="/codex"><strong>The Codex</strong><span>How the archive is organised</span></Link>
            <Link href="/archive"><strong>Archive</strong><span>All folios, filters and regions</span></Link>
            <Link href="/shop"><strong>The Cabinet</strong><span>Objects, editions and collector pieces</span></Link>
          </section>

          <section className="mobile-index__section">
            <p className="eyebrow">The Seven Volumes</p>
            <div className="mobile-index__libers mobile-index__libers--archive">
              {libers.map((liber) => (
                <Link key={liber.slug} href={`/liber/${liber.slug}`}>
                  <span>LIBER {liber.roman}</span>
                  <strong>{liber.shortTitle}</strong>
                </Link>
              ))}
            </div>
          </section>

          <section className="mobile-index__section">
            <p className="eyebrow">Research</p>
            {researchLinks.map(([href, title]) => <Link href={href} key={href}><strong>{title}</strong></Link>)}
          </section>
        </div>
      </div>
    </header>
  );
}
