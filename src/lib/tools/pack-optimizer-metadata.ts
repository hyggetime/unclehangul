import { buildPageMetadata } from "@/lib/site-metadata";

export function getPackOptimizerMetadata() {
  return buildPageMetadata({
    title: "Pack Optimizer",
    description:
      "Logistics pack optimization—plan cartons and loads with the Uncle Hangul pack engine.",
    path: "/tools/pack-optimizer",
  });
}
