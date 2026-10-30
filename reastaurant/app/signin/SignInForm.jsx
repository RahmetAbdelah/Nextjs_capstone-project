"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signIn } from "@/app/actions";
import AuthField from "@/app/auth/AuthField";

const initialState = { status: "idle", message: "" };
const buttonClass = "w-full rounded-xl bg-amber-800 px-4 py-3 font-semibold text-white transition hover:bg-amber-900 focus:outline-none focus:ring-4 focus:ring-amber-200 disabled:opacity-60";

export default function SignInForm({ nextPath }) {
  const [state, formAction, isPending] = useActionState(signIn, initialState);
  if (!nextPath) {
    return <p className="mt-6 text-sm text-red-700" role="alert">That return destination is not allowed.</p>;
  }

  const createAccountUrl = `/signup?next=${encodeURIComponent(nextPath)}`;
  return (
    <form action={formAction} className="mt-8 grid gap-5">
      <input type="hidden" name="next" value={nextPath} />
      <AuthField id="email" label="Email address" type="email" autoComplete="username" />
      <AuthField id="password" label="Password" type="password" autoComplete="current-password" />
      {state.message && <p className="text-sm text-red-700" role="alert">{state.message}</p>}
      <button className={buttonClass} type="submit" disabled={isPending}>
        {isPending ? "Signing in…" : "Sign in"}
      </button>
      <p className="border-t border-stone-100 pt-5 text-center text-sm text-stone-600">
        New to Addis Eats?{" "}
        <Link className="font-semibold text-amber-900 underline underline-offset-4" href={createAccountUrl}>
          Create an account
        </Link>
      </p>
    </form>
  );
}
