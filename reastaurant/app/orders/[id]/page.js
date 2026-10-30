import Link from "next/link";
import { notFound } from "next/navigation";
import { getOrderById } from "@/lib/order-store";
import { isOrderOwnedBy } from "@/lib/auth-utils";
import { getSession } from "@/lib/session";
import OrderStatus from "./OrderStatus";

export const dynamic = "force-dynamic";

export default async function OrderPage({ params }) {
  const session = await getSession();
  if (!session) notFound();

  const { id } = await params;
  const order = getOrderById(id);
  if (!isOrderOwnedBy(order, session.userId)) notFound();

  const initialOrder = {
    id: order.id,
    status: order.status,
    createdAt: order.createdAt,
  };

  return (
    <main className="page-shell">
      <h1 className="page-heading">Order status</h1>
      <p className="mt-2 text-stone-600">Your order was received. You can keep this page open for updates.</p>
      <OrderStatus orderId={id} initialOrder={initialOrder} />
      <Link className="detail-back-link mt-5 inline-block" href={`/track/${encodeURIComponent(id)}`}>
        Track delivery on a map
      </Link>
      <Link className="detail-back-link mt-5 block" href="/menu">
        Back to the menu
      </Link>
    </main>
  );
}