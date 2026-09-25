import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import type { PriceRegion } from "@/data/products";
import type { Language } from "@/data/i18n";

const EU = new Set([
  "AT","BE","BG","HR","CY","CZ","DK","EE","FI","FR","DE","GR","HU","IE","IT","LV","LT","LU","MT","NL","PL","PT","SK","SI","ES","SE"
]);

function market(country: string | null): PriceRegion {
  if (country === "RO") return "RO";
  if (country === "US") return "US";
  if (country === "GB") return "UK";
  if (country === "CA") return "CA";
  if (country === "AU") return "AU";
  if (country && EU.has(country)) return "EU";
  return "US";
}

function preferredLanguage(country: string | null, acceptLanguage: string): Language {
  const browser = acceptLanguage.toLowerCase();
  if (country === "RO") return "ro";
  if (country === "FR") return "fr";
  if (country === "DE" || country === "AT") return "de";
  if (country === "IT") return "it";
  if (country === "CA" && browser.includes("fr")) return "fr";
  if (browser.startsWith("ro") || browser.includes(",ro")) return "ro";
  if (browser.startsWith("fr") || browser.includes(",fr")) return "fr";
  if (browser.startsWith("de") || browser.includes(",de")) return "de";
  if (browser.startsWith("it") || browser.includes(",it")) return "it";
  return "en";
}

export function GET(request: NextRequest) {
  const country = request.headers.get("x-vercel-ip-country") ?? request.headers.get("cf-ipcountry") ?? null;
  const language = preferredLanguage(country, request.headers.get("accept-language") ?? "");
  return NextResponse.json({
    country,
    region: market(country),
    language,
  });
}
