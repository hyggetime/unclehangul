import { EmsAddressToolView } from "@/components/tools/EmsAddressToolView";
import { getOverseasAddressConverterMetadata } from "@/lib/tools/overseas-address-converter-metadata";
import type { Metadata } from "next";

export const metadata: Metadata = getOverseasAddressConverterMetadata();

export default function ToolsSiteOverseasAddressConverterPage() {
  return <EmsAddressToolView backHref="/" backLabel="← All tools" />;
}
