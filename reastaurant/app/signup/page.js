import AuthCard from "@/app/auth/AuthCard";
import { safeNextPath } from "@/lib/auth-utils";
import SignUpForm from "./SignUpForm";

export default async function SignUpPage({ searchParams }) {
  const params = await searchParams;
  const requested = params?.next;
  const nextPath = typeof requested === "string" ? safeNextPath(requested) : "/menu";

  return (
    <AuthCard
      eyebrow="A seat at our table"
      title="Create your account"
      description="Join Addis Eats to place orders and follow every delivery."
    >
      <SignUpForm nextPath={nextPath} />
    </AuthCard>
  );
}
