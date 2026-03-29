import { FuelType } from "@/lib/types";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatPrice(price?: number) {
  if (price === undefined) {
    return "N/A";
  }

  return `${price.toFixed(1)}p`;
}

export function fuelLabel(fuelType: FuelType) {
  switch (fuelType) {
    case "unleaded":
      return "Unleaded";
    case "diesel":
      return "Diesel";
    case "premium":
      return "Premium";
  }
}
