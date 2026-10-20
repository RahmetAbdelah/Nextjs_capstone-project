"use client";

import Link from "next/link";

export default function OrdersError({ reset }) {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12" role="alert">
      <h1 className="text-3xl font-bold">We couldn’t load the orders</h1>
      <p className="mt-3 text-stone-600">Something went wrong while opening this page. Try again or return to the orders list.</p>
      <div className="mt-5 flex gap-4">
        <button className="rounded bg-amber-800 px-4 py-2 font-semibold text-white" onClick={reset} type="button">
          Try again
        </button>
        <Link className="rounded border border-amber-300 px-4 py-2" href="/orders">Orders list</Link>
      </div>
    </main>
  );
}