"use client";

import Link from "next/link";
import { PriceTag } from "./PriceTag";
import { useMarket } from "./PricingProvider";
import { getUi } from "@/data/i18n";
import type { Product } from "@/data/products";

export function ProductTile({ product, featured = false }: { product: Product; featured?: boolean }) {
  const { language } = useMarket();
  const copy = getUi(language);

  return (
    <article className={`product-tile ${featured ? "product-tile--featured" : ""}`}>
      <div className="product-tile__meta">
        <span>{product.catalogue}</span>
        <span>{product.format === "Made to order" ? copy.madeToOrder : copy.physical}</span>
      </div>
      <p className="product-tile__liber">{product.liber}</p>
      <h3>{product.name}</h3>
      <p className="product-tile__note">{product.note[language]}</p>
      <div className="product-tile__facts">
        <span>{product.size}</span>
        <span>{copy.production}: {product.production[0]}–{product.production[1]} {copy.days}</span>
      </div>
      <div className="product-tile__options">
        {product.customizations.slice(0, featured ? 5 : 3).map((item) => <span key={item}>{item}</span>)}
      </div>
      <div className="product-tile__footer">
        <div><small>{copy.from}</small><PriceTag product={product} /></div>
        <Link href={`/bespoke?product=${encodeURIComponent(product.catalogue)}`}>
          {product.format === "Made to order" ? copy.commission : copy.details} →
        </Link>
      </div>
    </article>
  );
}
