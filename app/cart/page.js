import Link from "next/link";
import CartContents from "./CartContents";

export default function CartPage() {
  return (
    <main>
      <h1>Your cart</h1>
      <nav aria-label="Cart navigation">
        <Link href="/">Home</Link>
        <Link href="/menu">Menu</Link>
        <Link href="/checkout">Checkout</Link>
      </nav>

      <CartContents />
    </main>
  );
}
