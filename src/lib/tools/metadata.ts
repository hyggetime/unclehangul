import { buildPageMetadata } from "@/lib/site-metadata";

export function getToolsIndexMetadata() {
  return buildPageMetadata({
    title: "Tools",
    description:
      "Uncle Hangul tool archive—language, design, utility, and automation web apps on a shared minimal grid.",
    path: "/tools",
  });
}
