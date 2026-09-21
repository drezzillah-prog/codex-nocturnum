import { LiberCard } from "@/components/LiberCard";
import { FolioNumber, SectionDivider } from "@/components/Ornaments";
import { libers } from "@/data/codex";

export const metadata = { title: "The Codex" };

export default function CodexPage() {
  return (
    <div className="paper-page">
      <header className="page-hero page-width"><p className="eyebrow">Tabula Librorum · General Index</p><h1>The Codex</h1><p className="lede">Seven volumes form the principal architecture of the archive. Each is a reading room rather than a sealed category: plants enter ritual, calendars enter folklore, and objects carry meanings across regions.</p><SectionDivider /></header>
      <section className="page-width codex-intro"><aside className="marginal-note"><span>Nota bene</span><p>Cross-links preserve context. Similarity does not imply shared origin.</p></aside><div><h2>How to read this archive</h2><p>Begin with a LIBER if you know the kind of material you want. Use the Archive if you know a place, period, plant, season, source type or theme. Evidence labels remain attached to every folio so modern reconstruction never quietly becomes “ancient tradition.”</p></div></section>
      <section className="page-width liber-grid liber-grid--codex">{libers.map((liber, index) => <LiberCard liber={liber} index={index} key={liber.slug} />)}</section>
      <FolioNumber>COD. INDEX</FolioNumber>
    </div>
  );
}
