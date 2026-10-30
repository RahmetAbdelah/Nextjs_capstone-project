"use server";

import { redirect } from "next/navigation";
import { authenticateAccount } from "@/lib/account-store";
import { clearSession, setSession } from "@/lib/session";
import { safeNextPath } from "@/lib/auth-utils";

export async function signIn(_previousState, formData) {
  const destination = safeNextPath(String(formData.get("next") ?? ""));
  if (!destination) return { status: "error", message: "Invalid return destination." };

  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  if (password.length > 128) {
    return { status: "error", message: "Email or password is incorrect." };
  }
  const account = authenticateAccount(email, password);

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
