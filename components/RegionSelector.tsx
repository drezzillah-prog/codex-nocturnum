"use client";

import type { PriceRegion } from "@/data/products";
import { usePricing } from "./PricingProvider";

const labels: Record<PriceRegion, string> = {
  RO: "Romania · RON",
  EU: "Europe · EUR",
  US: "United States · USD",
};

export function RegionSelector() {
  const { region, setRegion, source } = usePricing();
  return (
    <div className="region-selector">
      <div><span>Price region</span><small>{source === "automatic" ? "Detected automatically" : "Selected manually"}</small></div>
      <select value={region} onChange={(event) => setRegion(event.target.value as PriceRegion)} aria-label="Price region">
        {(Object.keys(labels) as PriceRegion[]).map((key) => <option key={key} value={key}>{labels[key]}</option>)}
      </select>
    </div>
  );
}
