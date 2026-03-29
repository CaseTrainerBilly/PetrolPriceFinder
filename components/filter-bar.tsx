"use client";

import { FuelType, SortOption } from "@/lib/types";
import { cn } from "@/lib/utils";

const radiusOptions = [2, 5, 10, 20];
const sortOptions: Array<{ value: SortOption; label: string }> = [
  { value: "cheapest", label: "Cheapest first" },
  { value: "nearest", label: "Nearest first" },
  { value: "best-value", label: "Best value" }
];
const fuelOptions: Array<{ value: FuelType; label: string }> = [
  { value: "unleaded", label: "Unleaded" },
  { value: "diesel", label: "Diesel" },
  { value: "premium", label: "Premium" }
];

interface FilterBarProps {
  fuelType: FuelType;
  radiusMiles: number;
  sort: SortOption;
  onFuelTypeChange: (value: FuelType) => void;
  onRadiusChange: (value: number) => void;
  onSortChange: (value: SortOption) => void;
}

export function FilterBar({
  fuelType,
  radiusMiles,
  sort,
  onFuelTypeChange,
  onRadiusChange,
  onSortChange
}: FilterBarProps) {
  return (
    <div className="panel p-4 sm:p-5">
      <div className="grid gap-5 lg:grid-cols-3">
        <div>
          <p className="text-sm font-semibold text-ink/75">Fuel type</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {fuelOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => onFuelTypeChange(option.value)}
                className={cn("button-chip", fuelType === option.value && "button-chip-active")}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-ink/75">Search radius</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {radiusOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => onRadiusChange(option)}
                className={cn("button-chip", radiusMiles === option && "button-chip-active")}
              >
                {option} mi
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="sort" className="text-sm font-semibold text-ink/75">
            Sort results
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(event) => onSortChange(event.target.value as SortOption)}
            className="field mt-3"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
