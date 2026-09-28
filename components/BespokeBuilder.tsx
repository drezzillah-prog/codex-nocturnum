"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { products, intentionLabels, type IntentionKey, type PriceRegion } from "@/data/products";
import { useMarket } from "./PricingProvider";
import { getUi } from "@/data/i18n";

type Step = 0|1|2|3|4;
type DetailGroup = { label:string; options:string[] };
type AddOn = { key:string; label:string; prices:Record<PriceRegion,number>; candleOnly?:boolean };

const associations = [
  "None / symbolic only","Hecate","Aphrodite","Selene","Persephone","Artemis","Freyja","Brigid","The Morrigan",
  "Demeter","Isis","Apollo","Hermes","Dionysus","Ares / Mars","Odin","Thor","Cernunnos","Pan","Hades","Ra / Helios","Custom request"
];

const detailGroups:Record<string,DetailGroup[]> = {
  "CN-IV-DEV-001":[
    {label:"Wax colour",options:["Ivory","Black","Oxblood","Forest","Midnight blue","Terracotta","Custom request"]},
    {label:"Scent profile",options:["Unscented","Resinous","Floral","Herbal","Forest","Smoky"]},
    {label:"Botanical dressing",options:["None","Rose","Lavender","Rosemary","Mugwort","Bay","Cedar","Custom safe blend"]},
    {label:"Symbolic finish",options:["Archive Standard","Antique gold detail","Oxblood detail","Forest detail","Personal symbol"]},
  ],
  "CN-IV-PIL-002":[
    {label:"Wax colour",options:["Ivory","Black","Oxblood","Forest","Midnight blue","Terracotta"]},
    {label:"Scent profile",options:["Unscented","Resinous","Floral","Herbal","Forest","Smoky"]},
    {label:"Carving",options:["None","Protective mark","Threshold mark","Lunar mark","Solar mark","Custom request"]},
    {label:"Dressing",options:["None","Rosemary / Bay","Rose / Lavender","Mugwort / Cedar","Custom safe blend"]},
  ],
  "CN-III-OIL-003":[
    {label:"Scent family",options:["Resinous","Floral","Herbal","Forest","Smoky","Unscented"]},
    {label:"Botanical profile",options:["Protective","Attraction","Prosperity","Dream","Threshold","Remembrance","Custom request"]},
    {label:"Bottle finish",options:["Archive Standard","Oxblood seal","Forest seal","Antique gold seal"]},
  ],
  "CN-III-INC-004":[
    {label:"Blend profile",options:["Resinous","Forest","Smoky","Floral","Herbal"]},
    {label:"Ritual direction",options:["Protection","Dream","Threshold","Remembrance","Devotional","Seasonal"]},
    {label:"Presentation",options:["Archive Standard","Collector jar","Wax-sealed packet"]},
  ],
  "CN-III-DRS-005":[
    {label:"Herbal profile",options:["Protective","Attraction","Prosperity","Cleansing","Threshold","Home"]},
    {label:"Salt profile",options:["Fine mineral","Coarse mineral","Black visual blend","Sea-salt style"]},
    {label:"Aromatic finish",options:["Unscented","Herbal","Resinous","Floral"]},
  ],
  "CN-III-AQU-006":[
    {label:"Water type",options:["Moon","Sea","Dawn","Threshold","Remembrance"]},
    {label:"Seal",options:["Black","Oxblood","Forest","Antique gold"]},
    {label:"Presentation",options:["Archive Standard","Collector vial"]},
  ],
  "CN-II-MIN-007":[
    {label:"Mineral family",options:["Smoky quartz","Obsidian","Labradorite","Moonstone","Hematite","Agate","Pyrite","Curated surprise"]},
    {label:"Talisman theme",options:["Protection","Dream","Prosperity","Wisdom","Courage","Love"]},
    {label:"Presentation",options:["Archive packet","Dark pouch","Pouch + metal charm"]},
  ],
  "CN-IV-KIT-008":[
    {label:"Candle profile",options:["Devotional","Pillar","Unscented ritual","Dark wax"]},
    {label:"Oil profile",options:["Protective","Attraction","Prosperity","Dream","Threshold","Remembrance"]},
    {label:"Mineral",options:["Smoky quartz","Obsidian","Labradorite","Moonstone","Curated surprise"]},
    {label:"Presentation",options:["Archive Standard","Collector Presentation"]},
  ],
  "CN-IV-TXT-009":[
    {label:"Textile colour",options:["Black","Oxblood","Forest","Warm ivory"]},
    {label:"Border motif",options:["Botanical","Lunar","Threshold","Geometric archive","Custom request"]},
    {label:"Symbol",options:["None","Deity association","Protective mark","Initials","Custom request"]},
  ],
  "CN-IV-KEY-010":[
    {label:"Theme",options:["Threshold","Memory","Protection","Dream","Return","Silence"]},
    {label:"Metal finish",options:["Antique brass","Dark iron","Aged silver"]},
    {label:"Engraving",options:["None","Initials","Single word","Symbol","Custom request"]},
  ],
  "CN-V-CST-011":[
    {label:"Material mix",options:["Metal + stone","Mostly stone","Mostly metal","Curated mixed set"]},
    {label:"Cloth colour",options:["Black","Oxblood","Forest","Warm ivory"]},
    {label:"Symbol system",options:["Archive symbols","Botanical","Lunar","Threshold","Custom request"]},
  ],
  "CN-V-SCR-012":[
    {label:"Frame finish",options:["Black wood","Dark walnut","Antique brass detail","Aged silver detail"]},
    {label:"Symbol",options:["None","Lunar","Threshold","Deity association","Custom request"]},
    {label:"Pouch",options:["Black","Oxblood","Forest"]},
  ],
};

