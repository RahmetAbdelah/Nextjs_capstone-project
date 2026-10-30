"use server";

import { revalidatePath } from "next/cache";
import { cancelOrderRecord, getOrderById } from "@/lib/order-store";
import { getSession } from "@/lib/session";
import { isOrderOwnedBy } from "@/lib/auth-utils";

function refreshOrderPages() {
  revalidatePath("/checkout");
  revalidatePath("/cart");
  revalidatePath("/orders");
  revalidatePath("/dashboard");
}

export async function cancelOrder(orderId, _previousState, _formData) {
  const session = await getSession();
  if (!session) {
    return { status: "error", message: "Sign in to cancel this order." };
  }

  const order = getOrderById(orderId);
  if (!isOrderOwnedBy(order, session.userId)) {
    return { status: "error", message: "Order not found or you are not authorised to cancel it." };
  }
  if (order.status === "CANCELLED") {
    return { status: "error", message: "This order has already been cancelled." };
  }
  if (!cancelOrderRecord(orderId, session.userId)) {
    return { status: "error", message: "Order not found or you are not authorised to cancel it." };
  }

  refreshOrderPages();
  return { status: "success", message: "Your order has been cancelled." };
}
