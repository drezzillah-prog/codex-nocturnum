import type { CSSProperties } from "react";
import Link from "next/link";
import type { Liber } from "@/data/codex";
import { VolumeSymbol } from "./Ornaments";

export function LiberCard({ liber, index }: { liber: Liber; index: number }) {
  return (
    <article className="liber-card" style={{ "--card-index": index } as CSSProperties}>
      <div className="liber-card__head"><span className="liber-card__roman">LIBER {liber.roman}</span><VolumeSymbol sigil={liber.sigil} /></div>
      <div className="liber-card__body"><h2>{liber.title}</h2><p className="liber-card__tagline">{liber.tagline}</p><p>{liber.description}</p></div>
      <div className="liber-card__footer"><span>{liber.sections.slice(0,3).join(" · ")}</span><Link href={`/liber/${liber.slug}`} aria-label={`Open LIBER ${liber.roman}, ${liber.title}`}>Open volume <span aria-hidden="true">→</span></Link></div>
    </article>
  );
}
