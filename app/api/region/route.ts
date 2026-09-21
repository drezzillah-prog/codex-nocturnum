import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import type { PriceRegion } from "@/data/products";

function toRegion(country: string | null): PriceRegion {
  if (country === "RO") return "RO";
  if (country === "US") return "US";
  return "EU";
}

export function GET(request: NextRequest) {
  const country = request.headers.get("x-vercel-ip-country") ?? request.headers.get("cf-ipcountry") ?? null;
  return NextResponse.json({ country, region: toRegion(country) });
}
