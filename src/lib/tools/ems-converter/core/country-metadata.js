/**
 * Comprehensive country metadata for EMS address converter.
 * Includes both precision countries (with detailed rules) and generic countries (basic support).
 */

/**
 * Generic countries: basic postcode validation only, no country-specific parsing rules.
 * Organized by region for maintainability.
 */
export const GENERIC_COUNTRIES = {
  // North America (additional)
  // MX moved to precision rules

  // Central America & Caribbean
  CR: { iso: "CR", emsName: "COSTA RICA", nameEn: "Costa Rica", nameKo: "코스타리카" },
  PA: { iso: "PA", emsName: "PANAMA", nameEn: "Panama", nameKo: "파나마" },
  DO: { iso: "DO", emsName: "DOMINICAN REPUBLIC", nameEn: "Dominican Republic", nameKo: "도미니카 공화국" },
  JM: { iso: "JM", emsName: "JAMAICA", nameEn: "Jamaica", nameKo: "자메이카" },
  TT: { iso: "TT", emsName: "TRINIDAD AND TOBAGO", nameEn: "Trinidad and Tobago", nameKo: "트리니다드 토바고" },
  BB: { iso: "BB", emsName: "BARBADOS", nameEn: "Barbados", nameKo: "바베이도스" },
  GT: { iso: "GT", emsName: "GUATEMALA", nameEn: "Guatemala", nameKo: "과테말라" },
  HN: { iso: "HN", emsName: "HONDURAS", nameEn: "Honduras", nameKo: "온두라스" },
  NI: { iso: "NI", emsName: "NICARAGUA", nameEn: "Nicaragua", nameKo: "니카라과" },
  SV: { iso: "SV", emsName: "EL SALVADOR", nameEn: "El Salvador", nameKo: "엘살바도르" },

  // South America
  BR: { iso: "BR", emsName: "BRAZIL", nameEn: "Brazil", nameKo: "브라질" },
  AR: { iso: "AR", emsName: "ARGENTINA", nameEn: "Argentina", nameKo: "아르헨티나" },
  CL: { iso: "CL", emsName: "CHILE", nameEn: "Chile", nameKo: "칠레" },
  CO: { iso: "CO", emsName: "COLOMBIA", nameEn: "Colombia", nameKo: "콜롬비아" },
  PE: { iso: "PE", emsName: "PERU", nameEn: "Peru", nameKo: "페루" },
  UY: { iso: "UY", emsName: "URUGUAY", nameEn: "Uruguay", nameKo: "우루과이" },
  VE: { iso: "VE", emsName: "VENEZUELA", nameEn: "Venezuela", nameKo: "베네수엘라" },
  EC: { iso: "EC", emsName: "ECUADOR", nameEn: "Ecuador", nameKo: "에콰도르" },
  PY: { iso: "PY", emsName: "PARAGUAY", nameEn: "Paraguay", nameKo: "파라과이" },
  BO: { iso: "BO", emsName: "BOLIVIA", nameEn: "Bolivia", nameKo: "볼리비아" },

  // Western Europe (additional)
  // PT, ES, IT, AT, CH, IE moved to precision rules
  LU: { iso: "LU", emsName: "LUXEMBOURG", nameEn: "Luxembourg", nameKo: "룩셈부르크" },
  MC: { iso: "MC", emsName: "MONACO", nameEn: "Monaco", nameKo: "모나코" },
  LI: { iso: "LI", emsName: "LIECHTENSTEIN", nameEn: "Liechtenstein", nameKo: "리히텐슈타인" },
  AD: { iso: "AD", emsName: "ANDORRA", nameEn: "Andorra", nameKo: "안도라" },
  SM: { iso: "SM", emsName: "SAN MARINO", nameEn: "San Marino", nameKo: "산마리노" },
  VA: { iso: "VA", emsName: "VATICAN CITY", nameEn: "Vatican City", nameKo: "바티칸" },
  GR: { iso: "GR", emsName: "GREECE", nameEn: "Greece", nameKo: "그리스" },
  MT: { iso: "MT", emsName: "MALTA", nameEn: "Malta", nameKo: "몰타" },
  CY: { iso: "CY", emsName: "CYPRUS", nameEn: "Cyprus", nameKo: "키프로스" },

  // Central & Eastern Europe
  // PL moved to precision rules
  CZ: { iso: "CZ", emsName: "CZECH REPUBLIC", nameEn: "Czech Republic", nameKo: "체코" },
  HU: { iso: "HU", emsName: "HUNGARY", nameEn: "Hungary", nameKo: "헝가리" },
  RO: { iso: "RO", emsName: "ROMANIA", nameEn: "Romania", nameKo: "루마니아" },
  BG: { iso: "BG", emsName: "BULGARIA", nameEn: "Bulgaria", nameKo: "불가리아" },
  SK: { iso: "SK", emsName: "SLOVAKIA", nameEn: "Slovakia", nameKo: "슬로바키아" },
  SI: { iso: "SI", emsName: "SLOVENIA", nameEn: "Slovenia", nameKo: "슬로베니아" },
  HR: { iso: "HR", emsName: "CROATIA", nameEn: "Croatia", nameKo: "크로아티아" },
  RS: { iso: "RS", emsName: "SERBIA", nameEn: "Serbia", nameKo: "세르비아" },
  BA: { iso: "BA", emsName: "BOSNIA AND HERZEGOVINA", nameEn: "Bosnia and Herzegovina", nameKo: "보스니아 헤르체고비나" },
  MK: { iso: "MK", emsName: "NORTH MACEDONIA", nameEn: "North Macedonia", nameKo: "북마케도니아" },
  AL: { iso: "AL", emsName: "ALBANIA", nameEn: "Albania", nameKo: "알바니아" },
  ME: { iso: "ME", emsName: "MONTENEGRO", nameEn: "Montenegro", nameKo: "몬테네그로" },
  XK: { iso: "XK", emsName: "KOSOVO", nameEn: "Kosovo", nameKo: "코소보" },

  // Baltic States
  EE: { iso: "EE", emsName: "ESTONIA", nameEn: "Estonia", nameKo: "에스토니아" },
  LV: { iso: "LV", emsName: "LATVIA", nameEn: "Latvia", nameKo: "라트비아" },
  LT: { iso: "LT", emsName: "LITHUANIA", nameEn: "Lithuania", nameKo: "리투아니아" },

  // Nordic (additional)
  // DK, NO, FI, IS moved to precision rules
  FO: { iso: "FO", emsName: "FAROE ISLANDS", nameEn: "Faroe Islands", nameKo: "페로 제도" },
  GL: { iso: "GL", emsName: "GREENLAND", nameEn: "Greenland", nameKo: "그린란드" },

  // Eastern Europe & Former Soviet
  UA: { iso: "UA", emsName: "UKRAINE", nameEn: "Ukraine", nameKo: "우크라이나" },
  BY: { iso: "BY", emsName: "BELARUS", nameEn: "Belarus", nameKo: "벨라루스" },
  MD: { iso: "MD", emsName: "MOLDOVA", nameEn: "Moldova", nameKo: "몰도바" },
  RU: { iso: "RU", emsName: "RUSSIA", nameEn: "Russia", nameKo: "러시아" },
  GE: { iso: "GE", emsName: "GEORGIA", nameEn: "Georgia", nameKo: "조지아" },
  AM: { iso: "AM", emsName: "ARMENIA", nameEn: "Armenia", nameKo: "아르메니아" },
  AZ: { iso: "AZ", emsName: "AZERBAIJAN", nameEn: "Azerbaijan", nameKo: "아제르바이잔" },
  KZ: { iso: "KZ", emsName: "KAZAKHSTAN", nameEn: "Kazakhstan", nameKo: "카자흐스탄" },
  UZ: { iso: "UZ", emsName: "UZBEKISTAN", nameEn: "Uzbekistan", nameKo: "우즈베키스탄" },
  TM: { iso: "TM", emsName: "TURKMENISTAN", nameEn: "Turkmenistan", nameKo: "투르크메니스탄" },
  KG: { iso: "KG", emsName: "KYRGYZSTAN", nameEn: "Kyrgyzstan", nameKo: "키르기스스탄" },
  TJ: { iso: "TJ", emsName: "TAJIKISTAN", nameEn: "Tajikistan", nameKo: "타지키스탄" },

  // Oceania (additional)
  // NZ moved to precision rules
  PG: { iso: "PG", emsName: "PAPUA NEW GUINEA", nameEn: "Papua New Guinea", nameKo: "파푸아뉴기니" },
  FJ: { iso: "FJ", emsName: "FIJI", nameEn: "Fiji", nameKo: "피지" },
  NC: { iso: "NC", emsName: "NEW CALEDONIA", nameEn: "New Caledonia", nameKo: "누벨칼레도니" },
  PF: { iso: "PF", emsName: "FRENCH POLYNESIA", nameEn: "French Polynesia", nameKo: "프랑스령 폴리네시아" },

  // East Asia (Priority 2 - special characters)
  // CN moved to precision rules
  KR: { iso: "KR", emsName: "KOREA REPUBLIC OF", nameEn: "South Korea", nameKo: "대한민국" },
  TW: { iso: "TW", emsName: "TAIWAN", nameEn: "Taiwan", nameKo: "대만" },
  HK: { iso: "HK", emsName: "HONG KONG", nameEn: "Hong Kong", nameKo: "홍콩" },
  MO: { iso: "MO", emsName: "MACAO", nameEn: "Macao", nameKo: "마카오" },

  // Southeast Asia (Priority 2)
  // TH, SG moved to precision rules
  MY: { iso: "MY", emsName: "MALAYSIA", nameEn: "Malaysia", nameKo: "말레이시아" },
  ID: { iso: "ID", emsName: "INDONESIA", nameEn: "Indonesia", nameKo: "인도네시아" },
  PH: { iso: "PH", emsName: "PHILIPPINES", nameEn: "Philippines", nameKo: "필리핀" },
  VN: { iso: "VN", emsName: "VIETNAM", nameEn: "Vietnam", nameKo: "베트남" },
  LA: { iso: "LA", emsName: "LAOS", nameEn: "Laos", nameKo: "라오스" },
  KH: { iso: "KH", emsName: "CAMBODIA", nameEn: "Cambodia", nameKo: "캄보디아" },
  MM: { iso: "MM", emsName: "MYANMAR", nameEn: "Myanmar", nameKo: "미얀마" },
  BN: { iso: "BN", emsName: "BRUNEI", nameEn: "Brunei", nameKo: "브루나이" },
  TL: { iso: "TL", emsName: "TIMOR LESTE", nameEn: "Timor-Leste", nameKo: "동티모르" },

  // South Asia (Priority 2)
  // IN moved to precision rules
  PK: { iso: "PK", emsName: "PAKISTAN", nameEn: "Pakistan", nameKo: "파키스탄" },
  BD: { iso: "BD", emsName: "BANGLADESH", nameEn: "Bangladesh", nameKo: "방글라데시" },
  LK: { iso: "LK", emsName: "SRI LANKA", nameEn: "Sri Lanka", nameKo: "스리랑카" },
  NP: { iso: "NP", emsName: "NEPAL", nameEn: "Nepal", nameKo: "네팔" },
  BT: { iso: "BT", emsName: "BHUTAN", nameEn: "Bhutan", nameKo: "부탄" },
  MV: { iso: "MV", emsName: "MALDIVES", nameEn: "Maldives", nameKo: "몰디브" },
  AF: { iso: "AF", emsName: "AFGHANISTAN", nameEn: "Afghanistan", nameKo: "아프가니스탄" },

  // Middle East (Priority 2)
  // IL, TR moved to precision rules
  SA: { iso: "SA", emsName: "SAUDI ARABIA", nameEn: "Saudi Arabia", nameKo: "사우디아라비아" },
  AE: { iso: "AE", emsName: "UNITED ARAB EMIRATES", nameEn: "United Arab Emirates", nameKo: "아랍에미리트" },
  QA: { iso: "QA", emsName: "QATAR", nameEn: "Qatar", nameKo: "카타르" },
  KW: { iso: "KW", emsName: "KUWAIT", nameEn: "Kuwait", nameKo: "쿠웨이트" },
  OM: { iso: "OM", emsName: "OMAN", nameEn: "Oman", nameKo: "오만" },
  BH: { iso: "BH", emsName: "BAHRAIN", nameEn: "Bahrain", nameKo: "바레인" },
  JO: { iso: "JO", emsName: "JORDAN", nameEn: "Jordan", nameKo: "요르단" },
  LB: { iso: "LB", emsName: "LEBANON", nameEn: "Lebanon", nameKo: "레바논" },
  SY: { iso: "SY", emsName: "SYRIA", nameEn: "Syria", nameKo: "시리아" },
  IQ: { iso: "IQ", emsName: "IRAQ", nameEn: "Iraq", nameKo: "이라크" },
  IR: { iso: "IR", emsName: "IRAN", nameEn: "Iran", nameKo: "이란" },
  YE: { iso: "YE", emsName: "YEMEN", nameEn: "Yemen", nameKo: "예멘" },
  PS: { iso: "PS", emsName: "PALESTINE", nameEn: "Palestine", nameKo: "팔레스타인" },

  // Africa
  ZA: { iso: "ZA", emsName: "SOUTH AFRICA", nameEn: "South Africa", nameKo: "남아프리카 공화국" },
  EG: { iso: "EG", emsName: "EGYPT", nameEn: "Egypt", nameKo: "이집트" },
  MA: { iso: "MA", emsName: "MOROCCO", nameEn: "Morocco", nameKo: "모로코" },
  DZ: { iso: "DZ", emsName: "ALGERIA", nameEn: "Algeria", nameKo: "알제리" },
  TN: { iso: "TN", emsName: "TUNISIA", nameEn: "Tunisia", nameKo: "튀니지" },
  LY: { iso: "LY", emsName: "LIBYA", nameEn: "Libya", nameKo: "리비아" },
  KE: { iso: "KE", emsName: "KENYA", nameEn: "Kenya", nameKo: "케냐" },
  NG: { iso: "NG", emsName: "NIGERIA", nameEn: "Nigeria", nameKo: "나이지리아" },
  GH: { iso: "GH", emsName: "GHANA", nameEn: "Ghana", nameKo: "가나" },
  ET: { iso: "ET", emsName: "ETHIOPIA", nameEn: "Ethiopia", nameKo: "에티오피아" },
  TZ: { iso: "TZ", emsName: "TANZANIA", nameEn: "Tanzania", nameKo: "탄자니아" },
  UG: { iso: "UG", emsName: "UGANDA", nameEn: "Uganda", nameKo: "우간다" },
  ZM: { iso: "ZM", emsName: "ZAMBIA", nameEn: "Zambia", nameKo: "잠비아" },
  ZW: { iso: "ZW", emsName: "ZIMBABWE", nameEn: "Zimbabwe", nameKo: "짐바브웨" },
  MW: { iso: "MW", emsName: "MALAWI", nameEn: "Malawi", nameKo: "말라위" },
  MZ: { iso: "MZ", emsName: "MOZAMBIQUE", nameEn: "Mozambique", nameKo: "모잠비크" },
  BW: { iso: "BW", emsName: "BOTSWANA", nameEn: "Botswana", nameKo: "보츠와나" },
  NA: { iso: "NA", emsName: "NAMIBIA", nameEn: "Namibia", nameKo: "나미비아" },
  SN: { iso: "SN", emsName: "SENEGAL", nameEn: "Senegal", nameKo: "세네갈" },
  CI: { iso: "CI", emsName: "COTE D IVOIRE", nameEn: "Côte d'Ivoire", nameKo: "코트디부아르" },
  CM: { iso: "CM", emsName: "CAMEROON", nameEn: "Cameroon", nameKo: "카메룬" },
  AO: { iso: "AO", emsName: "ANGOLA", nameEn: "Angola", nameKo: "앙골라" },
  SD: { iso: "SD", emsName: "SUDAN", nameEn: "Sudan", nameKo: "수단" },
  MU: { iso: "MU", emsName: "MAURITIUS", nameEn: "Mauritius", nameKo: "모리셔스" },
  RE: { iso: "RE", emsName: "REUNION", nameEn: "Réunion", nameKo: "레위니옹" },
  SC: { iso: "SC", emsName: "SEYCHELLES", nameEn: "Seychelles", nameKo: "세이셸" },
};

