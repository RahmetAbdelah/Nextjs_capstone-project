import AuthCard from "@/app/auth/AuthCard";
import SignInForm from "./SignInForm";
import { safeNextPath } from "@/lib/auth-utils";

export default async function SignInPage({ searchParams }) {
  const params = await searchParams;
  const requested = params?.next;
  const nextPath = typeof requested === "string" ? safeNextPath(requested) : "/menu";

  return (
    <AuthCard
      eyebrow="Welcome back"
      title="Sign in"
      description="Sign in to place orders and view your order history."
    >
      <SignInForm nextPath={nextPath} />
    </AuthCard>
  );
}