"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

export default function OrderStatus({ orderId, initialOrder }) {
  const { data, error } = useSWR(`/api/orders/${encodeURIComponent(orderId)}`, fetcher, {
    fallbackData: { order: initialOrder },
    refreshInterval: 5000,
    dedupingInterval: 1000,
    revalidateOnFocus: true,
    keepPreviousData: false,
  });
  const order = data.order;

  return (
    <section className="tracking-card status-panel" aria-live="polite">
      <p className="text-sm text-stone-600">Order reference</p>
      <p className="break-all font-mono text-sm">{order.id}</p>
      <p className="mt-4 text-sm text-stone-600">Status</p>
      <p className="mt-1 text-2xl font-bold text-stone-900">{order.status}</p>
      <p className="mt-3 text-sm text-stone-600">
        We check for updates every five seconds. This page updates automatically.
      </p>
      {error && (
        <p className="mt-3 text-sm text-amber-900" role="status">
          We could not refresh just now. Your last status is still shown.
        </p>
      )}
    </section>
  );
}