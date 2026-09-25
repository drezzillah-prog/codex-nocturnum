import type { Language } from "./i18n";

export type PriceRegion = "RO" | "EU" | "US" | "UK" | "CA" | "AU";
export type IntentionKey =
  | "protection" | "love" | "prosperity" | "divination" | "dream" | "remembrance"
  | "cleansing" | "wisdom" | "threshold" | "transformation" | "courage" | "home";

type Localized = Record<Language, string>;

export type Product = {
  id: number;
  catalogue: string;
  name: string;
  collection: "Ritual Atelier" | "The Apothecary" | "Divination Cabinet" | "Archive Objects";
  liber: string;
  format: "Physical" | "Made to order";
  note: Localized;
  size: string;
  production: [number, number];
  customizations: string[];
  intentions: IntentionKey[];
  hero?: boolean;
  prices: Record<PriceRegion, number>;
};

const n = (en:string, ro:string, fr:string, de:string, it:string):Localized => ({en,ro,fr,de,it});

export const products: Product[] = [
  {
    id:1,catalogue:"CN-IV-DEV-001",name:"Bespoke Devotional Candle",collection:"Ritual Atelier",liber:"LIBER IV — The Grimoire",format:"Made to order",
    note:n(
      "A sculptural devotional candle shaped around a chosen deity or symbolic association, ritual intention and personal aesthetic.",
      "O lumânare sculpturală devoțională construită în jurul unei zeități sau asocieri simbolice, al intenției ritualice și al esteticii personale.",
      "Une bougie dévotionnelle sculpturale façonnée autour d’une divinité ou association symbolique, d’une intention rituelle et de votre esthétique.",
      "Eine skulpturale Andachtskerze, gestaltet nach Gottheit oder symbolischer Zuordnung, Ritualintention und persönlicher Ästhetik.",
      "Una candela devozionale scultorea creata intorno a una divinità o associazione simbolica, all’intenzione rituale e all’estetica personale."
    ),
    size:"Approx. 18 cm · 280–330 g",production:[7,12],customizations:["Deity / association","Ritual intention","Wax colour","Scent family","Safe botanical dressing","Symbol / dedication"],
    intentions:["protection","love","prosperity","divination","dream","remembrance","wisdom","threshold","transformation","courage"],hero:true,
    prices:{RO:179,EU:42,US:49,UK:39,CA:69,AU:75}
  },
  {
    id:2,catalogue:"CN-IV-PIL-002",name:"Bespoke Ritual Pillar Candle",collection:"Ritual Atelier",liber:"LIBER IV — The Grimoire",format:"Made to order",
    note:n(
      "A carved ritual pillar tailored to the work you want to mark: protection, desire, prosperity, dream, divination or transformation.",
      "O lumânare pillar sculptată pentru ceea ce vrei să marchezi: protecție, dorință, prosperitate, vis, divinație sau transformare.",
      "Une bougie pilier sculptée selon le travail que vous souhaitez marquer : protection, désir, prospérité, rêve, divination ou transformation.",
      "Eine geschnitzte Ritualsäule für das, was du markieren willst: Schutz, Begehren, Wohlstand, Traum, Divination oder Transformation.",
      "Una candela rituale scolpita per ciò che vuoi segnare: protezione, desiderio, prosperità, sogno, divinazione o trasformazione."
    ),
    size:"Approx. 15 × 5 cm · 250–300 g",production:[4,7],customizations:["Intention","Wax colour","Carving","Scent","Dressing option"],
    intentions:["protection","love","prosperity","divination","dream","cleansing","threshold","transformation"],prices:{RO:129,EU:30,US:35,UK:28,CA:49,AU:55}
  },
  {
    id:3,catalogue:"CN-III-OIL-003",name:"Nocturnal Ritual Oil",collection:"The Apothecary",liber:"LIBER III — The Apothecary",format:"Made to order",
    note:n(
      "A small-batch ritual oil composed by intention and aromatic profile, accompanied by its own archival folio.",
      "Un ulei ritualic în lot mic, compus după intenție și profil aromatic, însoțit de propriul folio de arhivă.",
      "Une huile rituelle en petite série, composée selon l’intention et le profil aromatique, accompagnée de son propre folio d’archive.",
      "Ein Ritualöl in Kleinserie, komponiert nach Intention und Duftprofil, begleitet von einem eigenen Archivfolio.",
      "Un olio rituale in piccolo lotto, composto secondo intenzione e profilo aromatico, accompagnato dal proprio folio d’archivio."
    ),
    size:"15 ml",production:[3,5],customizations:["Ritual intention","Optional deity association","Scent family","Botanical profile"],
    intentions:["protection","love","prosperity","divination","dream","remembrance","cleansing","wisdom","threshold","transformation","courage","home"],hero:true,
    prices:{RO:89,EU:21,US:25,UK:19,CA:35,AU:39}
  },
  {
    id:4,catalogue:"CN-III-INC-004",name:"Archive Incense Blend",collection:"The Apothecary",liber:"LIBER III — The Apothecary",format:"Made to order",
    note:n(
      "A loose resin and incense blend composed around an intention, devotional association or seasonal rite.",
      "Un blend liber de rășini și incense construit în jurul unei intenții, asocieri devoționale sau unui rit sezonier.",
      "Un mélange libre de résines et d’encens composé autour d’une intention, association dévotionnelle ou rite saisonnier.",
      "Eine lose Harz- und Räuchermischung, komponiert um Intention, Andachtszuordnung oder saisonales Ritual.",
      "Una miscela libera di resine e incenso composta intorno a un’intenzione, associazione devozionale o rito stagionale."
    ),
    size:"30 g",production:[2,4],customizations:["Intention","Deity / seasonal association","Smoky / Floral / Forest / Resinous"],
    intentions:["protection","love","divination","dream","remembrance","cleansing","threshold","home"],prices:{RO:89,EU:21,US:25,UK:19,CA:35,AU:39}
  },
  {
    id:5,catalogue:"CN-III-DRS-005",name:"Herb & Salt Ritual Dressing",collection:"The Apothecary",liber:"LIBER III — The Apothecary",format:"Made to order",
    note:n(
      "A symbolic dressing blend for altar or candle work, supplied separately from the flame area for safer ritual use.",
      "Un dressing simbolic pentru altar sau candle work, furnizat separat de zona flăcării pentru o utilizare ritualică mai sigură.",
      "Un mélange symbolique pour autel ou travail à la bougie, fourni séparément de la flamme pour un usage rituel plus sûr.",
      "Eine symbolische Mischung für Altar- oder Kerzenarbeit, aus Sicherheitsgründen getrennt vom Flammenbereich geliefert.",
      "Una miscela simbolica per altare o lavoro con candele, fornita separatamente dalla fiamma per un uso rituale più sicuro."
    ),
    size:"35–45 g",production:[2,4],customizations:["Ritual intention","Herbal profile","Salt profile","Unscented option"],
    intentions:["protection","love","prosperity","cleansing","threshold","home"],prices:{RO:59,EU:14,US:17,UK:13,CA:24,AU:26}
  },
  {
    id:6,catalogue:"CN-III-AQU-006",name:"Ritual Water",collection:"The Apothecary",liber:"LIBER III — The Apothecary",format:"Physical",
    note:n(
      "A symbolic ritual water object presented as an archival vial. Decorative and ritual use only; not for drinking.",
      "Un obiect ritualic simbolic prezentat ca vial de arhivă. Doar pentru utilizare decorativă și ritualică; nu pentru consum.",
      "Un objet d’eau rituelle symbolique présenté comme un flacon d’archive. Usage décoratif et rituel uniquement ; non potable.",
      "Ein symbolisches Ritualwasser im Archivflakon. Nur für dekorative und rituelle Zwecke; nicht zum Trinken.",
      "Un oggetto d’acqua rituale simbolica presentato come fiala d’archivio. Solo uso decorativo e rituale; non potabile."
    ),
    size:"50 ml",production:[2,4],customizations:["Moon","Sea","Dawn","Threshold","Remembrance","Personal dedication"],
    intentions:["dream","remembrance","cleansing","threshold","transformation"],prices:{RO:69,EU:16,US:19,UK:15,CA:27,AU:29}
  },
  {
    id:7,catalogue:"CN-II-MIN-007",name:"Curated Mineral Talisman",collection:"Archive Objects",liber:"LIBER II — The Herbarium",format:"Physical",
    note:n(
      "A selected mineral specimen catalogued with provenance, symbolic associations and optional talisman presentation.",
      "Un specimen mineral selectat, catalogat cu proveniență, asocieri simbolice și prezentare talismanică opțională.",
      "Un spécimen minéral sélectionné, catalogué avec provenance, associations symboliques et présentation talismanique optionnelle.",
      "Ein ausgewähltes Mineralexemplar mit Herkunft, symbolischen Zuordnungen und optionaler Talisman-Präsentation.",
      "Un esemplare minerale selezionato, catalogato con provenienza, associazioni simboliche e presentazione talismanica opzionale."
    ),
    size:"Approx. 40–80 g",production:[2,4],customizations:["Mineral family","Symbolic intention","Pouch","Optional metal charm"],
    intentions:["protection","love","prosperity","divination","dream","wisdom","courage"],prices:{RO:99,EU:23,US:27,UK:21,CA:38,AU:42}
  },
  {
    id:8,catalogue:"CN-IV-KIT-008",name:"Bespoke Ritual Kit",collection:"Ritual Atelier",liber:"LIBER IV — The Grimoire",format:"Made to order",
    note:n(
      "A coherent ritual archive set assembled around your chosen intention: candle, oil, dressing, mineral and folio.",
      "Un set ritualic coerent construit în jurul intenției alese: lumânare, ulei, dressing, mineral și folio.",
      "Un ensemble rituel cohérent assemblé autour de votre intention : bougie, huile, dressing, minéral et folio.",
      "Ein stimmiges Ritualset rund um deine gewählte Intention: Kerze, Öl, Dressing, Mineral und Folio.",
      "Un set rituale coerente costruito intorno alla tua intenzione: candela, olio, dressing, minerale e folio."
    ),
    size:"Archive box approx. 18 × 13 × 5 cm",production:[4,7],customizations:["Ritual intention","Candle profile","Oil profile","Dressing","Mineral","Dedication"],
    intentions:["protection","love","prosperity","divination","dream","remembrance","cleansing","wisdom","threshold","transformation","courage","home"],hero:true,
    prices:{RO:299,EU:69,US:79,UK:64,CA:109,AU:119}
  },
  {
    id:9,catalogue:"CN-IV-TXT-009",name:"Bespoke Altar Cloth",collection:"Ritual Atelier",liber:"LIBER IV — The Grimoire",format:"Made to order",
    note:n(
      "A dark ritual textile with restrained historical-inspired borderwork and optional personalised symbolic details.",
      "Un textil ritualic dark cu borduri inspirate istoric și detalii simbolice personalizabile.",
      "Un textile rituel sombre aux bordures historiques discrètes et détails symboliques personnalisables.",
      "Ein dunkles Ritualtextil mit zurückhaltend historisch inspirierten Bordüren und personalisierbaren Symbolen.",
      "Un tessile rituale scuro con bordure storicamente ispirate e dettagli simbolici personalizzabili."
    ),
    size:"Approx. 45 × 45 cm",production:[7,12],customizations:["Textile colour","Border motif","Deity / symbol","Initials or short inscription"],
    intentions:["protection","divination","remembrance","home"],prices:{RO:199,EU:47,US:55,UK:43,CA:75,AU:82}
  },
  {
    id:10,catalogue:"CN-IV-KEY-010",name:"Archive Key / Ritual Talisman",collection:"Archive Objects",liber:"LIBER IV — The Grimoire",format:"Made to order",
    note:n(
      "A weighty symbolic key catalogued for Threshold, Memory, Protection, Dream, Return or Silence.",
      "O cheie simbolică grea, catalogată pentru Threshold, Memory, Protection, Dream, Return sau Silence.",
      "Une clé symbolique substantielle cataloguée pour le Seuil, la Mémoire, la Protection, le Rêve, le Retour ou le Silence.",
      "Ein schwerer symbolischer Schlüssel für Schwelle, Erinnerung, Schutz, Traum, Rückkehr oder Stille.",
      "Una chiave simbolica importante catalogata per Soglia, Memoria, Protezione, Sogno, Ritorno o Silenzio."
    ),
    size:"Approx. 8–11 cm",production:[4,7],customizations:["Symbolic theme","Finish","Engraving","Initials / dedication"],
    intentions:["protection","dream","remembrance","threshold","transformation"],prices:{RO:119,EU:28,US:33,UK:26,CA:46,AU:49}
  },
  {
    id:11,catalogue:"CN-V-CST-011",name:"Divination Casting Set",collection:"Divination Cabinet",liber:"LIBER V — Divination",format:"Made to order",
    note:n(
      "A curated set of symbolic casting objects with pouch, miniature cloth and interpretation folio.",
      "Un set curatoriat de obiecte simbolice pentru casting, cu pouch, mini cloth și folio de interpretare.",
      "Un ensemble sélectionné d’objets symboliques de tirage avec pochette, mini tissu et folio d’interprétation.",
      "Ein kuratiertes Set symbolischer Wurfobjekte mit Beutel, Mini-Tuch und Interpretationsfolio.",
      "Un set curato di oggetti simbolici da lancio con sacchetto, mini telo e folio interpretativo."
    ),
    size:"7–9 objects · pouch · mini cloth",production:[4,7],customizations:["Symbol system","Metal / stone mix","Cloth colour","Personal inscription"],
    intentions:["divination","dream","wisdom"],hero:true,prices:{RO:229,EU:54,US:62,UK:49,CA:85,AU:92}
  },
  {
    id:12,catalogue:"CN-V-SCR-012",name:"Black Scrying Mirror",collection:"Divination Cabinet",liber:"LIBER V — Divination",format:"Made to order",
    note:n(
      "A dark scrying mirror presented with stand, protective pouch and a historical-context folio.",
      "O oglindă neagră de scrying, prezentată cu suport, pouch protector și folio cu context istoric.",
      "Un miroir noir de scrying avec support, pochette protectrice et folio de contexte historique.",
      "Ein dunkler Scrying-Spiegel mit Ständer, Schutzhülle und historischem Kontextfolio.",
      "Uno specchio nero da scrying con supporto, custodia protettiva e folio di contesto storico."
    ),
    size:"Approx. Ø 15 cm + stand",production:[7,12],customizations:["Frame finish","Symbol","Short inscription","Pouch finish"],
    intentions:["divination","dream","wisdom"],hero:true,prices:{RO:329,EU:75,US:89,UK:69,CA:119,AU:135}
  },
];

