import type {
  InboundLabelInput,
  JusoSearchHit,
  KrAddressFields,
} from "@/lib/tools/kr-address/types";

const HANGUL_RE = /[\uAC00-\uD7A3]/;

export function buildingNumber(main: string, sub: string): string {
  const mnnm = (main ?? "").trim();
  const slno = (sub ?? "").trim();
  if (!mnnm || mnnm === "0") return "";
  if (slno && slno !== "0") return `${mnnm}-${slno}`;
  return mnnm;
}

export function formatLine1(roadName: string, main: string, sub: string): string {
  const number = buildingNumber(main, sub);
  const road = (roadName ?? "").trim();
  return [number, road].filter(Boolean).join(" ");
}

/** Parse MOIS `engAddr` like `19-4, Seogang-ro, Mapo-gu, Seoul`. */
export function parseEngAddr(engAddr: string): {
  line1: string;
  city: string;
  state: string;
} {
  const parts = engAddr
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);

  if (parts.length === 0) {
    return { line1: "", city: "", state: "" };
  }

  if (parts.length === 1) {
    return { line1: parts[0], city: "", state: "" };
  }

  const state = parts[parts.length - 1] ?? "";
  const city = parts.length >= 3 ? (parts[parts.length - 2] ?? "") : "";
  const streetParts = parts.slice(0, Math.max(parts.length - (city ? 2 : 1), 1));
  const line1 = streetParts.join(" ").replace(/\s+/g, " ").trim();

  return { line1, city, state };
}

export function pickCityDistrict(sggNm: string, emdNm: string, siNm: string): string {
  const district = sggNm.trim();
  if (district) return district;
  const neighborhood = emdNm.trim();
  if (neighborhood) return neighborhood;
  return siNm.trim();
}

export function pickState(siNm: string): string {
  return siNm.trim();
}

/**
 * Romanize common Korean unit tokens for overseas Address Line 2.
 * `8층 801호` → `8F, Room 801` / `101동 202호` → `Apt 101-202`
 */
export function romanizeDetailAddress(raw: string): string {
  const input = raw.replace(/\s+/g, " ").trim();
  if (!input) return "";
  if (!HANGUL_RE.test(input)) {
    return input.replace(/\s*,\s*/g, ", ").replace(/\s+/g, " ").trim();
  }

  let text = input;
  const chunks: string[] = [];

  text = text.replace(/지하\s*(\d+)\s*층/g, (_m, n) => {
    chunks.push(`B${n}F`);
    return " ";
  });
  text = text.replace(/\bB\s*(\d+)\s*층/gi, (_m, n) => {
    chunks.push(`B${n}F`);
    return " ";
  });

  const dongHo = text.match(/([A-Za-z0-9]+)\s*동\s*(\d+)\s*호/);
  if (dongHo) {
    chunks.push(`Apt ${dongHo[1]}-${dongHo[2]}`);
    text = text.replace(dongHo[0], " ");
  }

  text = text.replace(/(\d+)\s*층/g, (_m, n) => {
    chunks.push(`${n}F`);
    return " ";
  });
  text = text.replace(/(\d+)\s*호실?/g, (_m, n) => {
    chunks.push(`Room ${n}`);
    return " ";
  });
  text = text.replace(/([A-Za-z0-9]+)\s*동/g, (_m, n) => {
    chunks.push(`Bldg ${n}`);
    return " ";
  });

  text = text
    .replace(/오피스텔/g, " ")
    .replace(/아파트/g, " ")
    .replace(/빌라/g, " ")
    .replace(/상가/g, " ")
    .replace(/별관/g, "Annex")
    .trim();

  const leftover = text.replace(/[(),]/g, " ").replace(/\s+/g, " ").trim();
  const extra = leftover && !HANGUL_RE.test(leftover) ? leftover : "";

  const merged = [...chunks];
  if (extra) merged.push(extra);

  return merged
    .filter(Boolean)
    .join(", ")
    .replace(/\s+,/g, ",")
    .replace(/,\s*,/g, ", ")
    .trim();
}

export function formatEnglishShippingLine(
  fields: KrAddressFields,
  options?: { includeCountry?: boolean },
): string {
  const detail = fields.line2.trim();
  const street = fields.line1.trim();
  const locality = [fields.city.trim(), fields.state.trim()].filter(Boolean).join(", ");
  const zip = fields.zip.trim();
  const parts = [detail, street, locality, zip].filter(Boolean);
  if (options?.includeCountry !== false) {
    parts.push("Rep. of KOREA");
  }
  return parts.join(", ");
}

export function formatKoreanCourierLine(koreanBase: string, detailKo: string): string {
  return [koreanBase.trim(), detailKo.trim()].filter(Boolean).join(" ");
}

export function formatInboundLabelText(input: InboundLabelInput): string {
  const name = input.name.trim() || "—";
  const phone = input.phone.trim() || "—";
  const english = formatEnglishShippingLine(input.fields) || "—";
  const korean = formatKoreanCourierLine(input.koreanBase, input.detailKo) || "—";

  return [
    "[DELIVERY TO KOREA]",
    `RECIPIENT: ${name}`,
    `TEL: ${phone}`,
    `ADDRESS (ENG): ${english}`,
    "[국내 택배기사님 전용 한글주소]",
    korean,
  ].join("\n");
}

export function hitToFields(hit: JusoSearchHit, line2 = ""): KrAddressFields {
  return {
    line1: hit.line1,
    line2,
    city: hit.city,
    state: hit.state,
    zip: hit.zip,
  };
}

export const SAMPLE_MAPO_HIT: JusoSearchHit = {
  id: "sample-mapo-seogang-19-4",
  zip: "04058",
  line1: "19-4 Seogang-ro",
  city: "Mapo-gu",
  state: "Seoul",
  koreanBase: "서울특별시 마포구 서강로 19-4",
  englishFull: "19-4 Seogang-ro, Mapo-gu, Seoul",
  roadNameEn: "Seogang-ro",
  buildingNumber: "19-4",
};

export const SAMPLE_MAPO_DETAIL_KO = "8층 801호";
export const SAMPLE_MAPO_LINE2 = "8F, Room 801";
