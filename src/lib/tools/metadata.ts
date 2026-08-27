import { buildPageMetadata } from "@/lib/site-metadata";

export function getToolsIndexMetadata() {
  return buildPageMetadata({
    title: "Tools",
    description:
      "Uncle Hangul tools—Korean language utilities and seller logistics apps for global shipping from Korea.",
    path: "/tools",
  });
}
