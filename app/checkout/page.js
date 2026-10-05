import Link from "next/link";
import { cookies } from "next/headers";

// This route is dynamic because cookies() reads request-specific checkout data.
export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
  const cookieStore = await cookies();
  const customerName = cookieStore.get("customer-name")?.value ?? "";

  return (
    <main>
      <h1>Checkout</h1>
      <nav aria-label="Checkout navigation">
        <Link href="/">Home</Link>
        <Link href="/menu">Menu</Link>
        <Link href="/cart">Cart</Link>
      </nav>

      <form>
        <div>
          <label htmlFor="customer-name">Full name</label>
          <input id="customer-name" name="customerName" defaultValue={customerName} />
        </div>
        <div>
          <label htmlFor="delivery-address">Delivery address</label>
          <textarea id="delivery-address" name="deliveryAddress" defaultValue="123 Bole Road, Addis Ababa" rows={4} />
        </div>
        <div>
          <label htmlFor="payment-method">Payment method</label>
          <select id="payment-method" name="paymentMethod">
            <option>Cash on delivery</option>
            <option>Card</option>
            <option>Mobile money</option>
          </select>
        </div>
        <button type="submit">Place order</button>
      </form>
    </main>
  );
}
