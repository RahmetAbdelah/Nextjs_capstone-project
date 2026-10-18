
"use client";

import Link from "next/link";
import { dishes } from "@/lib/dishes";
import { useCart } from "@/app/CartProvider";

const dishById = new Map(dishes.map((dish) => [dish.id, dish]));

export default function CartContents() {
  const { items, isReady, updateQuantity, removeItem } = useCart();

  if (!isReady) {
    return (
      <div className="mt-4" aria-live="polite">
        <p>Loading your cart…</p>
        <noscript>
          <p className="mt-2 text-stone-600">
            Cart controls need JavaScript. You can still enter your order by hand at checkout.
          </p>
        </noscript>
      </div>
    );
  }

  const cartItems = items
    .map((item) => ({ ...item, dish: dishById.get(item.dishId) }))
    .filter((item) => item.dish);

  if (cartItems.length === 0) {
    return (
      <div className="mt-4">
        <p className="text-stone-600">Your cart is empty. Start by choosing a dish from our menu.</p>
        <Link className="mt-4 inline-block font-semibold underline" href="/menu">Browse the menu</Link>
      </div>
    );
  }

  const total = cartItems.reduce((sum, item) => sum + item.dish.price * item.quantity, 0);

  return (
    <>
      <ul className="mt-6 divide-y divide-amber-200">
        {cartItems.map(({ dish, quantity }) => (
          <li className="flex flex-wrap items-center justify-between gap-4 py-4" key={dish.id}>
            <div>
              <h2 className="font-semibold">{dish.name}</h2>
              <p className="text-sm text-stone-600">{dish.currency} {dish.price.toFixed(2)} each</p>
            </div>
            <label className="flex items-center gap-2">
              <span>Quantity</span>
              <input
                aria-label={`${dish.name} quantity`}
                className="w-20 rounded border border-stone-300 px-2 py-1"
                max={99}
                min={0}
                onChange={(event) => updateQuantity(dish.id, Number(event.target.value))}
                type="number"
                value={quantity}
              />
            </label>
            <button
              className="text-sm font-medium text-red-800 underline"
              onClick={() => removeItem(dish.id)}
              type="button"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-right text-lg font-bold">Total: ETB {total.toFixed(2)}</p>
      <Link className="mt-5 inline-block rounded bg-amber-800 px-5 py-3 font-semibold text-white" href="/checkout">
        Continue to checkout
      </Link>
    </>
  );
}