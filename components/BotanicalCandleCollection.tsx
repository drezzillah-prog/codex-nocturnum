"use client";

import Link from "next/link";
import { useMarket } from "./PricingProvider";
import type { PriceRegion } from "@/data/products";
import type { Language } from "@/data/i18n";

type Localized = Record<Language,string>;
type Study = {
  slug:string;
  name:Localized;
  ingredients:Localized;
  association:Localized;
  description:Localized;
  pairing:Localized;
};

const l=(en:string,ro:string,fr:string,de:string,it:string):Localized=>({en,ro,fr,de,it});

const studies:Study[] = [
  {
    slug:"tree-of-life",
    name:l("Tree of Life","Arborele Vieții","Arbre de Vie","Baum des Lebens","Albero della Vita"),
    ingredients:l("Rosemary · cedar · evergreen botanicals","Rozmarin · cedru · plante evergreen","Romarin · cèdre · végétaux persistants","Rosmarin · Zeder · immergrüne Pflanzen","Rosmarino · cedro · botaniche sempreverdi"),
    association:l("Grounding · resilience · protection","Înrădăcinare · reziliență · protecție","Ancrage · résilience · protection","Erdung · Widerstandskraft · Schutz","Radicamento · resilienza · protezione"),
    description:l(
      "A forest-green botanical pillar built around rooted strength and continuity, finished with a bronze Tree of Life talisman.",
      "O lumânare verde-pădure construită în jurul ideii de rădăcini, continuitate și forță liniștită, finisată cu un talisman Arborele Vieții din bronz.",
      "Une bougie vert forêt centrée sur l’ancrage, la continuité et la force tranquille, terminée par un talisman Arbre de Vie en bronze.",
      "Eine waldgrüne Pflanzenkerze rund um Verwurzelung, Beständigkeit und ruhige Stärke, mit bronzenem Baum-des-Lebens-Talisman.",
      "Una candela verde bosco dedicata a radicamento, continuità e forza quieta, rifinita con un talismano Albero della Vita in bronzo."
    ),
    pairing:l("Pair with a Protection or Home ritual oil.","Asociaz-o cu un ulei Protection sau Home.","À associer avec une huile Protection ou Maison.","Mit einem Protection- oder Home-Ritualöl kombinieren.","Abbinala a un olio Protection o Home.")
  },
  {
    slug:"rose-devotion",
    name:l("Rose Devotion","Devoțiunea Trandafirului","Dévotion à la Rose","Rosenhingabe","Devozione alla Rosa"),
    ingredients:l("Rose · lavender · soft floral botanicals","Trandafir · lavandă · plante florale delicate","Rose · lavande · botaniques florales délicates","Rose · Lavendel · sanfte Blütenbotanik","Rosa · lavanda · botaniche floreali delicate"),
    association:l("Affection · tenderness · devotion","Afecțiune · tandrețe · devoțiune","Affection · tendresse · dévotion","Zuneigung · Zärtlichkeit · Hingabe","Affetto · tenerezza · devozione"),
    description:l(
      "A rose-toned candle with dried petals and a bronze rose emblem, composed for beauty, tenderness and devotional atmosphere.",
      "O lumânare în tonuri de trandafir, cu petale uscate și emblemă din bronz, gândită pentru frumusețe, tandrețe și atmosferă devoțională.",
      "Une bougie rosée aux pétales séchés et emblème de rose en bronze, pensée pour la beauté, la tendresse et la dévotion.",
      "Eine rosafarbene Kerze mit getrockneten Blüten und bronzenem Rosenemblem für Schönheit, Zärtlichkeit und hingebungsvolle Atmosphäre.",
      "Una candela rosata con petali essiccati ed emblema di rosa in bronzo, pensata per bellezza, tenerezza e devozione."
    ),
    pairing:l("Pair with a Love & Attraction oil or personal dedication.","Asociaz-o cu un ulei Love & Attraction sau o dedicație personală.","Avec une huile Love & Attraction ou une dédicace personnelle.","Mit Love & Attraction Öl oder persönlicher Widmung.","Con olio Love & Attraction o dedica personale.")
  },
  {
    slug:"black-moon",
    name:l("Black Moon","Luna Neagră","Lune Noire","Schwarzer Mond","Luna Nera"),
    ingredients:l("Mugwort · lavender · resinous botanicals","Pelin negru · lavandă · note rășinoase","Armoise · lavande · notes résineuses","Beifuß · Lavendel · harzige Noten","Artemisia · lavanda · note resinose"),
    association:l("Intuition · dreamwork · reflection","Intuiție · vis · reflecție","Intuition · rêve · réflexion","Intuition · Traumarbeit · Reflexion","Intuizione · sogno · riflessione"),
    description:l(
      "A black lunar pillar with a bronze crescent talisman and dark botanical dressing for evening ritual and contemplative practice.",
      "O lumânare lunară neagră cu talisman semilună din bronz și dressing botanic întunecat pentru ritual de seară și practică contemplativă.",
      "Une bougie lunaire noire avec talisman croissant en bronze et habillage botanique sombre pour les rituels du soir.",
      "Eine schwarze Mondkerze mit bronzenem Halbmond und dunkler botanischer Gestaltung für Abendrituale und Kontemplation.",
      "Una candela lunare nera con mezzaluna in bronzo e dressing botanico scuro per rituali serali e contemplazione."
    ),
    pairing:l("Pair with Dream or Divination oil; mineral accents remain removable.","Asociaz-o cu Dream sau Divination oil; mineralele rămân detașabile.","Avec une huile Dream ou Divination ; les accents minéraux restent amovibles.","Mit Dream- oder Divination-Öl; Mineralakzente bleiben abnehmbar.","Con olio Dream o Divination; gli accenti minerali restano removibili.")
  },
  {
    slug:"solar-abundance",
    name:l("Solar Abundance","Abundență Solară","Abondance Solaire","Solare Fülle","Abbondanza Solare"),
    ingredients:l("Calendula · orange peel · bay · cinnamon","Gălbenele · coajă de portocală · dafin · scorțișoară","Calendula · écorce d’orange · laurier · cannelle","Ringelblume · Orangenschale · Lorbeer · Zimt","Calendula · scorza d’arancia · alloro · cannella"),
    association:l("Prosperity · confidence · momentum","Prosperitate · încredere · elan","Prospérité · confiance · élan","Wohlstand · Selbstvertrauen · Schwung","Prosperità · fiducia · slancio"),
    description:l(
      "An ivory-gold solar candle with warm botanicals and a bronze sun talisman, created as a bright focal object for prosperity rites.",
      "O lumânare solară ivoire-aurie cu botanicals calde și talisman solar din bronz, creată ca punct luminos pentru ritualuri de prosperitate.",
      "Une bougie solaire ivoire et or, aux botaniques chaleureuses et talisman solaire en bronze, pensée pour les rites de prospérité.",
      "Eine elfenbein-goldene Sonnenkerze mit warmen Botanicals und bronzenem Sonnentalisman für Wohlstandsrituale.",
      "Una candela solare avorio e oro con botaniche calde e talismano solare in bronzo per rituali di prosperità."
    ),
    pairing:l("Pair with Prosperity oil or a matching dressing sachet.","Asociaz-o cu Prosperity oil sau un dressing sachet potrivit.","Avec une huile Prosperity ou un sachet de dressing assorti.","Mit Prosperity-Öl oder passendem Dressing-Sachet.","Con olio Prosperity o dressing sachet coordinato.")
  },
  {
    slug:"triple-moon",
    name:l("Triple Moon","Luna Triplă","Triple Lune","Dreifacher Mond","Tripla Luna"),
    ingredients:l("Lavender · mugwort · violet florals","Lavandă · pelin negru · flori violete","Lavande · armoise · fleurs violettes","Lavendel · Beifuß · violette Blüten","Lavanda · artemisia · fiori viola"),
    association:l("Cycles · intuition · lunar reflection","Cicluri · intuiție · reflecție lunară","Cycles · intuition · réflexion lunaire","Zyklen · Intuition · Mondreflexion","Cicli · intuizione · riflessione lunare"),
    description:l(
      "A deep violet pillar marked with the Triple Moon, intended for lunar altars, cyclical ritual work and quiet intuitive practice.",
      "O lumânare violet intens marcată cu Luna Triplă, pentru altare lunare, ritualuri ciclice și practică intuitivă liniștită.",
      "Une bougie violet profond marquée par la Triple Lune, pour autels lunaires, rituels cycliques et pratique intuitive.",
      "Eine tiefviolette Kerze mit Dreifachmond für Mondaltäre, zyklische Rituale und intuitive Praxis.",
      "Una candela viola profondo con Tripla Luna per altari lunari, rituali ciclici e pratica intuitiva."
    ),
    pairing:l("Pair with Dream or Divination oil and a removable mineral accent.","Asociaz-o cu Dream sau Divination oil și un accent mineral detașabil.","Avec une huile Dream ou Divination et un accent minéral amovible.","Mit Dream- oder Divination-Öl und abnehmbarem Mineralakzent.","Con olio Dream o Divination e un accento minerale removibile.")
  },
  {
    slug:"compass-star",
    name:l("Compass Star","Steaua Busolă","Étoile Boussole","Kompassstern","Stella Bussola"),
    ingredients:l("Eucalyptus · chamomile · rosemary","Eucalipt · mușețel · rozmarin","Eucalyptus · camomille · romarin","Eukalyptus · Kamille · Rosmarin","Eucalipto · camomilla · rosmarino"),
    association:l("Direction · balance · restoration","Direcție · echilibru · refacere","Direction · équilibre · restauration","Richtung · Balance · Erneuerung","Direzione · equilibrio · rinnovamento"),
    description:l(
      "A pale apothecary-style candle with a bronze compass-star charm, created for reset rituals, transitions and deliberate reorientation.",
      "O lumânare pală în stil apothecary cu talisman stea-busolă din bronz, pentru resetare, tranziții și reorientare deliberată.",
      "Une bougie pâle de style apothicaire avec étoile-boussole en bronze, pour transitions et nouveaux départs.",
      "Eine helle Apothekerkerze mit bronzenem Kompassstern für Übergänge und bewusste Neuausrichtung.",
      "Una candela chiara in stile speziale con stella-bussola in bronzo, per transizioni e nuovi inizi."
    ),
    pairing:l("Pair with Threshold oil or a bespoke dedication.","Asociaz-o cu Threshold oil sau o dedicație bespoke.","Avec une huile Threshold ou une dédicace sur mesure.","Mit Threshold-Öl oder individueller Widmung.","Con olio Threshold o dedica su misura.")
  },
  {
    slug:"butterfly-renewal",
    name:l("Butterfly Renewal","Renașterea Fluturelui","Renouveau du Papillon","Schmetterlings-Erneuerung","Rinascita della Farfalla"),
    ingredients:l("Calendula · chamomile · orange blossom","Gălbenele · mușețel · flori de portocal","Calendula · camomille · fleur d’oranger","Ringelblume · Kamille · Orangenblüte","Calendula · camomilla · fiori d’arancio"),
    association:l("Transformation · creativity · renewal","Transformare · creativitate · reînnoire","Transformation · créativité · renouveau","Transformation · Kreativität · Erneuerung","Trasformazione · creatività · rinnovamento"),
    description:l(
      "An ivory botanical pillar with warm florals and a bronze butterfly, made for rites of change, creative seasons and fresh beginnings.",
      "O lumânare ivoire cu flori calde și fluture din bronz, gândită pentru schimbare, perioade creative și începuturi noi.",
      "Une bougie ivoire aux fleurs chaleureuses et papillon en bronze, pensée pour le changement et les nouveaux départs.",
      "Eine elfenbeinfarbene Pflanzenkerze mit warmen Blüten und bronzenem Schmetterling für Wandel und Neuanfang.",
      "Una candela avorio con fiori caldi e farfalla in bronzo, pensata per cambiamento e nuovi inizi."
    ),
    pairing:l("Pair with Transformation oil or Collector Presentation.","Asociaz-o cu Transformation oil sau Collector Presentation.","Avec une huile Transformation ou Collector Presentation.","Mit Transformation-Öl oder Collector Presentation.","Con olio Transformation o Collector Presentation.")
  },
  {
    slug:"pomegranate-hearth",
    name:l("Pomegranate Hearth","Vatra Rodiei","Foyer Grenade","Granatapfel-Herd","Focolare di Melograno"),
    ingredients:l("Rose · pomegranate peel · hibiscus · warm spice","Trandafir · coajă de rodie · hibiscus · condimente calde","Rose · grenade · hibiscus · épices chaudes","Rose · Granatapfel · Hibiskus · warme Gewürze","Rosa · melograno · ibisco · spezie calde"),
    association:l("Passion · abundance · hearth","Pasiune · abundență · vatră","Passion · abondance · foyer","Leidenschaft · Fülle · Herd","Passione · abbondanza · focolare"),
    description:l(
      "A burgundy candle with pomegranate and rose symbolism, composed for hearth, sensual and abundance-oriented ritual settings.",
      "O lumânare burgundy cu simbolism de rodie și trandafir, creată pentru vatră, senzualitate și ritualuri orientate spre abundență.",
      "Une bougie bordeaux à la symbolique de grenade et de rose, pour le foyer, la sensualité et l’abondance.",
      "Eine burgunderrote Kerze mit Granatapfel- und Rosensymbolik für Herd, Sinnlichkeit und Fülle.",
      "Una candela bordeaux con simbolismo di melograno e rosa, per focolare, sensualità e abbondanza."
    ),
    pairing:l("Pair with Love, Home or Prosperity oil.","Asociaz-o cu Love, Home sau Prosperity oil.","Avec une huile Love, Home ou Prosperity.","Mit Love-, Home- oder Prosperity-Öl.","Con olio Love, Home o Prosperity.")
  },
  {
    slug:"pine-ward",
    name:l("Pine Ward","Paza Pinului","Garde du Pin","Kiefernwacht","Guardia del Pino"),
    ingredients:l("Rosemary · pine · cedar","Rozmarin · pin · cedru","Romarin · pin · cèdre","Rosmarin · Kiefer · Zeder","Rosmarino · pino · cedro"),
    association:l("Protection · endurance · cleansing","Protecție · rezistență · purificare","Protection · endurance · purification","Schutz · Ausdauer · Reinigung","Protezione · resistenza · purificazione"),
    description:l(
      "A deep forest pillar with evergreen botanicals and a bronze pine talisman, designed for protective and winter-season altar work.",
      "O lumânare verde-pădure cu plante evergreen și talisman de pin din bronz, pentru altar protector și ritualuri de iarnă.",
      "Une bougie vert forêt aux végétaux persistants et talisman de pin en bronze, pour autels protecteurs et saison hivernale.",
      "Eine tiefgrüne Kerze mit Immergrün und bronzenem Kieferntalisman für Schutz- und Winterrituale.",
      "Una candela verde bosco con botaniche sempreverdi e talismano di pino in bronzo, per rituali protettivi e invernali."
    ),
    pairing:l("Pair with Protection oil; mineral accents remain separate from flame.","Asociaz-o cu Protection oil; mineralele rămân separate de flacără.","Avec une huile Protection ; les minéraux restent hors de la flamme.","Mit Protection-Öl; Mineralakzente bleiben von der Flamme getrennt.","Con olio Protection; gli accenti minerali restano separati dalla fiamma.")
  },
  {
    slug:"solar-compass",
    name:l("Solar Compass","Busola Solară","Boussole Solaire","Sonnenkompass","Bussola Solare"),
    ingredients:l("Bay · rosemary · star anise · clove","Dafin · rozmarin · anason stelat · cuișoare","Laurier · romarin · anis étoilé · clou de girofle","Lorbeer · Rosmarin · Sternanis · Nelke","Alloro · rosmarino · anice stellato · chiodi di garofano"),
    association:l("Focus · alignment · purposeful movement","Focus · aliniere · mișcare cu intenție","Concentration · alignement · mouvement intentionnel","Fokus · Ausrichtung · zielgerichtete Bewegung","Focus · allineamento · movimento intenzionale"),
    description:l(
      "A pale botanical candle with a bronze compass-sun emblem, balancing warm spice and green notes for focused intention and ceremonial gifting.",
      "O lumânare botanică pală cu emblemă busolă-soare din bronz, echilibrând condimente calde și note verzi pentru intenție concentrată și gifting ceremonial.",
      "Une bougie botanique pâle avec emblème boussole-soleil en bronze, équilibrant épices chaudes et notes vertes.",
      "Eine helle Pflanzenkerze mit bronzenem Sonnenkompass, die warme Gewürze und grüne Noten verbindet.",
      "Una candela botanica chiara con emblema bussola-sole in bronzo, tra spezie calde e note verdi."
    ),
    pairing:l("Pair with Wisdom, Courage or Threshold oil.","Asociaz-o cu Wisdom, Courage sau Threshold oil.","Avec une huile Wisdom, Courage ou Threshold.","Mit Wisdom-, Courage- oder Threshold-Öl.","Con olio Wisdom, Courage o Threshold.")
  }
];

