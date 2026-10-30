import { getCartItems, saveCartItems } from "./cart-store";

export function addItem(dishId) {
  const items = getCartItems();
  const existingItem = items.find((item) => item.dishId === dishId);
  if (!existingItem) {
    saveCartItems([...items, { dishId, quantity: 1 }]);
    return;
  }

  const updatedItems = items.map((item) => {
    if (item.dishId !== dishId) return item;
    return { ...item, quantity: Math.min(item.quantity + 1, 99) };
  });
  saveCartItems(updatedItems);
}

export function updateQuantity(dishId, quantity) {
  const items = getCartItems();
  if (quantity <= 0) {
    saveCartItems(items.filter((item) => item.dishId !== dishId));
    return;
  }

  const updatedItems = items.map((item) => {
    if (item.dishId !== dishId) return item;
    return { ...item, quantity: Math.min(Math.floor(quantity), 99) };
  });
  saveCartItems(updatedItems);
}

export function removeItem(dishId) {
  const remainingItems = getCartItems().filter((item) => item.dishId !== dishId);
  saveCartItems(remainingItems);
}

export function clearCart() {
  saveCartItems([]);
}
