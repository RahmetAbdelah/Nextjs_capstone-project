import { NextResponse } from "next/server";

const SESSION_COOKIE = "restaurant_session";

export function proxy(request) {
  if (request.cookies.get(SESSION_COOKIE)?.value) return NextResponse.next();

  const signInUrl = new URL("/signin", request.url);
  signInUrl.searchParams.set("next", `${request.nextUrl.pathname}${request.nextUrl.search}`);
  return NextResponse.redirect(signInUrl);
}

export const config = {
  matcher: ["/checkout/:path*", "/orders/:path*", "/track/:path*"],
};