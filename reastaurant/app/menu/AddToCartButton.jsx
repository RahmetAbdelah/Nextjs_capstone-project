"use client";

import { useCart } from "@/app/CartProvider";

export default function AddToCartButton({ dishId }) {
  const { addItem, isReady } = useCart();

  return (
    <button
      className="mt-4 rounded bg-amber-800 px-4 py-2 font-semibold text-white disabled:opacity-60"
      disabled={!isReady}
      onClick={() => addItem(dishId)}
      type="button"
    >
      Add to cart
      <noscript>
        <span className="sr-only">Turn on JavaScript to add dishes to your cart.</span>
      </noscript>
    </button>
  );
}