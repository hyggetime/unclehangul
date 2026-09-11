import { normalizeAdSenseClientId } from "@/lib/ads/client-id";

/** AdSense site verification / auto-ads loader — production only, requires env. */
const adClient = normalizeAdSenseClientId(
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID,
);

export function AdSenseScript() {
  if (!adClient || process.env.NODE_ENV === "development") {
    return null;
  }

  return (
    <script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`}
      crossOrigin="anonymous"
    />
  );
}