const addOns:AddOn[] = [
  {key:"collector",label:"Collector Presentation",prices:{RO:59,EU:14,US:16,UK:13,CA:23,AU:25}},
  {key:"dedication",label:"Personal dedication card",prices:{RO:15,EU:3,US:4,UK:3,CA:5,AU:6}},
  {key:"seal",label:"Personal archive seal",prices:{RO:25,EU:6,US:7,UK:5,CA:9,AU:10}},
  {key:"dressing",label:"Botanical Dressing Sachet",prices:{RO:19,EU:4,US:5,UK:4,CA:7,AU:8},candleOnly:true},
  {key:"oil",label:"Matching Ritual Oil · 10 ml",prices:{RO:49,EU:12,US:14,UK:11,CA:19,AU:21},candleOnly:true},
  {key:"botanical",label:"Botanical Signature Finish",prices:{RO:40,EU:9,US:10,UK:8,CA:13,AU:13},candleOnly:true},
];

export function BespokeBuilder() {
  const params = useSearchParams();
  const { language, region } = useMarket();
  const copy = getUi(language);
  const [step,setStep] = useState<Step>(0);
  const initial = params.get("product");
  const initialVariant = params.get("variant");
  const [productCode,setProductCode] = useState(initial && products.some(p=>p.catalogue===initial) ? initial : products[0].catalogue);
  const [intention,setIntention] = useState<IntentionKey>("protection");
  const [association,setAssociation] = useState(associations[0]);
  const [details,setDetails] = useState<Record<string,string>>({});
  const [extras,setExtras] = useState<string[]>([]);
  const [dedication,setDedication] = useState("");
  const [copied,setCopied] = useState(false);

  useEffect(() => {
    if (initial && products.some(p=>p.catalogue===initial)) setProductCode(initial);
  }, [initial]);

  useEffect(() => {
    const botanicalSelected = Boolean(initialVariant) && (productCode === "CN-IV-PIL-002" || productCode === "CN-IV-DEV-001");
    setDetails(botanicalSelected ? {"Botanical direction": initialVariant ?? ""} : {});
    setExtras(botanicalSelected ? ["botanical"] : []);
    setCopied(false);
  }, [productCode, initialVariant]);

  const product = useMemo(() => products.find(p=>p.catalogue===productCode) ?? products[0],[productCode]);
  const groups = detailGroups[product.catalogue] ?? [];
  const isCandle = product.catalogue.includes("DEV") || product.catalogue.includes("PIL");
  const visibleAddOns = addOns.filter(item => !item.candleOnly || isCandle);
  const extrasTotal = visibleAddOns.filter(item => extras.includes(item.key)).reduce((sum,item)=>sum+item.prices[region],0);
  const total = product.prices[region] + extrasTotal;
  const steps=[copy.stepObject,copy.stepIntention,copy.stepAssociation,copy.stepFinish,copy.stepRecord];

  const summaryLines = [
    "CODEX NOCTURNUM — Bespoke Commission",
    `${product.catalogue} · ${product.name}`,
    `Intention: ${intentionLabels[intention][language]}`,
    `Association: ${association}`,
    ...Object.entries(details).map(([key,value])=>`${key}: ${value}`),
    ...(dedication.trim() ? [`Dedication: ${dedication.trim()}`] : []),
    `Add-ons: ${visibleAddOns.filter(item=>extras.includes(item.key)).map(item=>item.label).join(", ") || "None"}`,
    `Estimated configured price: ${formatMoney(region,total)}`,
    "Archive Record requested: yes",
  ];
  const summary = summaryLines.join("\n");

  const toggleExtra = (key:string) => setExtras(current => current.includes(key) ? current.filter(item=>item!==key) : [...current,key]);

  const copySummary = async () => {
    try { await navigator.clipboard.writeText(summary); setCopied(true); } catch {}
  };

  return (
    <section className="bespoke-builder page-width">
      <div className="mystic-tabs mystic-tabs--steps" role="tablist">
        {steps.map((label,index)=><button type="button" key={label} className={step===index?"mystic-tab is-active":"mystic-tab"} onClick={()=>setStep(index as Step)}><i>{index+1}</i><span>{label.replace(/^\d+\s·\s/,"")}</span></button>)}
      </div>

      <div className="bespoke-builder__panel">
        {step===0 && <ChoiceGrid>
          {products.map(p=><button type="button" className={productCode===p.catalogue?"choice-card is-active":"choice-card"} onClick={()=>setProductCode(p.catalogue)} key={p.catalogue}><span>{p.catalogue}</span><strong>{p.name}</strong><small>{p.size}</small></button>)}
        </ChoiceGrid>}

        {step===1 && <ChoiceGrid>
          {(Object.keys(intentionLabels) as IntentionKey[]).map(key=><button type="button" className={intention===key?"choice-card is-active":"choice-card"} onClick={()=>setIntention(key)} key={key}><span>INTENTIO</span><strong>{intentionLabels[key][language]}</strong></button>)}
        </ChoiceGrid>}

        {step===2 && <ChoiceGrid>
          {associations.map(item=><button type="button" className={association===item?"choice-card is-active":"choice-card"} onClick={()=>setAssociation(item)} key={item}><span>ASSOCIATIO</span><strong>{item}</strong></button>)}
        </ChoiceGrid>}

        {step===3 && <div className="bespoke-customization">
          {groups.map(group => (
            <section className="bespoke-customization__group" key={group.label}>
              <p className="eyebrow">{group.label}</p>
              <div className="bespoke-customization__choices">
                {group.options.map(option => (
                  <button type="button" className={details[group.label]===option?"is-active":""} onClick={()=>setDetails(current=>({...current,[group.label]:option}))} key={option}>{option}</button>
                ))}
              </div>
            </section>
          ))}

          <section className="bespoke-customization__group">
            <p className="eyebrow">Optional additions</p>
            <div className="bespoke-addons">
              {visibleAddOns.map(item => (
                <button type="button" className={extras.includes(item.key)?"is-active":""} onClick={()=>toggleExtra(item.key)} key={item.key}>
                  <span>{extras.includes(item.key) ? "✓" : "+"}</span><strong>{item.label}</strong><small>+ {formatMoney(region,item.prices[region])}</small>
                </button>
              ))}
            </div>
          </section>

          <label className="bespoke-dedication">
            <span>Short dedication / inscription request</span>
            <textarea value={dedication} onChange={event=>setDedication(event.target.value.slice(0,120))} placeholder="Optional · subject to feasibility and safety review" rows={3}/>
            <small>{dedication.length}/120</small>
          </label>
        </div>}

        {step===4 && <div className="archive-record-preview">
          <div>
            <p className="eyebrow">{copy.archiveRecord}</p>
            <h2>{product.name}</h2>
            <dl>
              <div><dt>Catalogue</dt><dd>{product.catalogue}</dd></div>
              <div><dt>Intention</dt><dd>{intentionLabels[intention][language]}</dd></div>
              <div><dt>Association</dt><dd>{association}</dd></div>
              {Object.entries(details).map(([key,value])=><div key={key}><dt>{key}</dt><dd>{value}</dd></div>)}
              {dedication.trim() && <div><dt>Dedication</dt><dd>{dedication.trim()}</dd></div>}
              <div><dt>Add-ons</dt><dd>{visibleAddOns.filter(item=>extras.includes(item.key)).map(item=>item.label).join(", ") || "None"}</dd></div>
            </dl>
          </div>
          <div className="archive-record-preview__price">
            <small>Configured estimate</small>
            <strong className="bespoke-total">{formatMoney(region,total)}</strong>
            {extrasTotal>0 && <span>Base {formatMoney(region,product.prices[region])} + additions {formatMoney(region,extrasTotal)}</span>}
            <p>{copy.archiveRecordText}</p>
            <p className="bespoke-safety-note">Symbolic associations and ritual traditions are presented as cultural or contemporary practice, not guaranteed outcomes. Material choices remain subject to feasibility and safety review.</p>
          </div>
        </div>}

        <div className="bespoke-builder__actions">
          <button type="button" className="button-ghost" disabled={step===0} onClick={()=>setStep(Math.max(0,step-1) as Step)}>←</button>
          {step<4 ? <button type="button" className="button-primary" onClick={()=>setStep(Math.min(4,step+1) as Step)}>{copy.details} →</button> :
          <button type="button" className="button-primary" onClick={copySummary}>{copied?"Commission record copied ✓":copy.beginCommission}</button>}
        </div>
      </div>
    </section>
  );
}

function ChoiceGrid({children}:{children:React.ReactNode}) { return <div className="choice-grid">{children}</div>; }

function formatMoney(region:PriceRegion,value:number) {
  const config = {
    RO:["ro-RO","RON"], EU:["en-IE","EUR"], US:["en-US","USD"], UK:["en-GB","GBP"], CA:["en-CA","CAD"], AU:["en-AU","AUD"],
  } as const;
  const [locale,currency]=config[region];
  return new Intl.NumberFormat(locale,{style:"currency",currency,maximumFractionDigits:0}).format(value);
}
