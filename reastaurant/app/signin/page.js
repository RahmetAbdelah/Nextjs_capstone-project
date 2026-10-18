import SignInForm from "./SignInForm";
import { safeNextPath } from "@/lib/auth-utils";

export default async function SignInPage({ searchParams }) {
  const params = await searchParams;
  const requested = params?.next;
  const nextPath = typeof requested === "string" ? safeNextPath(requested) : "/menu";

  return (
    <main className="mx-auto w-full max-w-lg px-6 py-12">
      <h1 className="text-3xl font-bold">Sign in</h1>
      <p className="mt-2 text-stone-600">Sign in to place orders and view your order history.</p>
      <SignInForm nextPath={nextPath} />
    </main>
  );
}