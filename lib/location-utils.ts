import { Coordinates } from "@/lib/types";

const EARTH_RADIUS_MILES = 3958.8;

function toRadians(value: number) {
  return (value * Math.PI) / 180;
}

export function calculateDistanceMiles(from: Coordinates, to: Coordinates) {
  const dLat = toRadians(to.lat - from.lat);
  const dLng = toRadians(to.lng - from.lng);
  const lat1 = toRadians(from.lat);
  const lat2 = toRadians(to.lat);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) * Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return EARTH_RADIUS_MILES * c;
}

export function formatDistance(distanceMiles: number) {
  if (distanceMiles < 0.15) {
    return `${Math.round(distanceMiles * 1760)} yd`;
  }

  return `${distanceMiles.toFixed(1)} mi`;
}
