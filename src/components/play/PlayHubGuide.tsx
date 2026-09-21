import Link from "next/link";

const WIDGET_NOTES = [
  {
    id: "name-converter",
    href: "/#name-converter",
    titleEn: "Name → Hangul",
    titleKo: "이름 → 한글",
    bodyEn:
      "Korean does not borrow foreign names letter by letter; it rebuilds them syllable by syllable. “Chris” cannot stay one cluster because Hangul has no way to stack three consonants in a row, so it becomes 크리스 — three tiles, three beats. Typing your own name is usually the first moment the syllable-block rule stops being abstract.",
    bodyKo:
      "한국어는 외국 이름을 글자 단위로 옮기지 않고 음절 단위로 다시 쌓습니다. Chris가 한 덩어리로 남을 수 없는 이유는 한글이 자음 세 개를 연달아 쌓지 못하기 때문입니다. 그래서 크리스, 세 칸 세 박자가 됩니다. 자기 이름을 넣어 보는 순간 음절 블록 규칙이 처음으로 구체적으로 느껴집니다.",
    readHref: "/learn/graphic-blueprint-hangul-loanwords",
    readLabel: "The graphic blueprint of loanwords",
  },
  {
    id: "city-names",
    href: "/play/city-names",
    titleEn: "City Names",
    titleKo: "도시 이름 듣기",
    bodyEn:
      "Place names are the cleanest way to hear how Korean reshapes foreign sounds. Paris turns into 파리, not 패리스, because the name arrived through French rather than English. Sydney keeps its consonants but loses its stress. Type a city, read the Hangul, then press Listen and check whether your ear agrees with the spelling.",
    bodyKo:
      "지명은 한국어가 외래 발음을 어떻게 다시 빚는지 가장 선명하게 들려줍니다. Paris가 패리스가 아니라 파리가 된 것은 영어가 아니라 프랑스어를 거쳐 들어왔기 때문입니다. 도시를 입력하고 한글 표기를 읽은 뒤 Listen을 눌러 귀와 표기가 일치하는지 확인해 보세요.",
    readHref: "/learn/from-water-is-self-to-aircon-korea-shrinks-english",
    readLabel: "How Korean shrinks English",
  },
  {
    id: "jamo-builder",
    href: "/play/jamo-builder",
    titleEn: "Jamo Builder",
    titleKo: "초·중·종성 조합",
    bodyEn:
      "This is the engine room. Pick an initial consonant, a vowel, and optionally a final, and watch the three pieces snap into one square. Swap only the final and the whole syllable changes weight: 가 → 각 → 간. Doing this by hand a dozen times teaches the batchim faster than any explanation, because you feel where the sound closes.",
    bodyKo:
      "여기가 엔진룸입니다. 초성과 중성을 고르고 필요하면 종성을 더하면, 세 조각이 한 칸으로 맞물립니다. 종성만 바꿔도 음절의 무게가 달라집니다. 가 → 각 → 간. 열 번쯤 직접 조합해 보면 어떤 설명보다 빠르게 받침이 몸에 붙습니다. 소리가 닫히는 지점을 직접 느끼기 때문입니다.",
    readHref: "/learn/why-typing-korean-feels-like-tetris-hangul-keyboards",
    readLabel: "Why typing Korean feels like Tetris",
  },
] as const;

export function PlayHubGuide() {
  return (
    <section
      aria-labelledby="play-guide-heading"
      className="border-t-[0.5px] border-[#D9D9D3] bg-[#F2F2F0]"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 section-y md:px-8">
        <article className="mx-auto max-w-2xl">
          <h2
            id="play-guide-heading"
            className="font-ko text-xl font-black tracking-tight text-foreground md:text-2xl"
          >
            위젯 하나가 설명 한 단락보다 빠를 때가 있습니다
          </h2>
          <p className="font-en mt-4 text-sm leading-relaxed text-foreground/70 md:text-base">
            Hangul Play is not a game collection. Each widget isolates exactly
            one mechanic that trips up learners and lets you run it yourself
            until the pattern is obvious. They are deliberately small — a minute
            each — and every one of them has a full article behind it if you
            want the reasoning.
          </p>
          <p className="font-ko mt-3 text-sm leading-relaxed text-foreground/60">
            Hangul Play는 게임 모음이 아닙니다. 각 위젯은 학습자가 자주 걸려
            넘어지는 원리 하나만 떼어 내어, 직접 돌려 보며 패턴이 눈에 들어올
            때까지 반복할 수 있게 만든 것입니다. 하나에 1분이면 충분하고, 더
            알고 싶다면 각각에 대응하는 글이 준비되어 있습니다.
          </p>

          <div className="mt-10 space-y-10">
            {WIDGET_NOTES.map((widget) => (
              <div
                key={widget.id}
                className="border-t-[0.5px] border-[#D9D9D3] pt-8"
              >
                <h3 className="font-en text-lg font-black leading-snug tracking-tight text-foreground">
                  {widget.titleEn}
                </h3>
                <p className="font-ko mt-1 text-sm font-bold text-foreground/55">
                  {widget.titleKo}
                </p>
                <p className="font-en mt-4 text-sm leading-relaxed text-foreground/70 md:text-base">
                  {widget.bodyEn}
                </p>
                <p className="font-ko mt-3 text-sm leading-relaxed text-foreground/60">
                  {widget.bodyKo}
                </p>
                <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                  <Link
                    href={widget.href}
                    className="font-en touch-target inline-flex min-h-12 items-center justify-center border-[0.5px] border-[#111111] bg-[#111111] px-4 text-[11px] font-bold uppercase tracking-[0.12em] text-[#F2F2F0] transition-colors hover:border-[#FF4B3E] hover:bg-[#FF4B3E]"
                  >
                    Open widget ➔
                  </Link>
                  <Link
                    href={widget.readHref}
                    className="font-en touch-target inline-flex min-h-12 items-center justify-center border-[0.5px] border-[#D9D9D3] bg-background px-4 text-[11px] font-bold uppercase tracking-[0.12em] text-foreground transition-colors hover:border-[#FF4B3E] hover:text-[#FF4B3E]"
                  >
                    {widget.readLabel} ↗
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 border-t-[0.5px] border-[#D9D9D3] pt-8">
            <h3 className="font-ko text-base font-black tracking-tight text-foreground">
              소리는 기기 음성으로 재생됩니다
            </h3>
            <p className="font-en mt-3 text-sm leading-relaxed text-foreground/70 md:text-base">
              The Listen buttons use your browser&apos;s built-in Korean
              text-to-speech, so the voice depends on your device and the Korean
              voice pack it has installed. It is close enough for rhythm and
              syllable count, but treat it as a reference rather than a native
              model — for pronunciation you want to imitate, the video channel
              is the better source.
            </p>
            <p className="font-ko mt-3 text-sm leading-relaxed text-foreground/60">
              Listen 버튼은 브라우저에 내장된 한국어 음성 합성을 사용합니다.
              기기와 설치된 음성 팩에 따라 목소리가 달라집니다. 박자와 음절 수를
              확인하기에는 충분하지만 원어민 발음의 기준으로 삼기에는 한계가
              있습니다. 따라 하고 싶은 발음은 영상 채널 쪽이 더 정확합니다.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
