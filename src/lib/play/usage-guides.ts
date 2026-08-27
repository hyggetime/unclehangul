import type { ToolUsageGuide } from "@/lib/tools/usage-guide";

export const NAME_CONVERTER_USAGE: ToolUsageGuide = {
  ko: {
    title: "Name → Hangul 사용법",
    intro:
      "영문 이름을 입력하면 한글 표기와 발음 가이드를 봅니다. 복사 버튼으로 SNS·메시지에 붙여 넣을 수 있습니다.",
    steps: [
      {
        title: "1. 이름 입력",
        body: "John, Sarah처럼 영문 이름을 입력합니다. 대소문자는 구분하지 않습니다.",
      },
      {
        title: "2. 한글 확인",
        body: "가운데 큰 한글 블록과 아래 발음 가이드를 확인합니다. 표기는 일반적인 음역 규칙을 따릅니다.",
      },
      {
        title: "3. 복사",
        body: "Copy를 눌러 한글만 클립보드에 복사합니다.",
      },
    ],
    tip: "공식 표기(여권·비자)와 다를 수 있습니다. 중요한 서류는 기관 안내를 따르세요.",
  },
  en: {
    title: "How to use Name → Hangul",
    intro:
      "Type an English name to see Hangul spelling and a pronunciation hint. Copy the result for messages or notes.",
    steps: [
      {
        title: "1. Enter a name",
        body: "Type a name like John or Sarah. Case does not matter.",
      },
      {
        title: "2. Read the blocks",
        body: "Check the large Hangul in the center and the guide line below. Spelling follows common transliteration rules.",
      },
      {
        title: "3. Copy",
        body: "Tap Copy to put only the Hangul on your clipboard.",
      },
    ],
    tip: "May differ from passport or official romanization—confirm for legal documents.",
  },
};

export const CITY_NAMES_USAGE: ToolUsageGuide = {
  ko: {
    title: "City Names 사용법",
    intro:
      "영문 도시 이름을 입력하면 한국어 표기와 발음을 확인합니다. Listen으로 브라우저 TTS를 들을 수 있습니다.",
    steps: [
      {
        title: "1. 도시 입력",
        body: "Seoul, Paris, Tokyo 등 영문으로 입력합니다. 아래 Quick picks에서 바로 고를 수도 있습니다.",
      },
      {
        title: "2. 한글·로마자 확인",
        body: "한글 표기와 로마자 발음을 함께 봅니다. 해외 지명은 한국어식 표기가 따로 있습니다.",
      },
      {
        title: "3. Listen",
        body: "Listen을 누르면 기기 음성(TTS)으로 한글 이름을 들을 수 있습니다. 이어폰·볼륨을 확인하세요.",
      },
    ],
    tip: "목록에 없는 도시는 아직 지원하지 않습니다. Learn 글의 Visual Vocabulary와 함께 보면 좋습니다.",
  },
  en: {
    title: "How to use City Names",
    intro:
      "Type a city in English to see Korean spelling and romanization. Tap Listen for browser text-to-speech.",
    steps: [
      {
        title: "1. Enter a city",
        body: "Try Seoul, Paris, or Tokyo—or tap a Quick pick chip.",
      },
      {
        title: "2. Read Hangul",
        body: "Korean place names often differ from English spelling. Check both Hangul and the romanization line.",
      },
      {
        title: "3. Listen",
        body: "Tap Listen for TTS in Korean. Check volume and headphones if you hear nothing.",
      },
    ],
    tip: "Only listed cities work for now. Pair with Learn articles for loanword patterns.",
  },
};

export const JAMO_BUILDER_USAGE: ToolUsageGuide = {
  ko: {
    title: "Jamo Builder 사용법",
    intro:
      "초성·중성·종성을 고르면 한 음절 블록이 만들어집니다. Listen으로 소리를 확인하세요.",
    steps: [
      {
        title: "1. 초성 (초)",
        body: "음절 첫 자음을 고릅니다. 예: ㄱ, ㄴ, ㅎ",
      },
      {
        title: "2. 중성 (중)",
        body: "모음을 고릅니다. 예: ㅏ, ㅓ, ㅣ",
      },
      {
        title: "3. 종성 (종)",
        body: "받침이 있으면 고르고, 없으면 ∅(빈칸)을 선택합니다.",
      },
      {
        title: "4. Listen",
        body: "가운데 큰 글자와 Listen으로 조합 결과를 확인합니다.",
      },
    ],
    tip: "모바일에서는 버튼이 여러 줄로 줄바꿈됩니다. 한 줄씩 스크롤하며 눌러 보세요.",
  },
  en: {
    title: "How to use Jamo Builder",
    intro:
      "Pick initial, medial, and final jamo to build one Hangul syllable. Use Listen to hear it.",
    steps: [
      {
        title: "1. Initial (cho)",
        body: "Choose the first consonant—e.g. ㄱ, ㄴ, ㅎ.",
      },
      {
        title: "2. Medial (jung)",
        body: "Choose the vowel—e.g. ㅏ, ㅓ, ㅣ.",
      },
      {
        title: "3. Final (jong)",
        body: "Pick a final consonant, or ∅ for no batchim.",
      },
      {
        title: "4. Listen",
        body: "Read the large syllable in the center and tap Listen.",
      },
    ],
    tip: "On mobile, jamo buttons wrap to multiple rows—scroll and tap one row at a time.",
  },
};

const PLAY_USAGE_BY_SLUG: Record<string, ToolUsageGuide> = {
  "name-converter": NAME_CONVERTER_USAGE,
  "city-names": CITY_NAMES_USAGE,
  "jamo-builder": JAMO_BUILDER_USAGE,
};

export function getPlayUsageGuide(slug: string): ToolUsageGuide | undefined {
  return PLAY_USAGE_BY_SLUG[slug];
}
