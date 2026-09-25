"use client";

import { CabinetTabs } from "@/components/CabinetTabs";
import { useMarket } from "@/components/PricingProvider";
import { getUi } from "@/data/i18n";

export default function ShopPage() {
  const { language, currency } = useMarket();
  const copy = getUi(language);

  return (
    <div className="shop-v6">
      <section className="compact-page-hero page-width">
        <p className="eyebrow">THE MATERIAL ARCHIVE · ACCESSION I</p>
        <h1>{copy.cabinetTitle}</h1>
        <p>{copy.cabinetLead}</p>
        <small>{copy.autoLanguageNote} · {currency}</small>
      </section>
      <CabinetTabs />
    </div>
  );
}
