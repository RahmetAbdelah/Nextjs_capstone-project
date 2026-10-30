import { getOrderRevenue } from "@/lib/order-analytics";

const PAGE_SIZE = 10;
const SORT_FIELDS = new Set(["createdAt", "customerName", "neighbourhood", "status", "revenue"]);

function queryValue(value) {
  return Array.isArray(value) ? value[0] : value;
}

export function createOrderLink(page, sort, direction) {
  const query = new URLSearchParams({ page: String(page), sort, direction });
  return `/orders?${query.toString()}`;
}

export function getOrderTableState(orders, params) {
  const requestedSort = queryValue(params?.sort);
  const sort = SORT_FIELDS.has(requestedSort) ? requestedSort : "createdAt";
  const direction = queryValue(params?.direction) === "asc" ? "asc" : "desc";
  const requestedPage = Number.parseInt(queryValue(params?.page) ?? "1", 10);
  const totalPages = Math.max(1, Math.ceil(orders.length / PAGE_SIZE));
  const page = Number.isFinite(requestedPage)
    ? Math.min(Math.max(requestedPage, 1), totalPages)
    : 1;
  const sortedOrders = [...orders].sort((first, second) => {
    const firstValue = sort === "revenue"
      ? getOrderRevenue(first.orderDetails)
      : first[sort] ?? "";
    const secondValue = sort === "revenue"
      ? getOrderRevenue(second.orderDetails)
      : second[sort] ?? "";
    const comparison = typeof firstValue === "number"
      ? firstValue - secondValue
      : String(firstValue).localeCompare(String(secondValue));
    return comparison * (direction === "asc" ? 1 : -1);
  });
  const start = (page - 1) * PAGE_SIZE;

  return {
    page,
    totalPages,
    sort,
    direction,
    visibleOrders: sortedOrders.slice(start, start + PAGE_SIZE),
  };
}
