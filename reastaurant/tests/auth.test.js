import assert from "node:assert/strict";
import test from "node:test";
import { filterOrdersForUser, isOrderOwnedBy, safeNextPath } from "../lib/auth-utils.js";

test("accepts internal return destinations", () => {
  assert.equal(safeNextPath("/checkout?step=details"), "/checkout?step=details");
});

test("rejects crafted external and protocol-relative return destinations", () => {
  // Crafted link: /signin?next=https%3A%2F%2Fevil.example
  assert.equal(safeNextPath("https://evil.example"), null);
  assert.equal(safeNextPath("//evil.example"), null);
  assert.equal(safeNextPath("/\\evil.example"), null);
});

test("rejects malformed and control-character destinations", () => {
  assert.equal(safeNextPath("checkout"), null);
  assert.equal(safeNextPath("/\r\nLocation: https://evil.example"), null);
});

test("an account can only enumerate and access its own orders", () => {
  const orders = [
    { id: "order-a", ownerId: "account-a" },
    { id: "order-b", ownerId: "account-b" },
  ];

  assert.deepEqual(filterOrdersForUser(orders, "account-a"), [orders[0]]);
  assert.equal(isOrderOwnedBy(orders[1], "account-a"), false);
  assert.equal(isOrderOwnedBy(orders[0], "account-a"), true);
});