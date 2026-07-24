import { buildPageMetadata } from "@/lib/site-metadata";

export function getHomeMetadata() {
  return buildPageMetadata({
    title: "Home",
    description:
      "Typography-first Korean learning—lessons, tools, and video from Uncle Han-guel (한글아저씨).",
    path: "/",
  });
}