const signaturePrice:Record<PriceRegion,number>={RO:169,EU:39,US:45,UK:36,CA:62,AU:68};

const sectionCopy:Record<Language,{
  eyebrow:string; title:string; intro:string; folio:string; commission:string; safetyTitle:string; safety:string;
}> = {
  en:{
    eyebrow:"HERBARIUM IGNIS · BOTANICAL SIGNATURES",
    title:"Ten simpler candles. Still unmistakably Codex.",
    intro:"Hand-finished botanical pillars with restrained talismans, archival presentation and a distinct ritual profile. Each signature includes the candle, symbolic botanical treatment, removable talisman, miniature folio and Archive Standard presentation.",
    folio:"Open folio",
    commission:"Commission this candle",
    safetyTitle:"Burn-safe production note",
    safety:"Photography shows the artistic direction. Final burnable versions keep combustible botanicals away from the wick; where necessary, botanicals are supplied as a removable exterior dressing or separate ritual sachet, and mineral accents remain external/removable. Symbolic correspondences are traditional or contemporary ritual associations, not guaranteed outcomes."
  },
  ro:{
    eyebrow:"HERBARIUM IGNIS · SEMNĂTURI BOTANICE",
    title:"Zece lumânări mai simple. Tot inconfundabil Codex.",
    intro:"Lumânări pillar finisate manual, cu talismane discrete, prezentare de arhivă și profil ritualic distinct. Fiecare include lumânarea, tratamentul botanic simbolic, talisman detașabil, mini-folio și Archive Standard.",
    folio:"Deschide folio",
    commission:"Comandă această lumânare",
    safetyTitle:"Notă de producție pentru ardere sigură",
    safety:"Fotografiile arată direcția artistică. Versiunile reale păstrează materialele botanice inflamabile departe de fitil; unde este necesar, botanicals sunt oferite ca dressing exterior detașabil sau sachet ritualic separat, iar mineralele rămân externe/detașabile. Corespondențele sunt asocieri ritualice tradiționale sau contemporane, nu rezultate garantate."
  },
  fr:{
    eyebrow:"HERBARIUM IGNIS · SIGNATURES BOTANIQUES",
    title:"Dix bougies plus simples. Toujours unmistakably Codex.",
    intro:"Bougies piliers finies à la main, talismans discrets, présentation d’archive et profil rituel distinct. Chaque pièce comprend la bougie, le traitement botanique symbolique, un talisman amovible, un mini-folio et Archive Standard.",
    folio:"Ouvrir le folio",
    commission:"Commander cette bougie",
    safetyTitle:"Note de production pour une combustion sûre",
    safety:"Les photographies montrent la direction artistique. Les versions destinées à être brûlées maintiennent les végétaux combustibles loin de la mèche ; si nécessaire, ils sont fournis comme dressing extérieur amovible ou sachet rituel séparé. Les correspondances sont symboliques et ne garantissent aucun résultat."
  },
  de:{
    eyebrow:"HERBARIUM IGNIS · BOTANISCHE SIGNATUREN",
    title:"Zehn schlichtere Kerzen. Unverkennbar Codex.",
    intro:"Handveredelte Pflanzenkerzen mit zurückhaltenden Talismanen, Archivpräsentation und eigenem Ritualprofil. Jede Signatur enthält Kerze, symbolische Pflanzenbehandlung, abnehmbaren Talisman, Mini-Folio und Archive Standard.",
    folio:"Folio öffnen",
    commission:"Diese Kerze beauftragen",
    safetyTitle:"Hinweis zur sicheren Verbrennung",
    safety:"Die Fotografie zeigt die künstlerische Richtung. Brennbare Pflanzenmaterialien werden bei den realen Kerzen vom Docht ferngehalten; falls nötig, werden sie als abnehmbares äußeres Dressing oder separates Ritualsäckchen geliefert. Symbolische Zuordnungen sind keine garantierten Ergebnisse."
  },
  it:{
    eyebrow:"HERBARIUM IGNIS · FIRME BOTANICHE",
    title:"Dieci candele più semplici. Sempre inconfondibilmente Codex.",
    intro:"Candele pillar rifinite a mano con talismani discreti, presentazione d’archivio e profilo rituale distinto. Ogni firma comprende candela, trattamento botanico simbolico, talismano removibile, mini-folio e Archive Standard.",
    folio:"Apri il folio",
    commission:"Commissiona questa candela",
    safetyTitle:"Nota per una combustione sicura",
    safety:"Le fotografie mostrano la direzione artistica. Nelle versioni destinate alla combustione, i botanicals infiammabili restano lontani dallo stoppino; se necessario vengono forniti come dressing esterno removibile o sachet rituale separato. Le corrispondenze simboliche non garantiscono risultati."
  }
};

export function BotanicalCandleCollection() {
  const { region, language } = useMarket();
  const copy=sectionCopy[language];

  return (
    <div className="product-detail-v6__section botanical-candles">
      <div className="botanical-candles__intro">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h2>{copy.title}</h2>
        <p>{copy.intro}</p>
      </div>

      <div className="botanical-candles__grid">
        {studies.map((study,index)=>(
          <article className="botanical-card" key={study.slug}>
            <div className={`botanical-card__image botanical-card__image--${index}`} role="img" aria-label={study.name[language]} />
            <div className="botanical-card__head">
              <span>{String(index+1).padStart(2,"0")}</span>
              <div><h3>{study.name[language]}</h3><strong>{formatMoney(region,signaturePrice[region])}</strong></div>
            </div>
            <p className="botanical-card__association">{study.association[language]}</p>
            <p className="botanical-card__ingredients">{study.ingredients[language]}</p>
            <details>
              <summary>{copy.folio}</summary>
              <p>{study.description[language]}</p>
              <small>{study.pairing[language]}</small>
            </details>
            <Link href={`/bespoke?product=CN-IV-PIL-002&variant=${encodeURIComponent(study.slug)}`}>{copy.commission} →</Link>
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
