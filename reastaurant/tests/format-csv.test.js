import assert from "node:assert/strict";
import test from "node:test";
import { toCsv } from "../lib/csv.js";
import { etb, relative, when } from "../lib/format.js";

test("formats Ethiopian birr using a shared formatter", () => {
  assert.match(etb(1200), /ETB/);
  assert.match(etb(1200), /1,200/);
});

test("formats valid dates and handles invalid dates", () => {
  assert.match(when("2025-01-01T12:00:00.000Z"), /2025/);
  assert.equal(when("not a date"), "Unknown date");
});

test("formats relative dates with a predictable reference time", () => {
  assert.equal(relative("2025-01-01T00:00:00.000Z", Date.parse("2025-01-02T00:00:00.000Z")), "yesterday");
});

test("quotes CSV values and escapes embedded quotes", () => {
  const csv = toCsv([{ name: 'Aster, "Addis"', address: "Bole\nAddis Ababa" }], [
    { label: "Name", value: (row) => row.name },
    { label: "Address", value: (row) => row.address },
  ]);

  assert.equal(csv, '"Name","Address"\r\n"Aster, ""Addis""","Bole\nAddis Ababa"');
});
