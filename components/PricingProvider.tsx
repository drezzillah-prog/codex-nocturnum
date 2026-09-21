"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { PriceRegion } from "@/data/products";

type PricingContextValue = {
  region: PriceRegion;
  setRegion: (region: PriceRegion) => void;
  source: "automatic" | "manual";
};

const PricingContext = createContext<PricingContextValue | null>(null);
const STORAGE_KEY = "codex-nocturnum-price-region";

function fallbackRegion(): PriceRegion {
  if (typeof navigator === "undefined") return "EU";
  const locale = navigator.language.toLowerCase();
  if (locale.startsWith("ro")) return "RO";
  if (locale === "en-us" || locale.endsWith("-us")) return "US";
  return "EU";
}

export function PricingProvider({ children }: { children: ReactNode }) {
  const [region, setRegionState] = useState<PriceRegion>("EU");
  const [source, setSource] = useState<"automatic" | "manual">("automatic");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY) as PriceRegion | null;
    if (saved === "RO" || saved === "EU" || saved === "US") {
      setRegionState(saved);
      setSource("manual");
      return;
    }

    setRegionState(fallbackRegion());

    void fetch("/api/region", { cache: "no-store" })
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((data: { region?: PriceRegion }) => {
        if (data.region === "RO" || data.region === "EU" || data.region === "US") setRegionState(data.region);
      })
      .catch(() => undefined);
  }, []);

  const setRegion = (nextRegion: PriceRegion) => {
    setRegionState(nextRegion);
    setSource("manual");
    window.localStorage.setItem(STORAGE_KEY, nextRegion);
  };

  const value = useMemo(() => ({ region, setRegion, source }), [region, source]);
  return <PricingContext.Provider value={value}>{children}</PricingContext.Provider>;
}

export function usePricing() {
  const value = useContext(PricingContext);
  if (!value) throw new Error("usePricing must be used inside PricingProvider");
  return value;
}
