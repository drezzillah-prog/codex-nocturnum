"use client";

import Link from "next/link";
import { PriceTag } from "./PriceTag";
import { useMarket } from "./PricingProvider";
import { getUi } from "@/data/i18n";
import { intentionLabels, type Product } from "@/data/products";\nimport { BotanicalCandleCollection } from "./BotanicalCandleCollection";

const candleStudies = [
  ["Hecate Threshold", "Sculpted devotional form"],
  ["Lunar Priestess", "Sculpted lunar form"],
  ["Rose Oracle", "Sculpted floral form"],
  ["Solar Seer", "Sculpted solar form"],
  ["Pomegranate Underworld", "Sculpted underworld form"],
  ["Black Moon Phases", "Symbolic pillar"],
  ["Ivory Celestial", "Symbolic pillar"],
  ["Oxblood Oracle", "Symbolic pillar"],
  ["Forest Moon", "Botanical-celestial pillar"],
  ["Cosmic Orbit", "Marbled celestial pillar"],
] as const;

export function ProductDetail({ product }: { product: Product }) {
  const { language, currency } = useMarket();
  const copy = getUi(language);

  return (
    <div className="product-detail-v6">
      <section className="product-detail-v6__hero page-width">
        <div className="product-detail-v6__visual">
          <div className="product-detail-v6__image-slot">
            <span>{product.catalogue}</span>
            <strong>{product.name}</strong>
            <small>ARCHIVE OBJECT · IMAGE PLATE</small>
          </div>
          <p>Primary product photography will be inserted here in the approved realistic Codex style.</p>
        </div>

        <div className="product-detail-v6__copy">
          <p className="eyebrow">{product.catalogue} · {product.liber}</p>
          <h1>{product.name}</h1>
          <p className="product-detail-v6__lead">{product.note[language]}</p>

          <div className="product-detail-v6__price">
            <div><small>{copy.from}</small><PriceTag product={product} /></div>
            <span>{currency} · {copy.marketAuto}</span>
          </div>

          <dl className="product-detail-v6__ledger">
            <div><dt>{copy.production}</dt><dd>{product.production[0]}–{product.production[1]} {copy.days}</dd></div>
            <div><dt>Format</dt><dd>{product.format === "Made to order" ? copy.madeToOrder : copy.physical}</dd></div>
            <div><dt>Size</dt><dd>{product.size}</dd></div>
            <div><dt>Archive record</dt><dd>Included with personalised pieces</dd></div>
          </dl>

          <Link className="button-primary product-detail-v6__cta" href={`/bespoke?product=${encodeURIComponent(product.catalogue)}`}>
            {product.format === "Made to order" ? copy.commission : copy.details}
          </Link>
        </div>
      </section>

      <section className="product-detail-v6__tabs page-width">
        {(product.catalogue === "CN-IV-DEV-001" || product.catalogue === "CN-IV-PIL-002") && (
          <div className="product-detail-v6__section candle-study">
            <div className="candle-study__intro">
              <p className="eyebrow">FORMae · DIVINATION CANDLES</p>
              <h2>Sculpted by hand, or kept deliberately spare.</h2>
              <p>Ten visual directions from the Codex candle atelier. Sculpted figures, lunar geometry, dark wax, ivory wax and restrained metallic detailing can be adapted to the client&apos;s ritual intention and devotional association.</p>
            </div>
            <div className="candle-study__grid">
              {candleStudies.map(([name, kind], index) => (
                <article key={name} className="candle-study__card">
                  <div className={`candle-study__image candle-study__image--${index}`} role="img" aria-label={name} />
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{name}</strong>
                  <small>{kind}</small>
                </article>
              ))}
            </div>
          </div>
        )}
        {(product.catalogue === "CN-IV-DEV-001" || product.catalogue === "CN-IV-PIL-002") && <BotanicalCandleCollection />}
        <div className="product-detail-v6__section">
          <p className="eyebrow">CUSTOMISATIO</p>
          <h2>Make it yours.</h2>
          <div className="product-detail-v6__chips">
            {product.customizations.map((item) => <span key={item}>{item}</span>)}
          </div>
        </div>

        <div className="product-detail-v6__section">
          <p className="eyebrow">INTENTIONES</p>
          <h2>Where it belongs.</h2>
          <div className="product-detail-v6__chips">
            {product.intentions.map((item) => <Link href={`/intentions#${item}`} key={item}>{intentionLabels[item][language]}</Link>)}
          </div>
        </div>

        <div className="product-detail-v6__section product-detail-v6__presentation">
          <div>
            <p className="eyebrow">ARCHIVE STANDARD</p>
            <h2>Included.</h2>
            <p>Object, catalogue number, archival label, miniature folio, correspondence/context card and care or safety note where relevant.</p>
          </div>
          <div>
            <p className="eyebrow">COLLECTOR PRESENTATION</p>
            <h2>Upgrade the accession.</h2>
            <p>Rigid presentation box, richer insert, wax-sealed archival record and expanded folio. Final upgrade price depends on object size and materials.</p>
          </div>
        </div>

        <div className="product-detail-v6__section product-detail-v6__record">
          <p className="eyebrow">{copy.archiveRecord}</p>
          <h2>One object. One entry.</h2>
          <p>{copy.archiveRecordText}</p>
          <div className="product-detail-v6__record-card">
            <span>CODEX NOCTURNUM</span>
            <strong>{product.catalogue} / SPECIMEN 00—</strong>
            <small>INTENTION · ASSOCIATION · MATERIAL PROFILE · ACCESSION DATE</small>
          </div>
        </div>
      </section>
    </div>
  );
}
