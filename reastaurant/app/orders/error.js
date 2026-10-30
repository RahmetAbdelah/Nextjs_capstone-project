"use client";

import Link from "next/link";

export default function OrdersError({ reset }) {
  return (
    <main className="page-shell" role="alert">
      <p className="section-eyebrow">A small hiccup</p>
      <h1 className="page-heading">We couldn’t load the orders</h1>
      <p className="mt-3 text-stone-600">Something went wrong while opening this page. Try again or return to the orders list.</p>
      <div className="mt-5 flex gap-4">
        <button className="button-primary" onClick={reset} type="button">
          Try again
        </button>
        <Link className="button-secondary" href="/orders">Orders list</Link>
      </div>
    </main>
  );
}