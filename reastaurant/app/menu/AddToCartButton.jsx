"use client";

import { useCart } from "@/app/CartProvider";

export default function AddToCartButton({ dishId }) {
  const { addItem, isReady } = useCart();

  return (
    <button
      className="button-primary mt-5 disabled:cursor-not-allowed disabled:opacity-60"
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