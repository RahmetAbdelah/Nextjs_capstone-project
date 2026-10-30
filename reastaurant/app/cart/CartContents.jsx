
"use client";

import Link from "next/link";
import { dishes } from "@/lib/dishes";
import { useCart } from "@/app/CartProvider";
import CartItem from "./CartItem";

const dishById = new Map(dishes.map((dish) => [dish.id, dish]));

export default function CartContents() {
  const { items, isReady, updateQuantity, removeItem } = useCart();

  if (!isReady) {
    return (
      <div className="empty-state" aria-live="polite">
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
      <div className="empty-state">
        <p className="text-stone-600">Your cart is empty. Start by choosing a dish from our menu.</p>
        <Link className="button-primary mt-5" href="/menu">Browse the menu</Link>
      </div>
    );
  }

  const total = cartItems.reduce((sum, item) => sum + item.dish.price * item.quantity, 0);

  return (
    <>
      <ul className="cart-list">
        {cartItems.map(({ dish, quantity }) => (
          <CartItem
            dish={dish}
            key={dish.id}
            onQuantityChange={(nextQuantity) => updateQuantity(dish.id, nextQuantity)}
            onRemove={() => removeItem(dish.id)}
            quantity={quantity}
          />
        ))}
      </ul>
      <p className="mt-5 text-right text-xl font-bold">Total: ETB {total.toFixed(2)}</p>
      <Link className="button-primary mt-5" href="/checkout">
        Continue to checkout
      </Link>
    </>
  );
}