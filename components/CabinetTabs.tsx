"use client";

import { useState } from "react";
import { ProductTile } from "./ProductTile";
import { useMarket } from "./PricingProvider";
import { getUi } from "@/data/i18n";
import { futureProducts, heroProducts, products } from "@/data/products";

type Tab = "signature" | "candles" | "apothecary" | "divination" | "objects" | "next";

export function CabinetTabs() {
  const { language, region } = useMarket();
  const copy = getUi(language);
  const [tab, setTab] = useState<Tab>("signature");

  const tabs = [
    ["signature", "✦", copy.tabSignature],
    ["candles", "♢", copy.tabCandles],
    ["apothecary", "⌁", copy.tabApothecary],
    ["divination", "◉", copy.tabDivination],
    ["objects", "◇", copy.tabObjects],
    ["next", "Ⅲ", copy.tabNext],
  ] as const;

  const lists:Record<Exclude<Tab,"next">,typeof products> = {
    signature: heroProducts,
    candles: products.filter(p => p.catalogue.includes("DEV") || p.catalogue.includes("PIL")),
    apothecary: products.filter(p => p.collection === "The Apothecary"),
    divination: products.filter(p => p.collection === "Divination Cabinet"),
    objects: products.filter(p => p.collection === "Archive Objects" || p.catalogue.includes("TXT")),
  };

  return (
    <section className="cabinet-tabs page-width">
      <div className="mystic-tabs mystic-tabs--cabinet" role="tablist" aria-label={copy.cabinetTitle}>
        {tabs.map(([key,symbol,label]) => (
          <button type="button" role="tab" aria-selected={tab===key} onClick={()=>setTab(key)} className={`mystic-tab ${tab===key?"is-active":""}`} key={key}>
            <i aria-hidden="true">{symbol}</i><span>{label}</span>
          </button>
        ))}
      </div>

      <div className="cabinet-tab-panel">
        {tab !== "next" ? (
          <div className="cabinet-product-grid">
            {lists[tab].map((product) => <ProductTile product={product} featured={tab==="signature"} key={product.catalogue} />)}
          </div>
        ) : (
          <div className="next-accessions">
            <div className="next-accessions__intro">
              <p className="eyebrow">ACCESSIONES PROXIMAE</p>
              <h2>{copy.nextAccessions}</h2>
              <p>{copy.nextAccessionsText}</p>
            </div>
            <div className="next-accessions__grid">
              {futureProducts.map((product) => (
                <article key={product.catalogue}>
                  <span>{product.catalogue}</span>
                  <h3>{product.name}</h3>
                  <strong>{formatFuture(region, product.prices[region])}</strong>
                  <small>{copy.tabNext}</small>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function formatFuture(region:"RO"|"EU"|"US"|"UK"|"CA"|"AU", value:number) {
  const c={RO:"RON",EU:"EUR",US:"USD",UK:"GBP",CA:"CAD",AU:"AUD"}[region];
  return new Intl.NumberFormat(region==="RO"?"ro-RO":"en-US",{style:"currency",currency:c,maximumFractionDigits:0}).format(value);
}
