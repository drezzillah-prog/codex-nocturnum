import type { ReactNode } from "react";
import type { EvidenceLabel, Liber } from "@/data/codex";

export function BrandSeal({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`brand-seal ${compact ? "brand-seal--compact" : ""}`} aria-hidden="true">
      <svg viewBox="0 0 64 64" role="img">
        <circle cx="32" cy="32" r="27" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="32" cy="32" r="20" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="1.5 3" />
        <path d="M32 10c-7 7-9 16-6 24 2 6 7 11 15 14-4 2-9 3-14 1C15 45 9 32 15 21c3-6 9-10 17-11Z" fill="none" stroke="currentColor" strokeWidth="1.25" />
        <path d="M34 18c7 4 10 10 9 17M25 40c4-2 7-5 9-9" fill="none" stroke="currentColor" strokeWidth="1" />
        <path d="M18 49c8-8 17-10 28-7M45 20c-4-1-7-1-11 1" fill="none" stroke="currentColor" strokeWidth="0.8" />
      </svg>
    </span>
  );
}

function Celestial() {
  return <><circle cx="48" cy="48" r="20"/><path d="M48 18v8M48 70v8M18 48h8M70 48h8M27 27l6 6M63 63l6 6M69 27l-6 6M33 63l-6 6"/><path d="M57 34c-11 2-17 14-11 23 3 5 8 8 14 7-11 7-25 0-25-13 0-11 10-20 22-17Z"/></>;
}
function Botanical() { return <><path d="M49 78C48 60 47 43 40 20"/><path d="M43 29c-13-7-20-2-22 8 10 3 18 0 23-6M46 43c13-9 23-5 26 6-10 5-20 2-26-4M48 57c-10-5-17 0-19 9 8 2 15-1 20-7M39 19c5-5 10-5 14-2-1 6-6 10-12 8"/></> }
function Apothecary() { return <><path d="M29 26h38v49H29zM34 20h28v6H34zM35 38h26M35 52h26M48 26v49"/><path d="M22 75h52M39 32h4M54 32h4M39 45h4M54 45h4M39 59h4M54 59h4"/></> }
function Grimoire() { return <><path d="M22 25c12-6 22-5 26 1v49c-5-6-15-7-26-2V25ZM74 25c-12-6-22-5-26 1v49c5-6 15-7 26-2V25Z"/><path d="M48 26v49M31 35h10M31 42h12M55 35h10M55 42h8"/><circle cx="48" cy="57" r="7"/></> }
function Divination() { return <><rect x="25" y="19" width="31" height="51" rx="2" transform="rotate(-8 40 44)"/><rect x="43" y="24" width="31" height="51" rx="2" transform="rotate(7 58 49)"/><circle cx="57" cy="46" r="8"/><path d="M57 34v4M57 54v4M45 46h4M65 46h4"/></> }
function Folklore() { return <><path d="M18 67c8-7 12-19 17-32 8 4 14 4 22-2 8 7 15 9 23 7-6 9-7 18-4 27-10-1-18 2-27 9-10-8-20-11-31-9Z"/><path d="M30 55c8-3 14-8 19-16M49 39c2 10 7 18 17 24M40 61l9-22"/><circle cx="49" cy="39" r="3"/></> }
function Workshop() { return <><path d="M25 70l34-44M36 76l31-40"/><circle cx="24" cy="71" r="8"/><circle cx="35" cy="77" r="8"/><path d="M58 25c6 3 11 8 14 14M61 22l13 13M55 30l13 13"/></> }

export function VolumeSymbol({ sigil, className = "" }: { sigil: Liber["sigil"]; className?: string }) {
  const art = { celestial: <Celestial />, botanical: <Botanical />, apothecary: <Apothecary />, grimoire: <Grimoire />, divination: <Divination />, folklore: <Folklore />, workshop: <Workshop /> }[sigil];
  return <svg className={`volume-symbol ${className}`} viewBox="0 0 96 96" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">{art}</svg>;
}

export function SectionDivider() {
  return <div className="section-divider" aria-hidden="true"><span>✦</span></div>;
}

export function EvidenceBadges({ labels }: { labels: EvidenceLabel[] }) {
  return <div className="evidence-badges" aria-label="Evidence classification">{labels.map((label) => <span className={`evidence-badge evidence-badge--${label.toLowerCase().replaceAll(" ", "-")}`} key={label}>{label}</span>)}</div>;
}

export function FolioNumber({ children }: { children: ReactNode }) {
  return <div className="folio-number" aria-hidden="true">— {children} —</div>;
}
