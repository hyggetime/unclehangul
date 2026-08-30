/** @typedef {'GB'|'FR'|'NL'|'BE'|'SE'|'DE'|'US'|'JP'|'CA'|'AU'} EmsCountryCode */

const STREET_EN =
  /\b(street|st|road|rd|avenue|ave|boulevard|blvd|drive|dr|lane|ln|way|place|pl|court|ct|square|sq|highway|hwy|terrace|close|crescent|loop|parkway|pkwy|trail|circle|unit|apt|suite|floor|bldg|building|po box|pobox)\b/i;

const STREET_FR =
  /\b(rue|avenue|blvd|boulevard|allee|chemin|place|impasse|route|quai|cours|passage|rond point|cite|villa)\b/i;

const STREET_DE =
  /(strasse|strabe|\bstr\b|weg|platz|allee|ring|gasse|damm|ufer|chaussee)/i;

const STREET_NL =
  /(straat|laan|weg|plein|gracht|kade|steeg|dreef|singel|dijk)/i;

const STREET_SE =
  /(gatan|gata|vagen|vag|torg|plan|grand|stig)/i;

const STREET_JP =
  /\b(chome|banchi|ban|go|building|mansion|apartment|apt|tower|floor|fu|ken|to|do|shi|ku|cho|machi|mura|gun)\b/i;

const US_STATES =
  "AL|AK|AZ|AR|CA|CO|CT|DC|DE|FL|GA|HI|IA|ID|IL|IN|KS|KY|LA|MA|MD|ME|MI|MN|MO|MS|MT|NC|ND|NE|NH|NJ|NM|NV|NY|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VA|VT|WA|WI|WV|WY";

const CA_PROVINCES = "AB|BC|MB|NB|NL|NS|NT|NU|ON|PE|QC|SK|YT";

const AU_STATES = "NSW|VIC|QLD|SA|WA|TAS|NT|ACT";

const JP_PREFECTURES = [
  "Hokkaido",
  "Aomori",
  "Iwate",
  "Miyagi",
  "Akita",
  "Yamagata",
  "Fukushima",
  "Ibaraki",
  "Tochigi",
  "Gunma",
  "Saitama",
  "Chiba",
  "Tokyo",
  "Kanagawa",
  "Niigata",
  "Toyama",
  "Ishikawa",
  "Fukui",
  "Yamanashi",
  "Nagano",
  "Gifu",
  "Shizuoka",
  "Aichi",
  "Mie",
  "Shiga",
  "Kyoto",
  "Osaka",
  "Hyogo",
  "Nara",
  "Wakayama",
  "Tottori",
  "Shimane",
  "Okayama",
  "Hiroshima",
  "Yamaguchi",
  "Tokushima",
  "Kagawa",
  "Ehime",
  "Kochi",
  "Fukuoka",
  "Saga",
  "Nagasaki",
  "Kumamoto",
  "Oita",
  "Miyazaki",
  "Kagoshima",
  "Okinawa",
].join("|");

/**
 * Country rules operate on sanitized ASCII text (hyphens already spaces).
 * `extract` finds a postal code; `validate` matches postcode-validator after format.
 */
