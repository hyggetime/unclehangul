export type PlayGuideSection = {
  headingEn: string;
  headingKo: string;
  bodyEn: string;
  bodyKo: string;
};

export type PlayGuideRelated = {
  href: string;
  label: string;
  noteKo: string;
};

export type PlayWidgetGuide = {
  headingKo: string;
  introEn: string;
  introKo: string;
  sections: readonly PlayGuideSection[];
  faq: readonly { question: string; answer: string }[];
  related: readonly PlayGuideRelated[];
};

const CITY_NAMES_GUIDE: PlayWidgetGuide = {
  headingKo: "도시 이름은 외래어 표기를 배우기 가장 좋은 재료입니다",
  introEn:
    "Every foreign word entering Korean gets rebuilt to fit the syllable block. Place names make that process visible because you already know how they are supposed to sound, so any gap between your expectation and the Hangul is information rather than noise.",
  introKo:
    "한국어로 들어오는 모든 외래어는 음절 블록에 맞게 다시 조립됩니다. 지명은 그 과정을 가장 잘 드러냅니다. 원래 발음을 이미 알고 있기 때문에, 예상과 한글 표기 사이의 차이가 혼란이 아니라 정보가 되기 때문입니다.",
  sections: [
    {
      headingEn: "The spelling follows the source language, not English",
      headingKo: "표기는 영어가 아니라 원어를 따릅니다",
      bodyEn:
        "Paris is 파리, not 패리스. Venice is 베네치아, closer to the Italian Venezia than to anything English. Korea's loanword transcription rules try to follow the language a word actually arrived from, which is why so many European city names look unfamiliar to English speakers. If a spelling surprises you, the usual reason is that the name came into Korean through French, German, or Italian.",
      bodyKo:
        "Paris는 패리스가 아니라 파리이고, Venice는 영어보다 이탈리아어 Venezia에 가까운 베네치아입니다. 외래어 표기법은 그 단어가 실제로 들어온 경로의 언어를 따르려 합니다. 유럽 도시 이름이 영어 화자에게 낯설게 보이는 이유가 여기 있습니다. 표기가 뜻밖이라면 대개 영어가 아닌 프랑스어·독일어·이탈리아어를 거쳐 들어왔기 때문입니다.",
    },
    {
      headingEn: "Syllables multiply because consonants cannot stack",
      headingKo: "자음이 뭉치지 못해 음절이 늘어납니다",
      bodyEn:
        "English happily runs three or four consonants together. Hangul cannot: each block takes one initial consonant, one vowel, and at most one final. So Frankfurt spreads into 프랑크푸르트 and Stockholm into 스톡홀름. Count the tiles against the original and you can see exactly where Korean had to insert a vowel to keep the structure legal.",
      bodyKo:
        "영어는 자음 서너 개를 붙여 쓰지만 한글은 그럴 수 없습니다. 한 블록에는 초성 하나, 중성 하나, 종성은 많아야 하나가 들어갑니다. 그래서 Frankfurt는 프랑크푸르트로, Stockholm은 스톡홀름으로 늘어납니다. 원래 철자와 블록 수를 맞춰 세어 보면 한국어가 구조를 지키려고 어디에 모음을 끼워 넣었는지 그대로 보입니다.",
    },
    {
      headingEn: "Use Listen for rhythm, not for accent",
      headingKo: "Listen은 발음이 아니라 박자를 확인하는 용도입니다",
      bodyEn:
        "The Listen button uses your browser's Korean text-to-speech, so the voice differs by device. It is reliable for counting beats and hearing where a syllable closes on a final consonant, but it flattens the intonation a native speaker would use. Treat it as a metronome for the block structure and get your accent elsewhere.",
      bodyKo:
        "Listen은 브라우저의 한국어 음성 합성을 사용하므로 기기마다 목소리가 다릅니다. 박자를 세거나 받침에서 음절이 닫히는 지점을 확인하기에는 충분하지만, 원어민의 억양은 평평하게 뭉갭니다. 블록 구조를 재는 메트로놈으로 쓰고 억양은 다른 데서 익히는 편이 좋습니다.",
    },
  ],
  faq: [
    {
      question: "찾는 도시가 목록에 없습니다.",
      answer:
        "현재는 선별한 도시 목록 안에서만 동작합니다. 표기가 갈리는 지명은 임의로 변환하기보다 확인된 것만 넣는 쪽을 택했습니다. 자주 찾는 도시가 빠져 있다면 Contact로 알려 주세요. 목록에 반영합니다.",
    },
    {
      question: "한국 사람이 실제로 쓰는 표기와 다를 수 있나요?",
      answer:
        "있습니다. 외래어 표기법이 정한 형태와 일상에서 굳어진 형태가 어긋나는 경우가 있습니다. 이 위젯은 표준 표기를 기준으로 보여 주므로, 실제 대화에서는 다른 형태를 들을 수 있습니다.",
    },
    {
      question: "Listen을 눌러도 소리가 나지 않습니다.",
      answer:
        "기기에 한국어 음성 팩이 없거나 브라우저가 음성 합성을 막은 경우입니다. 볼륨과 무음 모드를 확인하고, iOS에서는 화면을 한 번 터치한 뒤 다시 눌러 보세요. 일부 브라우저는 사용자 조작 이후에만 소리를 허용합니다.",
    },
    {
      question: "여권이나 서류의 영문 표기에 사용해도 되나요?",
      answer:
        "권장하지 않습니다. 이 위젯은 학습용 표기를 보여 줍니다. 여권·비자·항공권처럼 법적 효력이 있는 서류는 반드시 발급 기관의 안내를 따르세요.",
    },
  ],
  related: [
    {
      href: "/learn/from-water-is-self-to-aircon-korea-shrinks-english",
      label: "How Korean shrinks English",
      noteKo: "에어컨, 아파트처럼 짧게 잘려 정착한 외래어의 규칙.",
    },
    {
      href: "/learn/graphic-blueprint-hangul-loanwords",
      label: "The graphic blueprint of Hangul loanwords",
      noteKo: "외래어가 음절 블록에 담기는 과정을 도식으로 분해합니다.",
    },
  ],
};

