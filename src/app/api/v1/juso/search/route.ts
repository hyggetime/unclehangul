import { NextResponse } from "next/server";

import { buildJusoSearchKeyword } from "@/lib/tools/kr-address-converter/core/juso-keyword.js";
import {
  mergeJusoVerified,
  pickBestJusoMatch,
  sanitizeJusoKeyword,
} from "@/lib/tools/kr-address-converter/core/juso-match.js";

const JUSO_API = "https://business.juso.go.kr/addrlink/addrLinkApi.do";
const CONF_KEY = process.env.JUSO_CONFM_KEY?.trim();
const CACHE_TTL_MS = 5 * 60 * 1000;

type JusoRow = Record<string, string>;

type CacheEntry = {
  expires: number;
  body: Record<string, unknown>;
};

const cache = new Map<string, CacheEntry>();

type SearchBody = {
  keyword?: string;
  parsed?: {
    province?: string;
    district?: string;
    locality?: string;
    detail?: string;
    zip?: string;
    koreanAddress?: string;
  };
};

/** Proxies MOIS road-name address search for KR Address Formatter verification. */
export async function POST(request: Request) {
  if (!CONF_KEY) {
    return NextResponse.json(
      {
        status: "error",
        errorMessage: "Juso API is not configured.",
      },
      { status: 503 },
    );
  }

  let body: SearchBody;
  try {
    body = (await request.json()) as SearchBody;
  } catch {
    return NextResponse.json(
      { status: "error", errorMessage: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const parsed = body.parsed ?? {};
  const keyword = sanitizeJusoKeyword(
    body.keyword?.trim() || buildJusoSearchKeyword(parsed),
  );

  if (keyword.length < 4) {
    return NextResponse.json({
      status: "ok",
      verification: "skipped",
      reason: "keyword_too_short",
    });
  }

  const cached = cache.get(keyword);
  if (cached && cached.expires > Date.now()) {
    return NextResponse.json(cached.body);
  }

  const params = new URLSearchParams({
    confmKey: CONF_KEY,
    currentPage: "1",
    countPerPage: "5",
    keyword,
    resultType: "json",
    hstryYn: "N",
    firstSort: "road",
  });

  let upstream: Response;
  try {
    upstream = await fetch(`${JUSO_API}?${params.toString()}`, {
      cache: "no-store",
      signal: AbortSignal.timeout(12_000),
    });
  } catch (error) {
    const timedOut =
      error instanceof Error &&
      (error.name === "TimeoutError" || error.name === "AbortError");
    return NextResponse.json(
      {
        status: "error",
        errorMessage: timedOut
          ? "Address API timed out."
          : "Could not reach the address API.",
      },
      { status: timedOut ? 504 : 502 },
    );
  }

  if (!upstream.ok) {
    return NextResponse.json(
      {
        status: "error",
        errorMessage: "Address API returned an error.",
      },
      { status: 502 },
    );
  }

  let payload: {
    results?: {
      common?: { errorCode?: string; errorMessage?: string; totalCount?: string };
      juso?: JusoRow[];
    };
  };

  try {
    payload = (await upstream.json()) as typeof payload;
  } catch {
    return NextResponse.json(
      {
        status: "error",
        errorMessage: "Invalid address API response.",
      },
      { status: 502 },
    );
  }

  const common = payload.results?.common;
  if (common?.errorCode && common.errorCode !== "0") {
    return NextResponse.json(
      {
        status: "error",
        errorMessage: common.errorMessage ?? "Address API error.",
        errorCode: common.errorCode,
      },
      { status: 502 },
    );
  }

  const candidates = payload.results?.juso ?? [];
  const picked = pickBestJusoMatch(candidates, parsed);
  const totalCount = Number(common?.totalCount ?? candidates.length) || 0;

  const responseBody: Record<string, unknown> = {
    status: "ok",
    verification: picked.verification,
    totalCount,
    candidateCount: candidates.length,
    score: picked.score,
  };

  if (picked.match && picked.verification === "verified") {
    responseBody.fields = mergeJusoVerified(parsed, picked.match);
    responseBody.match = {
      roadAddr: picked.match.roadAddr,
      engAddr: picked.match.engAddr,
      zipNo: picked.match.zipNo,
    };
  } else if (picked.match && picked.verification === "partial") {
    responseBody.match = {
      roadAddr: picked.match.roadAddr,
      engAddr: picked.match.engAddr,
      zipNo: picked.match.zipNo,
    };
  }

  cache.set(keyword, {
    expires: Date.now() + CACHE_TTL_MS,
    body: responseBody,
  });

  return NextResponse.json(responseBody);
}
