import Link from "next/link";
import { getOrderRevenue } from "@/lib/order-analytics";
import { etb, when } from "@/lib/format";
import { createOrderLink } from "./order-table-utils";

const headers = [
  ["customerName", "Customer"],
  ["neighbourhood", "Neighbourhood"],
  ["revenue", "Est. revenue"],
  ["status", "Status"],
  ["createdAt", "Order date"],
];

export default function OrdersTable({ orders, sort, direction }) {
  function getSortLink(field) {
    const nextDirection = sort === field && direction === "asc" ? "desc" : "asc";
    return createOrderLink(1, field, nextDirection);
  }

  return (
    <div className="data-table-wrap">
      <table className="data-table">
        <caption className="sr-only">
          Orders, sorted by {sort} in {direction === "asc" ? "ascending" : "descending"} order
        </caption>
        <thead>
          <tr>
            <th className="px-4 py-3" scope="col">Order</th>
            {headers.map(([field, label]) => (
              <th
                className="px-4 py-3"
                key={field}
                scope="col"
                aria-sort={sort === field ? (direction === "asc" ? "ascending" : "descending") : "none"}
              >
                <Link className="font-semibold underline underline-offset-2" href={getSortLink(field)}>
                  {label}{sort === field ? (direction === "asc" ? " ↑" : " ↓") : ""}
                </Link>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
            <th className="font-mono font-medium" scope="row">{order.id.slice(0, 8)}</th>
            <td>{order.customerName}</td>
            <td>{order.neighbourhood || "Unspecified"}</td>
            <td>{etb(getOrderRevenue(order.orderDetails))}</td>
            <td>{order.status}</td>
            <td>{when(order.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
