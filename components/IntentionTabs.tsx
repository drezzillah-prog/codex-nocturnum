"use client";

import { useEffect, useState } from "react";
import { ProductTile } from "./ProductTile";
import { useMarket } from "./PricingProvider";
import { getUi } from "@/data/i18n";
import { intentionLabels, products, type IntentionKey } from "@/data/products";

export function IntentionTabs() {
  const { language } = useMarket();
  const copy = getUi(language);
  const keys = Object.keys(intentionLabels) as IntentionKey[];
  const [active,setActive] = useState<IntentionKey>("protection");

  useEffect(() => {
    const hash = window.location.hash.replace("#","") as IntentionKey;
    if (keys.includes(hash)) setActive(hash);
  }, []);

  const matches = products.filter(product => product.intentions.includes(active));

  return (
    <section className="intentions-v6 page-width">
      <div className="intention-sigils" role="tablist" aria-label={copy.intentionsTitle}>
        {keys.map(key => (
          <button key={key} type="button" role="tab" aria-selected={active===key} className={active===key?"is-active":""} onClick={() => setActive(key)}>
            <i aria-hidden="true">✦</i><span>{intentionLabels[key][language]}</span>
          </button>
        ))}
      </div>
      <div className="intentions-v6__result">
        <header>
          <p className="eyebrow">INTENTIO · {active.toUpperCase()}</p>
          <h2>{intentionLabels[active][language]}</h2>
          <span>{String(matches.length).padStart(2,"0")} objects</span>
        </header>
        <div className="cabinet-product-grid">
          {matches.map(product => <ProductTile product={product} key={product.catalogue} />)}
        </div>
      </div>
    </section>
  );
}
