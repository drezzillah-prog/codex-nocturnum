"use client";

import Link from "next/link";
import { useMarket } from "./PricingProvider";
import type { PriceRegion } from "@/data/products";
import type { Language } from "@/data/i18n";

type Localized = Record<Language, string>;

type Study = {
  slug: string;
  name: Localized;
  ingredients: Localized;
  association: Localized;
  description: Localized;
};

const l = (en:string, ro:string, fr:string, de:string, it:string):Localized => ({en,ro,fr,de,it});

const studies: Study[] = [
  {
    slug:"tree-of-life",
    name:l("Tree of Life","Arborele Vieții","Arbre de Vie","Baum des Lebens","Albero della Vita"),
    ingredients:l(
      "Rosemary · cedar · evergreen botanicals",
      "Rozmarin · cedru · plante veșnic verzi",
      "Romarin · cèdre · végétaux persistants",
      "Rosmarin · Zeder · immergrüne Pflanzen",
      "Rosmarino · cedro · piante sempreverdi"
    ),
    association:l(
      "Grounding · protection · resilience · steadiness",
      "Înrădăcinare · protecție · reziliență · stabilitate",
      "Ancrage · protection · résilience · stabilité",
      "Erdung · Schutz · Widerstandskraft · Beständigkeit",
      "Radicamento · protezione · resilienza · stabilità"
    ),
    description:l(
      "Rosemary, cedar and evergreen plants are traditionally associated with grounding, protection and endurance. A forest-toned candle for rituals centred on steadiness, continuity and the home.",
      "Rozmarinul, cedrul și plantele veșnic verzi sunt asociate tradițional cu înrădăcinarea, protecția și rezistența. O lumânare în tonuri de pădure, potrivită ritualurilor dedicate stabilității, continuității și căminului.",
      "Le romarin, le cèdre et les végétaux persistants sont traditionnellement associés à l’ancrage, à la protection et à l’endurance. Une bougie aux tonalités forestières pour les rituels de stabilité, de continuité et du foyer.",
      "Rosmarin, Zeder und immergrüne Pflanzen werden traditionell mit Erdung, Schutz und Ausdauer verbunden. Eine waldgrüne Kerze für Rituale rund um Beständigkeit, Kontinuität und Zuhause.",
      "Rosmarino, cedro e piante sempreverdi sono tradizionalmente associati a radicamento, protezione e resistenza. Una candela dai toni boschivi per rituali di stabilità, continuità e casa."
    )
  },
  {
    slug:"solar-abundance",
    name:l("Solar Abundance","Abundența Solară","Abondance Solaire","Sonnenfülle","Abbondanza Solare"),
    ingredients:l(
      "Bay · cinnamon · orange peel · basil",
      "Dafin · scorțișoară · coajă de portocală · busuioc",
      "Laurier · cannelle · écorce d’orange · basilic",
      "Lorbeer · Zimt · Orangenschale · Basilikum",
      "Alloro · cannella · scorza d’arancia · basilico"
    ),
    association:l(
      "Prosperity · success · expansion · opportunity",
      "Prosperitate · reușită · expansiune · oportunități",
      "Prospérité · réussite · expansion · opportunités",
      "Wohlstand · Erfolg · Wachstum · Möglichkeiten",
      "Prosperità · successo · espansione · opportunità"
    ),
    description:l(
      "Bay, cinnamon, orange and basil are long-standing symbols of prosperity, success and favourable openings. Created for abundance rituals and intentions focused on growth and opportunity.",
      "Dafinul, scorțișoara, portocala și busuiocul sunt simboluri tradiționale ale prosperității, reușitei și drumurilor favorabile. Gândită pentru ritualuri de abundență și intenții legate de creștere și deschiderea oportunităților.",
      "Le laurier, la cannelle, l’orange et le basilic sont depuis longtemps associés à la prospérité, à la réussite et aux ouvertures favorables. Conçue pour les rituels d’abondance et les intentions de croissance.",
      "Lorbeer, Zimt, Orange und Basilikum gelten traditionell als Symbole für Wohlstand, Erfolg und günstige Möglichkeiten. Für Fülle-Rituale und Absichten rund um Wachstum und neue Chancen.",
      "Alloro, cannella, arancia e basilico sono simboli tradizionali di prosperità, successo e occasioni favorevoli. Pensata per rituali di abbondanza e intenzioni legate alla crescita."
    )
  },
  {
    slug:"heart-garden",
    name:l("Heart Garden","Grădina Inimii","Jardin du Cœur","Garten des Herzens","Giardino del Cuore"),
    ingredients:l(
      "Rose · hibiscus · jasmine · lavender",
      "Trandafir · hibiscus · iasomie · lavandă",
      "Rose · hibiscus · jasmin · lavande",
      "Rose · Hibiskus · Jasmin · Lavendel",
      "Rosa · ibisco · gelsomino · lavanda"
    ),
    association:l(
      "Love · affection · sensuality · harmony",
      "Dragoste · apropiere · senzualitate · armonie",
      "Amour · affection · sensualité · harmonie",
      "Liebe · Zuneigung · Sinnlichkeit · Harmonie",
      "Amore · affetto · sensualità · armonia"
    ),
    description:l(
      "Rose, hibiscus, jasmine and lavender form a floral composition traditionally linked with love, attraction, tenderness and harmony. Suited to devotional, relational and self-love rituals.",
      "Trandafirul, hibiscusul, iasomia și lavanda alcătuiesc o compoziție florală asociată tradițional cu dragostea, atracția, tandrețea și armonia. Potrivită ritualurilor de devoțiune, apropiere și iubire de sine.",
      "Rose, hibiscus, jasmin et lavande composent un accord floral traditionnellement lié à l’amour, à l’attirance, à la tendresse et à l’harmonie. Idéale pour les rituels de dévotion, de lien et d’amour de soi.",
      "Rose, Hibiskus, Jasmin und Lavendel bilden eine florale Komposition, die traditionell mit Liebe, Anziehung, Zärtlichkeit und Harmonie verbunden wird. Für Hingabe-, Beziehungs- und Selbstliebe-Rituale.",
      "Rosa, ibisco, gelsomino e lavanda formano una composizione floreale tradizionalmente legata ad amore, attrazione, tenerezza e armonia. Adatta a rituali di devozione, relazione e amore per sé."
    )
  },
  {
    slug:"iron-threshold",
    name:l("Iron Threshold","Pragul de Fier","Seuil de Fer","Eiserne Schwelle","Soglia di Ferro"),
    ingredients:l(
      "Rosemary · juniper · cedar · clove",
      "Rozmarin · ienupăr · cedru · cuișoare",
      "Romarin · genévrier · cèdre · clou de girofle",
      "Rosmarin · Wacholder · Zeder · Nelke",
      "Rosmarino · ginepro · cedro · chiodi di garofano"
    ),
    association:l(
      "Protection · boundaries · warding · home",
      "Protecție · limite · apărare · ocrotirea casei",
      "Protection · limites · défense · foyer",
      "Schutz · Grenzen · Abwehr · Zuhause",
      "Protezione · confini · difesa · casa"
    ),
    description:l(
      "Rosemary, juniper, cedar and clove are traditionally used in symbolic protection and boundary-setting practices. A darker composition for rituals concerning the home, personal space and resilience.",
      "Rozmarinul, ienupărul, cedrul și cuișoarele sunt folosite tradițional în practici simbolice de protecție și delimitare. O compoziție mai întunecată pentru ritualuri dedicate casei, spațiului personal și rezistenței.",
      "Romarin, genévrier, cèdre et clou de girofle sont traditionnellement employés dans les pratiques symboliques de protection et de délimitation. Une composition sombre pour le foyer, l’espace personnel et la résilience.",
      "Rosmarin, Wacholder, Zeder und Nelke werden traditionell in symbolischen Schutz- und Abgrenzungspraktiken verwendet. Eine dunklere Komposition für Zuhause, persönlichen Raum und Widerstandskraft.",
      "Rosmarino, ginepro, cedro e chiodi di garofano sono tradizionalmente usati in pratiche simboliche di protezione e definizione dei confini. Una composizione scura per casa, spazio personale e resilienza."
    )
  },
  {
    slug:"oracle-sleep",
    name:l("Oracle’s Sleep","Somnul Oracolului","Sommeil de l’Oracle","Schlaf des Orakels","Sonno dell’Oracolo"),
    ingredients:l(
      "Mugwort · lavender · chamomile · star anise",
      "Pelin · lavandă · mușețel · anason stelat",
      "Armoise · lavande · camomille · anis étoilé",
      "Beifuß · Lavendel · Kamille · Sternanis",
      "Artemisia · lavanda · camomilla · anice stellato"
    ),
    association:l(
      "Dreams · intuition · divination · night ritual",
      "Vise · intuiție · divinație · ritualuri nocturne",
      "Rêves · intuition · divination · rituels nocturnes",
      "Träume · Intuition · Divination · Nachtrituale",
      "Sogni · intuizione · divinazione · rituali notturni"
    ),
    description:l(
      "Mugwort, lavender, chamomile and star anise draw on traditional associations with dreams, intuition and divinatory practice. Made for quiet evening rituals, dream journals and reflective work.",
      "Pelinul, lavanda, mușețelul și anasonul stelat trimit la asocieri tradiționale cu visele, intuiția și practica divinatorie. Gândită pentru ritualuri liniștite de seară, jurnalul viselor și momente de reflecție.",
      "Armoise, lavande, camomille et anis étoilé évoquent des associations traditionnelles avec les rêves, l’intuition et la divination. Pensée pour les rituels du soir, le journal des rêves et la contemplation.",
      "Beifuß, Lavendel, Kamille und Sternanis knüpfen an traditionelle Verbindungen zu Träumen, Intuition und Divination an. Für ruhige Abendrituale, Traumtagebücher und Reflexion.",
      "Artemisia, lavanda, camomilla e anice stellato richiamano associazioni tradizionali con sogni, intuizione e divinazione. Pensata per rituali serali, diario dei sogni e riflessione."
    )
  },
  {
    slug:"cleansed-house",
    name:l("Cleansed House","Casa Curățată","Maison Purifiée","Gereinigtes Haus","Casa Purificata"),
    ingredients:l(
      "Common sage · rosemary · lemon peel · cedar",
      "Salvie comună · rozmarin · coajă de lămâie · cedru",
      "Sauge commune · romarin · zeste de citron · cèdre",
      "Echter Salbei · Rosmarin · Zitronenschale · Zeder",
      "Salvia comune · rosmarino · scorza di limone · cedro"
    ),
    association:l(
      "Cleansing · home blessing · renewal · clarity",
      "Curățare · binecuvântarea casei · reînnoire · limpezime",
      "Purification · bénédiction du foyer · renouveau · clarté",
      "Reinigung · Haussegen · Erneuerung · Klarheit",
      "Purificazione · benedizione della casa · rinnovamento · chiarezza"
    ),
    description:l(
      "Sage, rosemary, lemon and cedar are traditionally associated with cleansing, renewal and a refreshed home atmosphere. Designed for threshold rituals, seasonal resets and home blessing.",
      "Salvia, rozmarinul, lămâia și cedrul sunt asociate tradițional cu purificarea, reînnoirea și împrospătarea atmosferei casei. Potrivită ritualurilor de prag, schimbărilor de sezon și binecuvântării căminului.",
      "Sauge, romarin, citron et cèdre sont traditionnellement associés à la purification, au renouveau et à une atmosphère domestique rafraîchie. Pour les rituels de seuil, les changements de saison et la bénédiction du foyer.",
      "Salbei, Rosmarin, Zitrone und Zeder werden traditionell mit Reinigung, Erneuerung und einer frischen Wohnatmosphäre verbunden. Für Schwellenrituale, saisonale Neustarts und Haussegen.",
      "Salvia, rosmarino, limone e cedro sono tradizionalmente associati a purificazione, rinnovamento e a un’atmosfera domestica rinfrescata. Per rituali di soglia, cambi di stagione e benedizione della casa."
    )
  },
  {
    slug:"crown-of-courage",
    name:l("Crown of Courage","Coroana Curajului","Couronne du Courage","Krone des Mutes","Corona del Coraggio"),
    ingredients:l(
      "Bay · thyme · ginger · rosemary",
      "Dafin · cimbru · ghimbir · rozmarin",
      "Laurier · thym · gingembre · romarin",
      "Lorbeer · Thymian · Ingwer · Rosmarin",
      "Alloro · timo · zenzero · rosmarino"
    ),
    association:l(
      "Courage · confidence · victory · personal strength",
      "Curaj · încredere · izbândă · forță personală",
      "Courage · confiance · victoire · force personnelle",
      "Mut · Selbstvertrauen · Sieg · persönliche Stärke",
      "Coraggio · fiducia · vittoria · forza personale"
    ),
    description:l(
      "Bay, thyme, ginger and rosemary carry traditional associations with courage, resolve and victory. A warm, herbaceous candle for moments that call for confidence, action and determination.",
      "Dafinul, cimbrul, ghimbirul și rozmarinul poartă asocieri tradiționale cu curajul, hotărârea și izbânda. O lumânare caldă, ierboasă, pentru momente care cer încredere, acțiune și perseverență.",
      "Laurier, thym, gingembre et romarin portent des associations traditionnelles avec le courage, la détermination et la victoire. Une bougie chaleureuse pour les moments qui appellent confiance et action.",
      "Lorbeer, Thymian, Ingwer und Rosmarin stehen traditionell für Mut, Entschlossenheit und Erfolg. Eine warme Kräuterkerze für Momente, die Selbstvertrauen, Tatkraft und Ausdauer verlangen.",
      "Alloro, timo, zenzero e rosmarino sono tradizionalmente associati a coraggio, determinazione e vittoria. Una candela calda ed erbacea per momenti che richiedono fiducia e azione."
    )
  },
  {
    slug:"fire-of-creation",
    name:l("Fire of Creation","Focul Creației","Feu de la Création","Feuer der Schöpfung","Fuoco della Creazione"),
    ingredients:l(
      "Calendula · orange peel · rosemary · cinnamon",
      "Gălbenele · coajă de portocală · rozmarin · scorțișoară",
      "Calendula · écorce d’orange · romarin · cannelle",
      "Ringelblume · Orangenschale · Rosmarin · Zimt",
      "Calendula · scorza d’arancia · rosmarino · cannella"
    ),
    association:l(
      "Creativity · visibility · success · inspired action",
      "Creativitate · vizibilitate · reușită · acțiune inspirată",
      "Créativité · visibilité · réussite · action inspirée",
      "Kreativität · Sichtbarkeit · Erfolg · inspirierte Tatkraft",
      "Creatività · visibilità · successo · azione ispirata"
    ),
    description:l(
      "Calendula, orange, rosemary and cinnamon create a bright composition traditionally connected with creativity, visibility and forward movement. Intended for artistic practice, new projects and inspired action.",
      "Gălbenelele, portocala, rozmarinul și scorțișoara formează o compoziție luminoasă, asociată tradițional cu creativitatea, vizibilitatea și mersul înainte. Gândită pentru practici artistice, proiecte noi și acțiune inspirată.",
      "Calendula, orange, romarin et cannelle forment une composition lumineuse traditionnellement liée à la créativité, à la visibilité et à l’élan. Pour la pratique artistique, les nouveaux projets et l’action inspirée.",
      "Ringelblume, Orange, Rosmarin und Zimt ergeben eine leuchtende Komposition, traditionell verbunden mit Kreativität, Sichtbarkeit und Vorwärtsbewegung. Für künstlerische Praxis, neue Projekte und inspirierte Tatkraft.",
      "Calendula, arancia, rosmarino e cannella creano una composizione luminosa tradizionalmente legata a creatività, visibilità e slancio. Per pratica artistica, nuovi progetti e azione ispirata."
    )
  },
  {
    slug:"garden-of-memory",
    name:l("Garden of Memory","Memoria Grădinii","Jardin de la Mémoire","Garten der Erinnerung","Giardino della Memoria"),
    ingredients:l(
      "Rosemary · lavender · rose · bay",
      "Rozmarin · lavandă · trandafir · dafin",
      "Romarin · lavande · rose · laurier",
      "Rosmarin · Lavendel · Rose · Lorbeer",
      "Rosmarino · lavanda · rosa · alloro"
    ),
    association:l(
      "Remembrance · ancestry · tenderness · sacred memory",
      "Amintire · reflecție ancestrală · tandrețe · memorie sacră",
      "Souvenir · ancêtres · tendresse · mémoire sacrée",
      "Erinnerung · Ahnen · Zärtlichkeit · heiliges Gedenken",
      "Ricordo · antenati · tenerezza · memoria sacra"
    ),
    description:l(
      "Rosemary, lavender, rose and bay evoke remembrance, affection and continuity across generations. A quiet candle for memorial rituals, ancestral reflection and keeping meaningful memories close.",
      "Rozmarinul, lavanda, trandafirul și dafinul evocă amintirea, afecțiunea și continuitatea dintre generații. O lumânare liniștită pentru ritualuri de comemorare, reflecție ancestrală și păstrarea aproape a amintirilor importante.",
      "Romarin, lavande, rose et laurier évoquent le souvenir, l’affection et la continuité entre générations. Une bougie paisible pour les rituels de mémoire, la réflexion ancestrale et les souvenirs précieux.",
      "Rosmarin, Lavendel, Rose und Lorbeer erinnern an Gedenken, Zuneigung und generationenübergreifende Kontinuität. Eine ruhige Kerze für Erinnerungsrituale, Ahnenreflexion und kostbare Erinnerungen.",
      "Rosmarino, lavanda, rosa e alloro evocano ricordo, affetto e continuità tra generazioni. Una candela quieta per rituali commemorativi, riflessione sugli antenati e memorie preziose."
    )
  },
  {
    slug:"gate-of-change",
    name:l("Gate of Change","Poarta Schimbării","Porte du Changement","Tor des Wandels","Porta del Cambiamento"),
    ingredients:l(
      "Mugwort · bay · calendula · clove",
      "Pelin · dafin · gălbenele · cuișoare",
      "Armoise · laurier · calendula · clou de girofle",
      "Beifuß · Lorbeer · Ringelblume · Nelke",
      "Artemisia · alloro · calendula · chiodi di garofano"
    ),
    association:l(
      "Transformation · thresholds · new beginnings · transition",
      "Transformare · praguri · începuturi noi · trecere",
      "Transformation · seuils · nouveaux départs · transition",
      "Wandel · Schwellen · Neuanfang · Übergang",
      "Trasformazione · soglie · nuovi inizi · passaggio"
    ),
    description:l(
      "Mugwort, bay, calendula and clove are traditionally associated with thresholds, change and intentional transition. Created for endings, beginnings and the symbolic moment of crossing from one chapter into another.",
      "Pelinul, dafinul, gălbenelele și cuișoarele sunt asociate tradițional cu pragurile, schimbarea și trecerea asumată. Gândită pentru încheieri, începuturi și acel moment simbolic în care treci dintr-un capitol în altul.",
      "Armoise, laurier, calendula et clou de girofle sont traditionnellement associés aux seuils, au changement et à la transition choisie. Pour les fins, les commencements et le passage symbolique d’un chapitre à l’autre.",
      "Beifuß, Lorbeer, Ringelblume und Nelke werden traditionell mit Schwellen, Wandel und bewusstem Übergang verbunden. Für Abschlüsse, Neuanfänge und den symbolischen Schritt von einem Kapitel ins nächste.",
      "Artemisia, alloro, calendula e chiodi di garofano sono tradizionalmente associati a soglie, cambiamento e passaggi consapevoli. Per conclusioni, nuovi inizi e il passaggio simbolico da un capitolo all’altro."
    )
  }
];

