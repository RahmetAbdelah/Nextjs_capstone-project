import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-xl px-6 py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">404</p>
      <h1 className="mt-4 text-4xl font-black">Dish not found</h1>
      <p className="mt-4 text-stone-600">
        The item you wanted is not on the menu right now.
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <Link href="/menu" className="rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white">
          Back to menu
        </Link>
        <Link href="/" className="rounded-full border border-stone-300 bg-white px-6 py-3 text-sm font-semibold text-stone-900">
          Home
        </Link>
      </div>
    </main>
  );
}
