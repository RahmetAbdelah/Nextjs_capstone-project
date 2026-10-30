import Link from "next/link";
import { redirect } from "next/navigation";
import { getOrdersByOwner } from "@/lib/order-store";
import { getAllOrders } from "@/lib/order-store";
import { getSession } from "@/lib/session";
import OrderTable from "./OrderTable";
import { OrderTableSkeleton } from "./loading";
import ExportOrdersButton from "./ExportOrdersButton";

export const dynamic = "force-dynamic";

export default async function OrdersPage({ searchParams }) {
  const session = await getSession();
  if (!session) redirect("/signin?next=%2Forders");

  const params = await searchParams;
  const demo = Array.isArray(params?.demo) ? params.demo[0] : params?.demo;
  if (demo === "error") throw new Error("Requested order-page error-state preview.");
  const orders = demo === "empty"
    ? []
    : session.role === "staff"
      ? getAllOrders()
      : getOrdersByOwner(session.userId);

  return (
    <main className="page-shell">
      <h1 className="page-heading">{session.role === "staff" ? "All orders" : "Your orders"}</h1>
      <div className="orders-toolbar">
        <ExportOrdersButton orders={orders} />
      </div>
      {session.role === "staff" && (
        <nav aria-label="Order state previews" className="mt-4 flex flex-wrap gap-3 text-sm">
          <span className="text-stone-600">Preview a state:</span>
          <Link className="text-amber-900 underline" href="/orders?demo=loading">Loading</Link>
          <Link className="text-amber-900 underline" href="/orders?demo=empty">Empty</Link>
          <Link className="text-amber-900 underline" href="/orders?demo=error">Error</Link>
          <Link className="text-amber-900 underline" href="/orders">Normal table</Link>
        </nav>
      )}
      {demo === "loading" ? <OrderTableSkeleton /> : <OrderTable orders={orders} searchParams={searchParams} />}
    </main>
  );
}