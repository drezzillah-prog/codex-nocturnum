import { ArchiveExplorer } from "@/components/ArchiveExplorer";
import { SectionDivider } from "@/components/Ornaments";

export const metadata = { title: "Archive" };

type Props = { searchParams: Promise<{ q?: string; region?: string; tag?: string }> };
export default async function ArchivePage({ searchParams }: Props) {
  const params = await searchParams;
  const q = params.tag ? params.tag : params.q ?? "";
  return <div className="paper-page"><header className="page-hero page-width"><p className="eyebrow">Archivum · General catalogue</p><h1>Archive</h1><p className="lede">Search by place, period, theme, plant, ritual type, season, symbol or source classification. The index is designed to scale from a handful of folios to thousands.</p><SectionDivider /></header><section className="page-width"><ArchiveExplorer initialQuery={q} initialRegion={params.region ?? ""} /></section></div>;
}
