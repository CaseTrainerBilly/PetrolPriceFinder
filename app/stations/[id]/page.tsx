import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock3, Compass, Fuel, MapPinned } from "lucide-react";
import { format } from "date-fns";

import { PriceCard } from "@/components/price-card";
import { stationProvider } from "@/lib/data/station-provider";
import { formatDistance } from "@/lib/location-utils";

interface StationPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ lat?: string; lng?: string }>;
}

export default async function StationPage({ params, searchParams }: StationPageProps) {
  const [{ id }, query] = await Promise.all([params, searchParams]);
  const lat = query.lat ? Number(query.lat) : undefined;
  const lng = query.lng ? Number(query.lng) : undefined;

  const station = await stationProvider.getStationById(
    id,
    lat !== undefined && lng !== undefined ? { lat, lng } : undefined
  );

  if (!station) {
    notFound();
  }

  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${station.coordinates.lat},${station.coordinates.lng}`;

  return (
    <main className="app-shell min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <Link href="/" className="button-secondary w-fit gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to search
        </Link>

        <section className="panel overflow-hidden">
          <div className="grid gap-8 p-6 lg:grid-cols-[1.3fr_0.7fr] lg:p-8">
            <div className="space-y-6">
              <div className="space-y-3">
                <span className="pill">{station.brand}</span>
                <div>
                  <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">{station.name}</h1>
                  <p className="mt-2 max-w-2xl text-base text-ink/70 sm:text-lg">{station.address}</p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-3xl bg-accentSoft p-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-ink/70">
                    <Compass className="h-4 w-4 text-accent" />
                    Distance
                  </div>
                  <p className="mt-2 text-2xl font-bold text-ink">{formatDistance(station.distanceMiles)}</p>
                </div>
                <div className="rounded-3xl bg-white p-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-ink/70">
                    <Clock3 className="h-4 w-4 text-storm" />
                    Updated
                  </div>
                  <p className="mt-2 text-lg font-semibold text-ink">
                    {format(new Date(station.updatedAt), "dd MMM, HH:mm")}
                  </p>
                </div>
                <div className="rounded-3xl bg-white p-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-ink/70">
                    <Fuel className="h-4 w-4 text-highlight" />
                    Amenities
                  </div>
                  <p className="mt-2 text-lg font-semibold text-ink">{station.amenities.length}</p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <PriceCard label="Unleaded" price={station.prices.unleaded} accent="accent" />
                <PriceCard label="Diesel" price={station.prices.diesel} accent="storm" />
                <PriceCard label="Premium" price={station.prices.premium} accent="highlight" />
              </div>
            </div>

            <aside className="space-y-4 rounded-[28px] bg-ink p-6 text-white">
              <div>
                <h2 className="text-xl font-bold">Stop summary</h2>
                <p className="mt-2 text-sm text-white/75">
                  Designed around a replaceable data layer, so this mock station detail can be swapped to a live API
                  response later without changing the UI contract.
                </p>
              </div>

              <div className="rounded-3xl bg-white/10 p-4">
                <div className="flex items-center gap-2 text-sm text-white/75">
                  <MapPinned className="h-4 w-4" />
                  Facilities
                </div>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {station.amenities.map((amenity) => (
                    <li key={amenity} className="rounded-full bg-white/10 px-3 py-1 text-sm">
                      {amenity}
                    </li>
                  ))}
                </ul>
              </div>

              <a href={mapsUrl} target="_blank" rel="noreferrer" className="button-primary w-full bg-highlight text-ink hover:bg-yellow-300">
                Open Directions
              </a>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}
