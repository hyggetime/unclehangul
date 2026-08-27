import type { Metadata } from "next";
import { PackOptimizerPageClient } from "@/components/features/pack-optimizer/PackOptimizerPageClient";
import { getPackOptimizerAppMetadata } from "@/lib/tools/pack-optimizer-metadata";

export const metadata: Metadata = getPackOptimizerAppMetadata();

export default function PackOptimizerAppPage() {
  return <PackOptimizerPageClient />;
}
