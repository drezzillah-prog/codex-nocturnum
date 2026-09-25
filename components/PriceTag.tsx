"use client";

import type { Product } from "@/data/products";
import { useMarket } from "./PricingProvider";

const formatterByRegion = {
  RO: new Intl.NumberFormat("ro-RO", { style: "currency", currency: "RON", maximumFractionDigits: 0 }),
  EU: new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }),
  US: new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }),
  UK: new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }),
  CA: new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 }),
  AU: new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 }),
} as const;

export function PriceTag({ product }: { product: Product }) {
  const { region } = useMarket();
  return <span className="price-tag">{formatterByRegion[region].format(product.prices[region])}</span>;
}
