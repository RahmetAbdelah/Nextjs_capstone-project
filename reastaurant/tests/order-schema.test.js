import assert from "node:assert/strict";
import test from "node:test";
import { OrderSchema } from "../lib/schema.js";

const validOrder = {
  customerName: "Aster Example",
  email: "aster@example.com",
  phone: "+251 91 234 5678",
  deliveryAddress: "12 Example Street",
  neighbourhood: "Bole",
  orderDetails: "Doro Wot x 1",
};

test("accepts an international delivery phone number", () => {
  assert.equal(OrderSchema.safeParse(validOrder).success, true);
});

test("rejects a missing or invalid delivery phone number", () => {
  assert.equal(OrderSchema.safeParse({ ...validOrder, phone: "" }).success, false);
  assert.equal(OrderSchema.safeParse({ ...validOrder, phone: "call me" }).success, false);
});
