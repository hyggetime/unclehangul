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

const MX_STATES =
  "AGS|BC|BCS|CAMP|CHIS|CHIH|COAH|COL|CDMX|DGO|GTO|GRO|HGO|JAL|MEX|MICH|MOR|NAY|NL|OAX|PUE|QRO|QROO|SLP|SIN|SON|TAB|TAMPS|TLAX|VER|YUC|ZAC";

const BR_STATES =
  "AC|AL|AP|AM|BA|CE|DF|ES|GO|MA|MT|MS|MG|PA|PB|PR|PE|PI|RJ|RN|RS|RO|RR|SC|SP|SE|TO";

const CN_PROVINCES = [
  "Beijing",
  "Shanghai",
  "Tianjin",
  "Chongqing",
  "Guangdong",
  "Guangxi",
  "Sichuan",
  "Yunnan",
  "Guizhou",
  "Hubei",
  "Hunan",
  "Hebei",
  "Henan",
  "Jiangxi",
  "Shandong",
  "Jiangsu",
  "Zhejiang",
  "Fujian",
  "Anhui",
  "Liaoning",
  "Jilin",
  "Heilongjiang",
  "Inner Mongolia",
  "Shanxi",
  "Shaanxi",
  "Gansu",
  "Qinghai",
  "Ningxia",
  "Xinjiang",
  "Tibet",
  "Hainan",
  "Hong Kong",
  "Macau",
].join("|");

const TH_PROVINCES = [
  "Bangkok",
  "Chiang Mai",
  "Phuket",
  "Pattaya",
  "Samut Prakan",
  "Nonthaburi",
  "Pathum Thani",
  "Nakhon Pathom",
  "Samut Sakhon",
  "Samut Songkhram",
].join("|");

const AE_EMIRATES = "Abu Dhabi|Dubai|Sharjah|Ajman|Umm Al Quwain|Ras Al Khaimah|Fujairah";

