export type PriceRegion = "RO" | "EU" | "US";

export type Product = {
  id: number;
  catalogue: string;
  name: string;
  collection: "Ritual Cabinet" | "Archive Editions" | "Divination & Contemplation" | "Collector's Cabinet";
  liber: string;
  format: "Physical" | "Digital" | "Subscription";
  note: string;
  prices: Record<PriceRegion, number>;
};

export const products: Product[] = [
  { id: 1, catalogue: "CN-II-MIN-001", name: "Curated Mineral Specimen", collection: "Ritual Cabinet", liber: "LIBER II", format: "Physical", note: "Mineral, provenance card and archival folio.", prices: { RO: 69, EU: 16, US: 18 } },
  { id: 2, catalogue: "CN-III-AQU-002", name: "Ritual Water Vial", collection: "Ritual Cabinet", liber: "LIBER III", format: "Physical", note: "Symbolic water object, sealed and catalogued; not for drinking.", prices: { RO: 59, EU: 14, US: 16 } },
  { id: 3, catalogue: "CN-III-ESS-003", name: "Nocturnal Essence", collection: "Ritual Cabinet", liber: "LIBER III", format: "Physical", note: "Atmospheric ritual fragrance with interpretation folio.", prices: { RO: 89, EU: 21, US: 24 } },
  { id: 4, catalogue: "CN-V-CND-004", name: "Divination Candle", collection: "Ritual Cabinet", liber: "LIBER V", format: "Physical", note: "Dark wax candle, numbered band and source note.", prices: { RO: 79, EU: 19, US: 22 } },
  { id: 5, catalogue: "CN-IV-ALT-005", name: "Altar Object", collection: "Ritual Cabinet", liber: "LIBER IV", format: "Physical", note: "Small bowl, stand, bell or holder presented as an archive object.", prices: { RO: 129, EU: 30, US: 34 } },
  { id: 6, catalogue: "CN-IV-TXT-006", name: "Altar Cloth", collection: "Ritual Cabinet", liber: "LIBER IV", format: "Physical", note: "Textile with restrained historical-inspired borderwork.", prices: { RO: 149, EU: 35, US: 39 } },
  { id: 7, catalogue: "CN-III-RSN-007", name: "Resin & Incense Blend", collection: "Ritual Cabinet", liber: "LIBER III", format: "Physical", note: "Aromatic blend with safety card and material history.", prices: { RO: 79, EU: 19, US: 22 } },
  { id: 8, catalogue: "CN-II-BOT-008", name: "Pressed Botanical Packet", collection: "Ritual Cabinet", liber: "LIBER II", format: "Physical", note: "Pressed specimen, labels and herbarium folio.", prices: { RO: 59, EU: 14, US: 16 } },
  { id: 9, catalogue: "CN-IV-KIT-009", name: "Ritual Kit", collection: "Ritual Cabinet", liber: "LIBER IV", format: "Physical", note: "Coherent themed kit with artefacts and documented context.", prices: { RO: 229, EU: 54, US: 60 } },
  { id: 10, catalogue: "CN-V-DIV-010", name: "Divination Object Set", collection: "Divination & Contemplation", liber: "LIBER V", format: "Physical", note: "Symbolic objects, cloth and interpretation guide.", prices: { RO: 179, EU: 42, US: 47 } },
  { id: 11, catalogue: "CN-V-SCR-011", name: "Black Scrying Mirror", collection: "Divination & Contemplation", liber: "LIBER V", format: "Physical", note: "Dark mirror with stand and historical-context folio.", prices: { RO: 249, EU: 59, US: 66 } },
  { id: 12, catalogue: "CN-VI-CHM-012", name: "Protective Charm / Key", collection: "Collector's Cabinet", liber: "LIBER VI", format: "Physical", note: "Modern symbolic object paired with documented folklore.", prices: { RO: 89, EU: 21, US: 24 } },
  { id: 13, catalogue: "CN-VII-WAX-013", name: "Wax & Sealing Set", collection: "Archive Editions", liber: "LIBER VII", format: "Physical", note: "Wax, archive seal and correspondence labels.", prices: { RO: 99, EU: 23, US: 26 } },
  { id: 14, catalogue: "CN-VII-PAP-014", name: "Manuscript Stationery Set", collection: "Archive Editions", liber: "LIBER VII", format: "Physical", note: "Folio sheets, labels, ribbons and archival tags.", prices: { RO: 79, EU: 18, US: 21 } },
  { id: 15, catalogue: "CN-IV-MED-015", name: "Deep Meditation Book", collection: "Archive Editions", liber: "LIBER IV", format: "Physical", note: "Long-form contemplative volume: silence, memory, grief or becoming.", prices: { RO: 149, EU: 35, US: 39 } },
  { id: 16, catalogue: "CN-IV-INC-016", name: "Spells & Incantations Volume", collection: "Archive Editions", liber: "LIBER IV", format: "Physical", note: "Documented charms, oral formulae and clearly labelled reconstructions.", prices: { RO: 179, EU: 42, US: 47 } },
  { id: 17, catalogue: "CN-I-SEA-017", name: "Seasonal Ritual Box", collection: "Collector's Cabinet", liber: "LIBER I", format: "Physical", note: "A seasonal accession of candle, folio, object and specimen.", prices: { RO: 349, EU: 82, US: 90 } },
  { id: 18, catalogue: "CN-VI-REM-018", name: "Remembrance Set", collection: "Collector's Cabinet", liber: "LIBER VI", format: "Physical", note: "Candle, ribbon, memorial card, botanical and remembrance folio.", prices: { RO: 229, EU: 54, US: 60 } },
  { id: 19, catalogue: "CN-V-DRM-019", name: "Dream Cabinet Set", collection: "Divination & Contemplation", liber: "LIBER V", format: "Physical", note: "Dream journal, symbols, scent element and night record cards.", prices: { RO: 249, EU: 59, US: 66 } },
  { id: 20, catalogue: "CN-VI-CUR-020", name: "Cabinet of Curiosities Box", collection: "Collector's Cabinet", liber: "LIBER VI", format: "Physical", note: "Numbered box of miniature archival curiosities.", prices: { RO: 279, EU: 65, US: 72 } },
  { id: 21, catalogue: "CN-VI-JWL-021", name: "Ritual Jewellery", collection: "Collector's Cabinet", liber: "LIBER VI", format: "Physical", note: "Restrained pendant, ring or brooch with provenance card.", prices: { RO: 199, EU: 47, US: 54 } },
  { id: 22, catalogue: "CN-VI-HOM-022", name: "Household Magic Set", collection: "Ritual Cabinet", liber: "LIBER VI", format: "Physical", note: "Threshold, hearth and household objects with regional context.", prices: { RO: 169, EU: 39, US: 44 } },
  { id: 23, catalogue: "CN-I-KIT-023", name: "Historical Kitchen Folio Cards", collection: "Archive Editions", liber: "LIBER I", format: "Physical", note: "Safe historical recipes, ritual foods and seasonal context.", prices: { RO: 89, EU: 21, US: 24 } },
  { id: 24, catalogue: "CN-V-AUD-024", name: "Digital Ritual Soundscape", collection: "Divination & Contemplation", liber: "LIBER V", format: "Digital", note: "Archive rain, winter chapel, forest or midnight reading room.", prices: { RO: 49, EU: 12, US: 14 } },
  { id: 25, catalogue: "CN-LIB-CBX-025", name: "LIBER Collector Box", collection: "Collector's Cabinet", liber: "LIBER I–VII", format: "Physical", note: "A premium physical cabinet dedicated to one LIBER.", prices: { RO: 429, EU: 99, US: 110 } },
  { id: 26, catalogue: "CN-IV-KEY-026", name: "Archive Key Series", collection: "Collector's Cabinet", liber: "LIBER IV", format: "Physical", note: "Threshold, Memory, Hearth, Dream, Passage, Silence or Return.", prices: { RO: 89, EU: 21, US: 24 } },
  { id: 27, catalogue: "CN-VI-BEL-027", name: "Threshold Bell", collection: "Ritual Cabinet", liber: "LIBER VI", format: "Physical", note: "Bronze-tone bell with folklore and domestic-practice folio.", prices: { RO: 99, EU: 23, US: 26 } },
  { id: 28, catalogue: "CN-I-CLK-028", name: "Bookkeeper's Candle Clock", collection: "Ritual Cabinet", liber: "LIBER I", format: "Physical", note: "Marked candle inspired by historical candle timekeeping.", prices: { RO: 129, EU: 30, US: 34 } },
  { id: 29, catalogue: "CN-IV-THR-029", name: "Ritual Thread Spools", collection: "Ritual Cabinet", liber: "LIBER IV", format: "Physical", note: "Red, black, white, green or antique-gold symbolic thread.", prices: { RO: 49, EU: 12, US: 14 } },
  { id: 30, catalogue: "CN-IV-KNT-030", name: "Knot Cabinet", collection: "Ritual Cabinet", liber: "LIBER IV", format: "Physical", note: "Cords, knot cards and documented knot symbolism.", prices: { RO: 139, EU: 32, US: 36 } },
  { id: 31, catalogue: "CN-II-REL-031", name: "Specimen Reliquary", collection: "Collector's Cabinet", liber: "LIBER II", format: "Physical", note: "Natural specimen mounted as a museum-style miniature.", prices: { RO: 149, EU: 35, US: 39 } },
  { id: 32, catalogue: "CN-II-SHD-032", name: "Botanical Shadow Box", collection: "Collector's Cabinet", liber: "LIBER II", format: "Physical", note: "Framed pressed plant with archival annotation.", prices: { RO: 199, EU: 47, US: 52 } },
  { id: 33, catalogue: "CN-I-LUN-033", name: "Lunar Instrument", collection: "Archive Editions", liber: "LIBER I", format: "Physical", note: "Mechanical-style phase and season reference inspired by volvelles.", prices: { RO: 249, EU: 59, US: 65 } },
  { id: 34, catalogue: "CN-I-WHL-034", name: "Season Wheel / Perpetual Calendar", collection: "Archive Editions", liber: "LIBER I", format: "Physical", note: "Rotating seasonal, agricultural and feast-day reference.", prices: { RO: 169, EU: 39, US: 44 } },
  { id: 35, catalogue: "CN-V-CLT-035", name: "Diviner's Cloth", collection: "Divination & Contemplation", liber: "LIBER V", format: "Physical", note: "Dark textile laid out like an archival diagram.", prices: { RO: 169, EU: 39, US: 44 } },
  { id: 36, catalogue: "CN-V-CST-036", name: "Casting Objects Cabinet", collection: "Divination & Contemplation", liber: "LIBER V", format: "Physical", note: "Modern symbolic casting set with explicit interpretation status.", prices: { RO: 179, EU: 42, US: 47 } },
  { id: 37, catalogue: "CN-V-BIB-037", name: "Bibliomancy Library Slips", collection: "Divination & Contemplation", liber: "LIBER V", format: "Physical", note: "Library slips and contemplative prompts for book-based practice.", prices: { RO: 69, EU: 16, US: 18 } },
  { id: 38, catalogue: "CN-VII-INK-038", name: "Nocturnal Ink Cabinet", collection: "Archive Editions", liber: "LIBER VII", format: "Physical", note: "Black, sepia, oxblood and forest inks with writing tools.", prices: { RO: 199, EU: 47, US: 52 } },
  { id: 39, catalogue: "CN-VII-MRG-039", name: "Marginalia Kit", collection: "Archive Editions", liber: "LIBER VII", format: "Physical", note: "Stamps, labels, tabs, ribbons and specimen markers.", prices: { RO: 129, EU: 30, US: 34 } },
  { id: 40, catalogue: "CN-VII-EXL-040", name: "Ex Libris Collection", collection: "Archive Editions", liber: "LIBER VII", format: "Physical", note: "Bookplates and archive-style ex libris stamps.", prices: { RO: 99, EU: 23, US: 26 } },
  { id: 41, catalogue: "CN-IV-RSH-041", name: "Portable Reading Shrine", collection: "Divination & Contemplation", liber: "LIBER IV", format: "Physical", note: "Folding private reading ritual box with stand and note drawer.", prices: { RO: 349, EU: 82, US: 90 } },
  { id: 42, catalogue: "CN-CAB-042", name: "Miniature Archive Cabinet", collection: "Collector's Cabinet", liber: "LIBER I–VII", format: "Physical", note: "Seven-drawer wooden cabinet built to house future accessions.", prices: { RO: 649, EU: 149, US: 165 } },
  { id: 43, catalogue: "CN-CAB-043", name: "Seven Drawer Complete Collection", collection: "Collector's Cabinet", liber: "LIBER I–VII", format: "Physical", note: "Cabinet plus one fully curated drawer for every LIBER.", prices: { RO: 1399, EU: 325, US: 360 } },
  { id: 44, catalogue: "CN-VII-SCP-044", name: "Scented Archive Papers", collection: "Archive Editions", liber: "LIBER VII", format: "Physical", note: "Subtly scented folio papers and book blotters.", prices: { RO: 49, EU: 12, US: 14 } },
  { id: 45, catalogue: "CN-VII-CAS-045", name: "Ritual Matchbox / Candle Case", collection: "Ritual Cabinet", liber: "LIBER VII", format: "Physical", note: "Reusable numbered case for slim candles or matches.", prices: { RO: 79, EU: 18, US: 21 } },
  { id: 46, catalogue: "CN-VII-LTN-046", name: "Archive Lantern", collection: "Collector's Cabinet", liber: "LIBER VII", format: "Physical", note: "Small lantern with botanical or celestial cutwork.", prices: { RO: 279, EU: 65, US: 72 } },
  { id: 47, catalogue: "CN-VI-MRN-047", name: "Mourning Cabinet", collection: "Collector's Cabinet", liber: "LIBER VI", format: "Physical", note: "Sobriety-first remembrance objects and material-culture folio.", prices: { RO: 249, EU: 59, US: 66 } },
  { id: 48, catalogue: "CN-VI-MEM-048", name: "Memory Token", collection: "Collector's Cabinet", liber: "LIBER VI", format: "Physical", note: "Small engravable token in a numbered archival envelope.", prices: { RO: 59, EU: 14, US: 16 } },
  { id: 49, catalogue: "CN-IV-SIL-049", name: "Silent Hour Collection", collection: "Divination & Contemplation", liber: "LIBER IV", format: "Physical", note: "Hourglass, dark candle, stone, blank card and silence guide.", prices: { RO: 199, EU: 47, US: 52 } },
  { id: 50, catalogue: "CN-ACC-050", name: "Archivist's Subscription Chest", collection: "Collector's Cabinet", liber: "LIBER I–VII", format: "Subscription", note: "Founder's chest plus first numbered accession; future accessions sold separately.", prices: { RO: 299, EU: 69, US: 75 } },
];

export const productCollections = [
  "Ritual Cabinet",
  "Archive Editions",
  "Divination & Contemplation",
  "Collector's Cabinet",
] as const;
