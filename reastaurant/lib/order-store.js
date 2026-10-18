import "server-only";
import { filterOrdersForUser, isOrderOwnedBy } from "@/lib/auth-utils";

const orders = globalThis.__restaurantOrders ?? new Map();
globalThis.__restaurantOrders = orders;

export function createOrder(details, ownerId) {
  if (typeof ownerId !== "string" || !ownerId) {
    throw new Error("An authenticated owner is required to create an order.");
  }

  const order = {
    id: crypto.randomUUID(),
    ...details,
    ownerId,
    status: "PENDING",
    createdAt: new Date().toISOString(),
  };

  orders.set(order.id, order);
  return order;
}

export function getOrderById(orderId) {
  return orders.get(orderId) ?? null;
}

export function getOrdersByOwner(ownerId) {
  return filterOrdersForUser([...orders.values()], ownerId);
}

export function getAllOrders() {
  return [...orders.values()];
}

export function cancelOrderRecord(orderId, ownerId) {
  const order = orders.get(orderId);
  if (!isOrderOwnedBy(order, ownerId)) return null;

  const cancelledOrder = { ...order, status: "CANCELLED" };
  orders.set(orderId, cancelledOrder);
  return cancelledOrder;
}