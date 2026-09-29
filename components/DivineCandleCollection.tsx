"use client";

import Link from "next/link";
import { useMarket } from "./PricingProvider";
import type { Language } from "@/data/i18n";

type Localized = Record<Language,string>;
type DivineStudy = {
  slug:string;
  name:string;
  association:Localized;
  description:Localized;
  alt?:0|1|2;
};

const l=(en:string,ro:string,fr:string,de:string,it:string):Localized=>({en,ro,fr,de,it});

const studies:DivineStudy[]=[
  {
    slug:"aphrodite",
    name:"Aphrodite",
    association:l("Love · beauty · self-devotion","Iubire · frumusețe · devoțiune de sine","Amour · beauté · dévotion à soi","Liebe · Schönheit · Selbsthingabe","Amore · bellezza · devozione verso sé"),
    description:l(
      "A sculpted devotional form inspired by Aphrodite, built around beauty, affection and self-devotional ritual atmosphere.",
      "O formă devoțională sculptată inspirată de Afrodita, construită în jurul frumuseții, afecțiunii și ritualurilor de devoțiune față de sine.",
      "Une forme dévotionnelle sculptée inspirée d’Aphrodite, autour de la beauté, de l’affection et de la dévotion à soi.",
      "Eine skulpturale Andachtsform, inspiriert von Aphrodite, rund um Schönheit, Zuneigung und Selbsthingabe.",
      "Una forma devozionale scolpita ispirata ad Afrodite, dedicata a bellezza, affetto e devozione verso sé."
    )
  },
  {
    slug:"lucifer",
    name:"Lucifer",
    association:l("Knowledge · self-mastery · freedom","Cunoaștere · stăpânire de sine · libertate","Connaissance · maîtrise de soi · liberté","Wissen · Selbstbeherrschung · Freiheit","Conoscenza · padronanza di sé · libertà"),
    description:l(
      "A symbolic Lucifer form for clients drawn to themes of illumination, knowledge, autonomy and self-mastery.",
      "O formă simbolică Lucifer pentru cei atrași de teme de iluminare, cunoaștere, autonomie și stăpânire de sine.",
      "Une forme symbolique de Lucifer autour de l’illumination, du savoir, de l’autonomie et de la maîtrise de soi.",
      "Eine symbolische Lucifer-Form für Themen wie Erleuchtung, Wissen, Autonomie und Selbstbeherrschung.",
      "Una forma simbolica di Lucifero legata a illuminazione, conoscenza, autonomia e padronanza di sé."
    )
  },
  {
    slug:"persephone",
    name:"Persephone",
    association:l("Transformation · return · sovereignty","Transformare · revenire · suveranitate","Transformation · retour · souveraineté","Transformation · Rückkehr · Souveränität","Trasformazione · ritorno · sovranità"),
    description:l(
      "A Persephone-inspired sculptural candle for ritual work associated with transition, return, seasonal change and personal sovereignty.",
      "O lumânare sculpturală inspirată de Persefona, asociată ritualurilor de tranziție, revenire, schimbare sezonieră și suveranitate personală.",
      "Une bougie sculpturale inspirée de Perséphone, associée aux transitions, au retour, aux saisons et à la souveraineté personnelle.",
      "Eine von Persephone inspirierte Kerze für Übergang, Rückkehr, saisonalen Wandel und persönliche Souveränität.",
      "Una candela scultorea ispirata a Persefone, associata a transizione, ritorno, cicli stagionali e sovranità personale."
    )
  },
  {
    slug:"hades",
    name:"Hades",
    association:l("Boundaries · depth · inner power","Limite · profunzime · forță interioară","Limites · profondeur · force intérieure","Grenzen · Tiefe · innere Kraft","Confini · profondità · forza interiore"),
    description:l(
      "A Hades-inspired form centered on boundaries, depth, underworld symbolism and the cultivation of inner authority.",
      "O formă inspirată de Hades, centrată pe limite, profunzime, simbolismul lumii de jos și cultivarea autorității interioare.",
      "Une forme inspirée d’Hadès autour des limites, de la profondeur, de l’imaginaire du monde souterrain et de l’autorité intérieure.",
      "Eine Hades-inspirierte Form rund um Grenzen, Tiefe, Unterweltsymbolik und innere Autorität.",
      "Una forma ispirata ad Ade, dedicata a confini, profondità, simbolismo dell’oltretomba e autorità interiore."
    )
  },
  {
    slug:"selene",
    name:"Selene",
    association:l("Lunar cycles · intuition · dreams","Cicluri lunare · intuiție · vise","Cycles lunaires · intuition · rêves","Mondzyklen · Intuition · Träume","Cicli lunari · intuizione · sogni"),
    description:l(
      "A lunar devotional form inspired by Selene, designed for moon-oriented ritual settings, reflection and dream symbolism.",
      "O formă devoțională lunară inspirată de Selene, gândită pentru ritualuri orientate spre Lună, reflecție și simbolismul viselor.",
      "Une forme dévotionnelle lunaire inspirée de Séléné, pour les rituels lunaires, la réflexion et le symbolisme du rêve.",
      "Eine lunare Andachtsform, inspiriert von Selene, für Mondrituale, Reflexion und Traumsymbolik.",
      "Una forma devozionale lunare ispirata a Selene, per rituali lunari, riflessione e simbolismo del sogno."
    ),
    alt:0
  },
  {
    slug:"apollo",
    name:"Apollo",
    association:l("Clarity · creativity · vitality","Claritate · creativitate · vitalitate","Clarté · créativité · vitalité","Klarheit · Kreativität · Vitalität","Chiarezza · creatività · vitalità"),
    description:l(
      "An Apollo-inspired candle associated with clarity, creative practice, artistic focus and solar ritual atmosphere.",
      "O lumânare inspirată de Apollo, asociată cu claritatea, practica creativă, concentrarea artistică și atmosfera ritualică solară.",
      "Une bougie inspirée d’Apollon associée à la clarté, à la création, à la concentration artistique et au symbolisme solaire.",
      "Eine Apollo-inspirierte Kerze für Klarheit, kreative Praxis, künstlerischen Fokus und solare Symbolik.",
      "Una candela ispirata ad Apollo, associata a chiarezza, creatività, concentrazione artistica e simbolismo solare."
    )
  },
  {
    slug:"artemis",
    name:"Artemis",
    association:l("Independence · protection · wilderness","Independență · protecție · natură sălbatică","Indépendance · protection · nature sauvage","Unabhängigkeit · Schutz · Wildnis","Indipendenza · protezione · natura selvaggia"),
    description:l(
      "An Artemis-inspired woodland form associated with independence, protective ritual work and the untamed natural world.",
      "O formă de pădure inspirată de Artemis, asociată cu independența, ritualurile de protecție și natura neîmblânzită.",
      "Une forme sylvestre inspirée d’Artémis, associée à l’indépendance, à la protection et au monde naturel sauvage.",
      "Eine von Artemis inspirierte Waldform für Unabhängigkeit, Schutzrituale und ungezähmte Natur.",
      "Una forma boschiva ispirata ad Artemide, associata a indipendenza, protezione e natura selvaggia."
    ),
    alt:1
  },
  {
    slug:"freyja",
    name:"Freyja",
    association:l("Love · magic · abundance","Iubire · magie · abundență","Amour · magie · abondance","Liebe · Magie · Fülle","Amore · magia · abbondanza"),
    description:l(
      "A Freyja-inspired devotional form associated with love, beauty, magic, courage and abundance-oriented ritual work.",
      "O formă devoțională inspirată de Freyja, asociată cu iubirea, frumusețea, magia, curajul și ritualurile orientate spre abundență.",
      "Une forme dévotionnelle inspirée de Freyja, associée à l’amour, la beauté, la magie, le courage et l’abondance.",
      "Eine Freyja-inspirierte Andachtsform für Liebe, Schönheit, Magie, Mut und auf Fülle ausgerichtete Rituale.",
      "Una forma devozionale ispirata a Freyja, associata ad amore, bellezza, magia, coraggio e rituali di abbondanza."
    )
  },
  {
    slug:"thoth",
    name:"Thoth",
    association:l("Wisdom · writing · divination","Înțelepciune · scris · divinație","Sagesse · écriture · divination","Weisheit · Schreiben · Divination","Saggezza · scrittura · divinazione"),
    description:l(
      "A Thoth-inspired form associated with study, writing, knowledge, symbolic systems and divinatory practice.",
      "O formă inspirată de Thoth, asociată cu studiul, scrisul, cunoașterea, sistemele simbolice și practica divinatorie.",
      "Une forme inspirée de Thot, associée à l’étude, l’écriture, le savoir, les systèmes symboliques et la divination.",
      "Eine Thoth-inspirierte Form für Studium, Schreiben, Wissen, Symbolsysteme und Divination.",
      "Una forma ispirata a Thoth, associata a studio, scrittura, conoscenza, sistemi simbolici e divinazione."
    )
  },
  {
    slug:"isis",
    name:"Isis",
    association:l("Devotion · protection · rebirth · restoration","Devoțiune · protecție · renaștere · refacere","Dévotion · protection · renaissance · restauration","Hingabe · Schutz · Wiedergeburt · Erneuerung","Devozione · protezione · rinascita · rinnovamento"),
    description:l(
      "An Isis-inspired devotional form associated with protection, devotion, renewal, maternal symbolism and new beginnings.",
      "O formă devoțională inspirată de Isis, asociată cu protecția, devoțiunea, reînnoirea, simbolismul matern și începuturile noi.",
      "Une forme dévotionnelle inspirée d’Isis, associée à la protection, à la dévotion, au renouveau, au symbolisme maternel et aux nouveaux départs.",
      "Eine Isis-inspirierte Andachtsform für Schutz, Hingabe, Erneuerung, mütterliche Symbolik und Neuanfang.",
      "Una forma devozionale ispirata a Iside, associata a protezione, devozione, rinnovamento, simbolismo materno e nuovi inizi."
    ),
    alt:2
  }
];

