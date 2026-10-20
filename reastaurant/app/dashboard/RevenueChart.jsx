"use client";

function formatETB(value) {
  return `ETB ${Number(value).toLocaleString()}`;
}

function shortDate(value) {
  return new Date(`${value}T00:00:00Z`).toLocaleDateString("en", { month: "short", day: "numeric", timeZone: "UTC" });
}

export default function RevenueChart({ summary }) {
  const neighbourhoods = summary.neighbourhoods;
  const days = summary.days;
  const maximumRevenue = Math.max(...neighbourhoods.map((item) => item.revenue), 1);
  const maximumCount = Math.max(...days.map((item) => item.count), 1);
  const chartWidth = 640;
  const chartHeight = 220;
  const linePoints = days.map((item, index) => {
    const x = days.length > 1 ? 44 + (index * (chartWidth - 64)) / (days.length - 1) : chartWidth / 2;
    const y = chartHeight - 30 - (item.count / maximumCount) * (chartHeight - 60);
    return `${x},${y}`;
  }).join(" ");

  return (
    <div className="mt-8 grid gap-6">
      <section aria-labelledby="revenue-heading" className="rounded-xl border border-amber-200 bg-white p-5">
        <h2 id="revenue-heading" className="text-xl font-semibold">Revenue by neighbourhood</h2>
        <p className="mt-1 text-sm text-stone-600">Estimated menu revenue · Ethiopian birr (ETB)</p>
        <div className="mt-4 h-80 w-full" role="img" aria-label="Bar chart showing estimated revenue in Ethiopian birr by neighbourhood">
          {neighbourhoods.length === 0 ? (
            <p className="flex h-full items-center justify-center text-stone-600">No order revenue to chart yet.</p>
          ) : (
            <svg className="h-full w-full" viewBox="0 0 760 320" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((tick) => {
                const value = (maximumRevenue * tick) / 4;
                const y = 280 - tick * 60;
                return (
                  <g key={tick}>
                    <text x="8" y={y + 5} className="fill-stone-600" fontSize="12">{formatETB(value)}</text>
                    <line x1="105" y1={y} x2="750" y2={y} stroke="#e7e5e4" strokeDasharray="4 4" />
                  </g>
                );
              })}
              {neighbourhoods.map((item, index) => {
                const slotWidth = 645 / neighbourhoods.length;
                const barWidth = Math.min(54, slotWidth * 0.65);
                const barHeight = (item.revenue / maximumRevenue) * 240;
                const x = 105 + index * slotWidth + (slotWidth - barWidth) / 2;
                const y = 280 - barHeight;
                return (
                  <g key={item.name}>
                    <rect x={x} y={y} width={barWidth} height={Math.max(barHeight, 2)} rx="5" fill="#b45309">
                      <title>{item.name}: {formatETB(item.revenue)}</title>
                    </rect>
                    <text x={x + barWidth / 2} y="302" textAnchor="middle" className="fill-stone-700" fontSize="12">
                      {item.name.length > 14 ? `${item.name.slice(0, 13)}…` : item.name}
                    </text>
                  </g>
                );
              })}
            </svg>
          )}
        </div>
      </section>

      <section aria-labelledby="orders-chart-heading" className="rounded-xl border border-amber-200 bg-white p-5">
        <h2 id="orders-chart-heading" className="text-xl font-semibold">
          Orders per day — last 14 days (orders/day)
        </h2>
        <p className="mt-1 text-sm text-stone-600">Daily number of orders, excluding cancelled orders.</p>
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
              const x = days.length > 1 ? 44 + (index * (chartWidth - 64)) / (days.length - 1) : chartWidth / 2;
              const y = chartHeight - 30 - (item.count / maximumCount) * (chartHeight - 60);
              return <circle key={item.date} cx={x} cy={y} r="4" fill="#92400e"><title>{shortDate(item.date)}: {item.count} orders</title></circle>;
            })}
            <text x="44" y={chartHeight - 4} className="fill-stone-600" fontSize="11">{shortDate(days[0].date)}</text>
            <text x={chartWidth - 44} y={chartHeight - 4} textAnchor="end" className="fill-stone-600" fontSize="11">{shortDate(days.at(-1).date)}</text>
          </svg>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <caption className="mb-2 text-left font-medium">Same daily order counts as the line chart</caption>
            <thead>
              <tr className="border-b border-amber-200">
                <th className="px-3 py-2" scope="col">Date</th>
                <th className="px-3 py-2 text-right" scope="col">Orders (per day)</th>
              </tr>
            </thead>
            <tbody>
              {days.map((item) => (
                <tr className="border-b border-stone-100" key={item.date}>
                  <th className="px-3 py-2 font-normal" scope="row">{shortDate(item.date)}</th>
                  <td className="px-3 py-2 text-right">{item.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}