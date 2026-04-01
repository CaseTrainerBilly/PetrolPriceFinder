export type FuelType = "unleaded" | "diesel" | "premium";

export type SortOption = "cheapest" | "nearest" | "best-value";

export type SearchSource = "geolocation" | "manual";

export type DataSource = "live" | "mock";

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface LocationSuggestion extends Coordinates {
  id: string;
  label: string;
  postcode?: string;
  region: string;
}

export interface FuelPrices {
  unleaded: number;
  diesel: number;
  premium?: number;
}

export interface PetrolStation {
  id: string;
  name: string;
  brand: string;
  address: string;
  coordinates: Coordinates;
  prices: FuelPrices;
  updatedAt: string;
  amenities: string[];
}

export interface StationWithDistance extends PetrolStation {
  distanceMiles: number;
  bestValueScore: number;
}

export interface SearchParams {
  location?: Coordinates;
  radiusMiles: number;
  fuelType: FuelType;
  sort: SortOption;
  query?: string;
}

export interface StationsResponse {
  stations: StationWithDistance[];
  source: SearchSource;
  searchCenter: Coordinates;
  radiusMiles: number;
  queryLabel?: string;
}
