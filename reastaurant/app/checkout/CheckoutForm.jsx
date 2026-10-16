"use client";

import { useActionState } from "react";
import { useState } from "react";
import { placeOrder } from "@/app/actions";
import { OrderSchema } from "@/lib/schema";

const initialState = { status: "idle", fieldErrors: {} };

function FieldError({ errors }) {
  if (!errors?.length) return null;
  return <p className="mt-1 text-sm text-red-700">{errors[0]}</p>;
}

export default function CheckoutForm() {
  const [state, formAction, isPending] = useActionState(placeOrder, initialState);
  const [clientErrors, setClientErrors] = useState({});
  const fieldErrors = { ...state.fieldErrors, ...clientErrors };

  function validateBeforeSubmit(event) {
    const result = OrderSchema.safeParse(Object.fromEntries(new FormData(event.currentTarget)));
    if (!result.success) {
      event.preventDefault();
      setClientErrors(result.error.flatten().fieldErrors);
      return;
    }

    setClientErrors({});
  }

  return (
    <form action={formAction} onSubmit={validateBeforeSubmit} className="mt-8 grid max-w-xl gap-5">
      <div>
        <label className="block font-medium" htmlFor="customerName">Name</label>
        <input
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
          id="customerName"
          name="customerName"
          autoComplete="name"
          required
          aria-invalid={Boolean(fieldErrors.customerName?.length)}
          aria-describedby="customerName-error"
        />
        <div id="customerName-error"><FieldError errors={fieldErrors.customerName} /></div>
      </div>

      <div>
        <label className="block font-medium" htmlFor="email">Email</label>
        <input
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-invalid={Boolean(fieldErrors.email?.length)}
          aria-describedby="email-error"
        />
        <div id="email-error"><FieldError errors={fieldErrors.email} /></div>
      </div>

      <div>
        <label className="block font-medium" htmlFor="deliveryAddress">Delivery address</label>
        <textarea
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
          id="deliveryAddress"
          name="deliveryAddress"
          autoComplete="street-address"
          rows={3}
          required
          aria-invalid={Boolean(fieldErrors.deliveryAddress?.length)}
          aria-describedby="deliveryAddress-error"
        />
        <div id="deliveryAddress-error"><FieldError errors={fieldErrors.deliveryAddress} /></div>
      </div>

      <div>
        <label className="block font-medium" htmlFor="orderDetails">Order details</label>
        <textarea
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
          id="orderDetails"
          name="orderDetails"
          placeholder="For example: Doro Wot × 2, Kitfo × 1"
          rows={3}
          required
          aria-invalid={Boolean(fieldErrors.orderDetails?.length)}
          aria-describedby="orderDetails-error"
        />
        <div id="orderDetails-error"><FieldError errors={fieldErrors.orderDetails} /></div>
      </div>

      {state.message && (
        <p aria-live="polite" className={state.status === "success" ? "text-green-800" : "text-red-700"}>
          {state.message}{state.orderId ? ` Order reference: ${state.orderId}` : ""}
        </p>
      )}

      <button
        className="rounded bg-black px-4 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
        type="submit"
        disabled={isPending}
      >
        {isPending ? "Placing order…" : "Place order"}
      </button>
    </form>
  );
}