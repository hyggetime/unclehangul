import {
  buildingNumber,
  formatLine1,
  parseEngAddr,
  pickCityDistrict,
  pickState,
} from "@/lib/tools/kr-address/format";
import type { JusoSearchHit, JusoSearchResponse } from "@/lib/tools/kr-address/types";

const ENG_ENDPOINT = "https://www.juso.go.kr/addrlink/addrEngApi.do";
const KOR_ENDPOINT = "https://www.juso.go.kr/addrlink/addrLinkApi.do";

const BANNED_SPECIAL = /[%=><]/;
const BANNED_SQL =
  /\b(OR|SELECT|INSERT|DELETE|UPDATE|CREATE|DROP|EXEC|UNION|FETCH|DECLARE|TRUNCATE)\b/i;

type JusoCommon = {
  errorCode?: string;
  errorMessage?: string;
  totalCount?: string;
  currentPage?: string;
  countPerPage?: string;
};

type EngJusoRow = {
  zipNo?: string;
  roadAddr?: string;
  jibunAddr?: string;
  korAddr?: string;
  siNm?: string;
  sggNm?: string;
  emdNm?: string;
  rn?: string;
  buldMnnm?: string;
  buldSlno?: string;
  bdNm?: string;
  admCd?: string;
  rnMgtSn?: string;
  udrtYn?: string;
};

type KorJusoRow = {
  zipNo?: string;
  roadAddr?: string;
  roadAddrPart1?: string;
  roadAddrPart2?: string;
  jibunAddr?: string;
  engAddr?: string;
  siNm?: string;
  sggNm?: string;
  emdNm?: string;
  rn?: string;
  buldMnnm?: string;
  buldSlno?: string;
  bdNm?: string;
  admCd?: string;
  rnMgtSn?: string;
};

type JusoEnvelope<T> = {
  results?: {
    common?: JusoCommon;
    juso?: T[] | null;
  };
};

export function sanitizeJusoKeyword(raw: string): string | { error: string } {
  const keyword = raw.replace(/\s+/g, " ").trim();
  if (keyword.length < 2) {
    return { error: "Enter at least 2 characters of a Korean street address." };
  }
  if (keyword.length > 80) {
    return { error: "Search is limited to 80 characters." };
  }
  if (BANNED_SPECIAL.test(keyword) || BANNED_SQL.test(keyword)) {
    return { error: "Remove special characters or SQL-like words from the search." };
  }
  return keyword;
}

function hitId(zip: string, line1: string, koreanBase: string): string {
  return [zip, line1, koreanBase].filter(Boolean).join("|");
}

function fromEngRow(row: EngJusoRow): JusoSearchHit | null {
  const zip = (row.zipNo ?? "").trim();
  const line1 = formatLine1(row.rn ?? "", row.buldMnnm ?? "", row.buldSlno ?? "");
  const state = pickState(row.siNm ?? "");
  const city = pickCityDistrict(row.sggNm ?? "", row.emdNm ?? "", row.siNm ?? "");
  const koreanBase = (row.korAddr ?? "").trim();
  const englishFull = (row.roadAddr ?? "").trim() || [line1, city, state].filter(Boolean).join(", ");

  if (!line1 && !englishFull && !koreanBase) return null;

  return {
    id: hitId(zip, line1 || englishFull, koreanBase),
    zip,
    line1: line1 || parseEngAddr(englishFull).line1,
    city,
    state,
    koreanBase,
    englishFull,
    roadNameEn: (row.rn ?? "").trim(),
    buildingNumber: formatLine1("", row.buldMnnm ?? "", row.buldSlno ?? ""),
    buildingName: (row.bdNm ?? "").trim() || undefined,
  };
}

function fromKorRow(row: KorJusoRow): JusoSearchHit | null {
  const parsed = parseEngAddr(row.engAddr ?? "");
  const zip = (row.zipNo ?? "").trim();
  const number = buildingNumber(row.buldMnnm ?? "", row.buldSlno ?? "");
  const roadEn = parsed.line1.replace(/^\d+(-\d+)?\s*/, "").trim();
  const line1 =
    parsed.line1 ||
    (number && roadEn ? `${number} ${roadEn}` : "");
  const koreanBase = (row.roadAddrPart1 ?? row.roadAddr ?? "").trim();
  const englishFull =
    (row.engAddr ?? "").trim() ||
    [line1, parsed.city, parsed.state].filter(Boolean).join(", ");

  if (!line1 && !koreanBase) return null;

  return {
    id: hitId(zip, line1 || englishFull, koreanBase),
    zip,
    line1,
    city: parsed.city,
    state: parsed.state,
    koreanBase,
    englishFull,
    roadNameEn: roadEn,
    buildingNumber: number,
    buildingName: (row.bdNm ?? "").trim() || undefined,
  };
}

