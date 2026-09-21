export type { EvidenceLabel, Liber, Source, Entry } from "./schema";
export { libers, sources } from "./schema";
export { entries } from "./entries";

import type { EvidenceLabel } from "./schema";
import { libers, sources } from "./schema";
import { entries } from "./entries";

export const regions = [
  "Romania & Moldova",
  "Balkans",
  "Central Europe",
  "Eastern Europe",
  "France",
  "Italy",
  "German-speaking Europe",
  "British Isles",
  "Scandinavia",
  "Iberia",
  "Mediterranean",
  "Baltic traditions",
  "Slavic traditions",
];

export const featuredTags = ["Romania", "Balkans", "19th Century", "Winter", "Protection", "Herbs", "Funerary Customs", "Moon", "Harvest", "Household Lore"];

export const evidenceLabels: EvidenceLabel[] = ["HISTORICALLY DOCUMENTED", "FOLKLORE", "ORAL TRADITION", "MODERN RECONSTRUCTION", "CONTEMPORARY PRACTICE"];

export function getLiber(slug: string) {
  return libers.find((liber) => liber.slug === slug);
}

export function getEntry(slug: string) {
  return entries.find((entry) => entry.slug === slug);
}

export function getSource(id: string) {
  return sources.find((source) => source.id === id);
}

export function entriesForLiber(slug: string) {
  return entries.filter((entry) => entry.liber === slug);
}
