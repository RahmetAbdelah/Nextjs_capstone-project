import Link from "next/link";
import { getOrderRevenue } from "@/lib/order-analytics";
import { etb, when } from "@/lib/format";

const PAGE_SIZE = 10;
const SORT_FIELDS = new Set(["createdAt", "customerName", "neighbourhood", "status", "revenue"]);

function queryValue(value) {
  return Array.isArray(value) ? value[0] : value;
}

function orderLink(page, sort, direction) {
  const query = new URLSearchParams({ page: String(page), sort, direction });
  return `/orders?${query.toString()}`;
}

export default async function OrderTable({ orders, searchParams }) {
  const params = await searchParams;
  const requestedSort = queryValue(params?.sort);
  const sort = SORT_FIELDS.has(requestedSort) ? requestedSort : "createdAt";
  const direction = queryValue(params?.direction) === "asc" ? "asc" : "desc";
  const requestedPage = Number.parseInt(queryValue(params?.page) ?? "1", 10);
  const totalPages = Math.max(1, Math.ceil(orders.length / PAGE_SIZE));
  const page = Number.isFinite(requestedPage) ? Math.min(Math.max(requestedPage, 1), totalPages) : 1;
  const sortedOrders = [...orders].sort((first, second) => {
    const firstValue = sort === "revenue" ? getOrderRevenue(first.orderDetails) : first[sort] ?? "";
    const secondValue = sort === "revenue" ? getOrderRevenue(second.orderDetails) : second[sort] ?? "";
    const comparison = typeof firstValue === "number"
      ? firstValue - secondValue
      : String(firstValue).localeCompare(String(secondValue));
    return comparison * (direction === "asc" ? 1 : -1);
  });
  const visibleOrders = sortedOrders.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const headers = [
    ["customerName", "Customer"],
    ["neighbourhood", "Neighbourhood"],
    ["revenue", "Est. revenue"],
    ["status", "Status"],
    ["createdAt", "Order date"],
  ];

  function sortLink(field) {
    const nextDirection = sort === field && direction === "asc" ? "desc" : "asc";
    return orderLink(1, field, nextDirection);
  }

  return (
    <>
      {orders.length === 0 ? (
        <p className="mt-6 rounded-lg border border-amber-200 bg-white p-6 text-stone-700">
          There are no orders to show yet. Place an order to see it appear here.
        </p>
      ) : (
        <>
          <p className="mt-5 text-sm text-stone-600">
            Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, orders.length)} of {orders.length} orders.
          </p>
          <div className="mt-3 overflow-x-auto rounded-lg border border-amber-200 bg-white">
            <table className="w-full border-collapse text-left text-sm">
              <caption className="sr-only">Orders, sorted by {sort} in {direction === "asc" ? "ascending" : "descending"} order</caption>
              <thead className="bg-amber-100">
                <tr>
                  <th className="px-4 py-3" scope="col">Order</th>
                  {headers.map(([field, label]) => (
                    <th
                      className="px-4 py-3"
                      key={field}
                      scope="col"
                      aria-sort={sort === field ? (direction === "asc" ? "ascending" : "descending") : "none"}
                    >
                      <Link className="font-semibold underline underline-offset-2" href={sortLink(field)}>
                        {label}{sort === field ? (direction === "asc" ? " ↑" : " ↓") : ""}
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visibleOrders.map((order) => (
                  <tr className="border-t border-amber-100" key={order.id}>
                    <th className="px-4 py-3 font-mono font-medium" scope="row">{order.id.slice(0, 8)}</th>
                    <td className="px-4 py-3">{order.customerName}</td>
                    <td className="px-4 py-3">{order.neighbourhood || "Unspecified"}</td>
                    <td className="px-4 py-3">{etb(getOrderRevenue(order.orderDetails))}</td>
                    <td className="px-4 py-3">{order.status}</td>
                    <td className="px-4 py-3">{when(order.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <nav aria-label="Order table pages" className="mt-5 flex items-center justify-between gap-4">
            <Link
              aria-disabled={page <= 1}
              className={`rounded border border-amber-300 px-4 py-2 ${page <= 1 ? "pointer-events-none opacity-50" : "hover:bg-amber-100"}`}
              href={orderLink(Math.max(1, page - 1), sort, direction)}
              tabIndex={page <= 1 ? -1 : undefined}
            >
              Previous page
            </Link>
            <p aria-live="polite">Page {page} of {totalPages}</p>
            <Link
              aria-disabled={page >= totalPages}
              className={`rounded border border-amber-300 px-4 py-2 ${page >= totalPages ? "pointer-events-none opacity-50" : "hover:bg-amber-100"}`}
              href={orderLink(Math.min(totalPages, page + 1), sort, direction)}
              tabIndex={page >= totalPages ? -1 : undefined}
            >
              Next page
            </Link>
          </nav>
        </>
      )}
    </>
  );
}