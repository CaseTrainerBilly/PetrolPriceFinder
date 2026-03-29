import { NextRequest, NextResponse } from "next/server";

import { locationProvider } from "@/lib/data/location-provider";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q") ?? "";
  const results = await locationProvider.searchLocations(query);

  return NextResponse.json({ locations: results });
}
