"use client";

import { Suspense } from "react";
import { BespokeBuilder } from "@/components/BespokeBuilder";
import { useMarket } from "@/components/PricingProvider";
import { getUi } from "@/data/i18n";

function Content() {
  const { language } = useMarket();
  const copy = getUi(language);
  return (
    <>
      <section className="compact-page-hero page-width">
        <p className="eyebrow">COMMISSIO · MADE TO ORDER</p>
        <h1>{copy.bespokeTitle}</h1>
        <p>{copy.bespokeLead}</p>
      </section>
      <BespokeBuilder />
    </>
  );
}

export default function BespokePage() {
  return <div className="bespoke-page-v6"><Suspense fallback={null}><Content /></Suspense></div>;
}