export const COUNTRY_RULES = {
  GB: {
    iso: "GB",
    emsName: "UNITED KINGDOM",
    nameEn: "United Kingdom",
    nameKo: "영국",
    extract: /\b[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}\b/i,
    validate: /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i,
    street: STREET_EN,
    cityLine: /^[A-Z][A-Z\s]+$/i,
  },
  FR: {
    iso: "FR",
    emsName: "FRANCE",
    nameEn: "France",
    nameKo: "프랑스",
    extract: /\b\d{5}\b/,
    validate: /^\d{2}\s?\d{3}$/,
    street: STREET_FR,
    cityLine: /^[A-Z][A-Z\s\-']+$/i,
  },
  NL: {
    iso: "NL",
    emsName: "NETHERLANDS",
    nameEn: "Netherlands",
    nameKo: "네덜란드",
    extract: /\b\d{4}\s*[A-Z]{2}\b/i,
    validate: /^\d{4}\s?[A-Z]{2}$/i,
    street: STREET_NL,
    cityLine: /^[A-Z][A-Z\s]+$/i,
  },
  BE: {
    iso: "BE",
    emsName: "BELGIUM",
    nameEn: "Belgium",
    nameKo: "벨기에",
    extract: /\b\d{4}\b/,
    validate: /^\d{4}$/,
    street: new RegExp(`${STREET_FR.source}|${STREET_NL.source}|${STREET_EN.source}`, "i"),
    cityLine: /^[A-Z][A-Z\s]+$/i,
  },
  SE: {
    iso: "SE",
    emsName: "SWEDEN",
    nameEn: "Sweden",
    nameKo: "스웨덴",
    extract: /\b(?:SE\s*)?\d{3}\s+\d{2}\b/i,
    validate: /^(SE-?)?\d{3}\s?\d{2}$/i,
    street: STREET_SE,
    cityLine: /^[A-Z][A-Z\s]+$/i,
  },
  DE: {
    iso: "DE",
    emsName: "GERMANY",
    nameEn: "Germany",
    nameKo: "독일",
    extract: /\b\d{5}\b/,
    validate: /^\d{5}$/,
    street: STREET_DE,
    cityLine: /^[A-Z][A-Z\s]+$/i,
  },
  US: {
    iso: "US",
    emsName: "UNITED STATES",
    nameEn: "United States",
    nameKo: "미국",
    extract: /\b\d{5}(?:\s+\d{4})?\b/,
    validate: /^\d{5}(?:-?\d{4})?$/,
    street: STREET_EN,
    state: new RegExp(`\\b(${US_STATES})\\b`, "i"),
    cityLine: /^[A-Z][A-Z\s]+$/i,
  },
  JP: {
    iso: "JP",
    emsName: "JAPAN",
    nameEn: "Japan",
    nameKo: "일본",
    extract: /\b\d{3}\s+\d{4}\b|\b\d{7}\b/,
    validate: /^\d{3}-?\d{4}$/,
    street: STREET_JP,
    state: new RegExp(`\\b(${JP_PREFECTURES})\\b`, "i"),
    cityLine: /\b(shi|ku|cho|machi|mura|gun|city|ward)\b/i,
  },
  CA: {
    iso: "CA",
    emsName: "CANADA",
    nameEn: "Canada",
    nameKo: "캐나다",
    extract: /\b[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z]\s*\d[ABCEGHJ-NPRSTV-Z]\d\b/i,
    validate: /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z]\s*\d[ABCEGHJ-NPRSTV-Z]\d$/i,
    street: STREET_EN,
    state: new RegExp(`\\b(${CA_PROVINCES})\\b`, "i"),
    cityLine: /^[A-Z][A-Z\s]+$/i,
  },
  AU: {
    iso: "AU",
    emsName: "AUSTRALIA",
    nameEn: "Australia",
    nameKo: "호주",
    extract: /\b\d{4}\b/,
    validate: /^\d{4}$/,
    street: STREET_EN,
    state: new RegExp(`\\b(${AU_STATES})\\b`, "i"),
    cityLine: /^[A-Z][A-Z\s]+$/i,
  },
};

export const COUNTRY_LIST = Object.values(COUNTRY_RULES).map((rule) => ({
  code: rule.iso,
  emsName: rule.emsName,
  nameEn: rule.nameEn,
  nameKo: rule.nameKo,
}));

/** @param {string} code */
export function getCountryRule(code) {
  const key = String(code ?? "").toUpperCase();
  return COUNTRY_RULES[key] ?? null;
}

/**
 * Rebuild EMS-friendly postal formatting after sanitizer stripped hyphens.
 * @param {string} raw
 * @param {EmsCountryCode} country
 */
