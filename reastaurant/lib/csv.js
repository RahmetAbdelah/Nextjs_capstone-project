export function toCsv(rows, columns) {
  const quote = (value) => `"${String(value ?? "").replaceAll('"', '""')}"`;
  const header = columns.map((column) => quote(column.label)).join(",");
  const records = rows.map((row) =>
    columns.map((column) => quote(column.value(row))).join(","),
  );

  return [header, ...records].join("\r\n");
}

export function downloadCsv(filename, csv) {
  const file = new Blob(["\uFEFF", csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
