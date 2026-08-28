import { buildPageMetadata } from "@/lib/site-metadata";
import { learningPageKeywords, seoBrandPhrase } from "@/lib/seo/keywords";

export function getContactMetadata() {
  return buildPageMetadata({
    title: "Contact",
    description:
      `Reach ${seoBrandPhrase()} for Korean learning questions, vocabulary ideas, and collaboration.`,
    path: "/contact",
    keywords: learningPageKeywords(["contact", "collaboration"]),
  });
}