const signaturePrice: Record<PriceRegion,number> = {RO:169,EU:39,US:45,UK:36,CA:62,AU:68};

const sectionCopy: Record<Language,{
  eyebrow:string;
  title:string;
  intro:string;
  ingredients:string;
  association:string;
  folio:string;
  commission:string;
  safetyTitle:string;
  safety:string;
}> = {
  ro:{
    eyebrow:"HERBARIUM IGNIS · COLECȚIA BOTANICĂ",
    title:"Ierburile spun povestea.",
    intro:"Zece lumânări turnate și finisate manual, în care plantele rămân în centrul compoziției. Fiecare reunește o paletă botanică atent aleasă, o intenție ritualică și prezentarea de arhivă Codex Nocturnum.",
    ingredients:"Compoziție vegetală",
    association:"Asociere ritualică",
    folio:"Vezi fișa",
    commission:"Comandă această lumânare",
    safetyTitle:"Ardere și simbolistică",
    safety:"Plantele și florile sunt folosite pentru simbolistica lor tradițională. În varianta destinată arderii, elementele vegetale sunt poziționate astfel încât zona fitilului să rămână sigură. Asocierile ritualice nu reprezintă promisiuni de rezultat."
  },
  en:{
    eyebrow:"HERBARIUM IGNIS · BOTANICAL COLLECTION",
    title:"Let the herbs tell the story.",
    intro:"Ten hand-poured and hand-finished candles that keep the plants at the centre of the composition. Each combines a considered botanical palette, a ritual intention and the archival presentation of Codex Nocturnum.",
    ingredients:"Botanical composition",
    association:"Ritual association",
    folio:"View record",
    commission:"Order this candle",
    safetyTitle:"Burning & symbolism",
    safety:"Plants and flowers are used for their traditional symbolism. In burnable versions, botanical elements are positioned to keep the wick area safe. Ritual associations are symbolic and do not promise guaranteed outcomes."
  },
  fr:{
    eyebrow:"HERBARIUM IGNIS · COLLECTION BOTANIQUE",
    title:"Les plantes racontent l’histoire.",
    intro:"Dix bougies coulées et finies à la main, où les plantes restent au cœur de la composition. Chacune associe une palette botanique choisie, une intention rituelle et la présentation d’archive Codex Nocturnum.",
    ingredients:"Composition végétale",
    association:"Association rituelle",
    folio:"Voir la fiche",
    commission:"Commander cette bougie",
    safetyTitle:"Combustion & symbolique",
    safety:"Les plantes et fleurs sont utilisées pour leur symbolique traditionnelle. Dans les versions destinées à être brûlées, les éléments végétaux sont placés de manière à préserver la zone de la mèche. Les associations rituelles ne garantissent aucun résultat."
  },
  de:{
    eyebrow:"HERBARIUM IGNIS · BOTANISCHE KOLLEKTION",
    title:"Die Pflanzen erzählen die Geschichte.",
    intro:"Zehn handgegossene und handveredelte Kerzen, bei denen die Pflanzen im Mittelpunkt der Komposition stehen. Jede verbindet eine bewusst gewählte Pflanzenpalette, eine rituelle Intention und die Archivpräsentation von Codex Nocturnum.",
    ingredients:"Pflanzenkomposition",
    association:"Rituelle Zuordnung",
    folio:"Eintrag ansehen",
    commission:"Diese Kerze bestellen",
    safetyTitle:"Brennen & Symbolik",
    safety:"Pflanzen und Blüten werden aufgrund ihrer traditionellen Symbolik verwendet. Bei brennbaren Ausführungen werden pflanzliche Elemente so platziert, dass der Dochtbereich sicher bleibt. Rituelle Zuordnungen sind symbolisch und versprechen keine garantierten Ergebnisse."
  },
  it:{
    eyebrow:"HERBARIUM IGNIS · COLLEZIONE BOTANICA",
    title:"Le erbe raccontano la storia.",
    intro:"Dieci candele colate e rifinite a mano, con le piante al centro della composizione. Ognuna unisce una palette botanica selezionata, un’intenzione rituale e la presentazione d’archivio Codex Nocturnum.",
    ingredients:"Composizione vegetale",
    association:"Associazione rituale",
    folio:"Vedi la scheda",
    commission:"Ordina questa candela",
    safetyTitle:"Combustione & simbolismo",
    safety:"Piante e fiori sono utilizzati per il loro simbolismo tradizionale. Nelle versioni destinate alla combustione, gli elementi vegetali sono posizionati in modo da mantenere sicura l’area dello stoppino. Le associazioni rituali sono simboliche e non garantiscono risultati."
  }
};

