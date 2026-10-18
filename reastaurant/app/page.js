import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto grid min-h-[65vh] w-full max-w-6xl content-center gap-6 px-6 py-16">
      <p className="font-semibold uppercase tracking-[0.2em] text-amber-800">A taste of Ethiopia</p>
      <h1 className="max-w-3xl text-5xl font-bold leading-tight sm:text-6xl">
        Welcome to Addis Eats
      </h1>
      <p className="max-w-2xl text-lg text-stone-700">
        Discover comforting Ethiopian favourites, prepared with warm spices and shared with care.
      </p>
      <div className="flex flex-wrap gap-4">
        <Link className="rounded bg-amber-800 px-5 py-3 font-semibold text-white" href="/menu">
          Explore the menu
        </Link>
        <Link className="rounded border border-amber-800 px-5 py-3 font-semibold text-amber-900" href="/checkout">
          Place an order
        </Link>
      </div>
    </main>
  );
}
