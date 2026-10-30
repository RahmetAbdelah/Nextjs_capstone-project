import { getOrderById } from "@/lib/order-store";
import { isOrderOwnedBy } from "@/lib/auth-utils";
import { getSession } from "@/lib/session";

export async function GET(_request, { params }) {
  const session = await getSession();
  if (!session) {
    return Response.json(
      { error: { code: "UNAUTHENTICATED", message: "Sign in to view this order." } },
      { status: 401 },
    );
  }

  const { id } = await params;
  const order = getOrderById(id);

  if (!isOrderOwnedBy(order, session.userId)) {
    return Response.json(
      { error: { code: "NOT_FOUND", message: "Order not found." } },
      { status: 404 },
    );
  }

  // The random order ID is the status-page link; never return customer details here.
  return Response.json({
    order: {
      id: order.id,
      status: order.status,
      createdAt: order.createdAt,
    },
  });
}