const sectionCopy:Record<Language,{eyebrow:string;title:string;intro:string;open:string;commission:string;alt:string;note:string}> = {
  en:{
    eyebrow:"DEUS · DEA · DEVOTIONAL FORMS",
    title:"Choose the figure that calls to you.",
    intro:"Each candle is sculpted as an archive object rather than a generic figurine. Choose a devotional association, then tailor the wax palette, aromatic profile, symbolic details, dedication and archival presentation.",
    open:"Open archive note",
    commission:"Commission this form",
    alt:"Alternate atelier study",
    note:"Deity names and correspondences are presented as symbolic or devotional associations. Designs are adapted respectfully to the chosen tradition without treating different cultures as one historical system."
  },
  ro:{
    eyebrow:"DEUS · DEA · FORME DEVOȚIONALE",
    title:"Alege figura care te cheamă.",
    intro:"Fiecare lumânare este sculptată ca obiect de arhivă, nu ca o figurină generică. Alegi asocierea devoțională, apoi poți adapta paleta cerii, profilul aromatic, detaliile simbolice, dedicația și prezentarea de arhivă.",
    open:"Deschide nota de arhivă",
    commission:"Comandă această formă",
    alt:"Studiu alternativ de atelier",
    note:"Numele zeităților și corespondențele sunt prezentate ca asocieri simbolice sau devoționale. Designurile sunt adaptate cu respect pentru tradiția aleasă, fără a amesteca mitologii diferite într-un singur sistem istoric."
  },
  fr:{
    eyebrow:"DEUS · DEA · FORMES DÉVOTIONNELLES",
    title:"Choisissez la figure qui vous appelle.",
    intro:"Chaque bougie est sculptée comme un objet d’archive plutôt qu’une figurine générique. Choisissez l’association dévotionnelle, puis adaptez la palette de cire, le profil aromatique, les détails symboliques, la dédicace et la présentation.",
    open:"Ouvrir la note d’archive",
    commission:"Commander cette forme",
    alt:"Étude alternative de l’atelier",
    note:"Les divinités et correspondances sont présentées comme des associations symboliques ou dévotionnelles, avec respect pour la tradition choisie."
  },
  de:{
    eyebrow:"DEUS · DEA · ANDACHTSFORMEN",
    title:"Wähle die Gestalt, die dich anspricht.",
    intro:"Jede Kerze wird als Archivobjekt statt als generische Figur gestaltet. Wähle die Andachtszuordnung und passe Wachspalette, Duftprofil, symbolische Details, Widmung und Archivpräsentation an.",
    open:"Archivnotiz öffnen",
    commission:"Diese Form beauftragen",
    alt:"Alternative Atelierstudie",
    note:"Gottheiten und Zuordnungen werden als symbolische oder devotional geprägte Assoziationen dargestellt und respektvoll an die gewählte Tradition angepasst."
  },
  it:{
    eyebrow:"DEUS · DEA · FORME DEVOZIONALI",
    title:"Scegli la figura che ti chiama.",
    intro:"Ogni candela è scolpita come oggetto d’archivio, non come statuetta generica. Scegli l’associazione devozionale e personalizza cera, profilo aromatico, dettagli simbolici, dedica e presentazione d’archivio.",
    open:"Apri la nota d’archivio",
    commission:"Commissiona questa forma",
    alt:"Studio alternativo dell’atelier",
    note:"Divinità e corrispondenze sono presentate come associazioni simboliche o devozionali e adattate con rispetto alla tradizione scelta."
  }
};

