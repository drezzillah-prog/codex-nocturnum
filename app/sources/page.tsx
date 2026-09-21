import { SectionDivider } from "@/components/Ornaments";
import { sources } from "@/data/codex";

export const metadata = { title: "Sources & Bibliography" };

export default function SourcesPage() {
  const grouped = sources.reduce<Record<string, typeof sources>>((acc, source) => {
    (acc[source.kind] ??= []).push(source);
    return acc;
  }, {});
  return <div className="paper-page"><header className="page-hero page-width"><p className="eyebrow">Apparatus · Bibliographia</p><h1>Sources & Bibliography</h1><p className="lede">A visible source trail is part of the design, not an appendix added later. Entries distinguish primary material, folklore collections, historical studies, reference works and museum holdings.</p><SectionDivider /></header><section className="page-width bibliography-intro"><div className="notice-card"><strong>Publication note</strong><p>The current bibliography demonstrates the source architecture. Before public scholarly publication, every article should receive entry-level fact checking, precise editions and page-level citations where possible.</p></div></section><section className="page-width bibliography">{Object.entries(grouped).map(([kind, items]) => <div className="source-group" key={kind}><div className="source-group__heading"><span>{String(items?.length ?? 0).padStart(2,"0")}</span><h2>{kind}</h2></div><ol>{items?.map(source => <li key={source.id}><div><strong>{source.author}</strong><cite>{source.title}</cite></div><span>{source.year}</span>{source.detail && <p>{source.detail}</p>}</li>)}</ol></div>)}</section></div>;
}
