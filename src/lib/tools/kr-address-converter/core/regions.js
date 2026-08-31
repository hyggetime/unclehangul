/** @typedef {{ province: string, district: string, locality: string, detail: string, zip: string, koreanAddress: string }} KrParsedAddress */

export const PROVINCE_ENTRIES = [
  { keys: ["seoul"], en: "Seoul", ko: "서울특별시" },
  { keys: ["busan"], en: "Busan", ko: "부산광역시" },
  { keys: ["daegu", "taegu"], en: "Daegu", ko: "대구광역시" },
  { keys: ["incheon", "inchon"], en: "Incheon", ko: "인천광역시" },
  { keys: ["gwangju", "kwangju"], en: "Gwangju", ko: "광주광역시" },
  { keys: ["daejeon", "taejon"], en: "Daejeon", ko: "대전광역시" },
  { keys: ["ulsan"], en: "Ulsan", ko: "울산광역시" },
  { keys: ["sejong", "sejong-si"], en: "Sejong", ko: "세종특별자치시" },
  { keys: ["jeju", "jeju-do", "cheju"], en: "Jeju-do", ko: "제주특별자치도" },
  { keys: ["gyeonggi", "gyeonggi-do", "kyonggi"], en: "Gyeonggi-do", ko: "경기도" },
  { keys: ["gangwon", "gangwon-do", "kangwon"], en: "Gangwon-do", ko: "강원특별자치도" },
  { keys: ["chungcheongbuk", "chungcheongbuk-do", "chungbuk"], en: "Chungcheongbuk-do", ko: "충청북도" },
  { keys: ["chungcheongnam", "chungcheongnam-do", "chungnam"], en: "Chungcheongnam-do", ko: "충청남도" },
  { keys: ["jeollabuk", "jeollabuk-do", "jeonbuk"], en: "Jeollabuk-do", ko: "전북특별자치도" },
  { keys: ["jeollanam", "jeollanam-do", "jeonnam"], en: "Jeollanam-do", ko: "전라남도" },
  { keys: ["gyeongsangbuk", "gyeongsangbuk-do", "gyeongbuk"], en: "Gyeongsangbuk-do", ko: "경상북도" },
  { keys: ["gyeongsangnam", "gyeongsangnam-do", "gyeongnam"], en: "Gyeongsangnam-do", ko: "경상남도" },
];

/** Seoul district romanization → Hangul (gu suffix optional in input). */
export const SEOUL_DISTRICTS = {
  gangnam: "강남구",
  "gangnam-gu": "강남구",
  gangdong: "강동구",
  "gangdong-gu": "강동구",
  gangbuk: "강북구",
  "gangbuk-gu": "강북구",
  gangseo: "강서구",
  "gangseo-gu": "강서구",
  gwanak: "관악구",
  "gwanak-gu": "관악구",
  gwangjin: "광진구",
  "gwangjin-gu": "광진구",
  guro: "구로구",
  "guro-gu": "구로구",
  geumcheon: "금천구",
  "geumcheon-gu": "금천구",
  nowon: "노원구",
  "nowon-gu": "노원구",
  dobong: "도봉구",
  "dobong-gu": "도봉구",
  dongdaemun: "동대문구",
  "dongdaemun-gu": "동대문구",
  dongjak: "동작구",
  "dongjak-gu": "동작구",
  mapo: "마포구",
  "mapo-gu": "마포구",
  seodaemun: "서대문구",
  "seodaemun-gu": "서대문구",
  seocho: "서초구",
  "seocho-gu": "서초구",
  seongdong: "성동구",
  "seongdong-gu": "성동구",
  seongbuk: "성북구",
  "seongbuk-gu": "성북구",
  songpa: "송파구",
  "songpa-gu": "송파구",
  yangcheon: "양천구",
  "yangcheon-gu": "양천구",
  yeongdeungpo: "영등포구",
  "yeongdeungpo-gu": "영등포구",
  yongsan: "용산구",
  "yongsan-gu": "용산구",
  eunpyeong: "은평구",
  "eunpyeong-gu": "은평구",
  jongno: "종로구",
  "jongno-gu": "종로구",
  jung: "중구",
  "jung-gu": "중구",
  jungnang: "중랑구",
  "jungnang-gu": "중랑구",
};

export function normalizeToken(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/\./g, "")
    .replace(/\s+/g, " ");
}

export function matchProvince(token) {
  const key = normalizeToken(token);
  if (!key) return null;
  for (const entry of PROVINCE_ENTRIES) {
    if (entry.keys.includes(key)) {
      return { en: entry.en, ko: entry.ko };
    }
  }
  return null;
}

export function matchDistrict(token, provinceEn) {
  const key = normalizeToken(token).replace(/\s+/g, "-");
  if (!key) return null;

  if (provinceEn === "Seoul" && SEOUL_DISTRICTS[key]) {
    const ko = SEOUL_DISTRICTS[key];
    const en = key.endsWith("-gu") ? key.replace(/\b\w/g, (c) => c.toUpperCase()) : `${key}-gu`.replace(/\b\w/g, (c) => c.toUpperCase());
    return { en: en.replace(/-Gu/g, "-gu").replace(/^./, (c) => c.toUpperCase()), ko };
  }

  const guMatch = key.match(/^(.+)-(gu|gun|si)$/);
  if (guMatch) {
    const base = guMatch[1];
    const suffix = guMatch[2];
    if (provinceEn === "Seoul" && SEOUL_DISTRICTS[`${base}-${suffix}`]) {
      return { en: formatDistrictEn(base, suffix), ko: SEOUL_DISTRICTS[`${base}-${suffix}`] };
    }
    if (provinceEn === "Seoul" && suffix === "gu" && SEOUL_DISTRICTS[base]) {
      return { en: formatDistrictEn(base, "gu"), ko: SEOUL_DISTRICTS[base] };
    }
    return {
      en: formatDistrictEn(base, suffix),
      ko: `${romanWordToHangul(base)}${suffix === "gu" ? "구" : suffix === "gun" ? "군" : "시"}`,
    };
  }

  if (provinceEn === "Seoul" && SEOUL_DISTRICTS[key]) {
    return { en: `${key}-gu`.replace(/\b\w/g, (c) => c.toUpperCase()), ko: SEOUL_DISTRICTS[key] };
  }

  return null;
}

