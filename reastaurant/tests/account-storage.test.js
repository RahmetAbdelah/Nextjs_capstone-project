import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { readAccounts, writeAccounts } from "../lib/account-storage.js";
import { hashPassword } from "../lib/password-hash.js";

test("account records persist without exposing plain-text passwords", (context) => {
  const directory = mkdtempSync(join(tmpdir(), "addis-eats-accounts-"));
  const previousDirectory = process.cwd();
  process.chdir(directory);
  context.after(() => {
    process.chdir(previousDirectory);
    rmSync(directory, { recursive: true, force: true });
  });

  const passwordData = hashPassword("example-password");
  const account = { id: "customer-1", email: "aster@example.com", ...passwordData };
  writeAccounts([account]);
  assert.deepEqual(readAccounts(), [account]);
  const savedData = readFileSync(join(directory, ".data", "accounts.json"), "utf8");
  assert.doesNotMatch(savedData, /example-password/);
});
