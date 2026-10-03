import Link from "next/link";

const cartItems = [
  { name: "Doro Wat", qty: 1, price: 22 },
  { name: "Vegetable Combo", qty: 2, price: 18 },
  { name: "Fresh Injera", qty: 1, price: 7 },
];

export default function CartPage() {
  const subtotal = cartItems.reduce((sum, item) => sum + item.qty * item.price, 0);

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="text-4xl font-black">Your cart</h1>
        <div className="flex gap-3 text-sm font-medium text-stone-700">
          <Link href="/" className="hover:text-stone-950">Home</Link>
          <Link href="/menu" className="hover:text-stone-950">Menu</Link>
          <Link href="/checkout" className="hover:text-stone-950">Checkout</Link>
        </div>
      </div>

      <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-stone-200">
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.name} className="flex items-center justify-between border-b border-stone-200 pb-4 last:border-none last:pb-0">
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-stone-500">Qty: {item.qty}</p>
              </div>
              <p className="font-semibold">${item.qty * item.price}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-stone-200 pt-4 text-lg font-semibold">
          <span>Subtotal</span>
          <span>${subtotal}</span>
        </div>
      </div>
    </main>
  );
}
