"use server";

import { createHash, timingSafeEqual } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { OrderSchema } from "@/lib/schema";
import { cancelOrderRecord, createOrder, getOrderById } from "@/lib/order-store";
import { clearSession, getSession, setSession } from "@/lib/session";
import { isOrderOwnedBy, safeNextPath } from "@/lib/auth-utils";

function sameSecret(left, right) {
  if (typeof left !== "string" || typeof right !== "string") return false;
  const leftHash = createHash("sha256").update(left).digest();
  const rightHash = createHash("sha256").update(right).digest();
  return timingSafeEqual(leftHash, rightHash);
}

export async function signIn(_previousState, formData) {
  const destination = safeNextPath(String(formData.get("next") ?? ""));
  if (!destination) return { status: "error", message: "Invalid return destination." };

  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const accounts = [
    {
      email: process.env.CUSTOMER_EMAIL,
      password: process.env.CUSTOMER_PASSWORD,
      userId: process.env.CUSTOMER_USER_ID || "demo-customer",
      role: "customer",
    },
    {
      email: process.env.STAFF_EMAIL,
      password: process.env.STAFF_PASSWORD,
      userId: process.env.STAFF_USER_ID || "demo-staff",
      role: "staff",
    },
  ];
  const account = accounts.find((candidate) =>
    sameSecret(candidate.email?.trim().toLowerCase(), email) &&
    sameSecret(candidate.password, password) &&
    candidate.email && candidate.password,
  );

  if (!account || !process.env.SESSION_SECRET) {
    return { status: "error", message: "Email or password is incorrect." };
  }

  await setSession({ userId: account.userId, role: account.role });
  redirect(destination);
}

export async function signOut() {
  await clearSession();
  redirect("/");
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
  const order = createOrder(result.data, session.userId);

  revalidatePath("/checkout");
  revalidatePath("/cart");
  revalidatePath("/orders");
  revalidatePath("/dashboard");

  return {
    status: "success",
    message: "Your order has been placed.",
    orderId: order.id,
  };
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
  revalidatePath("/checkout");
  revalidatePath("/cart");
  revalidatePath("/orders");
  revalidatePath("/dashboard");

  return { status: "success", message: "Your order has been cancelled." };
}