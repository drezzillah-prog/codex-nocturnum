import Link from "next/link";
import { BrandSeal } from "./Ornaments";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-rule" />
      <div className="footer-grid">
        <div className="footer-brand"><BrandSeal /><div><strong>CODEX NOCTURNUM</strong><p>An evolving archive of history, folklore, material culture and living tradition.</p></div></div>
        <div><span className="footer-heading">Consult</span><Link href="/codex">The seven LIBER</Link><Link href="/archive">Archive index</Link><Link href="/search">Search</Link></div>
        <div><span className="footer-heading">Editorial</span><Link href="/about">About the archive</Link><Link href="/sources">Sources & bibliography</Link><p className="footer-note">Folklore and symbolic practice are not presented as scientific fact.</p></div>
      </div>
      <div className="footer-bottom"><span>CODEX NOCTURNUM · MMXXVI</span><span>Preserve context. Cite the source. Keep uncertainty visible.</span></div>
    </footer>
  );
}
