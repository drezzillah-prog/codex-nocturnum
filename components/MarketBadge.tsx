"use client";

import { useMarket } from "./PricingProvider";
import { getUi } from "@/data/i18n";

const labels = {
  RO: "Romania",
  EU: "Europe",
  US: "United States",
  UK: "United Kingdom",
  CA: "Canada",
  AU: "Australia",
} as const;

export function MarketBadge() {
  const { region, currency, language, loading } = useMarket();
  const copy = getUi(language);

  return (
    <div className="market-badge" title={copy.autoLanguageNote} aria-label={copy.marketAuto}>
      <span className="market-badge__seal" aria-hidden="true">✦</span>
      <span>
        <strong>{loading ? "…" : labels[region]}</strong>
        <small>{currency} · {language.toUpperCase()}</small>
      </span>
    </div>
  );
}
