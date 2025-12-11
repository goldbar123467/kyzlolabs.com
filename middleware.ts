import crypto from "node:crypto";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const PASSWORD_HASH =
  process.env.DASH_PASSWORD_HASH ??
  "adedfdfab703b34e7c4e513442ae763683dc97102dfc8820ebe586ebb07343ee";
const AUTH_COOKIE = "dash_auth";

function _hash(input: string) {
  return crypto.createHash("sha256").update(input).digest("hex");
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Public paths
  const isPublic =
    pathname.startsWith("/api/health") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/_next");

  if (isPublic) {
    return NextResponse.next();
  }

  const cookie = req.cookies.get(AUTH_COOKIE)?.value;
  if (cookie === PASSWORD_HASH) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/login", req.url);
  loginUrl.searchParams.set("redirect", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
