import { JwtPayload } from "jsonwebtoken";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

import { cookies } from "next/headers";
import { getNewAcessToken } from "./service/refreshToken";
import { configs } from "./utils/config";
import { verfiyToken } from "./utils/jwt";

const authRoutes = ["/auth/"];

const public_routes = ["/", "/auth/", "/auth/"];

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const cookieStore = await cookies();

  const refreshToken = request.cookies.get("refreshToken")?.value;
  let accessToken = request.cookies.get("accessToken")?.value;

  let userRole = null;

  if (refreshToken || accessToken) {
    const decodedRefreshToken = refreshToken
      ? verfiyToken(refreshToken, configs.refreshTokenSecret as string)
      : null;

    let decodedAccessToken = accessToken
      ? verfiyToken(accessToken, configs.accessTokenSecret as string)
      : null;

    if (!decodedAccessToken?.success && decodedRefreshToken?.success) {
      const result = await getNewAcessToken();
      if (result.success) {
        const newAcessToken = result.data.accessToken.generated_accessToken;

        cookieStore.set("accessToken", newAcessToken, {
          httpOnly: true,
          maxAge: 60 * 60 * 24,
          sameSite: "lax",
        });

        accessToken = newAcessToken;

        decodedAccessToken = verfiyToken(
          accessToken!,
          configs.accessTokenSecret as string,
        );
      }
    }

    if (
      accessToken &&
      !decodedAccessToken?.success &&
      (!decodedRefreshToken || !decodedRefreshToken?.success)
    ) {
      cookieStore.delete("accessToken");
    }

    if (decodedAccessToken?.success && decodedAccessToken?.token) {
      userRole = (decodedAccessToken?.token as JwtPayload).role;
    }
  }

  const isPublic = public_routes.includes(pathname);
  const isAuthRoute = authRoutes.includes(pathname);

  if (accessToken && authRoutes.includes(pathname)) {
    if (userRole === "tenant") {
      return NextResponse.redirect(new URL("/dashboard/customer", request.url));
    }
    if (userRole === "Provider") {
      return NextResponse.redirect(new URL("/dashboard/provider", request.url));
    }
    if (userRole === "Admin") {
      return NextResponse.redirect(new URL("/dashboard/admin", request.url));
    }
  }

  if (!accessToken && !isPublic && !isAuthRoute) {
    return NextResponse.redirect(new URL("/auth/", request.url));
  }

  if (pathname.startsWith("/admin/dashboard/") && userRole !== "Admin") {
    return NextResponse.redirect(new URL("/not-found", request.url));
  } else if (
    pathname.startsWith("/tenant/dashboard/") &&
    userRole !== "Customer"
  ) {
    return NextResponse.redirect(new URL("/not-found", request.url));
  } else if (
    pathname.startsWith("/owner/dashboard/") &&
    userRole !== "Provider"
  ) {
    return NextResponse.redirect(new URL("/not-found", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|uploads).*)"],
};
