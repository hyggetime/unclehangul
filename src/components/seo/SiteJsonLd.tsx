import { JsonLd, buildOrganizationJsonLd } from "@/lib/seo/json-ld";

/** Site-wide Organization + WebSite schema for search and answer engines. */
export function SiteJsonLd() {
  return <JsonLd data={buildOrganizationJsonLd()} />;
}