export function DivineCandleCollection(){
  const {language}=useMarket();
  const copy=sectionCopy[language];

  return (
    <div className="product-detail-v6__section divine-candles">
      <div className="divine-candles__intro">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h2>{copy.title}</h2>
        <p>{copy.intro}</p>
      </div>

      <div className="divine-candles__grid">
        {studies.map((study,index)=>(
          <article className="divine-card" key={study.slug}>
            <div className={`divine-card__image divine-card__image--${index}`} role="img" aria-label={study.name} />
            <div className="divine-card__head"><span>{String(index+1).padStart(2,"0")}</span><h3>{study.name}</h3></div>
            <p className="divine-card__association">{study.association[language]}</p>
            <details>
              <summary>{copy.open}</summary>
              <p>{study.description[language]}</p>
            </details>
            {study.alt !== undefined && (
              <div className="divine-card__alt">
                <div className={`divine-alt__image divine-alt__image--${study.alt}`} role="img" aria-label={`${study.name} — ${copy.alt}`} />
                <small>{copy.alt}</small>
              </div>
            )}
            <Link href={`/bespoke?product=CN-IV-DEV-001&association=${encodeURIComponent(study.name)}`}>{copy.commission} →</Link>
          </article>
        ))}
      </div>
      <p className="divine-candles__note">{copy.note}</p>
    </div>
  );
}
