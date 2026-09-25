"use client";

import { IntentionTabs } from "@/components/IntentionTabs";
import { useMarket } from "@/components/PricingProvider";
import { getUi } from "@/data/i18n";

export default function IntentionsPage() {
  const { language } = useMarket();
  const copy = getUi(language);
  return (
    <div className="intentions-page-v6">
      <section className="compact-page-hero page-width">
        <p className="eyebrow">QUOD QUAERIS</p>
        <h1>{copy.intentionsTitle}</h1>
        <p>{copy.intentionsLead}</p>
      </section>
      <IntentionTabs />
    </div>
  );
}
