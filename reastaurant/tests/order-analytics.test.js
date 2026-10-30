import assert from "node:assert/strict";
import test from "node:test";
import { getOrderRevenue } from "../lib/order-analytics.js";

test("calculates menu-price totals from recognized dishes", () => {
  assert.equal(getOrderRevenue("Doro Wat × 2, Kitfo × 1"), 1100);
});

test("ignores unrecognized items instead of guessing their price", () => {
  assert.equal(getOrderRevenue("Mystery Dish × 2, Beyaynetu × 1"), 220);
});

test("returns zero for missing or unparseable order details", () => {
  assert.equal(getOrderRevenue(""), 0);
  assert.equal(getOrderRevenue("a large dinner"), 0);
});