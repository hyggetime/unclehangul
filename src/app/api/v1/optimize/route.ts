import { NextResponse } from "next/server";

const UPSTREAM = process.env.PACK_OPTIMIZER_API_UPSTREAM?.replace(/\/+$/, "");

/** Proxies to the pack engine API (set PACK_OPTIMIZER_API_UPSTREAM). */
export async function POST(request: Request) {
  if (!UPSTREAM) {
    return NextResponse.json(
      {
        status: "error",
        errorMessage: "Pack Optimizer API is not configured.",
      },
      { status: 503 },
    );
  }

  const body = await request.text();

  const upstream = await fetch(`${UPSTREAM}/api/v1/optimize`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    cache: "no-store",
  });

  return new Response(await upstream.text(), {
    status: upstream.status,
    headers: { "Content-Type": "application/json" },
  });
}
