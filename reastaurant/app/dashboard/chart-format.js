export function formatETB(value) {
  return `ETB ${Number(value).toLocaleString()}`;
}

export function formatShortDate(value) {
  return new Date(`${value}T00:00:00Z`).toLocaleDateString("en", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}
