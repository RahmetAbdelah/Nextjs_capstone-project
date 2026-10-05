"use client";

import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export function useCart() {
  const cart = useContext(CartContext);

  if (!cart) {
    throw new Error("useCart must be used inside Providers.");
  }

  return cart;
}

export default function Providers({ children }) {
  const [items, setItems] = useState([]);

  function addItem(dish) {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.slug === dish.slug);

      if (existingItem) {
        return currentItems.map((item) =>
          item.slug === dish.slug ? { ...item, qty: item.qty + 1 } : item,
        );
      }

      return [...currentItems, { ...dish, qty: 1 }];
    });
  }

  function removeItem(slug) {
    setItems((currentItems) => currentItems.filter((item) => item.slug !== slug));
  }

  const cart = useMemo(() => ({ items, addItem, removeItem }), [items]);

  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
}
