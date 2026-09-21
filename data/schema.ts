export type EvidenceLabel =
  | "HISTORICALLY DOCUMENTED"
  | "FOLKLORE"
  | "ORAL TRADITION"
  | "MODERN RECONSTRUCTION"
  | "CONTEMPORARY PRACTICE";

export type Liber = {
  slug: string;
  roman: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  sections: string[];
  sigil: "celestial" | "botanical" | "apothecary" | "grimoire" | "divination" | "folklore" | "workshop";
};

export type Source = {
  id: string;
  author: string;
  title: string;
  year: string;
  detail?: string;
  kind: "Primary source" | "Historical study" | "Folklore collection" | "Reference work" | "Museum / archive";
};

export type Entry = {
  slug: string;
  title: string;
  subtitle: string;
  liber: string;
  region: string;
  country: string;
  period: string;
  category: string;
  labels: EvidenceLabel[];
  tags: string[];
  excerpt: string;
  historicalContext: string;
  sections: { heading: string; body: string[] }[];
  notes?: string[];
  variants?: string[];
  safety?: string;
  sourceIds: string[];
  related: string[];
  specimen?: {
    commonName: string;
    latinName: string;
    season: string;
    historicalUses: string;
    folklore: string;
    symbolicAssociations: string;
  };
};

export const libers: Liber[] = [
  {
    slug: "the-almanac",
    roman: "I",
    title: "THE ALMANAC",
    shortTitle: "Almanac",
    tagline: "Cycles of moon, season and year.",
    description: "Calendars, turning seasons, lunar observance, feast days and the agricultural rhythms by which communities ordered work, weather, memory and ritual.",
    sections: ["The Wheel of the Year", "Lunar Calendar", "Seasonal Observances", "Solstices & Equinoxes", "Historical Feast Days", "Monthly Almanac", "Regional Traditions"],
    sigil: "celestial",
  },
  {
    slug: "the-herbarium",
    roman: "II",
    title: "THE HERBARIUM",
    shortTitle: "Herbarium",
    tagline: "Plants, remedies, symbols and botanical lore.",
    description: "A specimen-led catalogue of plants and trees: where they grew, how they were described, what people made of them, and where folklore diverges from medical evidence.",
    sections: ["Plants & Herbs", "Flowers", "Trees", "Seasonal Specimens", "Regional Lore", "Historical Uses", "Safety Notes"],
    sigil: "botanical",
  },
  {
    slug: "the-apothecary",
    roman: "III",
    title: "THE APOTHECARY",
    shortTitle: "Apothecary",
    tagline: "Materials, preparations and household knowledge.",
    description: "Oils, resins, waters, salts, aromatic materials and historical domestic preparations, presented with provenance and modern safety context.",
    sections: ["Oils", "Resins", "Incense", "Waters", "Salts", "Historical Preparations", "Correspondence Tables"],
    sigil: "apothecary",
  },
  {
    slug: "the-grimoire",
    roman: "IV",
    title: "THE GRIMOIRE",
    shortTitle: "Grimoire",
    tagline: "Ritual structures, symbolic acts and living practice.",
    description: "Ritual texts and reconstructed practices are separated carefully: what is documented, what is folkloric, and what is a modern interpretation inspired by older material.",
    sections: ["Protection", "Home & Hearth", "Seasonal Rituals", "Remembrance", "Luck & Prosperity", "Love & Friendship", "Threshold Rituals", "Dream Practices"],
    sigil: "grimoire",
  },
  {
    slug: "divination",
    roman: "V",
    title: "DIVINATION",
    shortTitle: "Divination",
    tagline: "Cards, signs, dreams and systems of interpretation.",
    description: "A visual index of divinatory methods, symbolic vocabularies, documentary evidence and later interpretive traditions.",
    sections: ["Tarot", "Cards", "Symbols", "Dreams", "Bibliomancy", "Seasonal Divination", "Regional Practices"],
    sigil: "divination",
  },
  {
    slug: "folklore-lore",
    roman: "VI",
    title: "FOLKLORE & LORE",
    shortTitle: "Folklore & Lore",
    tagline: "Belief, custom, memory and regional difference.",
    description: "European folk belief in its local contexts: domestic customs, supernatural beings, omens, rites of passage, ritual foods and the objects that carried meaning across generations.",
    sections: ["Romania", "Balkans", "Central Europe", "Eastern Europe", "France", "Italy", "German-speaking Europe", "British Isles", "Scandinavia", "Iberia", "Mediterranean", "Baltic", "Slavic Traditions"],
    sigil: "folklore",
  },
  {
    slug: "the-workshop",
    roman: "VII",
    title: "THE WORKSHOP",
    shortTitle: "Workshop",
    tagline: "Tactile craft, book arts and seasonal making.",
    description: "Historically inspired, clearly contextualised projects for paper, textiles, botanical specimens, candles and protective objects — practical rather than performative.",
    sections: ["Candles", "Paper & Book Arts", "Herbarium Craft", "Ritual Objects", "Seasonal Decorations", "Textiles", "Protective Objects"],
    sigil: "workshop",
  },
];

