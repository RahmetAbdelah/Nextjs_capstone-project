import { createHmac, timingSafeEqual } from "node:crypto";

export function createSessionToken(session, secret) {
  const payload = Buffer.from(JSON.stringify(session)).toString("base64url");
  const signature = createHmac("sha256", secret).update(payload).digest("base64url");
  return `${payload}.${signature}`;
}

export function readSessionToken(token, secret) {
  const [payload, signature, extra] = token.split(".");
  if (!payload || !signature || extra) return null;

  const expectedSignature = createHmac("sha256", secret).update(payload).digest("base64url");
  const actualBytes = Buffer.from(signature);
  const expectedBytes = Buffer.from(expectedSignature);
  if (actualBytes.length !== expectedBytes.length) return null;
  if (!timingSafeEqual(actualBytes, expectedBytes)) return null;

  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    const validUser = typeof session.userId === "string" && session.userId.length > 0;
    const validRole = ["customer", "staff"].includes(session.role);
    const validExpiry = typeof session.expiresAt === "number" && session.expiresAt > Date.now();
    if (!validUser || !validRole || !validExpiry) return null;

    return { userId: session.userId, role: session.role };
  } catch {
    return null;
  }
}
