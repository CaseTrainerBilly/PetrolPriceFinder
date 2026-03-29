import Link from "next/link";
import { ArrowRight, Clock3, MapPinned, Navigation } from "lucide-react";
import { formatDistanceToNowStrict } from "date-fns";

import { PriceCard } from "@/components/price-card";
import { StationWithDistance } from "@/lib/types";
import { formatDistance } from "@/lib/location-utils";

interface StationCardProps {
  station: StationWithDistance;
  origin?: { lat: number; lng: number } | null;
}

export function StationCard({ station, origin }: StationCardProps) {
  const detailsHref = origin
    ? `/stations/${station.id}?lat=${origin.lat}&lng=${origin.lng}`
    : `/stations/${station.id}`;
  const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${station.coordinates.lat},${station.coordinates.lng}`;

  return (
    <article className="rounded-[28px] border border-border bg-white p-5 transition hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-lg">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="pill">{station.brand}</span>
            <span className="pill">{formatDistance(station.distanceMiles)}</span>
          </div>

          <div>
            <h3 className="text-2xl font-bold tracking-tight text-ink">{station.name}</h3>
            <p className="mt-2 flex items-start gap-2 text-sm text-ink/65">
              <MapPinned className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              {station.address}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 text-sm text-ink/60">
            <span className="inline-flex items-center gap-1 rounded-full bg-canvas px-3 py-1">
              <Clock3 className="h-4 w-4" />
              Updated {formatDistanceToNowStrict(new Date(station.updatedAt), { addSuffix: true })}
            </span>
            {station.amenities.slice(0, 3).map((amenity) => (
              <span key={amenity} className="inline-flex rounded-full bg-canvas px-3 py-1">
                {amenity}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
          <a href={directionsHref} target="_blank" rel="noreferrer" className="button-secondary gap-2">
            <Navigation className="h-4 w-4" />
            Directions
          </a>
          <Link href={detailsHref} className="button-primary gap-2">
            View details
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <PriceCard label="Unleaded" price={station.prices.unleaded} accent="accent" />
        <PriceCard label="Diesel" price={station.prices.diesel} accent="storm" />
        <PriceCard label="Premium" price={station.prices.premium} accent="highlight" />
      </div>
    </article>
  );
}
