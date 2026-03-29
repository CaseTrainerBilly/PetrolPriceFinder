"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Crosshair, Map, Rows3, Sparkles } from "lucide-react";

import { EmptyState } from "@/components/empty-state";
import { ErrorState } from "@/components/error-state";
import { FilterBar } from "@/components/filter-bar";
import { LoadingState } from "@/components/loading-state";
import { MapPanel } from "@/components/map-panel";
import { ResultsSummary } from "@/components/results-summary";
import { SearchControls } from "@/components/search-controls";
import { StationCard } from "@/components/station-card";
import { Coordinates, FuelType, SearchSource, SortOption, StationWithDistance } from "@/lib/types";
import { mockLocations } from "@/lib/mock/locations";

type ViewMode = "list" | "map";

interface StationsApiResponse {
  stations: StationWithDistance[];
}

interface LocationsApiResponse {
  locations: Array<Coordinates & { label: string }>;
}

const defaultCenter = mockLocations[0];

export function HomePageClient() {
  const [manualQuery, setManualQuery] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [fuelType, setFuelType] = useState<FuelType>("unleaded");
  const [radiusMiles, setRadiusMiles] = useState(5);
  const [sort, setSort] = useState<SortOption>("cheapest");
  const [stations, setStations] = useState<StationWithDistance[]>([]);
  const [isLocating, setIsLocating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCenter, setSelectedCenter] = useState<Coordinates>({
    lat: defaultCenter.lat,
    lng: defaultCenter.lng
  });
  const [queryLabel, setQueryLabel] = useState<string>(defaultCenter.label);
  const [searchSource, setSearchSource] = useState<SearchSource>("manual");
  const [hasSearched, setHasSearched] = useState(false);

  const geolocationSupported = typeof navigator !== "undefined" && "geolocation" in navigator;

  const loadStations = useCallback(async (center: Coordinates, source: SearchSource, label?: string) => {
    setError(null);
    setHasSearched(true);
    setIsLoading(true);

    try {
      const params = new URLSearchParams({
        lat: String(center.lat),
        lng: String(center.lng),
        radius: String(radiusMiles),
        fuelType,
        sort
      });
      const response = await fetch(`/api/stations?${params.toString()}`);
      const data = (await response.json()) as StationsApiResponse & { error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? "Unable to load stations.");
      }

      setStations(data.stations);
      setSelectedCenter(center);
      setSearchSource(source);
      if (label) {
        setQueryLabel(label);
      }
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Unable to load stations.");
    } finally {
      setIsLoading(false);
    }
  }, [fuelType, radiusMiles, sort]);

  async function handleManualSearch() {
    const query = manualQuery.trim();

    if (!query) {
      setError("Enter a postcode, town, or city to search manually.");
      return;
    }

    setError(null);

    try {
      const response = await fetch(`/api/locations?q=${encodeURIComponent(query)}`);
      const data = (await response.json()) as LocationsApiResponse;
      const firstMatch = data.locations[0];

      if (!firstMatch) {
        setStations([]);
        setHasSearched(true);
        setSearchSource("manual");
        setQueryLabel(query);
        return;
      }

      await loadStations({ lat: firstMatch.lat, lng: firstMatch.lng }, "manual", firstMatch.label);
    } catch {
      setError("We couldn't search that area. Try another postcode or town.");
    }
  }

  function handleUseLocation() {
    if (!geolocationSupported) {
      setError("This browser does not support geolocation. Try a manual search instead.");
      return;
    }

    setIsLocating(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        setIsLocating(false);
        await loadStations(
          { lat: position.coords.latitude, lng: position.coords.longitude },
          "geolocation"
        );
      },
      () => {
        setIsLocating(false);
        setError("Location permission was denied. You can still search by postcode, town, or city.");
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  useEffect(() => {
    void loadStations(selectedCenter, searchSource, queryLabel);
  }, [loadStations, queryLabel, searchSource, selectedCenter]);

  const heroStats = useMemo(
    () => [
      { label: "Coverage", value: "6 mock search hubs" },
      { label: "Decision speed", value: "Sort by price, value, or distance" },
      { label: "Ready for live data", value: "Provider-based server routes" }
    ],
    []
  );

  return (
    <main className="app-shell min-h-screen px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 pb-8">
        <section className="panel overflow-hidden">
          <div className="grid gap-8 p-6 lg:grid-cols-[1.15fr_0.85fr] lg:p-8">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-accentSoft px-3 py-1 text-sm font-semibold text-accent">
                <Sparkles className="h-4 w-4" />
                Smart Fuel Finder
              </div>
              <h1 className="mt-5 max-w-2xl text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-6xl">
                Find the cheapest petrol nearby without losing time on the road.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-ink/70 sm:text-lg">
                A portfolio-quality location search experience built with Next.js, typed mock data, geolocation,
                sorting, filters, and a map-ready results flow that can swap to a real fuel API later.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {heroStats.map((stat) => (
                  <div key={stat.label} className="rounded-[24px] bg-white p-4">
                    <p className="text-sm font-medium text-ink/60">{stat.label}</p>
                    <p className="mt-2 text-lg font-semibold text-ink">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[32px] bg-ink p-5 text-white sm:p-6">
              <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-highlight">
                <Crosshair className="h-4 w-4" />
                Search flow
              </div>
              <h2 className="mt-4 text-2xl font-bold sm:text-3xl">Permission-first, manual fallback built in</h2>
              <p className="mt-3 text-sm leading-6 text-white/70 sm:text-base">
                Use live browser geolocation when the user allows it, or gracefully drop into location search for
                postcode, town, or city input when permission is denied.
              </p>

              <div className="mt-6 grid gap-3">
                <div className="rounded-3xl bg-white/10 p-4">
                  <p className="text-sm font-semibold text-white">1. Choose location source</p>
                  <p className="mt-1 text-sm text-white/65">Current location or typed area search.</p>
                </div>
                <div className="rounded-3xl bg-white/10 p-4">
                  <p className="text-sm font-semibold text-white">2. Compare stations</p>
                  <p className="mt-1 text-sm text-white/65">See list and map views with distance-aware pricing.</p>
                </div>
                <div className="rounded-3xl bg-white/10 p-4">
                  <p className="text-sm font-semibold text-white">3. Open directions</p>
                  <p className="mt-1 text-sm text-white/65">Jump straight into navigation from each result.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <SearchControls
          manualQuery={manualQuery}
          onManualQueryChange={setManualQuery}
          onSearchManual={() => void handleManualSearch()}
          onUseLocation={handleUseLocation}
          isLocating={isLocating}
          geolocationSupported={geolocationSupported}
        />

        <FilterBar
          fuelType={fuelType}
          radiusMiles={radiusMiles}
          sort={sort}
          onFuelTypeChange={setFuelType}
          onRadiusChange={setRadiusMiles}
          onSortChange={setSort}
        />

        <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <ResultsSummary
                count={stations.length}
                queryLabel={queryLabel}
                source={searchSource}
                fuelType={fuelType}
                radiusMiles={radiusMiles}
              />
              <div className="inline-flex items-center gap-2 rounded-full bg-white p-1 shadow-sm">
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${
                    viewMode === "list" ? "bg-ink text-white" : "text-ink/65"
                  }`}
                >
                  <Rows3 className="mr-2 inline h-4 w-4" />
                  List
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("map")}
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${
                    viewMode === "map" ? "bg-ink text-white" : "text-ink/65"
                  }`}
                >
                  <Map className="mr-2 inline h-4 w-4" />
                  Map
                </button>
              </div>
            </div>

            {error ? (
              <ErrorState message={error} onRetry={() => void loadStations(selectedCenter, searchSource, queryLabel)} />
            ) : isLoading ? (
              <LoadingState />
            ) : !hasSearched ? (
              <EmptyState
                title="Start a search"
                description="Use your current location or type a postcode, town, or city to see nearby fuel prices."
              />
            ) : stations.length === 0 ? (
              <EmptyState
                title="No stations in this radius"
                description="Try a wider search radius, another location, or switch to a fuel type with more coverage."
              />
            ) : viewMode === "map" ? (
              <MapPanel stations={stations} center={selectedCenter} />
            ) : (
              <div className="space-y-4">
                {stations.map((station) => (
                  <StationCard key={station.id} station={station} origin={selectedCenter} />
                ))}
              </div>
            )}
          </div>

          <aside className="space-y-4">
            <div className="panel p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">Map preview</p>
              <h2 className="mt-3 text-2xl font-bold text-ink">Spatial context for quick comparison</h2>
              <p className="mt-2 text-sm leading-6 text-ink/65">
                The desktop layout keeps map context visible alongside results, while mobile can switch cleanly between
                list and map views.
              </p>
            </div>
            <MapPanel stations={stations} center={selectedCenter} />
          </aside>
        </section>
      </div>
    </main>
  );
}
