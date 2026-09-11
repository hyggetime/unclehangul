import { normalizeAdSenseClientId } from "@/lib/ads/client-id";
import { NextResponse } from "next/server";

/** AdSense ads.txt — served when publisher id is configured. */
export function GET() {
  const clientId = normalizeAdSenseClientId(
    process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID,
  );
  if (!clientId) {
    return new NextResponse("Not configured", { status: 404 });
  }

  const publisherId = clientId.replace(/^ca-pub-/, "pub-");
  const body = `google.com, ${publisherId}, DIRECT, f08c47fec0942fa0\n`;

  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
