import { calculateDistanceMiles } from "@/lib/location-utils";
import { mockStations } from "@/lib/mock/stations";
import {
  Coordinates,
  FuelType,
  PetrolStation,
  SearchParams,
  StationWithDistance
} from "@/lib/types";

export interface StationProvider {
  getStations(params: SearchParams): Promise<StationWithDistance[]>;
  getStationById(id: string, origin?: Coordinates): Promise<StationWithDistance | null>;
}

function getComparablePrice(station: PetrolStation, fuelType: FuelType) {
  if (fuelType === "premium") {
    return station.prices.premium ?? Number.POSITIVE_INFINITY;
  }

  return station.prices[fuelType];
}

function getBestValueScore(station: PetrolStation, distanceMiles: number) {
  const baseline = station.prices.unleaded * 0.55 + station.prices.diesel * 0.3 + (station.prices.premium ?? 999) * 0.15;
  return baseline + distanceMiles * 1.8;
}

function hydrateStation(station: PetrolStation, origin: Coordinates): StationWithDistance {
  const distanceMiles = calculateDistanceMiles(origin, station.coordinates);

  return {
    ...station,
    distanceMiles,
    bestValueScore: getBestValueScore(station, distanceMiles)
  };
}

class MockStationProvider implements StationProvider {
  async getStations(params: SearchParams): Promise<StationWithDistance[]> {
    const origin = params.location;

    if (!origin) {
      return [];
    }

    const withDistance = mockStations.map((station) => hydrateStation(station, origin));

    const filtered = withDistance
      .filter((station) => station.distanceMiles <= params.radiusMiles)
      .filter((station) => {
        if (params.fuelType === "premium") {
          return station.prices.premium !== undefined;
        }

        return true;
      });

    return filtered.sort((left, right) => {
      switch (params.sort) {
        case "nearest":
          return left.distanceMiles - right.distanceMiles;
        case "best-value":
          return left.bestValueScore - right.bestValueScore;
        case "cheapest":
        default:
          return getComparablePrice(left, params.fuelType) - getComparablePrice(right, params.fuelType);
      }
    });
  }

  async getStationById(id: string, origin?: Coordinates): Promise<StationWithDistance | null> {
    const station = mockStations.find((item) => item.id === id);

    if (!station) {
      return null;
    }

    if (!origin) {
      return {
        ...station,
        distanceMiles: 0,
        bestValueScore: getBestValueScore(station, 0)
      };
    }

    return hydrateStation(station, origin);
  }
}

export const stationProvider: StationProvider = new MockStationProvider();