/**
 * Get all country metadata (precision + generic).
 * @returns {Array<{code: string, emsName: string, nameEn: string, nameKo: string, isPrecision: boolean}>}
 */
export function getAllCountries(precisionRules) {
  const precision = Object.values(precisionRules).map((rule) => ({
    code: rule.iso,
    emsName: rule.emsName,
    nameEn: rule.nameEn,
    nameKo: rule.nameKo,
    isPrecision: true,
  }));

  const generic = Object.values(GENERIC_COUNTRIES).map((meta) => ({
    code: meta.iso,
    emsName: meta.emsName,
    nameEn: meta.nameEn,
    nameKo: meta.nameKo,
    isPrecision: false,
  }));

  // Combine and sort by nameKo
  return [...precision, ...generic].sort((a, b) => a.nameKo.localeCompare(b.nameKo, "ko"));
}

/**
 * Get country metadata by ISO code (checks both precision and generic).
 */
export function getCountryMetadata(countryISO, precisionRules) {
  const iso = String(countryISO ?? "").toUpperCase();
  
  // Check precision rules first
  const precision = precisionRules[iso];
  if (precision) {
    return {
      iso: precision.iso,
      emsName: precision.emsName,
      nameEn: precision.nameEn,
      nameKo: precision.nameKo,
      isPrecision: true,
    };
  }

  // Check generic
  const generic = GENERIC_COUNTRIES[iso];
  if (generic) {
    return {
      iso: generic.iso,
      emsName: generic.emsName,
      nameEn: generic.nameEn,
      nameKo: generic.nameKo,
      isPrecision: false,
    };
  }

  return null;
}
