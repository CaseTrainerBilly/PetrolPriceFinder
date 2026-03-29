"use client";

import dynamic from "next/dynamic";

import { StationWithDistance } from "@/lib/types";

const DynamicMap = dynamic(() => import("@/components/station-map").then((mod) => mod.StationMap), {
  ssr: false,
  loading: () => <div className="h-[420px] animate-pulse rounded-[28px] bg-ink/5" />
});

interface MapPanelProps {
  stations: StationWithDistance[];
  center: { lat: number; lng: number };
}

export function MapPanel({ stations, center }: MapPanelProps) {
  return <DynamicMap stations={stations} center={center} />;
}