const IL_DISTRICTS = "Jerusalem|Tel Aviv|Haifa|Central|Northern|Southern";

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
  PT: {
    iso: "PT",
    emsName: "PORTUGAL",
    nameEn: "Portugal",
    nameKo: "포르투갈",
    extract: /\b\d{4}\s*-?\s*\d{3}\b/,
    validate: /^\d{4}-?\d{3}$/,
    street: /\b(rua|avenida|av|alameda|travessa|praca|largo|estrada|calcada|beco|praceta|quintal|lote|bloco|andar|fracao|r|no)\b/i,
    cityLine: /^[A-Z][A-Z\s\-]+$/i,
  },
  ES: {
    iso: "ES",
    emsName: "SPAIN",
    nameEn: "Spain",
    nameKo: "스페인",
    extract: /\b\d{5}\b/,
    validate: /^\d{5}$/,
    street: /\b(calle|c|avenida|avda|av|plaza|pl|paseo|pseo|carrer|ronda|camino|travesia|via|carretera|crta|urbanizacion|urb|bloque|portal|piso|puerta|escalera|num|numero|no)\b/i,
    cityLine: /^[A-Z][A-Z\s\-]+$/i,
  },
  IT: {
    iso: "IT",
    emsName: "ITALY",
    nameEn: "Italy",
    nameKo: "이탈리아",
    extract: /\b\d{5}\b/,
    validate: /^\d{5}$/,
    street: /\b(via|v|viale|corso|c|piazza|p|largo|vicolo|strada|str|contrada|localita|frazione|salita|discesa|scala|interno|int|piano|appartamento|app|civico|no|n)\b/i,
    cityLine: /^[A-Z][A-Z\s\-']+$/i,
  },
  PL: {
    iso: "PL",
    emsName: "POLAND",
    nameEn: "Poland",
    nameKo: "폴란드",
    extract: /\b\d{2}\s*-?\s*\d{3}\b/,
    validate: /^\d{2}-?\d{3}$/,
    street: /\b(ulica|ul|aleja|al|plac|pl|osiedle|os|rynek|droga|skwer|bulwar|zaułek|zaułek|apartament|apt|mieszkanie|m|nr|no)\b/i,
    cityLine: /^[A-Z][A-Z\s\-]+$/i,
  },
  AT: {
    iso: "AT",
    emsName: "AUSTRIA",
    nameEn: "Austria",
    nameKo: "오스트리아",
    extract: /\b\d{4}\b/,
    validate: /^\d{4}$/,
    street: STREET_DE,
    cityLine: /^[A-Z][A-Z\s]+$/i,
  },
  CZ: {
    iso: "CZ",
    emsName: "CZECH REPUBLIC",
    nameEn: "Czech Republic",
    nameKo: "체코",
    extract: /\b\d{3}\s*\d{2}\b/,
    validate: /^\d{3}\s?\d{2}$/,
    street: /\b(ulice|třída|tř|náměstí|nám|náb|nábřeží|sady|sad|čp|č|p|popisné|orientační|číslo|no)\b/i,
    cityLine: /^[A-Z][A-Z\s\-]+$/i,
  },
  DK: {
    iso: "DK",
    emsName: "DENMARK",
    nameEn: "Denmark",
    nameKo: "덴마크",
    extract: /\b\d{4}\b/,
    validate: /^\d{4}$/,
    street: /(vej|gade|allé|plads|vænge|parken|torv|strøde|bro|sø|sti|bakke|have|hus|tv|th)/i,
    cityLine: /^[A-Z][A-Z\s]+$/i,
  },
  FI: {
    iso: "FI",
    emsName: "FINLAND",
    nameEn: "Finland",
    nameKo: "핀란드",
    extract: /\b\d{5}\b/,
    validate: /^\d{5}$/,
    street: /(katu|tie|tori|polku|kuja|rinne|bulevardi|puistotie|puisto|kaari|ranta|kärki|aukio|as|a|b|huoneisto|no)/i,
    cityLine: /^[A-Z][A-Z\s\-]+$/i,
  },
  IE: {
    iso: "IE",
    emsName: "IRELAND",
    nameEn: "Ireland",
    nameKo: "아일랜드",
    extract: /\b[A-Z]\d{2}\s*[A-Z0-9]{4}\b/i,
    validate: /^[A-Z]\d{2}\s?[A-Z0-9]{4}$/i,
    street: STREET_EN,
    cityLine: /^[A-Z][A-Z\s]+$/i,
  },
  CH: {
    iso: "CH",
    emsName: "SWITZERLAND",
    nameEn: "Switzerland",
    nameKo: "스위스",
    extract: /\b\d{4}\b/,
    validate: /^\d{4}$/,
    street: new RegExp(`${STREET_DE.source}|${STREET_FR.source}|${STREET_EN.source}`, "i"),
    cityLine: /^[A-Z][A-Z\s\-]+$/i,
  },
  NO: {
    iso: "NO",
    emsName: "NORWAY",
    nameEn: "Norway",
    nameKo: "노르웨이",
    extract: /\b\d{4}\b/,
    validate: /^\d{4}$/,
    street: /(gate|gata|vei|veien|plass|allé|bakken|svingen|stien|torg|park|brygge|strand|no)/i,
    cityLine: /^[A-Z][A-Z\s\-]+$/i,
  },
  IS: {
    iso: "IS",
    emsName: "ICELAND",
    nameEn: "Iceland",
    nameKo: "아이슬란드",
    extract: /\b\d{3}\b/,
    validate: /^\d{3}$/,
    street: /(gata|vegur|braut|stígur|torg|hús|blokk|hæð|no)/i,
    cityLine: /^[A-Z][A-Z\s\-]+$/i,
  },
  MX: {
    iso: "MX",
    emsName: "MEXICO",
    nameEn: "Mexico",
    nameKo: "멕시코",
    extract: /\b\d{5}\b/,
    validate: /^\d{5}$/,
    street: /\b(calle|c|avenida|av|boulevard|blvd|privada|priv|calzada|calz|colonia|col|fraccionamiento|fracc|numero|num|no|interior|int|exterior|ext|piso|depto|departamento|edificio|edif|manzana|mza|lote)\b/i,
    state: new RegExp(`\\b(${MX_STATES})\\b`, "i"),
    cityLine: /^[A-Z][A-Z\s\-]+$/i,
  },
  BR: {
    iso: "BR",
    emsName: "BRAZIL",
    nameEn: "Brazil",
    nameKo: "브라질",
    extract: /\b\d{5}\s*-?\s*\d{3}\b/,
    validate: /^\d{5}-?\d{3}$/,
    street: /\b(rua|r|avenida|av|travessa|trav|alameda|al|praca|pc|rodovia|rod|estrada|estr|quadra|qd|lote|bloco|bl|apartamento|apto|ap|conjunto|conj|numero|no|n)\b/i,
    state: new RegExp(`\\b(${BR_STATES})\\b`, "i"),
    cityLine: /^[A-Z][A-Z\s\-]+$/i,
  },
  AR: {
    iso: "AR",
    emsName: "ARGENTINA",
    nameEn: "Argentina",
    nameKo: "아르헨티나",
    extract: /\b[A-Z]?\d{4}\b/i,
    validate: /^[A-Z]?\d{4}$/i,
    street: /\b(calle|c|avenida|av|boulevard|bv|pasaje|pje|paseo|diagonal|ruta|camino|barrio|piso|depto|departamento|numero|no|n)\b/i,
    cityLine: /^[A-Z][A-Z\s\-]+$/i,
  },
  CL: {
    iso: "CL",
    emsName: "CHILE",
    nameEn: "Chile",
    nameKo: "칠레",
    extract: /\b\d{7}\b/,
    validate: /^\d{7}$/,
    street: /\b(calle|c|avenida|av|pasaje|pje|paseo|camino|numero|no|n|depto|departamento|oficina|of|piso|casa|block|villa)\b/i,
    cityLine: /^[A-Z][A-Z\s\-]+$/i,
  },
  NZ: {
    iso: "NZ",
    emsName: "NEW ZEALAND",
    nameEn: "New Zealand",
    nameKo: "뉴질랜드",
    extract: /\b\d{4}\b/,
    validate: /^\d{4}$/,
    street: STREET_EN,
    cityLine: /^[A-Z][A-Z\s]+$/i,
  },
  GR: {
    iso: "GR",
    emsName: "GREECE",
    nameEn: "Greece",
    nameKo: "그리스",
    extract: /\b\d{3}\s*\d{2}\b/,
    validate: /^\d{3}\s?\d{2}$/,
    street: /\b(odos|leoforos|plateia|parodos|no|number|diamerisma|orofos)\b/i,
    cityLine: /^[A-Z][A-Z\s\-]+$/i,
  },
  HU: {
    iso: "HU",
    emsName: "HUNGARY",
    nameEn: "Hungary",
    nameKo: "헝가리",
    extract: /\b\d{4}\b/,
    validate: /^\d{4}$/,
    street: /\b(utca|u|út|tér|körút|krt|köz|sor|sétány|part|lakás|emelet|em|ajtó|no|szám)\b/i,
    cityLine: /^[A-Z][A-Z\s\-]+$/i,
  },
  RO: {
    iso: "RO",
    emsName: "ROMANIA",
    nameEn: "Romania",
    nameKo: "루마니아",
    extract: /\b\d{6}\b/,
    validate: /^\d{6}$/,
    street: /\b(strada|str|bulevardul|bd|piata|calea|aleea|intrarea|bloc|bl|scara|sc|etaj|et|apartament|ap|nr|no)\b/i,
    cityLine: /^[A-Z][A-Z\s\-]+$/i,
  },
  CN: {
    iso: "CN",
    emsName: "CHINA",
    nameEn: "China",
    nameKo: "중국",
    extract: /\b\d{6}\b/,
    validate: /^\d{6}$/,
    street: /\b(road|rd|street|st|avenue|ave|lane|ln|building|bldg|floor|unit|room|no|号|路|街|巷|弄|区|栋|楼|室|单元)\b/i,
    state: new RegExp(`\\b(${CN_PROVINCES})\\b`, "i"),
    cityLine: /^[A-Z][A-Z\s\-]+$/i,
  },
  TH: {
    iso: "TH",
    emsName: "THAILAND",
    nameEn: "Thailand",
    nameKo: "태국",
    extract: /\b\d{5}\b/,
    validate: /^\d{5}$/,
    street: /\b(road|rd|street|st|soi|thanon|alley|moo|village|floor|room|no|ถนน|ซอย|หมู่|ตำบล)\b/i,
    state: new RegExp(`\\b(${TH_PROVINCES})\\b`, "i"),
    cityLine: /^[A-Z][A-Z\s\-]+$/i,
  },
  SA: {
    iso: "SA",
    emsName: "SAUDI ARABIA",
    nameEn: "Saudi Arabia",
    nameKo: "사우디아라비아",
    extract: /\b\d{5}\b/,
    validate: /^\d{5}$/,
    street: /\b(street|st|road|rd|avenue|ave|district|building|bldg|floor|apt|no|شارع|حي|مبنى|رقم)\b/i,
    cityLine: /^[A-Z][A-Z\s\-]+$/i,
  },
  AE: {
    iso: "AE",
    emsName: "UNITED ARAB EMIRATES",
    nameEn: "United Arab Emirates",
    nameKo: "아랍에미리트",
    extract: /\b\d{5}\b/,
    validate: /^\d{5}$/,
    street: /\b(street|st|road|rd|avenue|ave|building|bldg|floor|apt|villa|office|no|شارع|مبنى|رقم)\b/i,
    state: new RegExp(`\\b(${AE_EMIRATES})\\b`, "i"),
    cityLine: /^[A-Z][A-Z\s\-]+$/i,
  },
  IL: {
    iso: "IL",
    emsName: "ISRAEL",
    nameEn: "Israel",
    nameKo: "이스라엘",
    extract: /\b\d{7}\b/,
    validate: /^\d{7}$/,
    street: /\b(street|st|road|rd|avenue|ave|building|bldg|floor|apt|no|רחוב|שדרות|בניין|קומה|דירה|מספר)\b/i,
    state: new RegExp(`\\b(${IL_DISTRICTS})\\b`, "i"),
    cityLine: /^[A-Z][A-Z\s\-]+$/i,
  },
};

import { getGenericCountriesList } from "./countries-metadata.js";

/**
 * Combined country list: precision rules + generic fallback countries.
 * Precision countries are marked with isPrecision flag.
 */
export const COUNTRY_LIST = [
  ...Object.values(COUNTRY_RULES).map((rule) => ({
    code: rule.iso,
    emsName: rule.emsName,
    nameEn: rule.nameEn,
    nameKo: rule.nameKo,
    isPrecision: true,
  })),
  ...getGenericCountriesList().map((country) => ({
    ...country,
    isPrecision: false,
  })),
].sort((a, b) => a.nameEn.localeCompare(b.nameEn));

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
