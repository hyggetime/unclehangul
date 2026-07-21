const CHO = [
  "ㄱ",
  "ㄲ",
  "ㄴ",
  "ㄷ",
  "ㄸ",
  "ㄹ",
  "ㅁ",
  "ㅂ",
  "ㅃ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅉ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
] as const;

const JUNG = [
  "ㅏ",
  "ㅐ",
  "ㅑ",
  "ㅒ",
  "ㅓ",
  "ㅔ",
  "ㅕ",
  "ㅖ",
  "ㅗ",
  "ㅘ",
  "ㅙ",
  "ㅚ",
  "ㅛ",
  "ㅜ",
  "ㅝ",
  "ㅞ",
  "ㅟ",
  "ㅠ",
  "ㅡ",
  "ㅢ",
  "ㅣ",
] as const;

const JONG = [
  "",
  "ㄱ",
  "ㄲ",
  "ㄳ",
  "ㄴ",
  "ㄵ",
  "ㄶ",
  "ㄷ",
  "ㄹ",
  "ㄺ",
  "ㄻ",
  "ㄼ",
  "ㄽ",
  "ㄾ",
  "ㄿ",
  "ㅀ",
  "ㅁ",
  "ㅂ",
  "ㅄ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
] as const;

/** Common English given names → conventional Korean spellings */
const COMMON_NAMES: Record<string, { hangul: string; guide: string }> = {
  john: { hangul: "존", guide: "Jon" },
  jonathan: { hangul: "조나단", guide: "Jonathan" },
  james: { hangul: "제임스", guide: "Jeimseu" },
  michael: { hangul: "마이클", guide: "Maikeul" },
  david: { hangul: "데이비드", guide: "Deibideu" },
  daniel: { hangul: "다니엘", guide: "Daniel" },
  christopher: { hangul: "크리스토퍼", guide: "Keuriseutopeo" },
  chris: { hangul: "크리스", guide: "Keuriseu" },
  andrew: { hangul: "앤드류", guide: "Aendeuryu" },
  matthew: { hangul: "매튜", guide: "Maetyu" },
  joshua: { hangul: "조슈아", guide: "Joshua" },
  joseph: { hangul: "조셉", guide: "Joseop" },
  william: { hangul: "윌리엄", guide: "William" },
  will: { hangul: "윌", guide: "Wil" },
  robert: { hangul: "로버트", guide: "Robeoteu" },
  richard: { hangul: "리처드", guide: "Richeodeu" },
  thomas: { hangul: "토마스", guide: "Thomas" },
  tom: { hangul: "톰", guide: "Tom" },
  charles: { hangul: "찰스", guide: "Chalseu" },
  anthony: { hangul: "앤서니", guide: "Aenseoni" },
  mark: { hangul: "마크", guide: "Makeu" },
  steven: { hangul: "스티븐", guide: "Seutibeun" },
  stephen: { hangul: "스티븐", guide: "Seutibeun" },
  steve: { hangul: "스티브", guide: "Seutibeu" },
  kevin: { hangul: "케빈", guide: "Kebin" },
  brian: { hangul: "브라이언", guide: "Beuraieon" },
  jason: { hangul: "제이슨", guide: "Jeiseun" },
  justin: { hangul: "저스틴", guide: "Jeoseutin" },
  eric: { hangul: "에릭", guide: "Erik" },
  ryan: { hangul: "라이언", guide: "Raieon" },
  jacob: { hangul: "제이콥", guide: "Jeikop" },
  nicholas: { hangul: "니콜라스", guide: "Nikollaseu" },
  nick: { hangul: "닉", guide: "Nik" },
  benjamin: { hangul: "벤자민", guide: "Benjamin" },
  samuel: { hangul: "사무엘", guide: "Samuel" },
  sam: { hangul: "샘", guide: "Saem" },
  nathan: { hangul: "네이선", guide: "Neiseon" },
  alexander: { hangul: "알렉산더", guide: "Alleksandeo" },
  alex: { hangul: "알렉스", guide: "Alleksseu" },
  tyler: { hangul: "타일러", guide: "Tailleo" },
  brandon: { hangul: "브랜든", guide: "Beuraendeun" },
  adam: { hangul: "아담", guide: "Adam" },
  harry: { hangul: "해리", guide: "Haeri" },
  henry: { hangul: "헨리", guide: "Henri" },
  peter: { hangul: "피터", guide: "Piteo" },
  paul: { hangul: "폴", guide: "Pol" },
  george: { hangul: "조지", guide: "Joji" },
  edward: { hangul: "에드워드", guide: "Edeuweodeu" },
  jack: { hangul: "잭", guide: "Jaek" },
  luke: { hangul: "루크", guide: "Rukeu" },
  leo: { hangul: "레오", guide: "Reo" },
  max: { hangul: "맥스", guide: "Maekseu" },
  owen: { hangul: "오웬", guide: "Owen" },
  noah: { hangul: "노아", guide: "Noa" },
  logan: { hangul: "로건", guide: "Rogeon" },
  mason: { hangul: "메이슨", guide: "Meiseun" },
  lucas: { hangul: "루카스", guide: "Rukaseu" },
  ethan: { hangul: "에단", guide: "Edan" },
  sarah: { hangul: "사라", guide: "Sara" },
  sara: { hangul: "사라", guide: "Sara" },
  emily: { hangul: "에밀리", guide: "Emilli" },
  emma: { hangul: "엠마", guide: "Emma" },
  jessica: { hangul: "제시카", guide: "Jesika" },
  jennifer: { hangul: "제니퍼", guide: "Jenipeo" },
  ashley: { hangul: "애슐리", guide: "Aeswilli" },
  amanda: { hangul: "아만다", guide: "Amanda" },
  melissa: { hangul: "멜리사", guide: "Mellisa" },
  michelle: { hangul: "미셸", guide: "Misyel" },
  elizabeth: { hangul: "엘리자베스", guide: "Ellijabeseu" },
  lauren: { hangul: "로렌", guide: "Roren" },
  rachel: { hangul: "레이첼", guide: "Reichel" },
  stephanie: { hangul: "스테파니", guide: "Seutepani" },
  nicole: { hangul: "니콜", guide: "Nikol" },
  samantha: { hangul: "사만다", guide: "Samantha" },
  rebecca: { hangul: "레베카", guide: "Rebeka" },
  laura: { hangul: "로라", guide: "Rora" },
  anna: { hangul: "안나", guide: "Anna" },
  amy: { hangul: "에이미", guide: "Eimi" },
  mary: { hangul: "메리", guide: "Meri" },
  maria: { hangul: "마리아", guide: "Maria" },
  sophia: { hangul: "소피아", guide: "Sopia" },
  sofia: { hangul: "소피아", guide: "Sopia" },
  olivia: { hangul: "올리비아", guide: "Ollibia" },
  ava: { hangul: "에이바", guide: "Eiba" },
  isabella: { hangul: "이사벨라", guide: "Isabella" },
  mia: { hangul: "미아", guide: "Mia" },
  charlotte: { hangul: "샬롯", guide: "Syallot" },
  harper: { hangul: "하퍼", guide: "Hapeo" },
  evelyn: { hangul: "에블린", guide: "Ebeullin" },
  grace: { hangul: "그레이스", guide: "Geureiseu" },
  chloe: { hangul: "클로이", guide: "Keulloi" },
  victoria: { hangul: "빅토리아", guide: "Biktoria" },
  lily: { hangul: "릴리", guide: "Rilli" },
  natalie: { hangul: "나탈리", guide: "Natali" },
  kate: { hangul: "케이트", guide: "Keiteu" },
  catherine: { hangul: "캐서린", guide: "Kaeseorin" },
  julia: { hangul: "줄리아", guide: "Julia" },
  julie: { hangul: "줄리", guide: "Juli" },
  lisa: { hangul: "리사", guide: "Risa" },
  kelly: { hangul: "켈리", guide: "Kelli" },
  kimberly: { hangul: "킴벌리", guide: "Kimbeolli" },
  heather: { hangul: "헤더", guide: "Hedeo" },
  tiffany: { hangul: "티파니", guide: "Tipani" },
};

