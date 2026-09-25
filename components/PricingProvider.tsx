"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { PriceRegion } from "@/data/products";
import type { Language } from "@/data/i18n";

type MarketContextValue = {
  region: PriceRegion;
  language: Language;
  currency: string;
  country: string | null;
  loading: boolean;
};

const MarketContext = createContext<MarketContextValue | null>(null);

const currencyByRegion: Record<PriceRegion, string> = {
  RO: "RON",
  EU: "EUR",
  US: "USD",
  UK: "GBP",
  CA: "CAD",
  AU: "AUD",
};

function browserLanguage(): Language {
  if (typeof navigator === "undefined") return "en";
  const code = navigator.language.toLowerCase();
  if (code.startsWith("ro")) return "ro";
  if (code.startsWith("fr")) return "fr";
  if (code.startsWith("de")) return "de";
  if (code.startsWith("it")) return "it";
  return "en";
}

export function PricingProvider({ children }: { children: ReactNode }) {
  const [region, setRegion] = useState<PriceRegion>("EU");
  const [language, setLanguage] = useState<Language>("en");
  const [country, setCountry] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLanguage(browserLanguage());

    void fetch("/api/region", { cache: "no-store" })
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((data: { region?: PriceRegion; language?: Language; country?: string | null }) => {
        if (data.region) setRegion(data.region);
        if (data.language) setLanguage(data.language);
        setCountry(data.country ?? null);
      })
      .catch(() => undefined)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo(
    () => ({ region, language, currency: currencyByRegion[region], country, loading }),
    [region, language, country, loading],
  );

  return <MarketContext.Provider value={value}>{children}</MarketContext.Provider>;
}

export function useMarket() {
  const value = useContext(MarketContext);
  if (!value) throw new Error("useMarket must be used inside PricingProvider");
  return value;
}

export function usePricing() {
  return useMarket();
}
