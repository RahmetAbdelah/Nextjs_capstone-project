import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const SESSION_COOKIE = "restaurant_session";
const SESSION_TTL_SECONDS = 60 * 60 * 8;

function getSecret() {
  return process.env.SESSION_SECRET;
}

function sign(payload) {
  return createHmac("sha256", getSecret()).update(payload).digest("base64url");
}

export async function setSession({ userId, role }) {
  const secret = getSecret();
  if (!secret) throw new Error("SESSION_SECRET must be configured before signing in.");

  const payload = Buffer.from(JSON.stringify({
    userId,
    role,
    expiresAt: Date.now() + SESSION_TTL_SECONDS * 1000,
  })).toString("base64url");
  const token = `${payload}.${sign(payload)}`;
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, "", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });
}

export async function getSession() {
  const secret = getSecret();
  if (!secret) return null;

  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const [payload, signature, extra] = token.split(".");
  if (!payload || !signature || extra) return null;

  const expectedSignature = createHmac("sha256", secret).update(payload).digest("base64url");
  const actual = Buffer.from(signature);
  const expected = Buffer.from(expectedSignature);
  if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) {
    return null;
  }

  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (
      typeof session.userId !== "string" ||
      !session.userId ||
      !["customer", "staff"].includes(session.role) ||
      typeof session.expiresAt !== "number" ||
      session.expiresAt <= Date.now()
    ) {
      return null;
    }

    return { userId: session.userId, role: session.role };
  } catch {
    return null;
  }
}