import { formatShortDate } from "./chart-format";

export default function OrdersByDayTable({ days }) {
  return (
    <div className="mt-4 overflow-x-auto">
      <table className="data-table">
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
              <th className="px-3 py-2 font-normal" scope="row">{formatShortDate(item.date)}</th>
              <td className="px-3 py-2 text-right">{item.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
