"use client";

import { useCart } from "../Providers";

export default function CartContents() {
  const { items, removeItem } = useCart();
  const subtotal = items.reduce((total, item) => total + item.qty * item.price, 0);

  if (items.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <section aria-label="Cart items">
      <ul>
        {items.map((item) => (
          <li key={item.slug}>
            <h2>{item.name}</h2>
            <p>Qty: {item.qty}</p>
            <p>${item.qty * item.price}</p>
            <button type="button" onClick={() => removeItem(item.slug)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <p>
        <span>Subtotal</span> <span>${subtotal}</span>
      </p>
    </section>
  );
}
