import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import type { PriceRegion } from "@/data/products";

function toRegion(country: string | null): PriceRegion {
  if (country === "RO") return "RO";
  if (country === "US") return "US";
  if (country === "GB") return "UK";
  if (country === "CA") return "CA";
  if (country === "AU") return "AU";
  return "EU";
}

export function GET(request: NextRequest) {
  const country = request.headers.get("x-vercel-ip-country") ?? request.headers.get("cf-ipcountry") ?? null;
  return NextResponse.json({ country, region: toRegion(country) });
}
