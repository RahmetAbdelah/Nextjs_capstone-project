import Link from "next/link";
import { redirect } from "next/navigation";
import { getOrdersByOwner } from "@/lib/order-store";
import { getAllOrders } from "@/lib/order-store";
import { getSession } from "@/lib/session";
import OrderTable from "./OrderTable";
import { OrderTableSkeleton } from "./loading";

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
    <main className="mx-auto w-full max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold">{session.role === "staff" ? "All orders" : "Your orders"}</h1>
      {session.role === "staff" && (
        <nav aria-label="Order state previews" className="mt-4 flex flex-wrap gap-3 text-sm">
          <span className="text-stone-600">Preview a state:</span>
          <Link className="underline" href="/orders?demo=loading">Loading</Link>
          <Link className="underline" href="/orders?demo=empty">Empty</Link>
          <Link className="underline" href="/orders?demo=error">Error</Link>
          <Link className="underline" href="/orders">Normal table</Link>
        </nav>
      )}
      {demo === "loading" ? <OrderTableSkeleton /> : <OrderTable orders={orders} searchParams={searchParams} />}
    </main>
  );
}