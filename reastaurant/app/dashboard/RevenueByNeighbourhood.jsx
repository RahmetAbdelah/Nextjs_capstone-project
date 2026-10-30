import { formatETB } from "./chart-format";

export default function RevenueByNeighbourhood({ neighbourhoods }) {
  const maximumRevenue = Math.max(...neighbourhoods.map((item) => item.revenue), 1);

  return (
    <section aria-labelledby="revenue-heading" className="chart-card">
      <h2 id="revenue-heading" className="text-xl font-semibold">Revenue by neighbourhood</h2>
      <p className="mt-1 text-sm">Estimated menu revenue · Ethiopian birr (ETB)</p>
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
              const label = item.name.length > 14 ? `${item.name.slice(0, 13)}…` : item.name;
              return (
                <g key={item.name}>
                  <rect x={x} y={y} width={barWidth} height={Math.max(barHeight, 2)} rx="5" fill="#b45309">
                    <title>{item.name}: {formatETB(item.revenue)}</title>
                  </rect>
                  <text x={x + barWidth / 2} y="302" textAnchor="middle" className="fill-stone-700" fontSize="12">
                    {label}
                  </text>
                </g>
              );
            })}
          </svg>
        )}
      </div>
    </section>
  );
}
