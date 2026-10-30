import assert from "node:assert/strict";
import test from "node:test";
import { AccountRegistrationSchema } from "../lib/schema.js";
import { hashPassword, passwordMatches } from "../lib/password-hash.js";

test("registration validates passwords and normalizes email", () => {
  const result = AccountRegistrationSchema.safeParse({
    name: "Aster Example",
    email: "ASTER@example.com",
    password: "example-password",
    confirmPassword: "example-password",
  });
  assert.equal(result.success, true);
  assert.equal(result.data.email, "aster@example.com");
  const mismatchedPasswords = AccountRegistrationSchema.safeParse({
    name: "Aster",
    email: "aster@example.com",
    password: "example-password",
    confirmPassword: "different",
  });
  assert.equal(mismatchedPasswords.success, false);
});

test("passwords are stored as salted hashes and can be verified", () => {
  const savedPassword = hashPassword("example-password");
  assert.notEqual(savedPassword.hash, "example-password");
  assert.equal(passwordMatches("example-password", savedPassword.salt, savedPassword.hash), true);
  assert.equal(passwordMatches("incorrect-password", savedPassword.salt, savedPassword.hash), false);
});
