"use client";

import { createContext, useContext, useEffect, useMemo, useSyncExternalStore } from "react";
import { addItem, clearCart, removeItem, updateQuantity } from "./cart/cart-actions";
import {
  getCartSnapshot,
  getServerCartSnapshot,
  initializeCart,
  subscribeToCart,
} from "./cart/cart-store";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const cart = useSyncExternalStore(
    subscribeToCart,
    getCartSnapshot,
    getServerCartSnapshot,
  );

  useEffect(() => {
    initializeCart();
  }, []);

  const value = useMemo(
    () => ({ ...cart, addItem, updateQuantity, removeItem, clearCart }),
    [cart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const cart = useContext(CartContext);
  if (!cart) throw new Error("useCart must be used inside CartProvider.");
  return cart;
}
