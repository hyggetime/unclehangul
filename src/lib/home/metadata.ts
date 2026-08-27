import { buildPageMetadata } from "@/lib/site-metadata";

export function getHomeMetadata() {
  return buildPageMetadata({
    title: "Home",
    description:
      "Learn Korean through Hangul design — articles, Hangul Play widgets, and links to @unclehangul on YouTube and Instagram.",
    path: "/",
  });
}
