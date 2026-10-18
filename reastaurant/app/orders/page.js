import Link from "next/link";
import { redirect } from "next/navigation";
import { getOrdersByOwner } from "@/lib/order-store";
import { getSession } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function OrdersPage() {
  const session = await getSession();
  if (!session) redirect("/signin?next=%2Forders");

  const orders = getOrdersByOwner(session.userId);
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold">Your orders</h1>
      {orders.length === 0 ? (
        <p className="mt-4 text-stone-600">You have not placed any orders yet.</p>
      ) : (
        <ul className="mt-6 grid gap-4">
          {orders.map((order) => (
            <li className="rounded-lg border border-amber-200 bg-white p-5" key={order.id}>
              <Link className="font-semibold underline" href={`/orders/${encodeURIComponent(order.id)}`}>
                Order {order.id}
              </Link>
              <p className="mt-2 text-sm text-stone-600">Status: {order.status}</p>
              <p className="text-sm text-stone-600">Placed: {new Date(order.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}