"use client";

import { useState, type KeyboardEvent } from "react";

const points = [
  { id: "british", label: "British Isles", x: 25, y: 36, note: "Fairy belief, seasonal customs, household protection" },
  { id: "france", label: "France", x: 37, y: 50, note: "Popular print, seasonal custom, regional folklore" },
  { id: "german", label: "German-speaking Europe", x: 50, y: 41, note: "Winter custom, household lore, folk belief" },
  { id: "scandinavia", label: "Scandinavia", x: 55, y: 20, note: "Seasonal traditions, beings, divinatory lore" },
  { id: "baltic", label: "Baltic traditions", x: 67, y: 31, note: "Song, seasonal custom, household tradition" },
  { id: "romania", label: "Romania", x: 66, y: 52, note: "Mărțișor, ritual foods, protective customs, beings" },
  { id: "balkans", label: "Balkans", x: 61, y: 63, note: "Ritual foods, seasonal custom, household belief" },
  { id: "italy", label: "Italy", x: 47, y: 68, note: "Card history, saints, regional popular belief" },
  { id: "iberia", label: "Iberia", x: 25, y: 69, note: "Local saints, seasonal customs, legends" },
  { id: "slavic", label: "Slavic traditions", x: 76, y: 43, note: "Household beings, calendar customs, omens" },
];

export function EuropeMap() {
  const [active, setActive] = useState(points[5]);
  return (
    <section className="europe-map" aria-labelledby="europe-map-title">
      <div className="europe-map__intro"><p className="eyebrow">Geographic index</p><h2 id="europe-map-title">Europe, read region by region</h2><p>This map is an archival navigator, not a claim that traditions obey modern borders. Select a region to see the kinds of records grouped there.</p></div>
      <div className="europe-map__frame">
        <div className="map-compass" aria-hidden="true">N<br/><span>✦</span></div>
        <svg className="map-plate" viewBox="0 0 100 86" role="img" aria-label="Stylised antique map of Europe with selectable folklore regions">
          <path className="map-land" d="M13 38 18 27 29 23 36 29 42 23 51 24 56 14 64 13 71 25 82 30 88 39 84 48 90 57 78 62 72 74 59 72 54 81 44 75 35 79 29 71 17 67 13 55 6 49Z" />
          <path className="map-hatch" d="M14 40c18-9 37-13 68-6M11 49c23-8 48-9 76-2M17 59c22-5 43-5 66 0M28 68c16-2 30 0 44 4" />
          {points.map(point => <g key={point.id} className={active.id === point.id ? "map-point is-active" : "map-point"} onClick={() => setActive(point)} role="button" tabIndex={0} aria-label={`Select ${point.label}`} onKeyDown={(e: KeyboardEvent<SVGGElement>) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setActive(point); } }}><circle cx={point.x} cy={point.y} r="2.1"/><circle className="map-point__ring" cx={point.x} cy={point.y} r="4.2"/></g>)}
        </svg>
        <div className="map-caption" aria-live="polite"><span>Selected region</span><strong>{active.label}</strong><p>{active.note}</p><a href={`/archive?q=${encodeURIComponent(active.label)}`}>Consult related entries →</a></div>
      </div>
    </section>
  );
}
