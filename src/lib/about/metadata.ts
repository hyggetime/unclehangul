import type { Metadata } from "next";
import { loadAboutContent } from "@/lib/about/load-about";
import { buildPageMetadata } from "@/lib/site-metadata";
import { learningPageKeywords, seoBrandPhrase, seoScriptPhrase } from "@/lib/seo/keywords";

export function getAboutMetadata(): Metadata {
  const about = loadAboutContent();
  return buildPageMetadata({
    title: about.title,
    description: `${about.description} ${seoBrandPhrase()}. Learn ${seoScriptPhrase()} through visual context and cultural nuance.`,
    path: "/about",
    openGraphType: "profile",
    keywords: learningPageKeywords(["about", "Korean teacher", "language acquisition"]),
  });
}
