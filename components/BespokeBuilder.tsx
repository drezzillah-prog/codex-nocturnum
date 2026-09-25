"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { products, intentionLabels, type IntentionKey } from "@/data/products";
import { useMarket } from "./PricingProvider";
import { getUi } from "@/data/i18n";
import { PriceTag } from "./PriceTag";

type Step = 0|1|2|3|4;

const associations = ["None / symbolic only","Hecate","Aphrodite","Selene","Freyja","Brigid","Apollo","Hermes","Odin","Custom request"];
const finishes = ["Archive Standard","Collector Presentation","Oxblood detail","Antique brass detail","Forest detail","Personal inscription"];

export function BespokeBuilder() {
  const params = useSearchParams();
  const { language } = useMarket();
  const copy = getUi(language);
  const [step,setStep] = useState<Step>(0);
  const initial = params.get("product");
  const [productCode,setProductCode] = useState(initial && products.some(p=>p.catalogue===initial) ? initial : products[0].catalogue);
  const [intention,setIntention] = useState<IntentionKey>("protection");
  const [association,setAssociation] = useState(associations[0]);
  const [finish,setFinish] = useState(finishes[0]);
  const [copied,setCopied] = useState(false);

  useEffect(() => {
    if (initial && products.some(p=>p.catalogue===initial)) setProductCode(initial);
  }, [initial]);

  const product = useMemo(() => products.find(p=>p.catalogue===productCode) ?? products[0],[productCode]);
  const steps=[copy.stepObject,copy.stepIntention,copy.stepAssociation,copy.stepFinish,copy.stepRecord];

  const summary = `CODEX NOCTURNUM — Bespoke Commission\n${product.catalogue} · ${product.name}\nIntention: ${intentionLabels[intention][language]}\nAssociation: ${association}\nFinish: ${finish}\nArchive Record requested: yes`;

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

        {step===3 && <ChoiceGrid>
          {finishes.map(item=><button type="button" className={finish===item?"choice-card is-active":"choice-card"} onClick={()=>setFinish(item)} key={item}><span>FINITIO</span><strong>{item}</strong></button>)}
        </ChoiceGrid>}

        {step===4 && <div className="archive-record-preview">
          <div>
            <p className="eyebrow">{copy.archiveRecord}</p>
            <h2>{product.name}</h2>
            <dl>
              <div><dt>Catalogue</dt><dd>{product.catalogue}</dd></div>
              <div><dt>Intention</dt><dd>{intentionLabels[intention][language]}</dd></div>
              <div><dt>Association</dt><dd>{association}</dd></div>
              <div><dt>Finish</dt><dd>{finish}</dd></div>
            </dl>
          </div>
          <div className="archive-record-preview__price"><small>{copy.from}</small><PriceTag product={product}/><p>{copy.archiveRecordText}</p></div>
        </div>}

        <div className="bespoke-builder__actions">
          <button type="button" className="button-ghost" disabled={step===0} onClick={()=>setStep(Math.max(0,step-1) as Step)}>←</button>
          {step<4 ? <button type="button" className="button-primary" onClick={()=>setStep(Math.min(4,step+1) as Step)}>{copy.details} →</button> :
          <button type="button" className="button-primary" onClick={copySummary}>{copied?"Copied ✓":copy.beginCommission}</button>}
        </div>
      </div>
    </section>
  );
}

function ChoiceGrid({children}:{children:React.ReactNode}) { return <div className="choice-grid">{children}</div>; }
