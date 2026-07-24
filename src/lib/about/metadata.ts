import type { Metadata } from "next";
import { loadAboutContent } from "@/lib/about/load-about";
import { buildPageMetadata } from "@/lib/site-metadata";

export function getAboutMetadata(): Metadata {
  const about = loadAboutContent();
  return buildPageMetadata({
    title: about.title,
    description: about.description,
    path: "/about",
    openGraphType: "profile",
  });
}
