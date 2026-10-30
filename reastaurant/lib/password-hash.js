import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

export function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return { salt, hash };
}

export function passwordMatches(password, salt, savedHash) {
  const actualHash = scryptSync(password, salt, 64);
  const expectedHash = Buffer.from(savedHash, "hex");
  return actualHash.length === expectedHash.length &&
    timingSafeEqual(actualHash, expectedHash);
}
