import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  PACK_SITE_PATH_PREFIX,
  TOOLS_SITE_PATH_PREFIX,
  getEmsAddressUrl,
  getPackSiteUrl,
  getToolsSiteUrl,
  isPackHost,
  isToolsHost,
} from "@/lib/domains";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host");
  const { pathname } = request.nextUrl;
  const onToolsHost = isToolsHost(host);
  const onPackHost = isPackHost(host);

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico" ||
    /\.[a-z0-9]+$/i.test(pathname)
  ) {
    return NextResponse.next();
  }

  if (!onToolsHost && !onPackHost && pathname.startsWith(TOOLS_SITE_PATH_PREFIX)) {
    const suffix = pathname.slice(TOOLS_SITE_PATH_PREFIX.length) || "/";
    return NextResponse.redirect(new URL(suffix, getToolsSiteUrl()), 301);
  }

  if (!onPackHost && pathname.startsWith(PACK_SITE_PATH_PREFIX)) {
    const suffix = pathname.slice(PACK_SITE_PATH_PREFIX.length) || "/";
    return NextResponse.redirect(new URL(suffix, getPackSiteUrl()), 301);
  }

  if (onToolsHost) {
    if (pathname === "/sitemap.xml") {
      return NextResponse.rewrite(
        new URL("/tools-site/sitemap.xml", request.url),
      );
    }

    const internalPath =
      pathname === "/"
        ? TOOLS_SITE_PATH_PREFIX
        : `${TOOLS_SITE_PATH_PREFIX}${pathname}`;

    if (pathname === "/tools/ems-address") {
      return NextResponse.redirect(getEmsAddressUrl(), 301);
    }

    return NextResponse.rewrite(new URL(internalPath, request.url));
  }

  if (onPackHost) {
    const internalPath =
      pathname === "/"
        ? `${PACK_SITE_PATH_PREFIX}/pack-optimizer`
        : `${PACK_SITE_PATH_PREFIX}${pathname}`;

    return NextResponse.rewrite(new URL(internalPath, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
