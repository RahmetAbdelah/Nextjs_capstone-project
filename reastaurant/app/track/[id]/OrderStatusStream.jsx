"use client";

import { useEffect, useState } from "react";

function statusText(status) {
  const labels = {
    PENDING: "Order received",
    PREPARING: "Being prepared",
    READY: "Ready for pickup",
    OUT_FOR_DELIVERY: "On the way",
    DELIVERED: "Delivered",
    CANCELLED: "Cancelled",
  };
  return labels[status] ?? status.replaceAll("_", " ").toLowerCase();
}

export default function OrderStatusStream({ orderId, initialStatus }) {
  const [status, setStatus] = useState(initialStatus);
  const isComplete = ["DELIVERED", "CANCELLED"].includes(initialStatus);
  const [connection, setConnection] = useState(isComplete ? "Updates complete" : "Connecting…");

  useEffect(() => {
    if (["DELIVERED", "CANCELLED"].includes(initialStatus)) return undefined;

    const stream = new EventSource(`/api/orders/${encodeURIComponent(orderId)}/stream`);

    stream.onopen = () => setConnection("Live updates connected");
    stream.onmessage = (event) => {
      try {
        const update = JSON.parse(event.data);
        if (typeof update.status !== "string") throw new Error("Missing order status.");
        setStatus(update.status);
        if (["DELIVERED", "CANCELLED"].includes(update.status)) {
          setConnection("Updates complete");
          stream.close();
        }
      } catch {
        setConnection("Live updates unavailable");
        stream.close();
      }
    };
    stream.addEventListener("stream-error", () => {
      setConnection("Live updates unavailable");
      stream.close();
    });
    stream.onerror = () => {
      setConnection(stream.readyState === EventSource.CLOSED
        ? "Live updates ended"
        : "Reconnecting to live updates…");
    };

    return () => stream.close();
  }, [initialStatus, orderId]);

  return (
    <section className="tracking-card status-panel" aria-live="polite">
      <p className="text-sm text-stone-600">Delivery status</p>
      <p className="mt-1 text-2xl font-bold text-stone-900">{statusText(status)}</p>
      <p className="mt-2 text-sm text-stone-600" role="status">{connection}</p>
    </section>
  );
}
