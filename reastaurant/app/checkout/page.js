import CheckoutForm from "./CheckoutForm";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
    const session = await getSession();
    if (!session) redirect("/signin?next=%2Fcheckout");

    return (
        <main className="mx-auto w-full max-w-3xl px-6 py-12">
            <h1 className="text-3xl font-bold">Checkout</h1>
            <p className="mt-2 text-gray-600">Enter your details and the dishes you would like to order.</p>
            <CheckoutForm />
        </main>
    );
}