function formatDistrictEn(base, suffix) {
  const title = base.replace(/(^|-)([a-z])/g, (_m, sep, ch) => `${sep}${ch.toUpperCase()}`);
  return `${title}-${suffix}`;
}

/** Known romanized road / place fragments → Hangul. */
const ROMAN_ALIASES = {
  nambusunhwan: "남부순환",
  seogang: "서강",
  gangnam: "강남",
  yeongdeungpo: "영등포",
  mapo: "마포",
  yangcheon: "양천",
  jongno: "종로",
  yongsan: "용산",
};

/** Minimal Revised Romanization → Hangul for road and district names. */
export function romanWordToHangul(input) {
  const word = String(input ?? "").trim().toLowerCase().replace(/-/g, "");
  if (!word) return "";
  if (ROMAN_ALIASES[word]) return ROMAN_ALIASES[word];

  const onsets = [
    "gg",
    "dd",
    "bb",
    "ss",
    "jj",
    "ch",
    "ng",
    "n",
    "d",
    "r",
    "m",
    "b",
    "s",
    "j",
    "k",
    "t",
    "p",
    "h",
    "g",
  ];

  const vowels = [
    ["yeo", 6],
    ["ya", 2],
    ["ye", 7],
    ["yae", 3],
    ["yo", 12],
    ["yu", 17],
    ["wa", 9],
    ["wae", 10],
    ["wo", 14],
    ["we", 15],
    ["wi", 16],
    ["ui", 19],
    ["ae", 1],
    ["eo", 4],
    ["eu", 18],
    ["oe", 11],
    ["a", 0],
    ["e", 5],
    ["o", 8],
    ["u", 13],
    ["i", 20],
  ];

  const codas = [
    "ng",
    "nh",
    "nj",
    "lk",
    "lm",
    "lb",
    "ls",
    "lt",
    "lp",
    "lh",
    "kk",
    "gs",
    "n",
    "m",
    "l",
    "k",
    "t",
    "p",
    "s",
    "b",
    "g",
    "d",
    "j",
    "h",
    "r",
  ];

  const cho = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ";
  const jung = "ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ";
  const jong = "ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ";
  const onsetToCho = {
    g: "ㄱ",
    gg: "ㄲ",
    n: "ㄴ",
    d: "ㄷ",
    dd: "ㄸ",
    r: "ㄹ",
    m: "ㅁ",
    b: "ㅂ",
    bb: "ㅃ",
    s: "ㅅ",
    ss: "ㅆ",
    "": "ㅇ",
    j: "ㅈ",
    jj: "ㅉ",
    ch: "ㅊ",
    k: "ㅋ",
    t: "ㅌ",
    p: "ㅍ",
    h: "ㅎ",
  };

  const codaToJong = {
    kk: "ㄲ",
    gs: "ㄳ",
    nj: "ㄵ",
    nh: "ㄶ",
    ng: "ㅇ",
    lg: "ㄺ",
    lm: "ㄻ",
    lb: "ㄼ",
    ls: "ㄽ",
    lt: "ㄾ",
    lp: "ㄿ",
    lh: "ㅀ",
    k: "ㄱ",
    n: "ㄴ",
    m: "ㅁ",
    l: "ㄹ",
    p: "ㅂ",
    t: "ㄷ",
    s: "ㅅ",
    b: "ㅂ",
    g: "ㄱ",
    d: "ㄷ",
    j: "ㅈ",
    h: "ㅎ",
    r: "ㄹ",
  };

  const choBase = "가".charCodeAt(0);
  let i = 0;
  let out = "";

  while (i < word.length) {
    let onsetKey = "";
    if (!/^[aeiouy]/.test(word.slice(i))) {
      for (const candidate of onsets) {
        if (word.startsWith(candidate, i)) {
          onsetKey = candidate;
          break;
        }
      }
      if (onsetKey) i += onsetKey.length;
    }

    let vowelIndex = -1;
    for (const [latin, index] of vowels) {
      if (word.startsWith(latin, i)) {
        i += latin.length;
        vowelIndex = index;
        break;
      }
    }
    if (vowelIndex < 0) break;

    let jongIndex = 0;
    for (const candidate of codas) {
      if (word.startsWith(candidate, i)) {
        const jamo = codaToJong[candidate];
        jongIndex = jamo ? jong.indexOf(jamo) : 0;
        if (jongIndex > 0) i += candidate.length;
        break;
      }
    }

    const choIndex = cho.indexOf(onsetToCho[onsetKey] ?? "ㅇ");
    if (choIndex < 0) break;
    out += String.fromCharCode(choBase + (choIndex * 21 + vowelIndex) * 28 + jongIndex);
  }

  return out || word;
}
