import { OrderSchema } from "@/lib/schema";
import { getSession } from "@/lib/session";
import { createOrder } from "@/lib/order-store";

export async function POST(request) {
  const session = await getSession();
  if (!session) {
    return Response.json(
      { error: { code: "UNAUTHENTICATED", message: "Sign in before placing an order." } },
      { status: 401 },
    );
  }

  let body;

  try {
    body = await request.json();
  } catch {
    return Response.json(
      { error: { code: "INVALID_JSON", message: "Request body must be valid JSON." } },
      { status: 400 },
    );
  }

  const result = OrderSchema.safeParse(body);
  if (!result.success) {
    return Response.json(
      {
        error: {
          code: "VALIDATION_ERROR",
          message: "Please correct the highlighted fields.",
        },
        fieldErrors: result.error.flatten().fieldErrors,
      },
      { status: 422 },
    );
  }

  const order = createOrder(result.data, session.userId);

  return Response.json(
    { order: { id: order.id, status: order.status, createdAt: order.createdAt } },
    { status: 201 },
  );
}