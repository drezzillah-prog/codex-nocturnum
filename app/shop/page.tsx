import { PriceTag } from "@/components/PriceTag";
import { RegionSelector } from "@/components/RegionSelector";
import { products, productCollections, heroProducts } from "@/data/products";

export const metadata = {
  title: "The Cabinet",
  description: "Bespoke ritual objects, archive editions and divination tools from Codex Nocturnum.",
};

export default function ShopPage() {
  return (
    <div className="shop-page">
      <section className="shop-hero page-width">
        <p className="eyebrow">The material archive · Launch Catalogue I</p>
        <h1>THE CABINET</h1>
        <p className="shop-hero__lead">
          Twelve product families. Each object is catalogued, numbered and accompanied by context — with selected pieces adapted to ritual intention, deity association and client preference.
        </p>

        <div className="shop-rule">
          <strong>THE GOLDEN RULE</strong>
          <p>Every object must feel as though it came out of the archive: catalogue number, LIBER or collection, archival label, miniature folio and a clear distinction between documented tradition and contemporary interpretation.</p>
        </div>

        <RegionSelector />
        <p className="shop-price-note">Prices are localized by region. You may change your region at any time. Shipping, taxes and duties are separate.</p>
      </section>

      <section className="shop-featured page-width">
        <header className="shop-collection__header">
          <div><p className="eyebrow">First accession</p><h2>Signature objects</h2></div>
          <span>05 selected pieces</span>
        </header>
        <div className="shop-featured__grid">
          {heroProducts.map((product) => (
            <article className="product-card product-card--signature" key={product.catalogue}>
              <div className="product-card__top"><span>{product.catalogue}</span><span>{product.format}</span></div>
              <p className="product-card__liber">{product.liber}</p>
              <h3>{product.name}</h3>
              <p>{product.note}</p>
              <div className="product-card__facts">
                <span>{product.size}</span>
                <span>{product.production}</span>
              </div>
              <div className="product-card__options">
                {product.customizations.slice(0, 4).map((option) => <span key={option}>{option}</span>)}
              </div>
              <div className="product-card__footer"><PriceTag product={product} /><span>From · regional price</span></div>
            </article>
          ))}
        </div>
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
                  <div className="product-card__facts">
                    <span>{product.size}</span>
                    <span>{product.production}</span>
                  </div>
                  <div className="product-card__options">
                    {product.customizations.map((option) => <span key={option}>{option}</span>)}
                  </div>
                  <div className="product-card__footer">
                    <div><small>From</small><PriceTag product={product} /></div>
                    <span>Catalogue object {String(product.id).padStart(3, "0")}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        );
      })}

      <section className="shop-bespoke-note page-width">
        <p className="eyebrow">Bespoke archive record</p>
        <h2>Made for one person. Entered into the archive once.</h2>
        <p>Personalised objects may receive a bespoke record documenting the selected intention, association, colour, material profile and dedication. Custom requests remain subject to feasibility, material availability and safety review.</p>
      </section>
    </div>
  );
}