export const sources: Source[] = [
  { id: "frazer-1922", author: "James George Frazer", title: "The Golden Bough", year: "1922 ed.", detail: "Comparative source; useful with caution regarding older theoretical frameworks.", kind: "Historical study" },
  { id: "dioscorides", author: "Pedanius Dioscorides", title: "De Materia Medica", year: "1st century CE", detail: "Historical pharmacological text; not a modern medical guide.", kind: "Primary source" },
  { id: "culpeper-1652", author: "Nicholas Culpeper", title: "The English Physitian", year: "1652", detail: "Early modern herbal; cited for historical usage, not clinical efficacy.", kind: "Primary source" },
  { id: "grimm-1883", author: "Jacob Grimm", title: "Teutonic Mythology", year: "1883 English ed.", detail: "Nineteenth-century compilation with period-specific interpretive limitations.", kind: "Folklore collection" },
  { id: "evans-wentz-1911", author: "W. Y. Evans-Wentz", title: "The Fairy-Faith in Celtic Countries", year: "1911", kind: "Folklore collection" },
  { id: "marian-1898", author: "Simion Florea Marian", title: "Sărbătorile la români", year: "1898–1901", detail: "Ethnographic documentation of Romanian customs and feast-day traditions.", kind: "Folklore collection" },
  { id: "candrea-1928", author: "I.-A. Candrea", title: "Iarba fiarelor: studii de folklor", year: "1928", kind: "Folklore collection" },
  { id: "bottrell-1870", author: "William Bottrell", title: "Traditions and Hearthside Stories of West Cornwall", year: "1870–1880", kind: "Folklore collection" },
  { id: "british-museum-tarot", author: "The British Museum", title: "Early printed playing cards and tarot collections", year: "Collection reference", kind: "Museum / archive" },
  { id: "bnf-cartomancy", author: "Bibliothèque nationale de France", title: "Collections on cartomancy and popular print", year: "Collection reference", kind: "Museum / archive" },
  { id: "v-and-a-herbarium", author: "Victoria and Albert Museum", title: "Botanical studies, albums and decorative arts collections", year: "Collection reference", kind: "Museum / archive" },
  { id: "kew-herbarium", author: "Royal Botanic Gardens, Kew", title: "Herbarium and botanical collections", year: "Collection reference", kind: "Museum / archive" },
  { id: "hutton-1996", author: "Ronald Hutton", title: "The Stations of the Sun", year: "1996", detail: "History of the ritual year in Britain.", kind: "Historical study" },
  { id: "chambers-1864", author: "Robert Chambers", title: "The Book of Days: A Miscellany of Popular Antiquities in Connection with the Calendar", year: "1864", kind: "Reference work" },
  { id: "brill-folklore", author: "Encyclopaedic reference", title: "Regional European folklore and belief studies", year: "Modern reference", detail: "Placeholder for publication-stage specialist bibliography by region.", kind: "Reference work" },
];
