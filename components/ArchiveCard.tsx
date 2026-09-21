import Link from "next/link";
import type { Entry } from "@/data/codex";
import { getLiber } from "@/data/codex";
import { EvidenceBadges } from "./Ornaments";

export function ArchiveCard({ entry, compact = false }: { entry: Entry; compact?: boolean }) {
  const liber = getLiber(entry.liber);
  return (
    <article className={`archive-card ${compact ? "archive-card--compact" : ""}`}>
      <div className="archive-card__meta"><span>LIBER {liber?.roman}</span><span>{entry.region}</span><span>{entry.period}</span></div>
      <h3><Link href={`/archive/${entry.slug}`}>{entry.title}</Link></h3>
      <p className="archive-card__subtitle">{entry.subtitle}</p>
      {!compact && <p>{entry.excerpt}</p>}
      <EvidenceBadges labels={entry.labels} />
      <div className="tag-row">{entry.tags.slice(0, compact ? 3 : 5).map(tag => <span className="tag" key={tag}>{tag}</span>)}</div>
      <Link className="text-link" href={`/archive/${entry.slug}`}>Open folio <span aria-hidden="true">→</span></Link>
    </article>
  );
}
