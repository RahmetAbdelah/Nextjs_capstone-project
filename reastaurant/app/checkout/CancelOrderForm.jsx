"use client";

import { useActionState } from "react";
import { cancelOrder } from "@/app/actions";

const initialState = { status: "idle", message: "" };

export default function CancelOrderForm({ orderId }) {
  const [state, formAction, isPending] = useActionState(
    cancelOrder.bind(null, orderId),
    initialState,
  );

  return (
    <form action={formAction} className="mt-4">
      <button
        className="rounded border border-red-800 px-4 py-2 font-semibold text-red-800 disabled:opacity-60"
        disabled={isPending || state.status === "success"}
        type="submit"
      >
        {isPending ? "Cancelling…" : "Cancel this order"}
      </button>
      {state.message && (
        <p aria-live="polite" className="mt-2 text-sm" role="status">
          {state.message}
        </p>
      )}
    </form>
  );
}