import Link from "next/link";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";

export default function MenuPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="text-4xl font-black">Our menu</h1>
        <div className="flex gap-3 text-sm font-medium text-stone-700">
          <Link href="/" className="hover:text-stone-950">Home</Link>
          <Link href="/cart" className="hover:text-stone-950">Cart</Link>
          <Link href="/checkout" className="hover:text-stone-950">Checkout</Link>
        </div>
      </div>

      <CategoryBar />
      <DishList />
    </main>
  );
}
