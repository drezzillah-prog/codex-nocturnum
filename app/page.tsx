import Link from "next/link";
import { ArchiveCard } from "@/components/ArchiveCard";
import { LiberCard } from "@/components/LiberCard";
import { BrandSeal, SectionDivider } from "@/components/Ornaments";
import { entries, featuredTags, libers } from "@/data/codex";

export default function HomePage() {
  return (
    <>
      <section className="hero manuscript-edge">
        <div className="hero__ornament hero__ornament--left" aria-hidden="true"><span>✦</span><i /><i /><i /></div>
        <div className="hero__content">
          <p className="kicker">ARCHIVUM · FOLKLORE · RITUAL · MATERIA</p>
          <BrandSeal />
          <h1>CODEX<br/><em>NOCTURNUM</em></h1>
          <p className="hero__subtitle">An Archive of Witchcraft, Ritual & Lore</p>
          <SectionDivider />
          <div className="hero__intro">
            <p>Open the archive.</p>
            <p>Within these pages lie fragments of seasonal rites, botanical knowledge, folklore, divination, household magic, old beliefs and practices carried across generations.</p>
            <p className="hero__whisper"><span>Some were written.</span><span>Some were whispered.</span><span>Some survived only in objects, songs, customs and memory.</span></p>
          </div>
          <div className="hero__actions"><Link className="button-primary" href="/codex">Open the Codex</Link><Link className="button-ghost" href="/archive">Consult the archive</Link></div>
        </div>
        <div className="hero__folio" aria-hidden="true">FOL. 001</div>
        <div className="hero__ornament hero__ornament--right" aria-hidden="true"><i /><i /><i /><span>☾</span></div>
      </section>

      <section className="editorial-note page-width">
        <div className="editorial-note__mark">N.</div>
        <div><p className="eyebrow">Editorial principle</p><h2>The archive keeps its categories visible.</h2></div>
        <p>Historical documentation, folklore, oral tradition, modern reconstruction and contemporary practice are labelled separately. A beautiful story is not turned into a fact merely because it survived.</p>
      </section>

      <section className="libers-section page-width">
        <div className="section-heading"><div><p className="eyebrow">Tabula Librorum</p><h2>The Seven Volumes</h2></div><p>Enter by subject, then follow the marginal links wherever the archive leads.</p></div>
        <div className="liber-grid">{libers.map((liber, index) => <LiberCard liber={liber} index={index} key={liber.slug} />)}</div>
      </section>

      <section className="index-strip">
        <div className="page-width index-strip__inner"><div><p className="eyebrow">Index marks</p><h2>Browse the Codex by trace, not only by chapter.</h2></div><div className="tag-cloud">{featuredTags.map(tag => <Link href={`/archive?tag=${encodeURIComponent(tag)}`} key={tag}>{tag}</Link>)}</div></div>
      </section>

      <section className="featured-folios page-width">
        <div className="section-heading"><div><p className="eyebrow">Selected folios</p><h2>Recently opened pages</h2></div><Link className="text-link" href="/archive">View full archive →</Link></div>
        <div className="archive-grid archive-grid--home">{entries.slice(0, 3).map(entry => <ArchiveCard entry={entry} key={entry.slug} />)}</div>
      </section>

      <section className="quote-leaf page-width">
        <div className="quote-leaf__rule" /><blockquote>“The work of an archive is not to make the past tidy. It is to preserve the threads long enough that their differences can still be seen.”</blockquote><span>— Codex editorial note</span>
      </section>
    </>
  );
}
