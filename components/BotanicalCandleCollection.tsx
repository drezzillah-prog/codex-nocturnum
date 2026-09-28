"use client";

import Link from "next/link";
import { useMarket } from "./PricingProvider";
import type { PriceRegion } from "@/data/products";

type Study = {
  slug:string;
  name:string;
  ingredients:string;
  association:string;
  description:string;
  pairing:string;
};

const studies:Study[] = [
  {
    slug:"tree-of-life",
    name:"Tree of Life",
    ingredients:"Rosemary · cedar · evergreen botanicals",
    association:"Grounding · resilience · protection",
    description:"A forest-green botanical pillar built around rooted strength and continuity, finished with a bronze Tree of Life talisman.",
    pairing:"For a fuller ritual expression, pair it with a Protection or Home-profile ritual oil."
  },
  {
    slug:"rose-devotion",
    name:"Rose Devotion",
    ingredients:"Rose · lavender · soft floral botanicals",
    association:"Affection · tenderness · devotion",
    description:"A rose-toned candle with dried petals and a bronze rose emblem, composed for beauty, tenderness and devotional atmosphere.",
    pairing:"Pair with a Love & Attraction oil or a personal dedication card."
  },
  {
    slug:"black-moon",
    name:"Black Moon",
    ingredients:"Mugwort · lavender · resinous botanical notes",
    association:"Intuition · dreamwork · reflection",
    description:"A black lunar pillar with a bronze crescent talisman and dark botanical dressing for evening ritual and contemplative practice.",
    pairing:"Pair with a Dream or Divination oil; mineral accents are supplied removable and external."
  },
  {
    slug:"solar-abundance",
    name:"Solar Abundance",
    ingredients:"Calendula · orange peel · bay · cinnamon",
    association:"Prosperity · confidence · momentum",
    description:"An ivory-gold solar candle with warm botanical notes and a bronze sun talisman, designed as a bright focal object for prosperity rites.",
    pairing:"Pair with a Prosperity oil or matching botanical dressing sachet."
  },
  {
    slug:"triple-moon",
    name:"Triple Moon",
    ingredients:"Lavender · mugwort · violet florals",
    association:"Cycles · intuition · lunar reflection",
    description:"A deep violet pillar marked with the Triple Moon, intended for lunar altars, cyclical ritual work and quiet intuitive practice.",
    pairing:"Pair with a Dream or Divination oil and a removable amethyst-toned mineral accent."
  },
  {
    slug:"compass-star",
    name:"Compass Star",
    ingredients:"Eucalyptus · chamomile · rosemary",
    association:"Direction · balance · restoration",
    description:"A pale apothecary-style candle with a bronze compass-star charm, created for reset rituals, transitions and deliberate reorientation.",
    pairing:"Pair with a Threshold oil or a short bespoke dedication."
  },
  {
    slug:"butterfly-renewal",
    name:"Butterfly Renewal",
    ingredients:"Calendula · chamomile · orange blossom",
    association:"Transformation · creativity · renewal",
    description:"An ivory botanical pillar with warm florals and a bronze butterfly, made for rites of change, creative seasons and fresh beginnings.",
    pairing:"Pair with a Transformation oil or Collector Presentation."
  },
  {
    slug:"pomegranate-hearth",
    name:"Pomegranate Hearth",
    ingredients:"Rose · pomegranate peel · hibiscus · warm spice",
    association:"Passion · abundance · hearth",
    description:"A burgundy candle with pomegranate and rose symbolism, built as a rich autumnal object for hearth, sensual and abundance-oriented ritual settings.",
    pairing:"Pair with Love, Home or Prosperity oil profiles."
  },
  {
    slug:"pine-ward",
    name:"Pine Ward",
    ingredients:"Rosemary · pine · cedar",
    association:"Protection · endurance · cleansing",
    description:"A deep forest pillar with evergreen botanicals and a bronze pine talisman, designed for protective and winter-season altar work.",
    pairing:"Pair with a Protection oil; dark mineral accents are supplied separately from the flame."
  },
  {
    slug:"solar-compass",
    name:"Solar Compass",
    ingredients:"Bay · rosemary · star anise · clove",
    association:"Focus · alignment · purposeful movement",
    description:"A pale botanical candle with a bronze compass-sun emblem, balancing warm spice and green notes for focused intention and ceremonial gifting.",
    pairing:"Pair with Wisdom, Courage or Threshold oil profiles."
  }
];

const signaturePrice:Record<PriceRegion,number>={RO:169,EU:39,US:45,UK:36,CA:62,AU:68};

export function BotanicalCandleCollection() {
  const { region } = useMarket();

  return (
    <div className="product-detail-v6__section botanical-candles">
      <div className="botanical-candles__intro">
        <p className="eyebrow">HERBARIUM IGNIS · BOTANICAL SIGNATURES</p>
        <h2>Ten simpler candles. Still unmistakably Codex.</h2>
        <p>Hand-finished botanical pillars with restrained talismans, archival presentation and a distinct ritual profile. Each signature includes the candle, symbolic botanical treatment, removable talisman, miniature folio and Archive Standard presentation.</p>
      </div>

      <div className="botanical-candles__grid">
        {studies.map((study,index)=>(
          <article className="botanical-card" key={study.slug}>
            <div className={`botanical-card__image botanical-card__image--${index}`} role="img" aria-label={study.name} />
            <div className="botanical-card__head">
              <span>{String(index+1).padStart(2,"0")}</span>
              <div><h3>{study.name}</h3><strong>{formatMoney(region,signaturePrice[region])}</strong></div>
            </div>
            <p className="botanical-card__association">{study.association}</p>
            <p className="botanical-card__ingredients">{study.ingredients}</p>
            <details>
              <summary>Open folio</summary>
              <p>{study.description}</p>
              <small>{study.pairing}</small>
            </details>
            <Link href={`/bespoke?product=CN-IV-PIL-002&variant=${encodeURIComponent(study.slug)}`}>Commission this candle →</Link>
          </article>
        ))}
      </div>

      <div className="botanical-candles__safety">
        <strong>Burn-safe production note</strong>
        <p>Photography shows the artistic direction. Final burnable versions keep combustible botanicals away from the wick; where necessary, botanicals are supplied as a removable exterior dressing or separate ritual sachet, and mineral accents remain external/removable. Symbolic correspondences are presented as traditional or contemporary ritual associations, not guaranteed outcomes.</p>
      </div>
    </div>
  );
}

function formatMoney(region:PriceRegion,value:number){
  const config={RO:["ro-RO","RON"],EU:["en-IE","EUR"],US:["en-US","USD"],UK:["en-GB","GBP"],CA:["en-CA","CAD"],AU:["en-AU","AUD"]} as const;
  const [locale,currency]=config[region];
  return new Intl.NumberFormat(locale,{style:"currency",currency,maximumFractionDigits:0}).format(value);
}
