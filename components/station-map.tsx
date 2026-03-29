"use client";

import "leaflet/dist/leaflet.css";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { divIcon } from "leaflet";

import { StationWithDistance } from "@/lib/types";

const stationIcon = divIcon({
  className: "",
  html: `<div style="display:flex;align-items:center;justify-content:center;width:18px;height:18px;border-radius:9999px;background:#196f3d;border:3px solid white;box-shadow:0 8px 18px rgba(18,33,23,.18)"></div>`,
  iconSize: [18, 18],
  iconAnchor: [9, 9]
});

const userIcon = divIcon({
  className: "",
  html: `<div style="display:flex;align-items:center;justify-content:center;width:18px;height:18px;border-radius:9999px;background:#ffb703;border:3px solid #122117;box-shadow:0 8px 18px rgba(18,33,23,.18)"></div>`,
  iconSize: [18, 18],
  iconAnchor: [9, 9]
});

interface StationMapProps {
  stations: StationWithDistance[];
  center: { lat: number; lng: number };
}

export function StationMap({ stations, center }: StationMapProps) {
  return (
    <div className="h-[420px] overflow-hidden rounded-[28px] border border-border">
      <MapContainer center={[center.lat, center.lng]} zoom={13} scrollWheelZoom className="z-0">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[center.lat, center.lng]} icon={userIcon}>
          <Popup>Your search location</Popup>
        </Marker>
        {stations.map((station) => (
          <Marker key={station.id} position={[station.coordinates.lat, station.coordinates.lng]} icon={stationIcon}>
            <Popup>
              <div className="space-y-1">
                <p className="font-semibold">{station.name}</p>
                <p>{station.address}</p>
                <p>Unleaded {station.prices.unleaded.toFixed(1)}p</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
