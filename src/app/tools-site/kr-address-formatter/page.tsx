import { KrAddressFormatterToolView } from "@/components/tools/KrAddressFormatterToolView";
import { getKrAddressFormatterMetadata } from "@/lib/tools/kr-address-metadata";
import type { Metadata } from "next";

export const metadata: Metadata = getKrAddressFormatterMetadata();

export default function ToolsSiteKrAddressFormatterPage() {
  return <KrAddressFormatterToolView backHref="/" backLabel="← All tools" />;
}
