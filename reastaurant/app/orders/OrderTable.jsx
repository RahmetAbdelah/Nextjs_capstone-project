import { getOrderTableState } from "./order-table-utils";
import OrdersTable from "./OrdersTable";
import OrderPagination from "./OrderPagination";

export default async function OrderTable({ orders, searchParams }) {
  const params = await searchParams;
  const tableState = getOrderTableState(orders, params);

  if (orders.length === 0) {
    return (
      <p className="empty-state">
        There are no orders to show yet. Place an order to see it appear here.
      </p>
    );
  }

  return (
    <>
      <p className="mt-5 text-sm text-stone-600">
        Showing {(tableState.page - 1) * 10 + 1}–{Math.min(tableState.page * 10, orders.length)} of {orders.length} orders.
      </p>
      <OrdersTable
        orders={tableState.visibleOrders}
        sort={tableState.sort}
        direction={tableState.direction}
      />
      <OrderPagination
        page={tableState.page}
        totalPages={tableState.totalPages}
        sort={tableState.sort}
        direction={tableState.direction}
      />
    </>
  );
}
