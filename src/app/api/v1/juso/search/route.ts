import { NextResponse } from "next/server";
import { searchJusoAddresses } from "@/lib/tools/kr-address/juso";

const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 20;
const hitsByIp = new Map<string, { count: number; resetAt: number }>();

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return request.headers.get("x-real-ip") ?? "unknown";
}

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const current = hitsByIp.get(ip);
  if (!current || now >= current.resetAt) {
    hitsByIp.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  current.count += 1;
  return current.count > MAX_PER_WINDOW;
}

export async function GET(request: Request) {
  const ip = clientIp(request);
  if (rateLimited(ip)) {
    return NextResponse.json(
      {
        ok: false,
        page: 1,
        countPerPage: 10,
        totalCount: 0,
        hits: [],
        error: "Too many searches. Wait a moment and try again.",
      },
      { status: 429 },
    );
  }

  const url = new URL(request.url);
  const keyword = url.searchParams.get("q") ?? url.searchParams.get("keyword") ?? "";
  const page = Number(url.searchParams.get("page") ?? "1");
  const result = await searchJusoAddresses({
    keyword,
    page: Number.isFinite(page) ? page : 1,
  });

  const status = result.ok
    ? 200
    : result.error?.includes("not configured")
      ? 503
      : 400;

  return NextResponse.json(result, { status });
}
