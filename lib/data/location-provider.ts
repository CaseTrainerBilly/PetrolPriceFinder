import { mockLocations } from "@/lib/mock/locations";
import { LocationSuggestion } from "@/lib/types";

export interface LocationProvider {
  searchLocations(query: string): Promise<LocationSuggestion[]>;
}

interface PostcodesLookupResponse {
  status: number;
  result: {
    postcode: string;
    longitude: number | null;
    latitude: number | null;
    region: string | null;
    admin_district: string | null;
  } | null;
}

interface PostcodesQueryResponse {
  status: number;
  result: Array<{
    postcode: string;
    longitude: number | null;
    latitude: number | null;
    region: string | null;
    admin_district: string | null;
  }>;
}

interface PlacesQueryResponse {
  status: number;
  result: Array<{
    place_name: string;
    region: string | null;
    admin_district: string | null;
    longitude: number | null;
    latitude: number | null;
  }>;
}

const POSTCODES_API_BASE_URL = process.env.POSTCODES_API_BASE_URL ?? "https://api.postcodes.io";
const POSTCODE_PATTERN = /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i;

function asLocationSuggestion(input: {
  id: string;
  label: string;
  region: string;
  lat: number;
  lng: number;
  postcode?: string;
}) {
  return {
    id: input.id,
    label: input.label,
    region: input.region,
    lat: input.lat,
    lng: input.lng,
    postcode: input.postcode
  } satisfies LocationSuggestion;
}

function dedupeLocations(locations: LocationSuggestion[]) {
  const seen = new Set<string>();

  return locations.filter((location) => {
    const key = `${location.label}-${location.lat}-${location.lng}`;

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

async function fetchJson<T>(url: string) {
  const response = await fetch(url, {
    headers: {
      Accept: "application/json"
    },
    next: { revalidate: 3600 }
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return (await response.json()) as T;
}

async function searchLiveLocations(query: string): Promise<LocationSuggestion[]> {
  const normalized = query.trim();

  if (!normalized) {
    return [];
  }

  const results: LocationSuggestion[] = [];

  if (POSTCODE_PATTERN.test(normalized)) {
    const postcode = encodeURIComponent(normalized.replace(/\s+/g, ""));
    const data = await fetchJson<PostcodesLookupResponse>(`${POSTCODES_API_BASE_URL}/postcodes/${postcode}`);
    const result = data.result;

    if (result && result.latitude !== null && result.longitude !== null) {
      results.push(
        asLocationSuggestion({
          id: `postcode-${result.postcode}`,
          label: result.postcode,
          postcode: result.postcode,
          region: result.region ?? result.admin_district ?? "United Kingdom",
          lat: result.latitude,
          lng: result.longitude
        })
      );
    }

    return results;
  }

  const [placesData, postcodesData] = await Promise.all([
    fetchJson<PlacesQueryResponse>(`${POSTCODES_API_BASE_URL}/places?q=${encodeURIComponent(normalized)}&limit=5`),
    fetchJson<PostcodesQueryResponse>(`${POSTCODES_API_BASE_URL}/postcodes?q=${encodeURIComponent(normalized)}&limit=5`)
  ]);

  for (const place of placesData.result ?? []) {
    if (place.latitude === null || place.longitude === null) {
      continue;
    }

    results.push(
      asLocationSuggestion({
        id: `place-${place.place_name}-${place.latitude}-${place.longitude}`,
        label: place.place_name,
        region: place.region ?? place.admin_district ?? "United Kingdom",
        lat: place.latitude,
        lng: place.longitude
      })
    );
  }

  for (const postcode of postcodesData.result ?? []) {
    if (postcode.latitude === null || postcode.longitude === null) {
      continue;
    }

    results.push(
      asLocationSuggestion({
        id: `postcode-${postcode.postcode}`,
        label: postcode.postcode,
        postcode: postcode.postcode,
        region: postcode.region ?? postcode.admin_district ?? "United Kingdom",
        lat: postcode.latitude,
        lng: postcode.longitude
      })
    );
  }

  return dedupeLocations(results);
}

class MockLocationProvider implements LocationProvider {
  async searchLocations(query: string): Promise<LocationSuggestion[]> {
    const normalized = query.trim().toLowerCase();

    if (!normalized) {
      return [];
    }

    return mockLocations.filter((location) => {
      const haystack = `${location.label} ${location.postcode ?? ""} ${location.region}`.toLowerCase();
      return haystack.includes(normalized);
    });
  }
}

class LiveFirstLocationProvider implements LocationProvider {
  private readonly fallbackProvider = new MockLocationProvider();

  async searchLocations(query: string): Promise<LocationSuggestion[]> {
    try {
      return await searchLiveLocations(query);
    } catch {
      return this.fallbackProvider.searchLocations(query);
    }
  }
}

export const locationProvider: LocationProvider = new LiveFirstLocationProvider();
