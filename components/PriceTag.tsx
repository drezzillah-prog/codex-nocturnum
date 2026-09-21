"use client";

import type { Product } from "@/data/products";
import { usePricing } from "./PricingProvider";

const formatterByRegion = {
  RO: new Intl.NumberFormat("ro-RO", { style: "currency", currency: "RON", maximumFractionDigits: 0 }),
  EU: new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }),
  US: new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }),
} as const;

export function PriceTag({ product }: { product: Product }) {
  const { region } = usePricing();
  return <span className="price-tag">{formatterByRegion[region].format(product.prices[region])}</span>;
}