type Consonant = { cho?: number; jong?: number };

const CONS: Record<string, Consonant> = {
  b: { cho: 7, jong: 17 },
  c: { cho: 0, jong: 1 },
  d: { cho: 3, jong: 7 },
  f: { cho: 17, jong: 17 },
  g: { cho: 0, jong: 1 },
  h: { cho: 18 },
  j: { cho: 12, jong: 22 },
  k: { cho: 15, jong: 1 },
  l: { cho: 5, jong: 8 },
  m: { cho: 6, jong: 16 },
  n: { cho: 2, jong: 4 },
  p: { cho: 17, jong: 17 },
  q: { cho: 15, jong: 1 },
  r: { cho: 5, jong: 8 },
  s: { cho: 9, jong: 19 },
  t: { cho: 16, jong: 7 },
  v: { cho: 7, jong: 17 },
  w: { cho: 11 },
  x: { cho: 9, jong: 1 },
  z: { cho: 12, jong: 22 },
  ch: { cho: 14, jong: 23 },
  sh: { cho: 9, jong: 19 },
  th: { cho: 16, jong: 7 },
  ph: { cho: 17, jong: 17 },
  kh: { cho: 15, jong: 1 },
  ng: { jong: 21 },
  ck: { jong: 1 },
};

const VOWELS: Record<string, { jung: number }> = {
  a: { jung: 0 },
  e: { jung: 5 },
  i: { jung: 20 },
  o: { jung: 8 },
  u: { jung: 13 },
  y: { jung: 20 },
  ae: { jung: 1 },
  ai: { jung: 1 },
  ay: { jung: 1 },
  ea: { jung: 5 },
  ee: { jung: 20 },
  ei: { jung: 5 },
  ey: { jung: 5 },
  ie: { jung: 20 },
  oa: { jung: 8 },
  oe: { jung: 11 },
  oi: { jung: 11 },
  oo: { jung: 13 },
  ou: { jung: 13 },
  ow: { jung: 8 },
  oy: { jung: 11 },
  ue: { jung: 13 },
  ui: { jung: 16 },
  uy: { jung: 16 },
  au: { jung: 8 },
  aw: { jung: 8 },
  eu: { jung: 18 },
  eo: { jung: 4 },
  ye: { jung: 6 },
  yo: { jung: 12 },
  yu: { jung: 17 },
  ya: { jung: 2 },
  wa: { jung: 9 },
  wo: { jung: 14 },
  wi: { jung: 16 },
  we: { jung: 15 },
};

