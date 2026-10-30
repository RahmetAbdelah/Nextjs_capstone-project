import { getOrderById } from "@/lib/order-store";
import { isOrderOwnedBy } from "@/lib/auth-utils";

export function createOrderStatusStream(request, orderId, ownerId) {
  const encoder = new TextEncoder();
  let lastStatus = null;
  let interval;

  const stream = new ReadableStream({
    start(controller) {
      function send(event, data) {
        const eventName = event ? `event: ${event}\n` : "";
        controller.enqueue(
          encoder.encode(`${eventName}data: ${JSON.stringify(data)}\n\n`),
        );
      }

      function sendStatus() {
        const order = getOrderById(orderId);
        if (!isOrderOwnedBy(order, ownerId)) {
          send("stream-error", { message: "Order no longer available." });
          controller.close();
          clearInterval(interval);
          return false;
        }

        if (order.status !== lastStatus) {
          lastStatus = order.status;
          send("message", { status: lastStatus });
        } else {
          controller.enqueue(encoder.encode(": keep-alive\n\n"));
        }
        if (["DELIVERED", "CANCELLED"].includes(order.status)) {
          controller.close();
          clearInterval(interval);
          return false;
        }
        return true;
      }

      if (sendStatus()) interval = setInterval(sendStatus, 1500);
      request.signal.addEventListener("abort", () => clearInterval(interval), { once: true });
    },
    cancel() {
      clearInterval(interval);
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
