import { mockLocations } from "@/lib/mock/locations";
import { LocationSuggestion } from "@/lib/types";

export interface LocationProvider {
  searchLocations(query: string): Promise<LocationSuggestion[]>;
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

export const locationProvider: LocationProvider = new MockLocationProvider();
