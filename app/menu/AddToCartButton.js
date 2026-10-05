"use client";

import { useCart } from "../Providers";

export default function AddToCartButton({ dish }) {
  const { addItem } = useCart();

  return (
    <button type="button" onClick={() => addItem(dish)}>
      Add to cart
    </button>
  );
}
