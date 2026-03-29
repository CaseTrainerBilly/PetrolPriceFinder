import { formatPrice } from "@/lib/utils";

const accentMap = {
  accent: "bg-accentSoft text-accent",
  storm: "bg-sky-100 text-storm",
  highlight: "bg-amber-100 text-amber-700"
} as const;

interface PriceCardProps {
  label: string;
  price?: number;
  accent: keyof typeof accentMap;
}

export function PriceCard({ label, price, accent }: PriceCardProps) {
  return (
    <div className="rounded-[24px] border border-border bg-white p-4">
      <div className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${accentMap[accent]}`}>{label}</div>
      <p className="mt-4 text-3xl font-bold text-ink">{formatPrice(price)}</p>
      <p className="mt-1 text-sm text-ink/60">per litre</p>
    </div>
  );
}
