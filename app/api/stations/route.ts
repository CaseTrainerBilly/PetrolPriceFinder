import { NextRequest, NextResponse } from "next/server";

import { stationProvider } from "@/lib/data/station-provider";
import { FuelType, SortOption } from "@/lib/types";

function parseNumber(value: string | null, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export async function GET(request: NextRequest) {
  const lat = request.nextUrl.searchParams.get("lat");
  const lng = request.nextUrl.searchParams.get("lng");
  const radiusMiles = parseNumber(request.nextUrl.searchParams.get("radius"), 5);
  const fuelType = (request.nextUrl.searchParams.get("fuelType") ?? "unleaded") as FuelType;
  const sort = (request.nextUrl.searchParams.get("sort") ?? "cheapest") as SortOption;

  if (!lat || !lng) {
    return NextResponse.json({ stations: [], error: "Missing coordinates." }, { status: 400 });
  }

  const stations = await stationProvider.getStations({
    location: { lat: Number(lat), lng: Number(lng) },
    radiusMiles,
    fuelType,
    sort
  });

  return NextResponse.json({ stations });
}
