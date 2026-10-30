"use server";

import { revalidatePath } from "next/cache";
import { OrderSchema } from "@/lib/schema";
import { createOrder } from "@/lib/order-store";
import { getSession } from "@/lib/session";

function refreshOrderPages() {
  revalidatePath("/checkout");
  revalidatePath("/cart");
  revalidatePath("/orders");
  revalidatePath("/dashboard");
}

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
  if (!session) return { status: "error", message: "Sign in before placing an order." };

  const submissionId = formData.get("submissionId");
  if (typeof submissionId !== "string" || !/^[\da-f-]{36}$/i.test(submissionId)) {
    return { status: "error", message: "This checkout session expired. Please try again." };
  }

  const order = createOrder(result.data, session.userId, submissionId);
  refreshOrderPages();
  return {
    status: "success",
    message: "Your order has been placed.",
    orderId: order.id,
  };
}
