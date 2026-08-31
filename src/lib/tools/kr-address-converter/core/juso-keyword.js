import { buildKoreanAddress } from "./parser.js";

const UNIT_RE = /(?:지하)?\d+층|\d+호|\b\d+동(?=\s|$)/g;

/**
 * Build a Juso search keyword from parsed fields (exclude floor/room units).
 * @param {{ province?: string, district?: string, locality?: string, detail?: string, zip?: string, koreanAddress?: string }} parsed
 * @returns {string}
 */
export function buildJusoSearchKeyword(parsed) {
  const base = collapseSpaces(parsed.koreanAddress || buildKoreanAddress(parsed));
  if (!base) return "";

  const keyword = collapseSpaces(normalizeRoadOrder(base.replace(UNIT_RE, " ")));
  if (keyword.length < 4) return "";

  const hasAdmin = /[가-힣]+(?:특별시|광역시|특별자치시|특별자치도|도)\s|[가-힣]+(?:구|군|시)\s/.test(
    `${keyword} `,
  );
  const hasRoad =
    /[가-힣]+(?:로|길|대로)\s*\d/.test(keyword) ||
    /\d+\s*[가-힣]+(?:로|길|대로)/.test(keyword) ||
    /\d+\s*-?\s*\d+/.test(keyword);

  if (!hasAdmin && !hasRoad) return "";
  return keyword;
}

function collapseSpaces(value) {
  return String(value ?? "")
    .replace(/\s+/g, " ")
    .trim();
}

/** Juso expects road name before building number (e.g. 서강로 19-4). */
function normalizeRoadOrder(keyword) {
  let result = keyword.replace(
    /(\d+(?:-\d+)?)\s+([가-힣]+(?:로|길|대로))/g,
    "$2 $1",
  );
  // Sub-building numbers (19-4) often miss in search; use main number (19).
  result = result.replace(
    /([가-힣]+(?:로|길|대로))\s+(\d+)-\d+/g,
    "$1 $2",
  );
  return result;
}
