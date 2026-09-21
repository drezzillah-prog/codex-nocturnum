import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArchiveCard } from "@/components/ArchiveCard";
import { EvidenceBadges, FolioNumber, SectionDivider } from "@/components/Ornaments";
import { entries, getEntry, getLiber, getSource } from "@/data/codex";

export function generateStaticParams() { return entries.map(entry => ({ slug: entry.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = getEntry(slug);
  return entry ? { title: entry.title, description: entry.excerpt } : {};
}

export default async function EntryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getEntry(slug);
  if (!entry) notFound();
  const liber = getLiber(entry.liber)!;
  const sourceList = entry.sourceIds.map(getSource).filter(Boolean);
  const related = entry.related.map(getEntry).filter(Boolean).slice(0,3);

  return <div className="entry-page paper-page">
    <div className="entry-ribbon" aria-hidden="true">LIBER {liber.roman}</div>
    <header className="entry-header page-width">
      <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/archive">Archive</Link><span>/</span><Link href={`/liber/${liber.slug}`}>LIBER {liber.roman}</Link><span>/</span><span>{entry.category}</span></nav>
      <p className="eyebrow">Folio · {entry.category}</p><h1>{entry.title}</h1><p className="entry-subtitle">{entry.subtitle}</p><EvidenceBadges labels={entry.labels}/>
      <dl className="entry-ledger"><div><dt>LIBER</dt><dd>{liber.roman} — {liber.shortTitle}</dd></div><div><dt>Region</dt><dd>{entry.region}</dd></div><div><dt>Period</dt><dd>{entry.period}</dd></div><div><dt>Category</dt><dd>{entry.category}</dd></div></dl>
      <SectionDivider />
    </header>

    <article className="entry-layout page-width">
      <aside className="entry-margin entry-margin--left"><div className="marginal-note"><span>Context</span><p>{entry.historicalContext}</p></div>{entry.specimen && <div className="specimen-label"><span>Specimen card</span><strong>{entry.specimen.commonName}</strong><em>{entry.specimen.latinName}</em><dl><div><dt>Season</dt><dd>{entry.specimen.season}</dd></div><div><dt>Record</dt><dd>{entry.specimen.historicalUses}</dd></div><div><dt>Lore</dt><dd>{entry.specimen.folklore}</dd></div><div><dt>Symbol</dt><dd>{entry.specimen.symbolicAssociations}</dd></div></dl></div>}</aside>
      <div className="entry-body"><p className="dropcap">{entry.excerpt}</p>{entry.sections.map(section => <section key={section.heading}><h2>{section.heading}</h2>{section.body.map((p,i)=><p key={i}>{p}</p>)}</section>)}{entry.safety && <div className="safety-note"><span>Safety / modern context</span><p>{entry.safety}</p></div>}{entry.variants?.length ? <section><h2>Variants & local differences</h2><ul className="ornamental-list">{entry.variants.map(v => <li key={v}>{v}</li>)}</ul></section> : null}{entry.notes?.length ? <section><h2>Archivist’s notes</h2><ul className="ornamental-list">{entry.notes.map(v => <li key={v}>{v}</li>)}</ul></section> : null}</div>
      <aside className="entry-margin entry-margin--right"><div className="margin-index"><span>Index terms</span>{entry.tags.map(tag => <Link key={tag} href={`/archive?tag=${encodeURIComponent(tag)}`}>{tag}</Link>)}</div></aside>
    </article>

    <section className="sources-panel page-width"><div className="sources-panel__heading"><p className="eyebrow">Apparatus</p><h2>Sources</h2><p>These sources support the prototype’s historical framing. Publication should add precise edition and page references.</p></div><ol>{sourceList.map((source,i) => source && <li key={source.id}><span>{String(i+1).padStart(2,"0")}</span><div><strong>{source.author}</strong><cite>{source.title}</cite><p>{source.year}{source.detail ? ` · ${source.detail}` : ""}</p></div><em>{source.kind}</em></li>)}</ol></section>
    {related.length > 0 && <section className="related-panel page-width"><div className="section-heading"><div><p className="eyebrow">Marginal cross-references</p><h2>Related folios</h2></div></div><div className="archive-grid">{related.map(e => e && <ArchiveCard key={e.slug} entry={e} compact />)}</div></section>}
    <FolioNumber>{entry.slug.toUpperCase().slice(0,18)}</FolioNumber>
  </div>;
}
