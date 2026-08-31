import { getKrAddressFormatterUrl, getToolsSiteUrl } from "@/lib/domains";
import { sellerToolKeywords } from "@/lib/seo/keywords";
import { buildPageMetadata } from "@/lib/site-metadata";

export function getKrAddressFormatterMetadata() {
  const toolsOrigin = getToolsSiteUrl();

  return buildPageMetadata({
    title:
      "Korean Address in English Converter & Form Splitter | UncleHangul",
    description:
      "Easily convert South Korean addresses into English format. Automatically splits into Address Line 1, Line 2, City, and Zip Code for Amazon, iHerb, and international shipping.",
    path: "/kr-address-formatter",
    siteOrigin: toolsOrigin,
    canonicalUrl: getKrAddressFormatterUrl(),
    absoluteTitle: true,
    locale: "en_US",
    keywords: sellerToolKeywords([
      "Korea address in English",
      "Korean address format",
      "Korean address line 1 line 2",
      "South Korea postal code lookup",
      "Korean address converter",
      "Korea ZIP code",
      "inbound shipping to Korea",
    ]),
  });
}
