import CheckoutForm from "./CheckoutForm";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
    const session = await getSession();
    if (!session) redirect("/signin?next=%2Fcheckout");

    return (
        <main className="page-shell">
            <h1 className="page-heading">Checkout</h1>
            <p className="page-description">Enter your details and the dishes you would like to order.</p>
            <section className="checkout-panel surface-card">
                <CheckoutForm submissionId={crypto.randomUUID()} />
            </section>
        </main>
    );
}