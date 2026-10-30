import "server-only";

import { createHash, randomUUID, timingSafeEqual } from "node:crypto";
import { hashPassword, passwordMatches } from "./password-hash";
import { readAccounts, writeAccounts } from "./account-storage";

function configuredAccounts() {
  return [
    { email: process.env.CUSTOMER_EMAIL, password: process.env.CUSTOMER_PASSWORD,
      userId: process.env.CUSTOMER_USER_ID || "demo-customer", role: "customer" },
    { email: process.env.STAFF_EMAIL, password: process.env.STAFF_PASSWORD,
      userId: process.env.STAFF_USER_ID || "demo-staff", role: "staff" },
  ].filter((account) => account.email && account.password);
}

function sameSecret(first, second) {
  const firstHash = createHash("sha256").update(first).digest();
  const secondHash = createHash("sha256").update(second).digest();
  return timingSafeEqual(firstHash, secondHash);
}

export function authenticateAccount(email, password) {
  const configuredAccount = configuredAccounts().find((account) =>
    sameSecret(account.email.trim().toLowerCase(), email) &&
    sameSecret(account.password, password),
  );
  if (configuredAccount) {
    return { userId: configuredAccount.userId, role: configuredAccount.role };
  }

  const savedAccount = readAccounts().find((account) => account.email === email);
  if (!savedAccount || !passwordMatches(password, savedAccount.passwordSalt, savedAccount.passwordHash)) {
    return null;
  }
  return { userId: savedAccount.id, role: "customer" };
}

export function createCustomerAccount({ name, email, password }) {
  const accountAlreadyExists = configuredAccounts().some(
    (account) => account.email.trim().toLowerCase() === email,
  );
  const accounts = readAccounts();
  if (accountAlreadyExists || accounts.some((account) => account.email === email)) return null;

  const passwordData = hashPassword(password);
  const account = { id: randomUUID(), name, email, ...passwordData };
  writeAccounts([...accounts, account]);
  return { userId: account.id, role: "customer" };
}