export function formatPostalCode(raw, country) {
  const compact = String(raw ?? "")
    .toUpperCase()
    .replace(/\s+/g, " ")
    .trim();
  const digits = compact.replace(/\D/g, "");

  switch (country) {
    case "US":
      if (digits.length >= 9) return `${digits.slice(0, 5)}-${digits.slice(5, 9)}`;
      return digits.slice(0, 5);
    case "JP":
      if (digits.length >= 7) return `${digits.slice(0, 3)}-${digits.slice(3, 7)}`;
      return compact;
    case "GB": {
      const glued = compact.replace(/\s+/g, "");
      if (glued.length < 5) return compact;
      return `${glued.slice(0, -3)} ${glued.slice(-3)}`;
    }
    case "CA": {
      const glued = compact.replace(/\s+/g, "");
      if (glued.length < 6) return compact;
      return `${glued.slice(0, 3)} ${glued.slice(3, 6)}`;
    }
    case "NL": {
      const glued = compact.replace(/\s+/g, "");
      const match = glued.match(/^(\d{4})([A-Z]{2})$/);
      return match ? `${match[1]} ${match[2]}` : compact;
    }
    case "SE": {
      const last5 = digits.slice(-5);
      if (last5.length === 5) return `${last5.slice(0, 3)} ${last5.slice(3)}`;
      return compact;
    }
    case "FR":
    case "DE":
    case "BE":
    case "AU":
      return digits;
    default:
      return compact;
  }
}

/** GB outward-code prefix → county / nation region (EMS State field). */
const GB_OUTCODE_STATE = {
  EH: "SCOTLAND",
  G: "SCOTLAND",
  AB: "SCOTLAND",
  DD: "SCOTLAND",
  FK: "SCOTLAND",
  IV: "SCOTLAND",
  KA: "SCOTLAND",
  KW: "SCOTLAND",
  KY: "SCOTLAND",
  PA: "SCOTLAND",
  PH: "SCOTLAND",
  TD: "SCOTLAND",
  ZE: "SCOTLAND",
  CF: "WALES",
  LD: "WALES",
  LL: "WALES",
  NP: "WALES",
  SA: "WALES",
  SY: "WALES",
  BT: "NORTHERN IRELAND",
  TW: "GREATER LONDON",
  SW: "GREATER LONDON",
  SE: "GREATER LONDON",
  W: "GREATER LONDON",
  WC: "GREATER LONDON",
  EC: "GREATER LONDON",
  E: "GREATER LONDON",
  N: "GREATER LONDON",
  NW: "GREATER LONDON",
  EN: "GREATER LONDON",
  HA: "GREATER LONDON",
  UB: "GREATER LONDON",
  IG: "GREATER LONDON",
  RM: "GREATER LONDON",
  KT: "GREATER LONDON",
  SM: "GREATER LONDON",
  CR: "GREATER LONDON",
  DA: "GREATER LONDON",
  BR: "GREATER LONDON",
  WD: "GREATER LONDON",
  B: "WEST MIDLANDS",
  M: "GREATER MANCHESTER",
  L: "MERSEYSIDE",
  LS: "WEST YORKSHIRE",
  S: "SOUTH YORKSHIRE",
  BS: "BRISTOL",
  EH1: "SCOTLAND",
};

/** FR département (first 2 digits) → department name. */
const FR_DEPT_STATE = {
  "10": "AUBE",
  "13": "BOUCHES DU RHONE",
  "31": "HAUTE GARONNE",
  "33": "GIRONDE",
  "38": "ISERE",
  "44": "LOIRE ATLANTIQUE",
  "59": "NORD",
  "69": "RHONE",
  "75": "PARIS",
  "92": "HAUTS DE SEINE",
  "93": "SEINE SAINT DENIS",
  "94": "VAL DE MARNE",
};

/** BE province (first digit of postcode). */
const BE_PROVINCE_STATE = {
  "1": "BRUSSELS",
  "2": "ANTWERP",
  "3": "WEST FLANDERS",
  "4": "EAST FLANDERS",
  "5": "HAINAUT",
  "6": "LIEGE",
  "7": "LIMBURG",
  "8": "LUXEMBOURG",
  "9": "NAMUR",
};

