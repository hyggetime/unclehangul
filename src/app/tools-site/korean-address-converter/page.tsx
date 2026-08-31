import { KrAddressFormatterToolView } from "@/components/tools/KrAddressFormatterToolView";
import { getKoreanAddressConverterMetadata } from "@/lib/tools/korean-address-converter-metadata";
import type { Metadata } from "next";

export const metadata: Metadata = getKoreanAddressConverterMetadata();

export default function ToolsSiteKoreanAddressConverterPage() {
  return <KrAddressFormatterToolView backHref="/" backLabel="← All tools" />;
}
