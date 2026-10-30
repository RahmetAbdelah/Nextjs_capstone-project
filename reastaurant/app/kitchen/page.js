import { notFound, redirect } from "next/navigation";
import { getAllOrders } from "@/lib/order-store";
import { getSession } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function KitchenPage() {
  const session = await getSession();
  if (!session) redirect("/signin?next=%2Fkitchen");
  if (session.role !== "staff") notFound();

  const orders = getAllOrders();
  return (
    <main className="page-shell">
      <h1 className="page-heading">Kitchen orders</h1>
      {orders.length === 0 ? (
        <p className="empty-state">There are no orders in the queue.</p>
      ) : (
        <ul className="mt-6 grid gap-4">
          {orders.map((order) => (
            <li className="kitchen-card" key={order.id}>
              <p className="font-semibold text-stone-900">{order.customerName} · {order.status}</p>
              <p className="mt-2 text-sm">{order.orderDetails}</p>
              <p className="mt-1 text-sm text-stone-600">{order.deliveryAddress}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}