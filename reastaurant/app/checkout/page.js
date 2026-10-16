import CheckoutForm from "./CheckoutForm";

export default function CheckoutPage() {
    return (
        <main className="mx-auto w-full max-w-3xl px-6 py-12">
            <h1 className="text-3xl font-bold">Checkout</h1>
            <p className="mt-2 text-gray-600">Enter your details and the dishes you would like to order.</p>
            <CheckoutForm />
        </main>
    );
}