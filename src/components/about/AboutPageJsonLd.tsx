import { ABOUT_BRAND_FAQ } from "@/lib/about/brand-faq";
import { JsonLd, buildFaqPageJsonLd } from "@/lib/seo/json-ld";
import { getSiteUrl } from "@/lib/site-url";

export function AboutPageJsonLd() {
  const pageUrl = `${getSiteUrl()}/about`;
  return <JsonLd data={buildFaqPageJsonLd(pageUrl, [...ABOUT_BRAND_FAQ])} />;
}