/** SE postcode first-2-digit band → län (major regions). */
const SE_POSTAL_BANDS = [
  [10, 19, "STOCKHOLM"],
  [40, 49, "VASTRA GOTALAND"],
  [50, 59, "SKANE"],
  [70, 89, "OSTERGOTLAND"],
  [90, 98, "VASTERBOTTEN"],
];

/** CA FSA first letter → province. */
const CA_FSA_STATE = {
  A: "NL",
  B: "NS",
  C: "PE",
  E: "NB",
  G: "QC",
  H: "QC",
  J: "QC",
  K: "ON",
  L: "ON",
  M: "ON",
  N: "ON",
  P: "ON",
  R: "MB",
  S: "SK",
  T: "AB",
  V: "BC",
  X: "NT",
  Y: "YT",
};

/** AU postcode numeric band → state. */
const AU_POSTAL_BANDS = [
  [200, 299, "NSW"],
  [260, 261, "ACT"],
  [300, 399, "VIC"],
  [400, 499, "QLD"],
  [500, 599, "SA"],
  [600, 699, "WA"],
  [700, 799, "TAS"],
  [800, 899, "NT"],
];

/** US ZIP3 prefix → state (common gaps only; full table omitted). */
const US_ZIP3_STATE = {
  100: "NY",
  101: "NY",
  102: "NY",
  900: "CA",
  901: "CA",
  902: "CA",
  606: "IL",
  770: "TX",
  787: "TX",
  331: "FL",
  981: "WA",
};

function lookupLongestPrefix(key, table) {
  const normalized = String(key ?? "").toUpperCase();
  if (!normalized) return "";
  const prefixes = Object.keys(table).sort((a, b) => b.length - a.length);
  for (const prefix of prefixes) {
    if (normalized.startsWith(prefix)) return table[prefix];
  }
  return "";
}

function lookupNumericBand(value, bands) {
  const num = Number.parseInt(String(value ?? ""), 10);
  if (Number.isNaN(num)) return "";
  for (const [min, max, label] of bands) {
    if (num >= min && num <= max) return label;
  }
  return "";
}

function gbOutcode(postalCode) {
  const compact = String(postalCode ?? "")
    .replace(/\s+/g, "")
    .toUpperCase();
  if (compact.length < 5) return compact;
  return compact.slice(0, -3);
}

/**
 * Infer State/County from postal code when missing from the source address.
 * @param {string} country ISO 3166-1 alpha-2
 * @param {string} postalCode formatted postal code
 * @returns {string}
 */
export function lookupStateByZipcode(country, postalCode) {
  const iso = String(country ?? "").toUpperCase();
  const postal = String(postalCode ?? "").trim();
  if (!postal) return "";

  switch (iso) {
    case "GB":
      return lookupLongestPrefix(gbOutcode(postal), GB_OUTCODE_STATE);
    case "FR": {
      const dept = postal.replace(/\D/g, "").slice(0, 2);
      return FR_DEPT_STATE[dept] ?? "";
    }
    case "BE": {
      const digit = postal.replace(/\D/g, "").charAt(0);
      return BE_PROVINCE_STATE[digit] ?? "";
    }
    case "SE": {
      const band = postal.replace(/\D/g, "").slice(0, 2);
      return lookupNumericBand(band, SE_POSTAL_BANDS);
    }
    case "CA": {
      const letter = postal.replace(/\s+/g, "").charAt(0).toUpperCase();
      return CA_FSA_STATE[letter] ?? "";
    }
    case "AU": {
      const band = postal.replace(/\D/g, "").slice(0, 3);
      return lookupNumericBand(band, AU_POSTAL_BANDS);
    }
    case "US": {
      const zip3 = postal.replace(/\D/g, "").slice(0, 3);
      return US_ZIP3_STATE[zip3] ?? "";
    }
    default:
      return "";
  }
}
