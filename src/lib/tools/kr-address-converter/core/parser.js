import { foldDiacritics } from "../../ems-converter/core/sanitizer.js";
import {
  matchDistrict,
  matchProvince,
  romanWordToHangul,
} from "./regions.js";

const COUNTRY_RE =
  /\b(south\s*korea|republic\s*of\s*korea|rep\.?\s*of\s*korea|korea|rok|kr)\b/gi;

const ZIP_RE = /\b(\d{5})\b/;

const LOCALITY_RE = /^(.+?)(-dong|-myeon|-eup|-ri)$/i;
const DISTRICT_RE = /^(.+?)(-gu|-gun|-si)$/i;

const STREET_RE =
  /\b(\d+[a-z]?-?\d*\s*)?([a-z0-9]+(?:-[a-z0-9]+)*-(?:ro|gil|daero|no))\b|\b\d+\s*(?:f|floor|fl)\b|\b(?:room|rm|apt|unit|bldg|#)\b|\b\d+\s*-?\s*\d+\b/i;

const HANGUL_PROVINCE_RE =
  /(서울특별시|부산광역시|대구광역시|인천광역시|광주광역시|대전광역시|울산광역시|세종특별자치시|제주특별자치도|경기도|강원(?:특별자치)?도|충청북도|충청남도|전(?:북특별자치|라북|라남)도|경상북도|경상남도)/;
const HANGUL_DISTRICT_RE = /([가-힣]+(?:구|군|시))/;
const HANGUL_LOCALITY_RE = /([가-힣]+(?:동|읍|면|리))/;

function emptyResult() {
  return {
    province: "",
    district: "",
    locality: "",
    detail: "",
    zip: "",
    koreanAddress: "",
  };
}

function collapseSpaces(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

function splitParts(rawText) {
  const folded = foldDiacritics(rawText).replace(COUNTRY_RE, " ");
  const chunks = folded
    .split(/[\n,;]+/)
    .map((part) => collapseSpaces(part))
    .filter(Boolean);

  if (chunks.length) return chunks;

  const oneLine = collapseSpaces(folded);
  return oneLine ? [oneLine] : [];
}

function extractZip(parts) {
  const next = [];
  let zip = "";
  for (const part of parts) {
    const match = part.match(ZIP_RE);
    if (match && !zip) {
      zip = match[1];
      const stripped = collapseSpaces(part.replace(match[0], " "));
      if (stripped) next.push(stripped);
      continue;
    }
    next.push(part);
  }
  return { zip, parts: next };
}

function looksLikeStreet(part) {
  return STREET_RE.test(part);
}

function looksLikeLocality(part) {
  return LOCALITY_RE.test(part) || HANGUL_LOCALITY_RE.test(part);
}

function looksLikeDistrict(part) {
  return DISTRICT_RE.test(part) || HANGUL_DISTRICT_RE.test(part);
}

function englishDetailToKorean(detail) {
  let text = String(detail ?? "");
  if (!text.trim()) return "";
  if (/[가-힣]/.test(text)) return collapseSpaces(text);

  text = text.replace(/\bB\s*(\d+)\s*F\b/gi, "지하$1층");
  text = text.replace(/\b(\d+)\s*F\b/gi, "$1층");
  text = text.replace(/\b(?:Room|Rm\.?)\s*(\d+[A-Za-z-]*)\b/gi, "$1호");
  text = text.replace(/\bApt\.?\s*(\d+)\s*[-–]\s*(\d+)\b/gi, "$1동 $2호");
  text = text.replace(/\bUnit\s*(\d+[A-Za-z-]*)\b/gi, "$1호");
  text = text.replace(/\bBldg\.?\s*(\d+[A-Za-z-]*)\b/gi, "$1동");

  text = text.replace(/\b(\d+)\s*-\s*gil\b/gi, "$1길");
  text = text.replace(
    /\b([a-z0-9]+(?:-[a-z0-9]+)*)-(ro|gil|daero|no)\b/gi,
    (_m, name, suffix) => {
      const hangulName = romanWordToHangul(name.replace(/-/g, ""));
      const hangulSuffix =
        suffix.toLowerCase() === "ro"
          ? "로"
          : suffix.toLowerCase() === "gil"
            ? "길"
            : suffix.toLowerCase() === "daero"
              ? "대로"
              : "로";
      return `${hangulName}${hangulSuffix}`;
    },
  );

  text = collapseSpaces(text.replace(/,/g, " "));

  const unitParts = [];
  text = text.replace(/(?:^|\s)((?:지하)?\d+층)/g, (_m, unit) => {
    unitParts.push(unit);
    return " ";
  });
  text = text.replace(/(?:^|\s)(\d+호)/g, (_m, unit) => {
    unitParts.push(unit);
    return " ";
  });
  text = text.replace(/(?:^|\s)(\d+동)/g, (_m, unit) => {
    unitParts.push(unit);
    return " ";
  });

  const streetPart = collapseSpaces(text);
  return collapseSpaces([streetPart, ...unitParts].filter(Boolean).join(" "));
}

export function buildKoreanAddress(parsed) {
  const province = matchProvince(parsed.province);
  const district = matchDistrict(parsed.district, parsed.province);

  let localityKo = "";
  if (parsed.locality) {
    if (/[가-힣]/.test(parsed.locality)) {
      localityKo = parsed.locality;
    } else {
      const base = parsed.locality.replace(/-(dong|myeon|eup|ri)$/i, "");
      const suffixMatch = parsed.locality.match(/-(dong|myeon|eup|ri)$/i);
      const suffix = suffixMatch
        ? suffixMatch[1].replace("dong", "동").replace("myeon", "면").replace("eup", "읍").replace("ri", "리")
        : "";
      localityKo = `${romanWordToHangul(base)}${suffix}`;
    }
  }

  const detailKo = englishDetailToKorean(parsed.detail);
  return collapseSpaces(
    [province?.ko, district?.ko, localityKo, detailKo].filter(Boolean).join(" "),
  );
}

function parseHangulAddress(rawText) {
  const text = collapseSpaces(rawText.replace(COUNTRY_RE, " "));
  if (!/[가-힣]/.test(text)) return null;

  const zipMatch = text.match(ZIP_RE);
  const zip = zipMatch?.[1] ?? "";
  let rest = zip ? text.replace(zip, " ").trim() : text;

  const provinceMatch = rest.match(HANGUL_PROVINCE_RE);
  const provinceKo = provinceMatch?.[1] ?? "";
  if (provinceKo) rest = rest.replace(provinceKo, " ").trim();

  const districtMatch = rest.match(HANGUL_DISTRICT_RE);
  const districtKo = districtMatch?.[1] ?? "";
  if (districtKo) rest = rest.replace(districtKo, " ").trim();

  const localityMatch = rest.match(HANGUL_LOCALITY_RE);
  const localityKo = localityMatch?.[1] ?? "";
  if (localityKo) rest = rest.replace(localityKo, " ").trim();

  const detail = collapseSpaces(rest);
  const koreanAddress = collapseSpaces(
    [provinceKo, districtKo, localityKo, detail].filter(Boolean).join(" "),
  );

  return {
    province: provinceKo,
    district: districtKo,
    locality: localityKo,
    detail,
    zip,
    koreanAddress,
  };
}

/**
 * Parse a pasted English (or Korean) Korean address into admin hierarchy fields.
 * @param {string} rawText
 */
export function parseKrAddress(rawText) {
  const hangul = parseHangulAddress(rawText);
  if (hangul) return hangul;

  let parts = splitParts(rawText);
  if (!parts.length) return emptyResult();

  const zipResult = extractZip(parts);
  parts = zipResult.parts;

  const found = {
    province: "",
    district: "",
    locality: "",
    detail: [],
  };

  let provinceEn = "";

  for (let pass = 0; pass < 2; pass += 1) {
    for (let i = parts.length - 1; i >= 0; i -= 1) {
      const part = parts[i];
      if (!part) continue;

      if (!found.province) {
        const province = matchProvince(part);
        if (province) {
          found.province = province.en;
          provinceEn = province.en;
          parts.splice(i, 1);
          continue;
        }
      }

      if (!found.district) {
        const district = matchDistrict(part, provinceEn);
        if (district) {
          found.district = district.en;
          parts.splice(i, 1);
          continue;
        }
      }

      if (!found.locality && looksLikeLocality(part)) {
        found.locality = part;
        parts.splice(i, 1);
      }
    }
  }

  for (const part of parts) {
    if (looksLikeStreet(part) || /\d/.test(part) || /^(room|rm|apt|unit|bldg|#)/i.test(part)) {
      found.detail.push(part);
      continue;
    }
    if (!found.district && looksLikeDistrict(part)) {
      const district = matchDistrict(part, provinceEn);
      if (district) {
        found.district = district.en;
        continue;
      }
    }
    if (!found.locality) {
      found.locality = part;
      continue;
    }
    found.detail.push(part);
  }

  const parsed = {
    province: found.province,
    district: found.district,
    locality: found.locality,
    detail: collapseSpaces(found.detail.join(", ")),
    zip: zipResult.zip,
    koreanAddress: "",
  };

  parsed.koreanAddress = buildKoreanAddress(parsed);
  return parsed;
}
