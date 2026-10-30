"use server";

import { signIn as signInAction, signOut as signOutAction } from "./actions/auth-actions";
import { cancelOrder as cancelOrderAction } from "./actions/cancel-order";
import { placeOrder as placeOrderAction } from "./actions/place-order";
import { registerAccount as registerAccountAction } from "./actions/register-account";

export async function signIn(previousState, formData) {
  return signInAction(previousState, formData);
}

export async function signOut() {
  return signOutAction();
}

export async function cancelOrder(orderId, previousState, formData) {
  return cancelOrderAction(orderId, previousState, formData);
}

export async function placeOrder(previousState, formData) {
  return placeOrderAction(previousState, formData);
}

export async function registerAccount(previousState, formData) {
  return registerAccountAction(previousState, formData);
}
