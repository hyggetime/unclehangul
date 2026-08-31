import { getSiteUrl } from "@/lib/site-url";

export const MAIN_SITE_HOST = "unclehangul.com";
export const TOOLS_SITE_HOST = "tools.unclehangul.com";
export const PACK_SITE_HOST = "pack.unclehangul.com";

const TOOLS_HOSTS = new Set([
  TOOLS_SITE_HOST,
  `www.${TOOLS_SITE_HOST}`,
]);

const PACK_HOSTS = new Set([
  PACK_SITE_HOST,
  `www.${PACK_SITE_HOST}`,
]);

export function getToolsSiteUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_TOOLS_SITE_URL ?? `https://${TOOLS_SITE_HOST}`;
  return raw.replace(/\/+$/, "");
}

export function getPackSiteUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_PACK_SITE_URL ?? `https://${PACK_SITE_HOST}`;
  return raw.replace(/\/+$/, "");
}

export function getPackOptimizerUrl(): string {
  return `${getPackSiteUrl()}/pack-optimizer`;
}

/** Inbound: Korean address written in English → admin split + Hangul. */
export function getKoreanAddressConverterUrl(): string {
  return `${getToolsSiteUrl()}/korean-address-converter`;
}

/** Outbound: overseas English address → EMS / DHL / FedEx form fields. */
export function getOverseasAddressConverterUrl(): string {
  return `${getToolsSiteUrl()}/overseas-address-converter`;
}

export function isToolsHost(host: string | null | undefined): boolean {
  if (!host) return false;
  const normalized = host.split(":")[0]?.toLowerCase() ?? "";
  return TOOLS_HOSTS.has(normalized);
}

export function isPackHost(host: string | null | undefined): boolean {
  if (!host) return false;
  const normalized = host.split(":")[0]?.toLowerCase() ?? "";
  return PACK_HOSTS.has(normalized);
}

export function isMainHost(host: string | null | undefined): boolean {
  if (!host) return true;
  const normalized = host.split(":")[0]?.toLowerCase() ?? "";
  return (
    normalized === MAIN_SITE_HOST ||
    normalized === `www.${MAIN_SITE_HOST}` ||
    normalized === "localhost" ||
    normalized.endsWith(".vercel.app")
  );
}

/** Internal path prefix rewritten for tools.unclehangul.com requests. */
export const TOOLS_SITE_PATH_PREFIX = "/tools-site";

/** Internal path prefix rewritten for pack.unclehangul.com requests. */
export const PACK_SITE_PATH_PREFIX = "/pack-site";

export function getMainSiteUrl(): string {
  return getSiteUrl();
}

/** Legacy slug — use getOverseasAddressConverterUrl(). */
export const LEGACY_EMS_ADDRESS_PATH = "/ems-address";

/** Legacy slug — use getKoreanAddressConverterUrl(). */
export const LEGACY_KR_ADDRESS_FORMATTER_PATH = "/kr-address-formatter";
