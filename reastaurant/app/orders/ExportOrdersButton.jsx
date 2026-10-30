"use client";

import { downloadCsv, toCsv } from "@/lib/csv";
import { etb, when } from "@/lib/format";
import { getOrderRevenue } from "@/lib/order-analytics";

const columns = [
  { label: "Order ID", value: (order) => order.id },
  { label: "Customer", value: (order) => order.customerName },
  { label: "Neighbourhood", value: (order) => order.neighbourhood },
  { label: "Delivery address", value: (order) => order.deliveryAddress },
  { label: "Items", value: (order) => order.orderDetails },
  { label: "Estimated total", value: (order) => etb(getOrderRevenue(order.orderDetails)) },
  { label: "Status", value: (order) => order.status },
  { label: "Order date", value: (order) => when(order.createdAt) },
];

export default function ExportOrdersButton({ orders }) {
  return (
    <button
      className="mt-5 rounded border border-amber-700 px-4 py-2 font-semibold text-amber-900 hover:bg-amber-100"
      onClick={() => downloadCsv("order-history.csv", toCsv(orders, columns))}
      type="button"
    >
      Export order history (CSV)
    </button>
  );
}
