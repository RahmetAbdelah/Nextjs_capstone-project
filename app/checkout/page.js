import Link from "next/link";

export default function CheckoutPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="text-4xl font-black">Checkout</h1>
        <div className="flex gap-3 text-sm font-medium text-stone-700">
          <Link href="/" className="hover:text-stone-950">Home</Link>
          <Link href="/menu" className="hover:text-stone-950">Menu</Link>
          <Link href="/cart" className="hover:text-stone-950">Cart</Link>
        </div>
      </div>

      <form className="mt-8 space-y-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-stone-200">
        <div>
          <label className="mb-2 block text-sm font-medium text-stone-700">Full name</label>
          <input className="w-full rounded-xl border border-stone-300 px-4 py-3" defaultValue="Amina Bekele" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-stone-700">Delivery address</label>
          <textarea className="w-full rounded-xl border border-stone-300 px-4 py-3" defaultValue="123 Bole Road, Addis Ababa" rows={4} />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-stone-700">Payment method</label>
          <select className="w-full rounded-xl border border-stone-300 px-4 py-3">
            <option>Cash on delivery</option>
            <option>Card</option>
            <option>Mobile money</option>
          </select>
        </div>
        <button type="submit" className="rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white">
          Place order
        </button>
      </form>
    </main>
  );
}
