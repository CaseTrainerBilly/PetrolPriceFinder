import { PetrolStation } from "@/lib/types";

export const mockStations: PetrolStation[] = [
  {
    id: "shell-deansgate",
    name: "Shell Deansgate",
    brand: "Shell",
    address: "45 Deansgate, Manchester M3 2AY",
    coordinates: { lat: 53.4815, lng: -2.2483 },
    prices: { unleaded: 142.9, diesel: 149.9, premium: 156.9 },
    updatedAt: "2026-03-28T08:10:00.000Z",
    amenities: ["Pay at pump", "Coffee", "Car wash"]
  },
  {
    id: "bp-oxford-road",
    name: "bp Oxford Road",
    brand: "bp",
    address: "121 Oxford Road, Manchester M1 7DU",
    coordinates: { lat: 53.4725, lng: -2.2418 },
    prices: { unleaded: 141.7, diesel: 148.2, premium: 154.4 },
    updatedAt: "2026-03-28T07:48:00.000Z",
    amenities: ["Convenience store", "Air & water"]
  },
  {
    id: "esso-salford",
    name: "Esso Regent Retail Park",
    brand: "Esso",
    address: "100 Regent Road, Salford M5 4QU",
    coordinates: { lat: 53.4788, lng: -2.2755 },
    prices: { unleaded: 139.9, diesel: 147.5 },
    updatedAt: "2026-03-28T06:52:00.000Z",
    amenities: ["Tesco Express", "ATM"]
  },
  {
    id: "texaco-trafford",
    name: "Texaco Trafford Park",
    brand: "Texaco",
    address: "7 Trafford Wharf Road, Stretford M17 1EX",
    coordinates: { lat: 53.4682, lng: -2.2928 },
    prices: { unleaded: 140.5, diesel: 146.9, premium: 152.9 },
    updatedAt: "2026-03-28T09:03:00.000Z",
    amenities: ["24/7", "Jet wash"]
  },
  {
    id: "shell-kings-cross",
    name: "Shell York Way",
    brand: "Shell",
    address: "251 York Way, London N7 9QF",
    coordinates: { lat: 51.5434, lng: -0.1191 },
    prices: { unleaded: 146.9, diesel: 153.9, premium: 160.9 },
    updatedAt: "2026-03-28T08:42:00.000Z",
    amenities: ["Coffee", "Toilets", "Car wash"]
  },
  {
    id: "bp-birmingham",
    name: "bp Five Ways",
    brand: "bp",
    address: "77 Hagley Road, Birmingham B16 8LU",
    coordinates: { lat: 52.4779, lng: -1.9157 },
    prices: { unleaded: 143.4, diesel: 149.1, premium: 157.2 },
    updatedAt: "2026-03-28T09:20:00.000Z",
    amenities: ["M&S Food", "Air & water"]
  },
  {
    id: "morrisons-leeds",
    name: "Morrisons Leeds Merrion",
    brand: "Morrisons",
    address: "43 Woodhouse Lane, Leeds LS2 8LX",
    coordinates: { lat: 53.8067, lng: -1.5482 },
    prices: { unleaded: 138.9, diesel: 145.9, premium: 151.4 },
    updatedAt: "2026-03-28T08:58:00.000Z",
    amenities: ["Supermarket", "Pay at pump"]
  },
  {
    id: "tesco-bristol",
    name: "Tesco Bristol East",
    brand: "Tesco",
    address: "126 Church Road, Bristol BS5 9HH",
    coordinates: { lat: 51.4551, lng: -2.5657 },
    prices: { unleaded: 140.2, diesel: 147.2 },
    updatedAt: "2026-03-28T07:32:00.000Z",
    amenities: ["Supermarket", "ATM", "Air & water"]
  }
];