const JAMO_BUILDER_GUIDE: PlayWidgetGuide = {
  headingKo: "한글은 나열이 아니라 조립입니다",
  introEn:
    "A Hangul syllable is not a sequence of letters sitting side by side — it is up to three parts assembled into one square. Building those squares by hand, a few dozen times, teaches the structure in a way that reading about it never quite does.",
  introKo:
    "한글 음절은 글자를 옆으로 늘어놓은 것이 아니라, 최대 세 부분을 한 칸에 조립한 것입니다. 이 칸을 직접 수십 번 쌓아 보면 설명만 읽어서는 잘 잡히지 않던 구조가 손에 붙습니다.",
  sections: [
    {
      headingEn: "Three slots: initial, medial, final",
      headingKo: "세 자리: 초성, 중성, 종성",
      bodyEn:
        "Every block starts with a consonant (초성), takes a vowel (중성), and may close with another consonant (종성, also called batchim). The vowel is never optional — that is why ㅇ exists as a silent placeholder in words like 아, filling the initial slot so the vowel has something to sit beside. Choose ∅ in the final row when the syllable ends open.",
      bodyKo:
        "모든 블록은 초성 자음으로 시작해 중성 모음을 받고, 종성 자음으로 닫힐 수도 있습니다. 종성은 받침이라고 부릅니다. 중성은 생략할 수 없습니다. 아처럼 모음으로 시작하는 글자에 소리 없는 ㅇ이 들어가는 이유가 그것입니다. 초성 자리를 채워야 모음이 놓일 자리가 생깁니다. 받침 없이 열린 음절은 종성 줄에서 ∅을 고르세요.",
    },
    {
      headingEn: "The vowel decides the shape of the square",
      headingKo: "모음이 칸의 모양을 결정합니다",
      bodyEn:
        "Vertical vowels like ㅏ, ㅓ, ㅣ push the initial consonant to the left and stand beside it: 가, 너, 미. Horizontal vowels like ㅗ, ㅜ, ㅡ slide underneath instead: 고, 누, 그. Compound vowels such as ㅘ and ㅚ wrap around two sides. Swap only the vowel in the builder and watch the whole layout reflow — the consonant did not change, but its position did.",
      bodyKo:
        "ㅏ, ㅓ, ㅣ처럼 세로로 선 모음은 초성을 왼쪽으로 밀고 그 옆에 섭니다. 가, 너, 미가 그렇습니다. ㅗ, ㅜ, ㅡ처럼 가로로 누운 모음은 초성 아래로 들어갑니다. 고, 누, 그가 그렇습니다. ㅘ, ㅚ 같은 복합 모음은 두 방향을 감쌉니다. 위젯에서 모음만 바꿔 보면 자음은 그대로인데 배치가 통째로 다시 흐르는 것을 볼 수 있습니다.",
    },
    {
      headingEn: "The final consonant is where words change meaning",
      headingKo: "의미를 가르는 것은 받침입니다",
      bodyEn:
        "Keep 가 and add finals: 각, 간, 갈, 감, 강. Five different words, one changed slot. This is also where pronunciation gets interesting, because a final consonant often reshapes the sound of whatever follows it in real speech. Cycling through the final row while listening is the fastest way to stop treating batchim as an afterthought.",
      bodyKo:
        "가에 받침을 붙여 보세요. 각, 간, 갈, 감, 강. 한 자리만 바꿨는데 다섯 개의 다른 단어가 됩니다. 발음이 흥미로워지는 지점도 여기입니다. 실제 말에서는 받침이 뒤에 오는 소리를 자주 바꿔 놓기 때문입니다. 종성 줄을 훑으며 소리를 들어 보는 것이 받침을 곁다리로 취급하지 않게 되는 가장 빠른 방법입니다.",
    },
  ],
  faq: [
    {
      question: "종성 줄의 ∅은 무엇인가요?",
      answer:
        "받침이 없다는 뜻입니다. 가, 노, 두처럼 모음으로 끝나는 열린 음절을 만들 때 선택합니다. 한글 음절의 약 절반이 여기 해당합니다.",
    },
    {
      question: "초성에 ㅇ을 넣으면 소리가 안 나는데 왜 있나요?",
      answer:
        "초성 자리를 비워 둘 수 없기 때문입니다. 모음으로 시작하는 음절에서 ㅇ은 자리를 채우는 역할만 하고 소리는 내지 않습니다. 다만 같은 ㅇ이 종성에 오면 받침 소리가 납니다. 강의 끝소리가 그 예입니다.",
    },
    {
      question: "겹받침(ㄳ, ㄼ 같은 것)도 만들 수 있나요?",
      answer:
        "현재 위젯은 홑받침만 다룹니다. 겹받침은 발음 규칙이 따로 있어서 조합기만으로는 오해를 만들기 쉽습니다. 기본 구조가 익숙해진 뒤 별도로 다루는 편이 낫습니다.",
    },
    {
      question: "모바일에서 버튼이 너무 많습니다.",
      answer:
        "자모 버튼이 여러 줄로 줄바꿈됩니다. 초성, 중성, 종성 한 줄씩 가로로 훑으며 눌러 보세요. 가로 모드로 돌리면 한 번에 보이는 버튼이 늘어납니다.",
    },
  ],
  related: [
    {
      href: "/learn/why-typing-korean-feels-like-tetris-hangul-keyboards",
      label: "Why typing Korean feels like Tetris",
      noteKo: "자판에서 자모가 실시간으로 블록에 쌓이는 원리.",
    },
    {
      href: "/learn/graphic-blueprint-hangul-loanwords",
      label: "The graphic blueprint of Hangul loanwords",
      noteKo: "같은 조립 원리가 외래어에 적용되는 방식.",
    },
  ],
};

const GUIDES_BY_SLUG: Record<string, PlayWidgetGuide> = {
  "city-names": CITY_NAMES_GUIDE,
  "jamo-builder": JAMO_BUILDER_GUIDE,
};

export function getPlayWidgetGuide(slug: string): PlayWidgetGuide | undefined {
  return GUIDES_BY_SLUG[slug];
}
