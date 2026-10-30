import "server-only";
import { filterOrdersForUser, isOrderOwnedBy } from "@/lib/auth-utils";

const orders = globalThis.__restaurantOrders ?? new Map();
globalThis.__restaurantOrders = orders;
const orderKeys = globalThis.__restaurantOrderKeys ?? new Map();
globalThis.__restaurantOrderKeys = orderKeys;

export function createOrder(details, ownerId, idempotencyKey) {
  if (typeof ownerId !== "string" || !ownerId) {
    throw new Error("An authenticated owner is required to create an order.");
  }

  const requestKey = idempotencyKey ? `${ownerId}:${idempotencyKey}` : null;
  if (requestKey && orderKeys.has(requestKey)) return orderKeys.get(requestKey);

  const order = {
    id: crypto.randomUUID(),
    ...details,
    ownerId,
    status: "PENDING",
    createdAt: new Date().toISOString(),
  };

  orders.set(order.id, order);
  if (requestKey) orderKeys.set(requestKey, order);
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