function compose(cho: number, jung: number, jong = 0): string {
  return String.fromCharCode(0xac00 + (cho * 21 + jung) * 28 + jong);
}

export function decomposeHangul(text: string): string[] {
  const parts: string[] = [];
  for (const ch of text) {
    const code = ch.charCodeAt(0) - 0xac00;
    if (code < 0 || code > 11171) {
      if (ch.trim()) parts.push(ch);
      continue;
    }
    const jong = code % 28;
    const jung = ((code - jong) / 28) % 21;
    const cho = Math.floor(((code - jong) / 28 - jung) / 21);
    parts.push(CHO[cho], JUNG[jung]);
    if (jong > 0) parts.push(JONG[jong]);
  }
  return parts;
}

function takeLongest(
  input: string,
  i: number,
  table: Record<string, unknown>,
): string | null {
  let best: string | null = null;
  for (const key of Object.keys(table)) {
    if (input.startsWith(key, i) && (!best || key.length > best.length)) {
      best = key;
    }
  }
  return best;
}

function phoneticToHangul(raw: string): string {
  const s = raw.toLowerCase().replace(/[^a-z]/g, "");
  if (!s) return "";

  const out: string[] = [];
  let i = 0;
  let pendingCho = 11; // ㅇ

  while (i < s.length) {
    const vKey = takeLongest(s, i, VOWELS);
    if (vKey) {
      const jung = VOWELS[vKey].jung;
      let jong = 0;
      i += vKey.length;

      const cKey = takeLongest(s, i, CONS);
      if (cKey) {
        const after = i + cKey.length;
        const moreV = takeLongest(s, after, VOWELS);
        if (!moreV && CONS[cKey].jong !== undefined) {
          jong = CONS[cKey].jong!;
          i = after;
        }
      }

      out.push(compose(pendingCho, jung, jong));
      pendingCho = 11;
      continue;
    }

    const cKey = takeLongest(s, i, CONS);
    if (cKey) {
      pendingCho = CONS[cKey].cho ?? 11;
      i += cKey.length;
      if (i >= s.length) {
        out.push(compose(pendingCho, 18, 0));
        pendingCho = 11;
      }
      continue;
    }

    i += 1;
  }

  return out.join("");
}

function guideFromHangul(hangul: string): string {
  const map: Record<string, string> = {
    ㄱ: "g",
    ㄲ: "kk",
    ㄴ: "n",
    ㄷ: "d",
    ㄸ: "tt",
    ㄹ: "r",
    ㅁ: "m",
    ㅂ: "b",
    ㅃ: "pp",
    ㅅ: "s",
    ㅆ: "ss",
    ㅇ: "",
    ㅈ: "j",
    ㅉ: "jj",
    ㅊ: "ch",
    ㅋ: "k",
    ㅌ: "t",
    ㅍ: "p",
    ㅎ: "h",
    ㅏ: "a",
    ㅐ: "ae",
    ㅑ: "ya",
    ㅒ: "yae",
    ㅓ: "eo",
    ㅔ: "e",
    ㅕ: "yeo",
    ㅖ: "ye",
    ㅗ: "o",
    ㅘ: "wa",
    ㅙ: "wae",
    ㅚ: "oe",
    ㅛ: "yo",
    ㅜ: "u",
    ㅝ: "wo",
    ㅞ: "we",
    ㅟ: "wi",
    ㅠ: "yu",
    ㅡ: "eu",
    ㅢ: "ui",
    ㅣ: "i",
  };
  return decomposeHangul(hangul)
    .map((j) => map[j] ?? j)
    .join("")
    .replace(/^[a-z]/, (c) => c.toUpperCase());
}

export type NameConversion = {
  hangul: string;
  guide: string;
  jamo: string[];
};

export function convertEnglishName(input: string): NameConversion | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  const key = trimmed
    .toLowerCase()
    .replace(/[^a-z\s'-]/g, "")
    .trim();
  const first = key.split(/[\s'-]+/)[0] ?? "";
  if (!first) return null;

  const common = COMMON_NAMES[first];
  const hangul = common?.hangul ?? phoneticToHangul(first);
  if (!hangul) return null;

  return {
    hangul,
    guide: common?.guide ?? guideFromHangul(hangul),
    jamo: decomposeHangul(hangul),
  };
}
