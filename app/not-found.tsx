import Link from "next/link";

export default function NotFound() {
  return (
    <main className="app-shell flex min-h-screen items-center justify-center px-4 py-8">
      <div className="panel max-w-lg p-8 text-center">
        <h1 className="text-3xl font-bold text-ink">Station not found</h1>
        <p className="mt-3 text-ink/70">That station could not be loaded from the current data source.</p>
        <Link href="/" className="button-primary mt-6">
          Return home
        </Link>
      </div>
    </main>
  );
}
