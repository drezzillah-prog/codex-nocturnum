"use client";

import Link from "next/link";
import { useState } from "react";
import { BrandSeal } from "./Ornaments";
import { ProductTile } from "./ProductTile";
import { useMarket } from "./PricingProvider";
import { getUi } from "@/data/i18n";
import { heroProducts, intentionLabels } from "@/data/products";
import { libers } from "@/data/codex";

type Portal = "cabinet" | "codex" | "intentions" | "bespoke";

export function HomeExperience() {
  const { language } = useMarket();
  const copy = getUi(language);
  const [portal, setPortal] = useState<Portal>("cabinet");

  const tabs = [
    ["cabinet", "✦", copy.portalCabinet],
    ["codex", "Ⅶ", copy.portalCodex],
    ["intentions", "◇", copy.portalIntentions],
    ["bespoke", "⌁", copy.portalBespoke],
  ] as const;

  return (
    <div className="home-v6">
      <section className="hero-v6">
        <div className="hero-v6__inner">
          <p className="kicker">{copy.heroEyebrow}</p>
          <BrandSeal />
          <h1><span>{copy.heroTitleA}</span><em>{copy.heroTitleB}</em></h1>
          <p className="hero-v6__subtitle">{copy.heroSubtitle}</p>
          <p className="hero-v6__lead">{copy.heroLead}</p>
          <div className="hero-v6__actions">
            <Link className="button-primary" href="/shop">{copy.enterCabinet}</Link>
            <Link className="button-ghost" href="/codex">{copy.openCodex}</Link>
          </div>
        </div>
      </section>

      <section className="portal-v6 page-width">
        <header className="portal-v6__header">
          <p className="eyebrow">PORTAE ARCHIVI</p>
          <h2>{copy.portalTitle}</h2>
        </header>

        <div className="mystic-tabs" role="tablist" aria-label={copy.portalTitle}>
          {tabs.map(([key, symbol, label]) => (
            <button
              key={key}
              className={`mystic-tab ${portal === key ? "is-active" : ""}`}
              onClick={() => setPortal(key)}
              role="tab"
              aria-selected={portal === key}
              type="button"
            >
              <i aria-hidden="true">{symbol}</i><span>{label}</span>
            </button>
          ))}
        </div>

        <div className="portal-panel">
          {portal === "cabinet" && (
            <div className="portal-panel__split">
              <div>
                <p className="eyebrow">THE MATERIAL ARCHIVE</p>
                <h3>{copy.portalCabinet}</h3>
                <p>{copy.portalCabinetText}</p>
                <Link className="text-link" href="/shop">{copy.enterCabinet} →</Link>
              </div>
              <div className="portal-mini-products">
                {heroProducts.slice(0,3).map((product) => (
                  <Link href={`/bespoke?product=${product.catalogue}`} key={product.catalogue}>
                    <span>{product.catalogue}</span><strong>{product.name}</strong><PriceTagInline product={product} />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {portal === "codex" && (
            <div className="portal-panel__split">
              <div>
                <p className="eyebrow">TABULA LIBRORUM</p>
                <h3>{copy.portalCodex}</h3>
                <p>{copy.portalCodexText}</p>
                <Link className="text-link" href="/codex">{copy.openCodex} →</Link>
              </div>
              <div className="portal-liber-grid">
                {libers.map((liber) => <Link href={`/liber/${liber.slug}`} key={liber.slug}><span>{liber.roman}</span><strong>{liber.shortTitle}</strong></Link>)}
              </div>
            </div>
          )}

          {portal === "intentions" && (
            <div className="portal-panel__split">
              <div>
                <p className="eyebrow">QUOD QUAERIS</p>
                <h3>{copy.portalIntentions}</h3>
                <p>{copy.portalIntentionsText}</p>
                <Link className="text-link" href="/intentions">{copy.portalIntentions} →</Link>
              </div>
              <div className="portal-intention-grid">
                {Object.entries(intentionLabels).slice(0,8).map(([key,label]) => (
                  <Link href={`/intentions#${key}`} key={key}>{label[language]}</Link>
                ))}
              </div>
            </div>
          )}

          {portal === "bespoke" && (
            <div className="portal-panel__split">
              <div>
                <p className="eyebrow">COMMISSIO</p>
                <h3>{copy.portalBespoke}</h3>
                <p>{copy.portalBespokeText}</p>
                <Link className="button-primary" href="/bespoke">{copy.beginCommission}</Link>
              </div>
              <div className="portal-steps">
                <span>{copy.stepObject}</span><span>{copy.stepIntention}</span><span>{copy.stepAssociation}</span><span>{copy.stepFinish}</span><span>{copy.stepRecord}</span>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="home-v6__signature page-width">
        <div>
          <p className="eyebrow">SIGNATURE ACCESSIONS</p>
          <h2>{copy.signature}</h2>
          <p>{copy.signatureLead}</p>
        </div>
        <div className="home-v6__signature-grid">
          {heroProducts.slice(0,2).map((product) => <ProductTile product={product} featured key={product.catalogue} />)}
        </div>
      </section>

      <section className="home-v6__why">
        <div className="page-width">
          <p className="eyebrow">THE CODEX RULE</p>
          <h2>{copy.whyTitle}</h2>
          <p>{copy.whyText}</p>
        </div>
      </section>
    </div>
  );
}

function PriceTagInline({ product }: { product: (typeof heroProducts)[number] }) {
  const { region } = useMarket();
  const values = {RO:"RON",EU:"EUR",US:"USD",UK:"GBP",CA:"CAD",AU:"AUD"} as const;
  return <small>{values[region]} {product.prices[region]}</small>;
}
