import { getSession } from "@/lib/session";
import { getOrderById } from "@/lib/order-store";
import { isOrderOwnedBy } from "@/lib/auth-utils";
import { createOrderStatusStream } from "./stream-response";

export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
  const session = await getSession();
  if (!session) {
    return Response.json({ error: "Sign in to track this delivery." }, { status: 401 });
  }

  const { id } = await params;
  const order = getOrderById(id);
  if (!isOrderOwnedBy(order, session.userId)) {
    return Response.json({ error: "Order not found." }, { status: 404 });
  }

  return createOrderStatusStream(request, id, session.userId);
}
