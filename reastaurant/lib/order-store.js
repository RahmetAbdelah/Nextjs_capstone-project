import "server-only";

const orders = globalThis.__restaurantOrders ?? new Map();
globalThis.__restaurantOrders = orders;

export function createOrder(details, ownerId = null) {
  const order = {
    id: crypto.randomUUID(),
    ...details,
    ownerId,
    status: "placed",
    createdAt: new Date().toISOString(),
  };

  orders.set(order.id, order);
  return order;
}

export function getOrderById(orderId) {
  return orders.get(orderId) ?? null;
}

export function cancelOrderRecord(orderId) {
  const order = orders.get(orderId);
  if (!order) return null;

  const cancelledOrder = { ...order, status: "cancelled" };
  orders.set(orderId, cancelledOrder);
  return cancelledOrder;
}