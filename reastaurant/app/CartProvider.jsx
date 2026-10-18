"use client";

import { createContext, useContext, useEffect, useMemo, useSyncExternalStore } from "react";
import { dishes } from "@/lib/dishes";

const CART_STORAGE_KEY = "addis-eats-cart";
const dishIds = new Set(dishes.map((dish) => dish.id));
const CartContext = createContext(null);
const emptySnapshot = { items: [], isReady: false };
let cartSnapshot = emptySnapshot;
const subscribers = new Set();

function notifySubscribers() {
  subscribers.forEach((subscriber) => subscriber());
}

function subscribe(subscriber) {
  subscribers.add(subscriber);
  return () => subscribers.delete(subscriber);
}

function getSnapshot() {
  return cartSnapshot;
}

function getServerSnapshot() {
  return emptySnapshot;
}

function saveItems(items) {
  cartSnapshot = { ...cartSnapshot, items };
  try {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Keep the current in-memory cart if browser storage is unavailable.
  }
  notifySubscribers();
}

function initializeCart() {
  if (cartSnapshot.isReady) return;

  let items = [];
  try {
    const savedItems = JSON.parse(window.localStorage.getItem(CART_STORAGE_KEY) ?? "[]");
    if (Array.isArray(savedItems)) {
      items = savedItems.filter(
        (item) =>
          item &&
          dishIds.has(item.dishId) &&
          Number.isInteger(item.quantity) &&
          item.quantity > 0 &&
          item.quantity <= 99,
      );
    }
  } catch {
    items = [];
  }

  cartSnapshot = { items, isReady: true };
  notifySubscribers();
}

function addItem(dishId) {
  const existingItem = cartSnapshot.items.find((item) => item.dishId === dishId);
  if (existingItem) {
    saveItems(
      cartSnapshot.items.map((item) =>
        item.dishId === dishId ? { ...item, quantity: Math.min(item.quantity + 1, 99) } : item,
      ),
    );
    return;
  }
  saveItems([...cartSnapshot.items, { dishId, quantity: 1 }]);
}

function updateQuantity(dishId, quantity) {
  if (quantity <= 0) {
    saveItems(cartSnapshot.items.filter((item) => item.dishId !== dishId));
    return;
  }
  saveItems(
    cartSnapshot.items.map((item) =>
      item.dishId === dishId
        ? { ...item, quantity: Math.min(Math.floor(quantity), 99) }
        : item,
    ),
  );
}

function removeItem(dishId) {
  saveItems(cartSnapshot.items.filter((item) => item.dishId !== dishId));
}

function clearCart() {
  saveItems([]);
}

export function CartProvider({ children }) {
  const cart = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    initializeCart();
  }, []);

  const value = useMemo(() => ({ ...cart, addItem, updateQuantity, removeItem, clearCart }), [cart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const cart = useContext(CartContext);
  if (!cart) throw new Error("useCart must be used inside CartProvider.");
  return cart;
}