export function BotanicalCandleCollection() {
  const { region, language } = useMarket();
  const copy = sectionCopy[language];

  return (
    <div className="product-detail-v6__section botanical-candles">
      <div className="botanical-candles__intro">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h2>{copy.title}</h2>
        <p>{copy.intro}</p>
      </div>

      <div className="botanical-candles__grid">
        {studies.map((study,index) => (
          <article className="botanical-card" key={study.slug}>
            <div
              className={`botanical-card__image botanical-card__image--${index}`}
              role="img"
              aria-label={study.name[language]}
            />
            <div className="botanical-card__head">
              <span>{String(index+1).padStart(2,"0")}</span>
              <div>
                <h3>{study.name[language]}</h3>
                <strong>{formatMoney(region,signaturePrice[region])}</strong>
              </div>
            </div>
            <p className="botanical-card__label">{copy.association}</p>
            <p className="botanical-card__association">{study.association[language]}</p>
            <p className="botanical-card__label">{copy.ingredients}</p>
            <p className="botanical-card__ingredients">{study.ingredients[language]}</p>
            <details>
              <summary>{copy.folio}</summary>
              <p>{study.description[language]}</p>
            </details>
            <Link href={`/bespoke?product=CN-IV-PIL-002&variant=${encodeURIComponent(study.slug)}`}>
              {copy.commission} →
            </Link>
          </article>
        ))}
      </div>

      <div className="botanical-candles__safety">
        <strong>{copy.safetyTitle}</strong>
        <p>{copy.safety}</p>
      </div>
    </div>
  );
}

function formatMoney(region:PriceRegion,value:number){
  const config={RO:["ro-RO","RON"],EU:["en-IE","EUR"],US:["en-US","USD"],UK:["en-GB","GBP"],CA:["en-CA","CAD"],AU:["en-AU","AUD"]} as const;
  const [locale,currency]=config[region];
  return new Intl.NumberFormat(locale,{style:"currency",currency,maximumFractionDigits:0}).format(value);
}
