"use client";

import { LocateFixed, Search } from "lucide-react";

interface SearchControlsProps {
  manualQuery: string;
  onManualQueryChange: (value: string) => void;
  onSearchManual: () => void;
  onUseLocation: () => void;
  isLocating: boolean;
  geolocationSupported: boolean;
}

export function SearchControls({
  manualQuery,
  onManualQueryChange,
  onSearchManual,
  onUseLocation,
  isLocating,
  geolocationSupported
}: SearchControlsProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-[1.4fr_0.9fr]">
      <div className="rounded-[28px] bg-white p-4">
        <label htmlFor="manual-search" className="text-sm font-semibold text-ink/75">
          Search by postcode, town, or city
        </label>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40" />
            <input
              id="manual-search"
              value={manualQuery}
              onChange={(event) => onManualQueryChange(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  onSearchManual();
                }
              }}
              placeholder="Try Manchester, M1, or Salford"
              className="field pl-11"
            />
          </div>
          <button type="button" onClick={onSearchManual} className="button-primary">
            Search area
          </button>
        </div>
      </div>

      <div className="rounded-[28px] bg-ink p-4 text-white">
        <p className="text-sm font-semibold text-white/80">Use current location</p>
        <p className="mt-2 text-sm text-white/65">
          Find the closest stations automatically and fall back to manual search anytime.
        </p>
        <button
          type="button"
          onClick={onUseLocation}
          disabled={!geolocationSupported || isLocating}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-highlight px-4 py-3 font-semibold text-ink transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:bg-white/30 disabled:text-white/60"
        >
          <LocateFixed className="h-4 w-4" />
          {isLocating ? "Checking location..." : geolocationSupported ? "Use my location" : "Geolocation unavailable"}
        </button>
      </div>
    </div>
  );
}
