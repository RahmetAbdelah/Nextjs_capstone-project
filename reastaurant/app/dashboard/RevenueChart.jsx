import OrdersByDay from "./OrdersByDay";
import RevenueByNeighbourhood from "./RevenueByNeighbourhood";

export default function RevenueChart({ summary }) {
  return (
    <div className="mt-8 grid gap-6">
      <RevenueByNeighbourhood neighbourhoods={summary.neighbourhoods} />
      <OrdersByDay days={summary.days} />
    </div>
  );
}