export const futureProducts = [
  { catalogue:"CN-I-SEA-013", name:"Seasonal Ritual Box", prices:{RO:449,EU:105,US:119,UK:95,CA:165,AU:179} as Record<PriceRegion,number> },
  { catalogue:"CN-IV-MED-014", name:"Deep Meditation Book", prices:{RO:179,EU:42,US:49,UK:39,CA:69,AU:75} as Record<PriceRegion,number> },
  { catalogue:"CN-IV-INC-015", name:"Spells & Incantations — Archival Volume", prices:{RO:219,EU:49,US:56,UK:45,CA:79,AU:85} as Record<PriceRegion,number> },
];

export const productCollections = ["Ritual Atelier","The Apothecary","Divination Cabinet","Archive Objects"] as const;
export const heroProducts = products.filter((product) => product.hero);

export const intentionLabels:Record<IntentionKey,Record<Language,string>> = {
  protection:{en:"Protection",ro:"Protecție",fr:"Protection",de:"Schutz",it:"Protezione"},
  love:{en:"Love & Attraction",ro:"Iubire & Atracție",fr:"Amour & Attraction",de:"Liebe & Anziehung",it:"Amore & Attrazione"},
  prosperity:{en:"Prosperity",ro:"Prosperitate",fr:"Prospérité",de:"Wohlstand",it:"Prosperità"},
  divination:{en:"Divination",ro:"Divinație",fr:"Divination",de:"Divination",it:"Divinazione"},
  dream:{en:"Dream",ro:"Vis",fr:"Rêve",de:"Traum",it:"Sogno"},
  remembrance:{en:"Remembrance",ro:"Rememorare",fr:"Mémoire",de:"Erinnerung",it:"Memoria"},
  cleansing:{en:"Cleansing",ro:"Purificare",fr:"Purification",de:"Reinigung",it:"Purificazione"},
  wisdom:{en:"Wisdom",ro:"Înțelepciune",fr:"Sagesse",de:"Weisheit",it:"Saggezza"},
  threshold:{en:"Threshold",ro:"Prag",fr:"Seuil",de:"Schwelle",it:"Soglia"},
  transformation:{en:"Transformation",ro:"Transformare",fr:"Transformation",de:"Transformation",it:"Trasformazione"},
  courage:{en:"Courage",ro:"Curaj",fr:"Courage",de:"Mut",it:"Coraggio"},
  home:{en:"Home & Hearth",ro:"Casă & Vatră",fr:"Maison & Foyer",de:"Haus & Herd",it:"Casa & Focolare"},
};
