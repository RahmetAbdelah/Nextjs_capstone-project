"use server";

import { redirect } from "next/navigation";
import { createCustomerAccount } from "@/lib/account-store";
import { AccountRegistrationSchema } from "@/lib/schema";
import { safeNextPath } from "@/lib/auth-utils";
import { setSession } from "@/lib/session";

export async function registerAccount(_previousState, formData) {
  const destination = safeNextPath(String(formData.get("next") ?? ""));
  if (!destination) return { status: "error", message: "Invalid return destination." };
  if (!process.env.SESSION_SECRET) {
    return { status: "error", message: "Account creation is not configured. Please try again later." };
  }

  const result = AccountRegistrationSchema.safeParse(Object.fromEntries(formData));
  if (!result.success) {
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      fieldErrors: result.error.flatten().fieldErrors,
    };
  }

  const account = createCustomerAccount(result.data);
  if (!account) {
    return {
      status: "error",
      message: "An account with this email already exists. Please sign in instead.",
    };
  }

  await setSession(account);
  redirect(destination);
}
