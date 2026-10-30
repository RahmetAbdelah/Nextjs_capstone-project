import "server-only";

import { cookies } from "next/headers";
import { createSessionToken, readSessionToken } from "./session-token";

const SESSION_COOKIE = "restaurant_session";
const SESSION_TTL_SECONDS = 60 * 60 * 8;

function getSecret() {
  return process.env.SESSION_SECRET;
}

export async function setSession({ userId, role }) {
  const secret = getSecret();
  if (!secret) throw new Error("SESSION_SECRET must be configured before signing in.");

  const token = createSessionToken({
    userId,
    role,
    expiresAt: Date.now() + SESSION_TTL_SECONDS * 1000,
  }, secret);
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

  return readSessionToken(token, secret);
}