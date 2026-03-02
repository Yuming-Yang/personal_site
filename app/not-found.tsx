import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
      <p className="text-xs tracking-[0.2em] text-slate-500 uppercase">404</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
        Page Not Found
      </h1>
      <p className="mt-3 text-sm text-slate-600">
        The requested page does not exist or has moved.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center rounded-full border border-slate-900 bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
      >
        Back to Home
      </Link>
    </div>
  );
}
