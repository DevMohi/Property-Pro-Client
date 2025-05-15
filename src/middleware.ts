import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/AuthService";

type Role = keyof typeof roleBasedPrivateRoutes;

const authRoutes = ["/login", "/register"]; // Public routes
const roleBasedPrivateRoutes = {
  user: [/^\/user/],
  admin: [/^\/admin/],
  landlord: [/^\/landlord/],
  tenant: [/^\/tenant/],
};

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const userInfo = await getCurrentUser();

  if (!userInfo) {
    // Allow access to auth routes without login
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      // Redirect to login with redirectPath param
      return NextResponse.redirect(
        new URL(
          `/login?redirectPath=${encodeURIComponent(pathname)}`,
          request.nextUrl.origin
        )
      );
    }
  }

  // If logged in, check role-based route access
  if (userInfo?.role && roleBasedPrivateRoutes[userInfo.role as Role]) {
    const routes = roleBasedPrivateRoutes[userInfo.role as Role];
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  // Unauthorized access — redirect to home page
  return NextResponse.redirect(new URL("/", request.nextUrl.origin));
};

export const config = {
  matcher: [
    "/login",
    "/admin",
    "/admin/:page",
    "/user",
    "/user/:page",
    "/landlord",
    "/landlord/:page",
    "/tenant",
    "/tenant/:page",
  ],
};
