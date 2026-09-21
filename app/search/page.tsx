import { ArchiveExplorer } from "@/components/ArchiveExplorer";
import { SectionDivider } from "@/components/Ornaments";

export const metadata = { title: "Search the Codex" };
type Props = { searchParams: Promise<{ q?: string }> };
export default async function SearchPage({ searchParams }: Props) {
  const params = await searchParams;
  return <div className="paper-page search-page"><header className="page-hero page-width"><p className="eyebrow">Index rerum</p><h1>Search the Codex</h1><p className="lede">Consult the index as you would the back of a large, well-used volume: by name, place, symbol, season, object or trace.</p><SectionDivider /></header><section className="page-width"><ArchiveExplorer initialQuery={params.q ?? ""} /></section></div>;
}
