import { NextResponse } from "next/server";

const UPSTREAM = process.env.PACK_OPTIMIZER_API_UPSTREAM?.trim().replace(/\/+$/, "");

/** Hosts served by this repo — using them as upstream causes a proxy loop. */
const LOOP_HOSTS = new Set([
  "unclehangul.com",
  "pack.unclehangul.com",
  "tools.unclehangul.com",
]);

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

  let upstreamUrl: URL;
  try {
    upstreamUrl = new URL(UPSTREAM);
  } catch {
    return NextResponse.json(
      {
        status: "error",
        errorMessage: "PACK_OPTIMIZER_API_UPSTREAM is not a valid URL.",
      },
      { status: 503 },
    );
  }

  if (LOOP_HOSTS.has(upstreamUrl.host)) {
    return NextResponse.json(
      {
        status: "error",
        errorMessage:
          "PACK_OPTIMIZER_API_UPSTREAM must point to the CraftCam engine deploy, not this site (proxy loop). Use the craft-cam *.vercel.app URL.",
      },
      { status: 503 },
    );
  }

  const body = await request.text();

  try {
    const upstream = await fetch(`${upstreamUrl.origin}/api/v1/optimize`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      cache: "no-store",
    });

    const text = await upstream.text();
    const contentType =
      upstream.headers.get("content-type") ?? "application/json";

    return new Response(text, {
      status: upstream.status,
      headers: { "Content-Type": contentType },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Upstream request failed.";
    return NextResponse.json(
      { status: "error", errorMessage: message },
      { status: 502 },
    );
  }
}
