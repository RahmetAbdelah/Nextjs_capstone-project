import { notFound, redirect } from "next/navigation";
import { getAllOrders } from "@/lib/order-store";
import { getOrderRevenue } from "@/lib/order-analytics";
import { getSession } from "@/lib/session";
import RevenueChart from "./RevenueChart";

export const dynamic = "force-dynamic";

const DAY_COUNT = 14;

function makeDayKey(date) {
  return date.toISOString().slice(0, 10);
}

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect("/signin?next=%2Fdashboard");
  if (session.role !== "staff") notFound();

  const orders = getAllOrders();
  const revenueByNeighbourhood = new Map();
  const ordersByDay = new Map();
  const today = new Date();

  for (let offset = DAY_COUNT - 1; offset >= 0; offset -= 1) {
    const day = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() - offset));
    ordersByDay.set(makeDayKey(day), 0);
  }

  for (const order of orders) {
    if (order.status === "CANCELLED") continue;

    const neighbourhood = order.neighbourhood?.trim() || "Unspecified";
    const revenue = getOrderRevenue(order.orderDetails);
    revenueByNeighbourhood.set(neighbourhood, (revenueByNeighbourhood.get(neighbourhood) ?? 0) + revenue);

    const day = makeDayKey(new Date(order.createdAt));
    if (ordersByDay.has(day)) ordersByDay.set(day, ordersByDay.get(day) + 1);
  }

  const chartSummary = {
    neighbourhoods: [...revenueByNeighbourhood].map(([name, revenue]) => ({ name, revenue }))
      .sort((first, second) => second.revenue - first.revenue),
    days: [...ordersByDay].map(([date, count]) => ({ date, count })),
    totalRevenue: [...revenueByNeighbourhood.values()].reduce((sum, revenue) => sum + revenue, 0),
    orderCount: [...ordersByDay.values()].reduce((sum, count) => sum + count, 0),
  };

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-12">
      <p className="text-sm font-semibold uppercase tracking-wide text-amber-800">Staff overview</p>
      <h1 className="mt-2 text-3xl font-bold">Restaurant dashboard</h1>
      <p className="mt-2 text-stone-600">A quick look at menu-price revenue and recent orders.</p>

      <section aria-label="Order summary" className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-amber-200 bg-white p-5">
          <h2 className="text-sm font-medium text-stone-600">Estimated revenue</h2>
          <p className="mt-2 text-2xl font-bold">ETB {chartSummary.totalRevenue.toLocaleString()}</p>
        </div>
        <div className="rounded-xl border border-amber-200 bg-white p-5">
          <h2 className="text-sm font-medium text-stone-600">Orders in the last 14 days</h2>
          <p className="mt-2 text-2xl font-bold">{chartSummary.orderCount}</p>
        </div>
      </section>

      <RevenueChart summary={chartSummary} />
      <p className="mt-6 text-sm text-stone-600">
        Revenue is estimated from recognized menu items at current menu prices. Cancelled orders are not counted.
      </p>
    </main>
  );
}