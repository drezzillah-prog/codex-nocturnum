import Link from "next/link";
import { ArchiveCard } from "@/components/ArchiveCard";
import { BrandSeal } from "@/components/Ornaments";
import { entries, libers } from "@/data/codex";

const pathways = [
  { label: "Region", title: "Places & Traditions", detail: "Romania · Balkans · Europe", href: "/archive?q=Romania" },
  { label: "Time", title: "Periods & Calendars", detail: "Season · century · feast day", href: "/archive?q=19th" },
  { label: "Matter", title: "Plants & Materials", detail: "Herbs · trees · resins · waters", href: "/archive?q=Herbs" },
  { label: "Practice", title: "Ritual & Custom", detail: "Protection · remembrance · household", href: "/archive?q=Protection" },
  { label: "Sign", title: "Symbols & Divination", detail: "Cards · dreams · omens · moon", href: "/archive?q=Symbols" },
  { label: "Evidence", title: "Sources & Status", detail: "Documented · folklore · reconstruction", href: "/sources" },
];

export default function HomePage() {
  return (
    <div className="home-v3">
      <section className="hero hero-v3">
        <div className="hero-v3__frame" aria-hidden="true" />
        <div className="hero__content hero-v3__content">
          <p className="kicker">ARCHIVUM · FOLKLORE · RITUAL · MATERIA</p>
          <BrandSeal />
          <h1>CODEX <em>NOCTURNUM</em></h1>
          <p className="hero__subtitle">An Archive of Witchcraft, Ritual & Lore</p>
          <p className="hero-v3__lead">
            Open the archive. Read the past by place, period, source and surviving trace.
          </p>
          <div className="hero__actions">
            <Link className="button-primary" href="/codex">Open the Codex</Link>
            <Link className="button-ghost" href="/archive">Consult the Archive</Link>
          </div>
        </div>
        <div className="hero-v3__marginalia" aria-hidden="true">
          <span>FOL. 001</span>
          <i />
          <span>ARCHIVUM NOCTURNUM</span>
        </div>
      </section>

      <section className="home-index-v3 page-width">
        <header className="home-section-title">
          <div>
            <p className="eyebrow">Tabula librorum</p>
            <h2>The Seven Volumes</h2>
          </div>
          <p>Seven principal reading rooms. Compact by design; every folio can still cross-reference another volume.</p>
        </header>

        <div className="home-volume-ledger">
          {libers.map((liber) => (
            <Link href={`/liber/${liber.slug}`} className="home-volume-row" key={liber.slug}>
              <span className="home-volume-row__roman">{liber.roman}</span>
              <span className="home-volume-row__title">{liber.shortTitle}</span>
              <span className="home-volume-row__desc">{liber.tagline}</span>
              <span className="home-volume-row__arrow">↗</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-pathways">
        <div className="page-width">
          <header className="home-section-title home-section-title--light">
            <div>
              <p className="eyebrow">Index paths</p>
              <h2>Enter by what you know.</h2>
            </div>
            <p>No need to choose a volume first. The archive can also be read by geography, period, object, symbol or evidence type.</p>
          </header>

          <div className="home-pathways__grid">
            {pathways.map((path) => (
              <Link href={path.href} key={path.title}>
                <span>{path.label}</span>
                <strong>{path.title}</strong>
                <small>{path.detail}</small>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="home-folios-v3 page-width">
        <header className="home-section-title">
          <div>
            <p className="eyebrow">Selected folios</p>
            <h2>Three pages left open.</h2>
          </div>
          <Link className="text-link" href="/archive">Full catalogue →</Link>
        </header>

        <div className="archive-grid archive-grid--home">
          {entries.slice(0, 3).map((entry) => <ArchiveCard entry={entry} key={entry.slug} compact />)}
        </div>
      </section>

      <section className="home-regional-v3 page-width">
        <div className="home-regional-v3__copy">
          <p className="eyebrow">LIBER VI · Geographic index</p>
          <h2>Folklore belongs somewhere.</h2>
          <p>Browse traditions as regional records rather than one generic European mythology. Romania, the Balkans, Central Europe and the rest of the archive remain visibly distinct.</p>
          <div>
            <Link className="button-ghost" href="/liber/folklore-lore">Open Folklore & Lore</Link>
            <Link className="text-link" href="/archive?q=Romania">Begin with Romania →</Link>
          </div>
        </div>
        <div className="home-regional-v3__plate" aria-hidden="true">
          <div className="home-regional-v3__maplines" />
          <span className="home-regional-v3__pin home-regional-v3__pin--1">RO</span>
          <span className="home-regional-v3__pin home-regional-v3__pin--2">BLK</span>
          <span className="home-regional-v3__pin home-regional-v3__pin--3">CE</span>
          <span className="home-regional-v3__pin home-regional-v3__pin--4">FR</span>
        </div>
      </section>

      <section className="home-editorial-v3">
        <div className="page-width home-editorial-v3__inner">
          <div>
            <p className="eyebrow">Editorial rule</p>
            <h2>Atmosphere does not replace evidence.</h2>
          </div>
          <p>Historical documentation, folklore, oral tradition, modern reconstruction and contemporary practice remain separately labelled throughout the Codex.</p>
          <Link href="/about">Read the method →</Link>
        </div>
      </section>
    </div>
  );
}
