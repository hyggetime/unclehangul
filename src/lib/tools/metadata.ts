import { buildPageMetadata } from "@/lib/site-metadata";
import { seoBrandPhrase } from "@/lib/seo/keywords";

export function getToolsIndexMetadata() {
  return buildPageMetadata({
    title: "Tools",
    description:
      `${seoBrandPhrase()} tools — Korean language utilities and seller logistics apps for global shipping from Korea.`,
    path: "/tools",
  });
}
