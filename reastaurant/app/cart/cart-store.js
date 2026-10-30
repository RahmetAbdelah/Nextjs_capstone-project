import { dishes } from "@/lib/dishes";

const CART_STORAGE_KEY = "addis-eats-cart";
const dishIds = new Set(dishes.map((dish) => dish.id));
const emptySnapshot = { items: [], isReady: false };
let cartSnapshot = emptySnapshot;
const subscribers = new Set();

function notifySubscribers() {
  subscribers.forEach((subscriber) => subscriber());
}

export function subscribeToCart(subscriber) {
  subscribers.add(subscriber);
  return () => subscribers.delete(subscriber);
}

export function getCartSnapshot() {
  return cartSnapshot;
}

export function getServerCartSnapshot() {
  return emptySnapshot;
}

export function getCartItems() {
  return cartSnapshot.items;
}

export function saveCartItems(items) {
  cartSnapshot = { ...cartSnapshot, items };
  try {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Keep the current in-memory cart if browser storage is unavailable.
  }
  notifySubscribers();
}

export function initializeCart() {
  if (cartSnapshot.isReady) return;

  let items = [];
  try {
    const savedItems = JSON.parse(window.localStorage.getItem(CART_STORAGE_KEY) ?? "[]");
    if (Array.isArray(savedItems)) {
      items = savedItems.filter((item) =>
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
