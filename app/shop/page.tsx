import { PriceTag } from "@/components/PriceTag";
import { RegionSelector } from "@/components/RegionSelector";
import { products, productCollections } from "@/data/products";

export const metadata = {
  title: "The Cabinet",
  description: "Archive editions, ritual objects, contemplative tools and numbered collector pieces from Codex Nocturnum.",
};

export default function ShopPage() {
  return (
    <div className="shop-page">
      <section className="shop-hero page-width">
        <p className="eyebrow">The material archive</p>
        <h1>THE CABINET</h1>
        <p className="shop-hero__lead">Objects to take home from the archive. Every piece is catalogued, numbered and accompanied by context rather than sold as anonymous “witchy” merchandise.</p>
        <div className="shop-rule">
          <strong>THE GOLDEN RULE</strong>
          <p>Every object must feel as though it came out of the archive: catalogue number, LIBER or collection, archival label, miniature folio and a clear distinction between documented tradition and contemporary interpretation.</p>
        </div>
        <RegionSelector />
        <p className="shop-price-note">Catalogue prices are region-specific retail targets. Shipping is separate. Tax handling will be connected when checkout is wired.</p>
      </section>

      {productCollections.map((collection) => {
        const items = products.filter((product) => product.collection === collection);
        return (
          <section className="shop-collection page-width" key={collection}>
            <header className="shop-collection__header">
              <div><p className="eyebrow">Accession series</p><h2>{collection}</h2></div>
              <span>{String(items.length).padStart(2, "0")} objects</span>
            </header>
            <div className="shop-grid">
              {items.map((product) => (
                <article className="product-card" key={product.catalogue}>
                  <div className="product-card__top"><span>{product.catalogue}</span><span>{product.format}</span></div>
                  <p className="product-card__liber">{product.liber}</p>
                  <h3>{product.name}</h3>
                  <p>{product.note}</p>
                  <div className="product-card__footer"><PriceTag product={product} /><span>Catalogue object {String(product.id).padStart(3, "0")}</span></div>
                </article>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
