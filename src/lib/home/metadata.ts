import { buildPageMetadata } from "@/lib/site-metadata";
import { seoBrandPhrase, seoScriptPhrase } from "@/lib/seo/keywords";

export function getHomeMetadata() {
  return buildPageMetadata({
    title: "Uncle Hangul — Learn Korean Through Hangul Design",
    description:
      `Learn Korean through ${seoScriptPhrase()} design — articles, Hangul Play widgets, and links to @unclehangul on YouTube and Instagram. ${seoBrandPhrase()}.`,
    path: "/",
    absoluteTitle: true,
  });
}
