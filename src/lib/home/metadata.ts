import { buildPageMetadata } from "@/lib/site-metadata";
import { learningPageKeywords, seoBrandPhrase, seoScriptPhrase } from "@/lib/seo/keywords";

export function getHomeMetadata() {
  return buildPageMetadata({
    title: "Home",
    description:
      `Learn Korean through ${seoScriptPhrase()} design — articles, Hangul Play widgets, and links to @unclehangul on YouTube and Instagram. ${seoBrandPhrase()}.`,
    path: "/",
    keywords: learningPageKeywords(["Hangul Play", "name to Hangul", "Korean typography"]),
  });
}
