import { EmsAddressToolView } from "@/components/tools/EmsAddressToolView";
import { getEmsAddressMetadata } from "@/lib/tools/ems-address-metadata";
import type { Metadata } from "next";

export const metadata: Metadata = getEmsAddressMetadata();

export default function ToolsSiteEmsAddressPage() {
  return <EmsAddressToolView backHref="/" backLabel="← All tools" />;
}
