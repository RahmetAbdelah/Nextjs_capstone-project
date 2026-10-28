const etbFormatter = new Intl.NumberFormat("en-ET", {
  style: "currency",
  currency: "ETB",
  maximumFractionDigits: 2,
});

const dateFormatter = new Intl.DateTimeFormat("en-ET", {
  dateStyle: "medium",
  timeStyle: "short",
});

const relativeFormatter = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

export function etb(amount) {
  return etbFormatter.format(Number.isFinite(Number(amount)) ? Number(amount) : 0);
}

export function when(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "Unknown date" : dateFormatter.format(date);
}

export function relative(value, now = Date.now()) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Unknown time";

  const seconds = Math.round((date.getTime() - now) / 1000);
  const units = [
    [60, "second"],
    [60, "minute"],
    [24, "hour"],
    [7, "day"],
    [4.345, "week"],
    [12, "month"],
    [Number.POSITIVE_INFINITY, "year"],
  ];
  let amount = seconds;

  for (const [limit, unit] of units) {
    if (Math.abs(amount) < limit) return relativeFormatter.format(amount, unit);
    amount = Math.round(amount / limit);
  }

  return relativeFormatter.format(amount, "year");
}
