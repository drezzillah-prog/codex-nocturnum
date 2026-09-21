"use client";

import { useMemo, useState, type ChangeEvent } from "react";
import { entries, evidenceLabels, getSource, libers, sources, type EvidenceLabel } from "@/data/codex";
import { ArchiveCard } from "./ArchiveCard";

const allRegions = Array.from(new Set(entries.map(e => e.region))).sort();
const allCountries = Array.from(new Set(entries.map(e => e.country))).sort();
const allPeriods = Array.from(new Set(entries.map(e => e.period))).sort();
const allCategories = Array.from(new Set(entries.map(e => e.category))).sort();
const allTags = Array.from(new Set(entries.flatMap(e => e.tags))).sort();
const allPlants = entries.filter(e => e.specimen).map(e => [e.slug, e.specimen!.commonName]);
const sourceTypes = Array.from(new Set(sources.map(source => source.kind))).sort();
const seasonTerms = ["Winter", "Spring", "Summer", "Autumn", "Harvest", "Moon"];

export function ArchiveExplorer({ initialQuery = "", initialRegion = "" }: { initialQuery?: string; initialRegion?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [liber, setLiber] = useState("");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState(initialRegion);
  const [period, setPeriod] = useState("");
  const [category, setCategory] = useState("");
  const [season, setSeason] = useState("");
  const [plant, setPlant] = useState("");
  const [sourceType, setSourceType] = useState("");
  const [evidence, setEvidence] = useState("");
  const [tag, setTag] = useState("");

  const result = useMemo(() => {
    const q = query.trim().toLowerCase();
    return entries.filter(entry => {
      const haystack = [entry.title, entry.subtitle, entry.excerpt, entry.region, entry.country, entry.period, entry.category, entry.specimen?.commonName ?? "", entry.specimen?.latinName ?? "", ...entry.tags, ...entry.labels].join(" ").toLowerCase();
      const sourceMatch = !sourceType || entry.sourceIds.some(id => getSource(id)?.kind === sourceType);
      const seasonMatch = !season || entry.tags.includes(season) || entry.specimen?.season.toLowerCase().includes(season.toLowerCase());
      return (!q || haystack.includes(q))
        && (!liber || entry.liber === liber)
        && (!country || entry.country === country || entry.country.includes(country))
        && (!region || entry.region === region || entry.region.includes(region))
        && (!period || entry.period === period)
        && (!category || entry.category === category)
        && seasonMatch
        && (!plant || entry.slug === plant)
        && sourceMatch
        && (!evidence || entry.labels.includes(evidence as EvidenceLabel))
        && (!tag || entry.tags.includes(tag));
    });
  }, [query, liber, country, region, period, category, season, plant, sourceType, evidence, tag]);

  const clear = () => { setQuery(""); setLiber(""); setCountry(""); setRegion(""); setPeriod(""); setCategory(""); setSeason(""); setPlant(""); setSourceType(""); setEvidence(""); setTag(""); };

  return (
    <div className="archive-explorer">
      <div className="archive-search-wrap"><span aria-hidden="true">⌕</span><label className="sr-only" htmlFor="archive-search">Search the Codex</label><input id="archive-search" value={query} onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)} placeholder="Search the Codex…" autoComplete="off" /><kbd>INDEX</kbd></div>
      <details className="filter-drawer" open>
        <summary><span>Archive filters</span><small>{result.length} folios found</small></summary>
        <div className="filter-grid">
          <Filter label="LIBER" value={liber} onChange={setLiber} options={libers.map(l => [l.slug, `LIBER ${l.roman} — ${l.shortTitle}`])} />
          <Filter label="Country" value={country} onChange={setCountry} options={allCountries.map(v => [v,v])} />
          <Filter label="Region" value={region} onChange={setRegion} options={allRegions.map(v => [v,v])} />
          <Filter label="Historical period" value={period} onChange={setPeriod} options={allPeriods.map(v => [v,v])} />
          <Filter label="Category / ritual type" value={category} onChange={setCategory} options={allCategories.map(v => [v,v])} />
          <Filter label="Season / cycle" value={season} onChange={setSeason} options={seasonTerms.map(v => [v,v])} />
          <Filter label="Plant specimen" value={plant} onChange={setPlant} options={allPlants} />
          <Filter label="Symbol / theme" value={tag} onChange={setTag} options={allTags.map(v => [v,v])} />
          <Filter label="Source type" value={sourceType} onChange={setSourceType} options={sourceTypes.map(v => [v,v])} />
          <Filter label="Evidence label" value={evidence} onChange={setEvidence} options={evidenceLabels.map(v => [v,v])} />
        </div>
        <button className="clear-filters" type="button" onClick={clear}>Clear index marks</button>
      </details>
      <div className="results-header"><p><strong>{result.length}</strong> entries in the present index</p><span>Sorted by codex order</span></div>
      {result.length ? <div className="archive-grid">{result.map(entry => <ArchiveCard key={entry.slug} entry={entry} />)}</div> : <div className="empty-state"><span>∴</span><h2>No folio answers this index.</h2><p>Try a broader region, period, or keyword.</p><button type="button" className="button-link" onClick={clear}>Clear filters</button></div>}
    </div>
  );
}

function Filter({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: string[][] }) {
  return <label className="filter-field"><span>{label}</span><select value={value} onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange(e.target.value)}><option value="">All</option>{options.map(([value,label]) => <option key={value} value={value}>{label}</option>)}</select></label>;
}
