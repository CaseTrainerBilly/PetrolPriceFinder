import { FuelType, SearchSource } from "@/lib/types";
import { fuelLabel } from "@/lib/utils";

interface ResultsSummaryProps {
  count: number;
  queryLabel?: string;
  source?: SearchSource;
  fuelType: FuelType;
  radiusMiles: number;
}

export function ResultsSummary({
  count,
  queryLabel,
  source,
  fuelType,
  radiusMiles
}: ResultsSummaryProps) {
  const sourceLabel =
    source === "geolocation"
      ? "your current location"
      : queryLabel
        ? queryLabel
        : "your selected area";

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-accent">Nearby fuel</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink">{count} stations found</h2>
      </div>
      <p className="max-w-lg text-sm text-ink/65">
        Showing the best {fuelLabel(fuelType).toLowerCase()} options within {radiusMiles} miles of {sourceLabel}.
      </p>
    </div>
  );
}
