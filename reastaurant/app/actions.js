"use server";

import { revalidatePath } from "next/cache";
import { OrderSchema } from "@/lib/schema";
import { cancelOrderRecord, createOrder, getOrderById } from "@/lib/order-store";
import { getSession } from "@/lib/session";

export async function placeOrder(_previousState, formData) {
  const result = OrderSchema.safeParse(Object.fromEntries(formData));
  if (!result.success) {
    return {
      status: "error",
      message: "Please correct the highlighted fields.",
      fieldErrors: result.error.flatten().fieldErrors,
    };
  }

  const session = await getSession();
  const order = createOrder(result.data, session?.userId ?? null);

  revalidatePath("/checkout");
  revalidatePath("/cart");

  return {
    status: "success",
    message: "Your order has been placed.",
    orderId: order.id,
  };
}

export async function cancelOrder(orderId) {
  const session = await getSession();
  if (!session) {
    return { status: "error", message: "Sign in to cancel this order." };
  }

  const order = getOrderById(orderId);
  if (!order || order.ownerId !== session.userId) {
    return { status: "error", message: "Order not found or you are not authorised to cancel it." };
  }

  if (order.status === "cancelled") {
    return { status: "error", message: "This order has already been cancelled." };
  }

  cancelOrderRecord(orderId);
  revalidatePath("/checkout");
  revalidatePath("/cart");

  return { status: "success", message: "Your order has been cancelled." };
}