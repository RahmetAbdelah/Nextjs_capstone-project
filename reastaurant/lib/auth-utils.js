export function safeNextPath(value) {
  if (
    typeof value !== "string" ||
    !value.startsWith("/") ||
    value.startsWith("//") ||
    value.includes("\\") ||
    /[\u0000-\u001f]/.test(value)
  ) {
    return null;
  }

  try {
    const destination = new URL(value, "https://restaurant.invalid");
    if (destination.origin !== "https://restaurant.invalid") return null;
    return `${destination.pathname}${destination.search}${destination.hash}`;
  } catch {
    return null;
  }
}

export function isOrderOwnedBy(order, userId) {
  return Boolean(order && typeof userId === "string" && order.ownerId === userId);
}

export function filterOrdersForUser(orders, userId) {
  return orders.filter((order) => isOrderOwnedBy(order, userId));
}