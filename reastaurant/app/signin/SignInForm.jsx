"use client";

import { useActionState } from "react";
import { signIn } from "@/app/actions";

const initialState = { status: "idle", message: "" };

export default function SignInForm({ nextPath }) {
  const [state, formAction, isPending] = useActionState(signIn, initialState);

  if (!nextPath) {
    return <p className="mt-6 text-sm text-red-700" role="alert">That return destination is not allowed.</p>;
  }

  return (
    <form action={formAction} className="mt-8 grid gap-5">
      <input type="hidden" name="next" value={nextPath} />
      <div>
        <label className="block font-medium" htmlFor="email">Email</label>
        <input className="mt-1 w-full rounded border border-gray-300 px-3 py-2" id="email" name="email" type="email" autoComplete="username" required />
      </div>
      <div>
        <label className="block font-medium" htmlFor="password">Password</label>
        <input className="mt-1 w-full rounded border border-gray-300 px-3 py-2" id="password" name="password" type="password" autoComplete="current-password" required />
      </div>
      {state.message && <p className="text-sm text-red-700" role="alert">{state.message}</p>}
      <button className="rounded bg-black px-4 py-3 font-semibold text-white disabled:opacity-60" type="submit" disabled={isPending}>
        {isPending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}