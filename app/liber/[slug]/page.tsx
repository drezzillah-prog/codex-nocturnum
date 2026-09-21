import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArchiveCard } from "@/components/ArchiveCard";
import { LiberFeature } from "@/components/LiberFeature";
import { FolioNumber, SectionDivider, VolumeSymbol } from "@/components/Ornaments";
import { entriesForLiber, getLiber, libers } from "@/data/codex";

export function generateStaticParams() { return libers.map(liber => ({ slug: liber.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const liber = getLiber(slug);
  return liber ? { title: `LIBER ${liber.roman} — ${liber.shortTitle}`, description: liber.description } : {};
}

export default async function LiberPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const liber = getLiber(slug);
  if (!liber) notFound();
  const volumeEntries = entriesForLiber(liber.slug);
  const index = libers.findIndex(v => v.slug === liber.slug);
  const prev = index > 0 ? libers[index - 1] : null;
  const next = index < libers.length - 1 ? libers[index + 1] : null;

  return <div className={`paper-page liber-page liber-page--${liber.slug}`}>
    <header className="liber-hero page-width">
      <div className="liber-hero__mark"><VolumeSymbol sigil={liber.sigil} /><span>VOLUME {liber.roman} / VII</span></div>
      <div className="liber-hero__copy"><p className="eyebrow">LIBER {liber.roman}</p><h1>{liber.title}</h1><p className="liber-hero__tagline">{liber.tagline}</p><p>{liber.description}</p></div>
      <aside className="liber-hero__index"><span>In this volume</span><ol>{liber.sections.map(section => <li key={section}>{section}</li>)}</ol></aside>
    </header>
    <div className="page-width"><SectionDivider /></div>
    <div className="page-width"><LiberFeature liber={liber} /></div>
    <section className="page-width volume-entries"><div className="section-heading"><div><p className="eyebrow">Folios in this volume</p><h2>Selected archive entries</h2></div><p>{volumeEntries.length} folios are currently catalogued in this volume.</p></div>{volumeEntries.length ? <div className="archive-grid">{volumeEntries.map(entry => <ArchiveCard entry={entry} key={entry.slug}/>)}</div> : <div className="empty-state"><span>∴</span><h2>The shelves are being catalogued.</h2></div>}</section>
    <nav className="volume-nav page-width" aria-label="Adjacent volumes">{prev ? <Link href={`/liber/${prev.slug}`}><span>Previous volume</span><strong>← LIBER {prev.roman} · {prev.shortTitle}</strong></Link> : <span/>}{next ? <Link href={`/liber/${next.slug}`}><span>Next volume</span><strong>LIBER {next.roman} · {next.shortTitle} →</strong></Link> : <span/>}</nav>
    <FolioNumber>LIB. {liber.roman}</FolioNumber>
  </div>;
}
