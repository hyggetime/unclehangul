import {
  getKoreanAddressConverterUrl,
  getToolsSiteUrl,
} from "@/lib/domains";
import { sellerToolKeywords } from "@/lib/seo/keywords";
import { buildPageMetadata } from "@/lib/site-metadata";

export function getKoreanAddressConverterMetadata() {
  const toolsOrigin = getToolsSiteUrl();

  return buildPageMetadata({
    title:
      "Korean Address Converter & Form Splitter | UncleHangul",
    description:
      "Convert South Korean addresses written in English. Split into Province, District, Locality, and Detail—with the Hangul address line for Amazon, iHerb, and inbound shipping.",
    path: "/korean-address-converter",
    siteOrigin: toolsOrigin,
    canonicalUrl: getKoreanAddressConverterUrl(),
    absoluteTitle: true,
    locale: "en_US",
    keywords: sellerToolKeywords([
      "Korean address converter",
      "Korea address in English",
      "Korean address format",
      "Korean address line 1 line 2",
      "South Korea postal code lookup",
      "Korea ZIP code",
      "inbound shipping to Korea",
      "Korean address for Amazon",
    ]),
  });
}