function mergeHits(primary: JusoSearchHit[], extra: JusoSearchHit[]): JusoSearchHit[] {
  const byKey = new Map<string, JusoSearchHit>();

  function keyOf(hit: JusoSearchHit): string {
    return `${hit.zip}|${hit.buildingNumber}|${hit.line1}`.toLowerCase();
  }

  for (const hit of primary) {
    byKey.set(keyOf(hit), hit);
  }

  for (const hit of extra) {
    const key = keyOf(hit);
    const existing = byKey.get(key);
    if (!existing) {
      byKey.set(key, hit);
      continue;
    }
    byKey.set(key, {
      ...existing,
      koreanBase: existing.koreanBase || hit.koreanBase,
      englishFull: existing.englishFull || hit.englishFull,
      city: existing.city || hit.city,
      state: existing.state || hit.state,
      buildingName: existing.buildingName || hit.buildingName,
    });
  }

  return [...byKey.values()];
}

function mapJusoError(code: string | undefined, message: string | undefined): string {
  switch (code) {
    case "E0001":
      return "The address API key is not approved. Check JUSO_API_KEY on the server.";
    case "E0005":
      return "The search keyword is empty or invalid.";
    case "E0008":
      return "Too many results — add a building number or district (예: 마포구 서강로 19).";
    case "E0009":
    case "E0010":
      return "The official address API is temporarily unavailable. Try again shortly.";
    default:
      return message && message !== "정상"
        ? message
        : "Address search failed.";
  }
}

async function fetchJusoJson<T>(
  endpoint: string,
  key: string,
  keyword: string,
  page: number,
  countPerPage: number,
): Promise<{ common: JusoCommon; rows: T[] }> {
  const referer =
    process.env.NEXT_PUBLIC_TOOLS_SITE_URL?.replace(/\/+$/, "") ??
    "https://tools.unclehangul.com";

  const params = new URLSearchParams({
    confmKey: key,
    currentPage: String(page),
    countPerPage: String(countPerPage),
    keyword,
    resultType: "json",
  });

  const response = await fetch(`${endpoint}?${params.toString()}`, {
    method: "GET",
    headers: {
      Accept: "application/json, text/plain, */*",
      Referer: `${referer}/kr-address-formatter`,
    },
    cache: "no-store",
  });

  const text = await response.text();
  if (!response.ok) {
    throw new Error(`juso.go.kr returned HTTP ${response.status}`);
  }

  let parsed: JusoEnvelope<T>;
  try {
    parsed = JSON.parse(text) as JusoEnvelope<T>;
  } catch {
    throw new Error("juso.go.kr returned a non-JSON response. Confirm the API key type.");
  }

  const common = parsed.results?.common ?? {};
  const rows = Array.isArray(parsed.results?.juso) ? parsed.results.juso : [];
  return { common, rows };
}

export async function searchJusoAddresses(options: {
  keyword: string;
  page?: number;
  countPerPage?: number;
}): Promise<JusoSearchResponse> {
  const sanitized = sanitizeJusoKeyword(options.keyword);
  if (typeof sanitized !== "string") {
    return {
      ok: false,
      page: 1,
      countPerPage: 10,
      totalCount: 0,
      hits: [],
      error: sanitized.error,
    };
  }

  const page = Math.max(1, options.page ?? 1);
  const countPerPage = Math.min(50, Math.max(5, options.countPerPage ?? 10));
  const engKey = process.env.JUSO_ENG_API_KEY?.trim() || process.env.JUSO_API_KEY?.trim();
  const korKey = process.env.JUSO_KOR_API_KEY?.trim() || process.env.JUSO_API_KEY?.trim();

  if (!engKey && !korKey) {
    return {
      ok: false,
      page,
      countPerPage,
      totalCount: 0,
      hits: [],
      error:
        "Address search is not configured. Set JUSO_API_KEY (MOIS juso.go.kr) on the server, or load the sample address.",
    };
  }

  try {
    const [eng, kor] = await Promise.all([
      engKey
        ? fetchJusoJson<EngJusoRow>(ENG_ENDPOINT, engKey, sanitized, page, countPerPage)
        : Promise.resolve(null),
      korKey
        ? fetchJusoJson<KorJusoRow>(KOR_ENDPOINT, korKey, sanitized, page, countPerPage)
        : Promise.resolve(null),
    ]);

    const engError = eng && eng.common.errorCode && eng.common.errorCode !== "0";
    const korError = kor && kor.common.errorCode && kor.common.errorCode !== "0";

    if (engError && (!kor || korError)) {
      return {
        ok: false,
        page,
        countPerPage,
        totalCount: 0,
        hits: [],
        error: mapJusoError(eng.common.errorCode, eng.common.errorMessage),
      };
    }

    const engHits = (eng && !engError ? eng.rows : [])
      .map(fromEngRow)
      .filter((hit): hit is JusoSearchHit => Boolean(hit));
    const korHits = (kor && !korError ? kor.rows : [])
      .map(fromKorRow)
      .filter((hit): hit is JusoSearchHit => Boolean(hit));

    const hits = mergeHits(engHits, korHits);
    const totalCount = Number(
      (!engError && eng?.common.totalCount) ||
        (!korError && kor?.common.totalCount) ||
        hits.length,
    );

    return {
      ok: true,
      page,
      countPerPage,
      totalCount: Number.isFinite(totalCount) ? totalCount : hits.length,
      hits,
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Address search failed.";
    return {
      ok: false,
      page,
      countPerPage,
      totalCount: 0,
      hits: [],
      error: message,
    };
  }
}
