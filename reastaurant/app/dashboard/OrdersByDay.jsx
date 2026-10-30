import { formatShortDate } from "./chart-format";
import OrdersByDayTable from "./OrdersByDayTable";

export default function OrdersByDay({ days }) {
  const chartWidth = 640;
  const chartHeight = 220;
  const maximumCount = Math.max(...days.map((item) => item.count), 1);
  const linePoints = days.map((item, index) => {
    const x = days.length > 1
      ? 44 + (index * (chartWidth - 64)) / (days.length - 1)
      : chartWidth / 2;
    const y = chartHeight - 30 - (item.count / maximumCount) * (chartHeight - 60);
    return `${x},${y}`;
  }).join(" ");

  return (
    <section aria-labelledby="orders-chart-heading" className="chart-card">
      <h2 id="orders-chart-heading" className="text-xl font-semibold">
        Orders per day — last 14 days (orders/day)
      </h2>
      <p className="mt-1 text-sm">Daily number of orders, excluding cancelled orders.</p>
      <div className="mt-4 h-64 w-full" role="img" aria-label="Line chart showing orders per day for the last 14 days">
        <svg className="h-full w-full" viewBox={`0 0 ${chartWidth} ${chartHeight}`} preserveAspectRatio="none" aria-hidden="true">
          {[0, 1, 2, 3, 4].map((tick) => {
            const value = Math.round((maximumCount * tick) / 4);
            const y = chartHeight - 30 - (tick * (chartHeight - 60)) / 4;
            return (
              <g key={tick}>
                <text x="2" y={y + 4} className="fill-stone-600" fontSize="11">{value}</text>
                <line x1="34" y1={y} x2={chartWidth} y2={y} stroke="#e7e5e4" />
              </g>
            );
          })}
          {days.length > 0 && <polyline points={linePoints} fill="none" stroke="#b45309" strokeWidth="3" />}
          {days.map((item, index) => {
            const x = days.length > 1
              ? 44 + (index * (chartWidth - 64)) / (days.length - 1)
              : chartWidth / 2;
            const y = chartHeight - 30 - (item.count / maximumCount) * (chartHeight - 60);
            return (
              <circle key={item.date} cx={x} cy={y} r="4" fill="#92400e">
                <title>{formatShortDate(item.date)}: {item.count} orders</title>
              </circle>
            );
          })}
          <text x="44" y={chartHeight - 4} className="fill-stone-600" fontSize="11">
            {formatShortDate(days[0].date)}
          </text>
          <text x={chartWidth - 44} y={chartHeight - 4} textAnchor="end" className="fill-stone-600" fontSize="11">
            {formatShortDate(days[days.length - 1].date)}
          </text>
        </svg>
      </div>
      <OrdersByDayTable days={days} />
    </section>
  );
}
