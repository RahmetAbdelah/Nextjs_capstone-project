import Link from "next/link";
import CartContents from "./CartContents";

export default function CartPage() {
	return (
		<main className="mx-auto w-full max-w-3xl px-6 py-12">
			<h1 className="text-3xl font-bold">Your cart</h1>
			<CartContents />
			<Link className="mt-6 inline-block font-medium underline" href="/menu">Add another dish</Link>
		</main>
	);
}
