"use client";

import dynamic from "next/dynamic";

const DeliveryMap = dynamic(() => import("./DeliveryMap"), {
  ssr: false,
  loading: () => (
    <div
      aria-label="Loading delivery map"
      className="h-[360px] w-full animate-pulse rounded-xl bg-amber-100"
      role="status"
    />
  ),
});

export default function DeliveryMapLoader({ courier, destination, deliveryAddress }) {
  return <DeliveryMap courier={courier} destination={destination} deliveryAddress={deliveryAddress} />;
}
