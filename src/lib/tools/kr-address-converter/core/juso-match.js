import { matchDistrict, matchProvince } from "./regions.js";

function collapseSpaces(value) {
  return String(value ?? "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * @param {string} detail
 * @param {string} [koreanAddress]
 * @returns {string[]}
 */
function extractUnitParts(detail, koreanAddress = "") {
  const text = String(detail ?? "");
  const units = [];

  for (const match of text.matchAll(/(?:지하)?\d+층|\d+호|\b\d+동\b/gi)) {
    units.push(match[0]);
  }
  for (const match of text.matchAll(/\bB\s*(\d+)\s*F\b/gi)) units.push(`지하${match[1]}층`);
  for (const match of text.matchAll(/\b(\d+)\s*F\b/gi)) units.push(`${match[1]}층`);
  for (const match of text.matchAll(/\b(?:Room|Rm\.?)\s*(\d+[A-Za-z-]*)\b/gi)) {
    units.push(`${match[1]}호`);
  }

  for (const match of String(koreanAddress ?? "").matchAll(/(?:지하)?\d+층|\d+호/g)) {
    if (!units.includes(match[0])) units.push(match[0]);
  }

  return units;
}

/**
 * @param {{ rn?: string, buldMnnm?: string, buldSlno?: string }} juso
 */
function formatRoadDetail(juso) {
  const rn = juso.rn ?? "";
  const main = juso.buldMnnm ?? "";
  const sub = juso.buldSlno && juso.buldSlno !== "0" ? juso.buldSlno : "";
  if (!rn && !main) return "";
  if (main && sub) return collapseSpaces(`${rn} ${main}-${sub}`);
  if (main) return collapseSpaces(`${rn} ${main}`);
  return rn;
}

/**
 * @param {{ province?: string, district?: string, detail?: string, zip?: string }} parsed
 * @param {{ siNm?: string, sggNm?: string, emdNm?: string, zipNo?: string, buldMnnm?: string, buldSlno?: string, rn?: string }} juso
 */
function scoreJusoMatch(parsed, juso) {
  let score = 0;

  const zipParsed = String(parsed.zip ?? "").replace(/\D/g, "");
  const zipJuso = String(juso.zipNo ?? "").replace(/\D/g, "");
  if (zipParsed && zipJuso && zipParsed === zipJuso) score += 4;

  const districtKo = matchDistrict(parsed.district, parsed.province)?.ko ?? "";
  if (districtKo && juso.sggNm === districtKo) score += 3;
  else if (districtKo && juso.sggNm?.includes(districtKo.replace(/(구|군|시)$/, ""))) {
    score += 2;
  }

  const provinceKo = matchProvince(parsed.province)?.ko ?? "";
  if (provinceKo && juso.siNm === provinceKo) score += 2;

  const building = parsed.detail?.match(/(\d+)\s*-?\s*(\d+)?/);
  if (building) {
    if (juso.buldMnnm === building[1]) score += 3;
    if (building[2] && juso.buldSlno === building[2]) score += 2;
    if (building[2] && juso.buldSlno === "0" && building[2]) score -= 1;
  }

  return score;
}

/**
 * @param {Array<Record<string, string>>} candidates
 * @param {{ province?: string, district?: string, detail?: string, zip?: string }} parsed
 */
export function pickBestJusoMatch(candidates, parsed) {
  if (!candidates?.length) {
    return { verification: "not_found", match: null, score: 0, totalCount: 0 };
  }

  let best = candidates[0];
  let bestScore = scoreJusoMatch(parsed, best);

  for (let i = 1; i < candidates.length; i += 1) {
    const score = scoreJusoMatch(parsed, candidates[i]);
    if (score > bestScore) {
      best = candidates[i];
      bestScore = score;
    }
  }

  let verification = "not_found";
  if (bestScore >= 5) verification = "verified";
  else if (bestScore >= 2) verification = "partial";

  return {
    verification,
    match: best,
    score: bestScore,
    totalCount: candidates.length,
  };
}

/**
 * Merge official Juso row into parsed fields; keep floor/room from local detail.
 * @param {Record<string, string>} parsed
 * @param {Record<string, string>} juso
 */
export function mergeJusoVerified(parsed, juso) {
  const units = extractUnitParts(parsed.detail, parsed.koreanAddress);
  const roadDetail = formatRoadDetail(juso);
  const detail = collapseSpaces([roadDetail, ...units].filter(Boolean).join(" "));

  const province = juso.siNm || parsed.province || "";
  const district = juso.sggNm || parsed.district || "";
  const locality = juso.emdNm || parsed.locality || "";
  const zip = String(juso.zipNo ?? parsed.zip ?? "").replace(/\D/g, "");
  const koreanAddress = collapseSpaces(
    [province, district, locality, detail].filter(Boolean).join(" "),
  );

  return {
    province,
    district,
    locality,
    detail,
    zip,
    koreanAddress,
  };
}

/**
 * @param {string} raw
 */
export function sanitizeJusoKeyword(raw) {
  return String(raw ?? "")
    .replace(/[%=><]/g, " ")
    .replace(
      /\b(?:or|and|insert|union|select|delete|update|create|drop|exec|count|chr|mid|master|truncate|char|declare)\b/gi,
      " ",
    )
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 80);
}
