import { buildPageMetadata } from "@/lib/site-metadata";

export function getContactMetadata() {
  return buildPageMetadata({
    title: "Contact",
    description:
      "Reach Uncle Han-guel for Korean learning questions, vocabulary ideas, and collaboration.",
    path: "/contact",
  });
}
