"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { PriceRegion } from "@/data/products";

type PricingContextValue = {
  region: PriceRegion;
  setRegion: (region: PriceRegion) => void;
  source: "automatic" | "manual";
};

const PricingContext = createContext<PricingContextValue | null>(null);
const STORAGE_KEY = "codex-nocturnum-price-region-v2";
const validRegions: PriceRegion[] = ["RO", "EU", "US", "UK", "CA", "AU"];

function isRegion(value: string | null): value is PriceRegion {
  return value !== null && validRegions.includes(value as PriceRegion);
}

function fallbackRegion(): PriceRegion {
  if (typeof navigator === "undefined") return "EU";
  const locale = navigator.language.toLowerCase();
  if (locale.startsWith("ro")) return "RO";
  if (locale === "en-us" || locale.endsWith("-us")) return "US";
  if (locale === "en-gb" || locale.endsWith("-gb")) return "UK";
  if (locale === "en-ca" || locale.endsWith("-ca") || locale === "fr-ca") return "CA";
  if (locale === "en-au" || locale.endsWith("-au")) return "AU";
  return "EU";
}

export function PricingProvider({ children }: { children: ReactNode }) {
  const [region, setRegionState] = useState<PriceRegion>("EU");
  const [source, setSource] = useState<"automatic" | "manual">("automatic");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (isRegion(saved)) {
      setRegionState(saved);
      setSource("manual");
      return;
    }

    setRegionState(fallbackRegion());

    void fetch("/api/region", { cache: "no-store" })
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((data: { region?: string }) => {
        if (isRegion(data.region ?? null)) setRegionState(data.region as PriceRegion);
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
