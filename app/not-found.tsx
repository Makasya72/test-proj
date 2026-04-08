import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
      <h1 className="text-2xl font-bold">Car not found</h1>
      <p className="mt-2 text-sm text-slate-600">The requested car does not exist in the database.</p>
      <Link href="/cars" className="mt-4 inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
        Back to catalog
      </Link>
    </div>
  );
}
