import {
  getEmsAddressUrl,
  getKrAddressFormatterUrl,
  getToolsSiteUrl,
} from "@/lib/domains";

export async function GET(): Promise<Response> {
  const base = getToolsSiteUrl();
  const now = new Date().toISOString();

  const urls = [
    { loc: `${base}/`, priority: "0.9" },
    { loc: getEmsAddressUrl(), priority: "0.85" },
    { loc: getKrAddressFormatterUrl(), priority: "0.85" },
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (entry) => `  <url>
    <loc>${entry.loc}</loc>
    <lastmod>${now}</lastmod>
    <priority>${entry.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
