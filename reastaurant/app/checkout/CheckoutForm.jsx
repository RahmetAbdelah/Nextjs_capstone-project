"use client";

import { useActionState, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { placeOrder } from "@/app/actions";
import { OrderSchema } from "@/lib/schema";
import { dishes } from "@/lib/dishes";
import { useCart } from "@/app/CartProvider";
import CustomerDetailsFields from "./CustomerDetailsFields";
import OrderDetailsField from "./OrderDetailsField";
import CheckoutMessage from "./CheckoutMessage";

const initialState = { status: "idle", fieldErrors: {} };

export default function CheckoutForm({ submissionId }) {
  const [state, formAction, isPending] = useActionState(placeOrder, initialState);
  const router = useRouter();
  const submissionStarted = useRef(false);
  const [clientErrors, setClientErrors] = useState({});
  const [editedOrderDetails, setEditedOrderDetails] = useState(null);
  const { items } = useCart();
  const fieldErrors = { ...state.fieldErrors, ...clientErrors };
  const cartDetails = useMemo(() => items.map((item) => {
    const dish = dishes.find((menuItem) => menuItem.id === item.dishId);
    return dish ? `${dish.name} × ${item.quantity}` : null;
  }).filter(Boolean).join(", "), [items]);
  const orderDetails = editedOrderDetails ?? cartDetails;

  useEffect(() => {
    if (state.status === "success" && state.orderId) {
      router.push(`/track/${state.orderId}`);
    } else if (state.status === "error" && !isPending) {
      submissionStarted.current = false;
    }
  }, [isPending, router, state.orderId, state.status]);

  function validateBeforeSubmit(event) {
    if (submissionStarted.current) {
      event.preventDefault();
      return;
    }

    const formData = new FormData(event.currentTarget);
    const result = OrderSchema.safeParse(Object.fromEntries(formData));
    if (!result.success) {
      event.preventDefault();
      setClientErrors(result.error.flatten().fieldErrors);
      return;
    }
    submissionStarted.current = true;
    setClientErrors({});
  }

  return (
    <form action={formAction} onSubmit={validateBeforeSubmit} className="checkout-form">
      <input name="submissionId" type="hidden" value={submissionId} />
      <CustomerDetailsFields fieldErrors={fieldErrors} />
      <OrderDetailsField
        errors={fieldErrors.orderDetails}
        onChange={setEditedOrderDetails}
        value={orderDetails}
      />
      <CheckoutMessage state={state} />
      <button
        className="button-primary w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        type="submit"
        disabled={isPending}
      >
        {isPending ? "Placing order…" : "Place order"}
      </button>
    </form>
  );
}
