import { SearchX } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="panel flex min-h-[260px] flex-col items-center justify-center px-6 py-10 text-center">
      <div className="rounded-full bg-accentSoft p-4">
        <SearchX className="h-7 w-7 text-accent" />
      </div>
      <h3 className="mt-4 text-2xl font-bold text-ink">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-ink/65 sm:text-base">{description}</p>
    </div>
  );
}
