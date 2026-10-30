import Link from "next/link";
import CartContents from "./CartContents";

export default function CartPage() {
	return (
		<main className="page-shell">
			<h1 className="page-heading">Your cart</h1>
			<section className="cart-panel surface-card">
				<CartContents />
			</section>
			<Link className="detail-back-link mt-6 inline-block" href="/menu">Add another dish</Link>
		</main>
	);
}
