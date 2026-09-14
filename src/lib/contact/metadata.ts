import { buildPageMetadata } from "@/lib/site-metadata";
import { seoBrandPhrase } from "@/lib/seo/keywords";

export function getContactMetadata() {
  return buildPageMetadata({
    title: "Contact",
    description:
      `Reach ${seoBrandPhrase()} for Korean learning questions, vocabulary ideas, and collaboration.`,
    path: "/contact",
  });
}
