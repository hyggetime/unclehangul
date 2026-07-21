/** Canonical site origin for sitemap, robots, and metadata. */
export function getSiteUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.SITE_URL ??
    "https://unclehangul.com";

  return raw.replace(/\/+$/, "");
}
