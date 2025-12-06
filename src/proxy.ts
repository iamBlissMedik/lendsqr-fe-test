import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  const isAuthenticated = req.cookies.get("auth")?.value === "true";

  const { pathname } = req.nextUrl;

  const isAuthRoute = pathname.startsWith("/auth");
  const isPublic = isAuthRoute;

  // Redirect "/" → "/users"
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/users", req.url));
  }

  // If logged in, prevent access to /auth pages
  if (isAuthenticated && isAuthRoute) {
    return NextResponse.redirect(new URL("/users", req.url));
  }

  // If NOT logged in & accessing protected pages
  if (!isAuthenticated && !isPublic) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/auth/login";
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/users/:path*", "/dashboard/:path*", "/auth/:path*"],
};
