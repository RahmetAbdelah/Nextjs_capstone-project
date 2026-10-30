import { mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

function getAccountFilePath() {
  return join(process.cwd(), ".data", "accounts.json");
}

export function readAccounts() {
  try {
    const accounts = JSON.parse(readFileSync(getAccountFilePath(), "utf8"));
    if (!Array.isArray(accounts)) throw new Error("Account data must be a list.");
    return accounts;
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw new Error("Could not read saved accounts.", { cause: error });
  }
}

export function writeAccounts(accounts) {
  const filePath = getAccountFilePath();
  const temporaryPath = `${filePath}.${process.pid}.tmp`;
  mkdirSync(dirname(filePath), { recursive: true, mode: 0o700 });
  writeFileSync(temporaryPath, JSON.stringify(accounts, null, 2), { mode: 0o600 });
  renameSync(temporaryPath, filePath);
}
