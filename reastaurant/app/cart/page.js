import Link from "next/link";

export default function CartPage() {
	return (
		<main className="mx-auto w-full max-w-3xl px-6 py-12">
			<h1 className="text-3xl font-bold">Your cart</h1>
			<p className="mt-3 text-gray-600">
				Your cart is empty. Browse the menu to choose dishes, then enter your order at checkout.
			</p>
			<div className="mt-6 flex gap-4">
				<Link className="font-medium underline" href="/menu">Browse menu</Link>
				<Link className="font-medium underline" href="/checkout">Go to checkout</Link>
			</div>
		</main>
	);
}
