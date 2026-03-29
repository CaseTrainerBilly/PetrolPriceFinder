export function LoadingState() {
  return (
    <div className="panel flex min-h-[260px] flex-col justify-center px-6 py-8">
      <div className="h-5 w-32 animate-pulse rounded-full bg-ink/10" />
      <div className="mt-6 space-y-4">
        {[0, 1, 2].map((item) => (
          <div key={item} className="rounded-[24px] border border-border bg-white p-5">
            <div className="h-5 w-48 animate-pulse rounded-full bg-ink/10" />
            <div className="mt-3 h-4 w-64 animate-pulse rounded-full bg-ink/10" />
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[0, 1, 2].map((price) => (
                <div key={price} className="h-20 animate-pulse rounded-2xl bg-ink/5" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
