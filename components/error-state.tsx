import { AlertTriangle } from "lucide-react";

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="panel flex min-h-[260px] flex-col items-center justify-center px-6 py-10 text-center">
      <div className="rounded-full bg-red-100 p-4">
        <AlertTriangle className="h-7 w-7 text-danger" />
      </div>
      <h3 className="mt-4 text-2xl font-bold text-ink">Something went wrong</h3>
      <p className="mt-2 max-w-md text-sm text-ink/65 sm:text-base">{message}</p>
      {onRetry ? (
        <button type="button" onClick={onRetry} className="button-primary mt-6">
          Try again
        </button>
      ) : null}
    </div>
  );
}
