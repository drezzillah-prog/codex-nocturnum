import { EuropeMap } from "./EuropeMap";
import type { Liber } from "@/data/codex";

export function LiberFeature({ liber }: { liber: Liber }) {
  if (liber.slug === "folklore-lore") return <EuropeMap />;
  if (liber.slug === "the-almanac") return <CelestialTable />;
  if (liber.slug === "the-herbarium") return <BotanicalTable />;
  if (liber.slug === "the-apothecary") return <ApothecaryCabinet />;
  if (liber.slug === "divination") return <SymbolIndex />;
  if (liber.slug === "the-workshop") return <WorkshopBench />;
  return <GrimoireLeaf />;
}

function CelestialTable() {
  return <section className="liber-feature celestial-table" aria-labelledby="celestial-heading"><div><p className="eyebrow">Calendarium</p><h2 id="celestial-heading">A year read in rings</h2><p>The almanac keeps solar turning points, moon phases, feast days and local agricultural custom on separate tracks so one calendar never impersonates another.</p></div><div className="celestial-plate" aria-hidden="true"><div className="orbit orbit--1"><span>☾</span></div><div className="orbit orbit--2"><span>✦</span></div><div className="orbit orbit--3"><span>☉</span></div><i className="axis axis--v"/><i className="axis axis--h"/><strong>ANNO<br/>MMXXVI</strong></div><div className="calendar-legend"><span><i>☉</i> Solar year</span><span><i>☾</i> Lunar observation</span><span><i>✣</i> Agricultural custom</span><span><i>†</i> Feast-day record</span></div></section>;
}
function BotanicalTable() {
  return <section className="liber-feature botanical-table"><div className="botanical-sheet" aria-hidden="true"><div className="botanical-stem"><i/><i/><i/><i/><span>Herb. No. 014</span></div></div><div><p className="eyebrow">Specimen protocol</p><h2>Botany first. Lore second.</h2><p>Every herbarium folio separates identification from cultural interpretation. Common name, Latin name, season and region sit beside — not underneath — folklore and symbolism.</p><dl className="mini-ledger"><div><dt>Identity</dt><dd>Botanical name & specimen notes</dd></div><div><dt>Record</dt><dd>Historical use in named sources</dd></div><div><dt>Lore</dt><dd>Region-specific belief and custom</dd></div><div><dt>Safety</dt><dd>Modern context where relevant</dd></div></dl></div></section>;
}
function ApothecaryCabinet() {
  const labels = ["OLEA", "RESINAE", "AQUAE", "SALES", "AROMATA", "NOTAE"];
  return <section className="liber-feature cabinet-feature"><div><p className="eyebrow">Materia domestica</p><h2>The cabinet remembers context.</h2><p>Historical preparations are indexed as material culture. Old medicinal claims remain historical claims; hazardous recipes and toxic combinations are not converted into instructions.</p></div><div className="cabinet" aria-label="Decorative apothecary cabinet index">{labels.map((label,i)=><div className="cabinet-drawer" key={label}><span>{String(i+1).padStart(2,"0")}</span><strong>{label}</strong><i aria-hidden="true"/></div>)}</div></section>;
}
function SymbolIndex() {
  return <section className="liber-feature symbol-index"><div><p className="eyebrow">Tabula symbolorum</p><h2>Meaning has a date.</h2><p>A symbol may change between a Renaissance card game, an eighteenth-century cartomantic system and a modern reading practice. The index preserves those layers.</p></div><div className="symbol-cards" aria-hidden="true"><div><span>☉</span><small>SOL</small></div><div><span>☾</span><small>LUNA</small></div><div><span>✦</span><small>STELLA</small></div></div></section>;
}
function WorkshopBench() {
  return <section className="liber-feature workshop-feature"><div className="workshop-grid" aria-hidden="true"><span>01<br/><b>PAPER</b></span><span>02<br/><b>THREAD</b></span><span>03<br/><b>SPECIMEN</b></span><span>04<br/><b>LABEL</b></span></div><div><p className="eyebrow">Officina</p><h2>Make slowly. Label precisely.</h2><p>Projects favour ordinary materials, conservation-minded collecting and clear provenance over theatrical faux-antiquity.</p></div></section>;
}
function GrimoireLeaf() {
  return <section className="liber-feature grimoire-feature"><div><p className="eyebrow">Rubrica ritualis</p><h2>No invented antiquity.</h2><p>When a practice is reconstructed, the reconstruction is part of the title and label. Historical parallels are cited as parallels, not transformed into a fictional continuous lineage.</p></div><div className="ritual-schema"><span>CONTEXT</span><i>→</i><span>MATERIAL</span><i>→</i><span>SYMBOL</span><i>→</i><span>PRACTICE</span><i>→</i><span>SOURCE</span></div></section>;
}
