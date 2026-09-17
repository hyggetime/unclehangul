/**
 * Extended country metadata for EMS address parser.
 * Countries with precision rules are in rules.js COUNTRY_RULES.
 * This file provides metadata for generic fallback countries.
 */

/**
 * Generic metadata for countries without precision parsing rules.
 * These countries use the generic fallback parser.
 */
export const GENERIC_COUNTRIES = {
  // === EU Countries (Latin alphabet) ===
  PT: { iso: "PT", emsName: "PORTUGAL", nameEn: "Portugal", nameKo: "포르투갈" },
  ES: { iso: "ES", emsName: "SPAIN", nameEn: "Spain", nameKo: "스페인" },
  IT: { iso: "IT", emsName: "ITALY", nameEn: "Italy", nameKo: "이탈리아" },
  PL: { iso: "PL", emsName: "POLAND", nameEn: "Poland", nameKo: "폴란드" },
  AT: { iso: "AT", emsName: "AUSTRIA", nameEn: "Austria", nameKo: "오스트리아" },
  CZ: { iso: "CZ", emsName: "CZECH REPUBLIC", nameEn: "Czech Republic", nameKo: "체코" },
  DK: { iso: "DK", emsName: "DENMARK", nameEn: "Denmark", nameKo: "덴마크" },
  FI: { iso: "FI", emsName: "FINLAND", nameEn: "Finland", nameKo: "핀란드" },
  IE: { iso: "IE", emsName: "IRELAND", nameEn: "Ireland", nameKo: "아일랜드" },
  GR: { iso: "GR", emsName: "GREECE", nameEn: "Greece", nameKo: "그리스" },
  HU: { iso: "HU", emsName: "HUNGARY", nameEn: "Hungary", nameKo: "헝가리" },
  RO: { iso: "RO", emsName: "ROMANIA", nameEn: "Romania", nameKo: "루마니아" },
  SK: { iso: "SK", emsName: "SLOVAKIA", nameEn: "Slovakia", nameKo: "슬로바키아" },
  SI: { iso: "SI", emsName: "SLOVENIA", nameEn: "Slovenia", nameKo: "슬로베니아" },
  BG: { iso: "BG", emsName: "BULGARIA", nameEn: "Bulgaria", nameKo: "불가리아" },
  HR: { iso: "HR", emsName: "CROATIA", nameEn: "Croatia", nameKo: "크로아티아" },
  EE: { iso: "EE", emsName: "ESTONIA", nameEn: "Estonia", nameKo: "에스토니아" },
  LV: { iso: "LV", emsName: "LATVIA", nameEn: "Latvia", nameKo: "라트비아" },
  LT: { iso: "LT", emsName: "LITHUANIA", nameEn: "Lithuania", nameKo: "리투아니아" },
  LU: { iso: "LU", emsName: "LUXEMBOURG", nameEn: "Luxembourg", nameKo: "룩셈부르크" },
  MT: { iso: "MT", emsName: "MALTA", nameEn: "Malta", nameKo: "몰타" },
  CY: { iso: "CY", emsName: "CYPRUS", nameEn: "Cyprus", nameKo: "키프로스" },

  // === Non-EU Europe (Latin alphabet) ===
  CH: { iso: "CH", emsName: "SWITZERLAND", nameEn: "Switzerland", nameKo: "스위스" },
  NO: { iso: "NO", emsName: "NORWAY", nameEn: "Norway", nameKo: "노르웨이" },
  IS: { iso: "IS", emsName: "ICELAND", nameEn: "Iceland", nameKo: "아이슬란드" },
  LI: { iso: "LI", emsName: "LIECHTENSTEIN", nameEn: "Liechtenstein", nameKo: "리히텐슈타인" },
  MC: { iso: "MC", emsName: "MONACO", nameEn: "Monaco", nameKo: "모나코" },
  AD: { iso: "AD", emsName: "ANDORRA", nameEn: "Andorra", nameKo: "안도라" },
  SM: { iso: "SM", emsName: "SAN MARINO", nameEn: "San Marino", nameKo: "산마리노" },
  VA: { iso: "VA", emsName: "VATICAN CITY", nameEn: "Vatican City", nameKo: "바티칸" },
  RS: { iso: "RS", emsName: "SERBIA", nameEn: "Serbia", nameKo: "세르비아" },
  ME: { iso: "ME", emsName: "MONTENEGRO", nameEn: "Montenegro", nameKo: "몬테네그로" },
  MK: { iso: "MK", emsName: "NORTH MACEDONIA", nameEn: "North Macedonia", nameKo: "북마케도니아" },
  AL: { iso: "AL", emsName: "ALBANIA", nameEn: "Albania", nameKo: "알바니아" },
  BA: { iso: "BA", emsName: "BOSNIA AND HERZEGOVINA", nameEn: "Bosnia and Herzegovina", nameKo: "보스니아 헤르체고비나" },
  XK: { iso: "XK", emsName: "KOSOVO", nameEn: "Kosovo", nameKo: "코소보" },

  // === North America ===
  MX: { iso: "MX", emsName: "MEXICO", nameEn: "Mexico", nameKo: "멕시코" },
  CR: { iso: "CR", emsName: "COSTA RICA", nameEn: "Costa Rica", nameKo: "코스타리카" },
  PA: { iso: "PA", emsName: "PANAMA", nameEn: "Panama", nameKo: "파나마" },
  GT: { iso: "GT", emsName: "GUATEMALA", nameEn: "Guatemala", nameKo: "과테말라" },
  HN: { iso: "HN", emsName: "HONDURAS", nameEn: "Honduras", nameKo: "온두라스" },
  SV: { iso: "SV", emsName: "EL SALVADOR", nameEn: "El Salvador", nameKo: "엘살바도르" },
  NI: { iso: "NI", emsName: "NICARAGUA", nameEn: "Nicaragua", nameKo: "니카라과" },
  BZ: { iso: "BZ", emsName: "BELIZE", nameEn: "Belize", nameKo: "벨리즈" },
  JM: { iso: "JM", emsName: "JAMAICA", nameEn: "Jamaica", nameKo: "자메이카" },
  TT: { iso: "TT", emsName: "TRINIDAD AND TOBAGO", nameEn: "Trinidad and Tobago", nameKo: "트리니다드 토바고" },
  BS: { iso: "BS", emsName: "BAHAMAS", nameEn: "Bahamas", nameKo: "바하마" },
  BB: { iso: "BB", emsName: "BARBADOS", nameEn: "Barbados", nameKo: "바베이도스" },
  DO: { iso: "DO", emsName: "DOMINICAN REPUBLIC", nameEn: "Dominican Republic", nameKo: "도미니카 공화국" },
  CU: { iso: "CU", emsName: "CUBA", nameEn: "Cuba", nameKo: "쿠바" },

  // === South America ===
  BR: { iso: "BR", emsName: "BRAZIL", nameEn: "Brazil", nameKo: "브라질" },
  AR: { iso: "AR", emsName: "ARGENTINA", nameEn: "Argentina", nameKo: "아르헨티나" },
  CL: { iso: "CL", emsName: "CHILE", nameEn: "Chile", nameKo: "칠레" },
  CO: { iso: "CO", emsName: "COLOMBIA", nameEn: "Colombia", nameKo: "콜롬비아" },
  PE: { iso: "PE", emsName: "PERU", nameEn: "Peru", nameKo: "페루" },
  VE: { iso: "VE", emsName: "VENEZUELA", nameEn: "Venezuela", nameKo: "베네수엘라" },
  EC: { iso: "EC", emsName: "ECUADOR", nameEn: "Ecuador", nameKo: "에콰도르" },
  UY: { iso: "UY", emsName: "URUGUAY", nameEn: "Uruguay", nameKo: "우루과이" },
  PY: { iso: "PY", emsName: "PARAGUAY", nameEn: "Paraguay", nameKo: "파라과이" },
  BO: { iso: "BO", emsName: "BOLIVIA", nameEn: "Bolivia", nameKo: "볼리비아" },
  GY: { iso: "GY", emsName: "GUYANA", nameEn: "Guyana", nameKo: "가이아나" },
  SR: { iso: "SR", emsName: "SURINAME", nameEn: "Suriname", nameKo: "수리남" },

  // === Oceania ===
  NZ: { iso: "NZ", emsName: "NEW ZEALAND", nameEn: "New Zealand", nameKo: "뉴질랜드" },
  FJ: { iso: "FJ", emsName: "FIJI", nameEn: "Fiji", nameKo: "피지" },
  PG: { iso: "PG", emsName: "PAPUA NEW GUINEA", nameEn: "Papua New Guinea", nameKo: "파푸아뉴기니" },

  // === Asia (Latin alphabet) ===
  SG: { iso: "SG", emsName: "SINGAPORE", nameEn: "Singapore", nameKo: "싱가포르" },
  MY: { iso: "MY", emsName: "MALAYSIA", nameEn: "Malaysia", nameKo: "말레이시아" },
  PH: { iso: "PH", emsName: "PHILIPPINES", nameEn: "Philippines", nameKo: "필리핀" },
  ID: { iso: "ID", emsName: "INDONESIA", nameEn: "Indonesia", nameKo: "인도네시아" },
  VN: { iso: "VN", emsName: "VIETNAM", nameEn: "Vietnam", nameKo: "베트남" },
  TH: { iso: "TH", emsName: "THAILAND", nameEn: "Thailand", nameKo: "태국" },
  IN: { iso: "IN", emsName: "INDIA", nameEn: "India", nameKo: "인도" },
  PK: { iso: "PK", emsName: "PAKISTAN", nameEn: "Pakistan", nameKo: "파키스탄" },
  BD: { iso: "BD", emsName: "BANGLADESH", nameEn: "Bangladesh", nameKo: "방글라데시" },
  LK: { iso: "LK", emsName: "SRI LANKA", nameEn: "Sri Lanka", nameKo: "스리랑카" },
  NP: { iso: "NP", emsName: "NEPAL", nameEn: "Nepal", nameKo: "네팔" },
  MM: { iso: "MM", emsName: "MYANMAR", nameEn: "Myanmar", nameKo: "미얀마" },
  KH: { iso: "KH", emsName: "CAMBODIA", nameEn: "Cambodia", nameKo: "캄보디아" },
  LA: { iso: "LA", emsName: "LAOS", nameEn: "Laos", nameKo: "라오스" },
  BN: { iso: "BN", emsName: "BRUNEI", nameEn: "Brunei", nameKo: "브루나이" },
  MV: { iso: "MV", emsName: "MALDIVES", nameEn: "Maldives", nameKo: "몰디브" },
  MN: { iso: "MN", emsName: "MONGOLIA", nameEn: "Mongolia", nameKo: "몽골" },
  TW: { iso: "TW", emsName: "TAIWAN", nameEn: "Taiwan", nameKo: "대만" },
  HK: { iso: "HK", emsName: "HONG KONG", nameEn: "Hong Kong", nameKo: "홍콩" },
  MO: { iso: "MO", emsName: "MACAU", nameEn: "Macau", nameKo: "마카오" },

  // === Asia (Special scripts - requires precision rules) ===
  CN: { iso: "CN", emsName: "CHINA", nameEn: "China", nameKo: "중국" },
  KR: { iso: "KR", emsName: "KOREA", nameEn: "South Korea", nameKo: "대한민국" },

  // === Middle East ===
  AE: { iso: "AE", emsName: "UNITED ARAB EMIRATES", nameEn: "United Arab Emirates", nameKo: "아랍에미리트" },
  SA: { iso: "SA", emsName: "SAUDI ARABIA", nameEn: "Saudi Arabia", nameKo: "사우디아라비아" },
  IL: { iso: "IL", emsName: "ISRAEL", nameEn: "Israel", nameKo: "이스라엘" },
  TR: { iso: "TR", emsName: "TURKEY", nameEn: "Turkey", nameKo: "튀르키예" },
  IQ: { iso: "IQ", emsName: "IRAQ", nameEn: "Iraq", nameKo: "이라크" },
  IR: { iso: "IR", emsName: "IRAN", nameEn: "Iran", nameKo: "이란" },
  JO: { iso: "JO", emsName: "JORDAN", nameEn: "Jordan", nameKo: "요르단" },
  KW: { iso: "KW", emsName: "KUWAIT", nameEn: "Kuwait", nameKo: "쿠웨이트" },
  LB: { iso: "LB", emsName: "LEBANON", nameEn: "Lebanon", nameKo: "레바논" },
  OM: { iso: "OM", emsName: "OMAN", nameEn: "Oman", nameKo: "오만" },
  QA: { iso: "QA", emsName: "QATAR", nameEn: "Qatar", nameKo: "카타르" },
  BH: { iso: "BH", emsName: "BAHRAIN", nameEn: "Bahrain", nameKo: "바레인" },
  YE: { iso: "YE", emsName: "YEMEN", nameEn: "Yemen", nameKo: "예멘" },
  SY: { iso: "SY", emsName: "SYRIA", nameEn: "Syria", nameKo: "시리아" },
  PS: { iso: "PS", emsName: "PALESTINE", nameEn: "Palestine", nameKo: "팔레스타인" },
  AM: { iso: "AM", emsName: "ARMENIA", nameEn: "Armenia", nameKo: "아르메니아" },
  AZ: { iso: "AZ", emsName: "AZERBAIJAN", nameEn: "Azerbaijan", nameKo: "아제르바이잔" },
  GE: { iso: "GE", emsName: "GEORGIA", nameEn: "Georgia", nameKo: "조지아" },

  // === Africa ===
  ZA: { iso: "ZA", emsName: "SOUTH AFRICA", nameEn: "South Africa", nameKo: "남아프리카공화국" },
  EG: { iso: "EG", emsName: "EGYPT", nameEn: "Egypt", nameKo: "이집트" },
  MA: { iso: "MA", emsName: "MOROCCO", nameEn: "Morocco", nameKo: "모로코" },
  DZ: { iso: "DZ", emsName: "ALGERIA", nameEn: "Algeria", nameKo: "알제리" },
  TN: { iso: "TN", emsName: "TUNISIA", nameEn: "Tunisia", nameKo: "튀니지" },
  KE: { iso: "KE", emsName: "KENYA", nameEn: "Kenya", nameKo: "케냐" },
  NG: { iso: "NG", emsName: "NIGERIA", nameEn: "Nigeria", nameKo: "나이지리아" },
  GH: { iso: "GH", emsName: "GHANA", nameEn: "Ghana", nameKo: "가나" },
  ET: { iso: "ET", emsName: "ETHIOPIA", nameEn: "Ethiopia", nameKo: "에티오피아" },
  TZ: { iso: "TZ", emsName: "TANZANIA", nameEn: "Tanzania", nameKo: "탄자니아" },
  UG: { iso: "UG", emsName: "UGANDA", nameEn: "Uganda", nameKo: "우간다" },
  RW: { iso: "RW", emsName: "RWANDA", nameEn: "Rwanda", nameKo: "르완다" },
  SN: { iso: "SN", emsName: "SENEGAL", nameEn: "Senegal", nameKo: "세네갈" },
  CI: { iso: "CI", emsName: "IVORY COAST", nameEn: "Ivory Coast", nameKo: "코트디부아르" },
  ZW: { iso: "ZW", emsName: "ZIMBABWE", nameEn: "Zimbabwe", nameKo: "짐바브웨" },
  MU: { iso: "MU", emsName: "MAURITIUS", nameEn: "Mauritius", nameKo: "모리셔스" },

  // === CIS (Former Soviet Union) ===
  RU: { iso: "RU", emsName: "RUSSIA", nameEn: "Russia", nameKo: "러시아" },
  UA: { iso: "UA", emsName: "UKRAINE", nameEn: "Ukraine", nameKo: "우크라이나" },
  BY: { iso: "BY", emsName: "BELARUS", nameEn: "Belarus", nameKo: "벨라루스" },
  KZ: { iso: "KZ", emsName: "KAZAKHSTAN", nameEn: "Kazakhstan", nameKo: "카자흐스탄" },
  UZ: { iso: "UZ", emsName: "UZBEKISTAN", nameEn: "Uzbekistan", nameKo: "우즈베키스탄" },
  TM: { iso: "TM", emsName: "TURKMENISTAN", nameEn: "Turkmenistan", nameKo: "투르크메니스탄" },
  KG: { iso: "KG", emsName: "KYRGYZSTAN", nameEn: "Kyrgyzstan", nameKo: "키르기스스탄" },
  TJ: { iso: "TJ", emsName: "TAJIKISTAN", nameEn: "Tajikistan", nameKo: "타지키스탄" },
  MD: { iso: "MD", emsName: "MOLDOVA", nameEn: "Moldova", nameKo: "몰도바" },
};

/**
 * Get metadata for any country (precision or generic).
 * @param {string} iso ISO 3166-1 alpha-2
 * @returns {{ iso: string, emsName: string, nameEn: string, nameKo: string } | null}
 */
export function getCountryMetadata(iso) {
  const code = String(iso ?? "").toUpperCase();
  return GENERIC_COUNTRIES[code] ?? null;
}

/**
 * Get all generic countries as a list.
 * @returns {Array<{ code: string, emsName: string, nameEn: string, nameKo: string }>}
 */
export function getGenericCountriesList() {
  return Object.values(GENERIC_COUNTRIES).map((meta) => ({
    code: meta.iso,
    emsName: meta.emsName,
    nameEn: meta.nameEn,
    nameKo: meta.nameKo,
  }));
}
