import { notFound, redirect } from "next/navigation";
import { getOrderById } from "@/lib/order-store";
import { isOrderOwnedBy } from "@/lib/auth-utils";
import { getSession } from "@/lib/session";
import { when } from "@/lib/format";
import OrderStatusStream from "./OrderStatusStream";
import DeliveryMapLoader from "./DeliveryMapLoader";

export const dynamic = "force-dynamic";

const neighbourhoodLocations = {
  bole: [8.995, 38.786],
  "bole medhanialem": [8.997, 38.785],
  piassa: [9.034, 38.747],
  "piazza": [9.034, 38.747],
  "kazanchis": [9.012, 38.763],
  "kirkos": [9.008, 38.758],
  "megenagna": [9.025, 38.807],
  "addis ketema": [9.036, 38.729],
};

function getDestination(neighbourhood = "") {
  const key = neighbourhood.trim().toLowerCase();
  return neighbourhoodLocations[key] ?? [8.995, 38.786];
}

export default async function TrackPage({ params }) {
  const { id } = await params;
  const session = await getSession();
  if (!session) redirect(`/signin?next=${encodeURIComponent(`/track/${id}`)}`);

  const order = getOrderById(id);
  if (!isOrderOwnedBy(order, session.userId)) notFound();

  const destination = getDestination(order.neighbourhood);
  const courier = [destination[0] + 0.006, destination[1] - 0.008];

  return (
    <main className="page-shell">
      <h1 className="page-heading">Track your delivery</h1>
      <p className="mt-2 text-stone-600">Order placed {when(order.createdAt)} · {order.neighbourhood}</p>
      <OrderStatusStream orderId={order.id} initialStatus={order.status} />

      <section className="mt-8 grid gap-6 md:grid-cols-[minmax(0,1.4fr)_minmax(16rem,0.8fr)]" aria-label="Delivery map and details">
        <div>
          <div className="map-panel">
            <DeliveryMapLoader
              courier={courier}
              deliveryAddress={order.deliveryAddress}
              destination={destination}
            />
          </div>
          <p className="mt-2 text-sm text-stone-600">
            The courier and delivery markers are approximate neighbourhood locations, not live GPS or an exact address pin.
          </p>
        </div>
        <div className="tracking-card">
          <h2 className="text-lg font-semibold">Delivery details</h2>
          <p className="mt-4 text-sm font-medium">Courier location (approximate)</p>
          <p className="text-stone-900">Near {order.neighbourhood}</p>
          <p className="mt-4 text-sm font-medium">Delivery address</p>
          <address className="not-italic">{order.deliveryAddress}</address>
          <p className="mt-4 text-sm font-medium">Order</p>
          <p className="text-stone-900">{order.orderDetails}</p>
        </div>
      </section>
    </main>
  );
}
