import Link from "next/link";

const PRINCIPLES = [
  {
    id: "shape",
    label: "01",
    titleEn: "Read Hangul as shapes, not spelling",
    titleKo: "철자가 아니라 형태로 읽기",
    bodyEn:
      "Hangul is not a row of letters — it is a grid. Every syllable packs an initial consonant, a vowel, and an optional final into one square tile. Once you see that square, reading stops being decoding and starts being pattern recognition. That is why the lessons here open with the visual block before they ever mention a rule.",
    bodyKo:
      "한글은 글자를 나열한 것이 아니라 네모 칸에 쌓은 구조입니다. 초성과 중성, 그리고 있을 수도 없을 수도 있는 종성이 한 칸 안에 들어갑니다. 이 칸이 보이기 시작하면 읽기는 해독이 아니라 형태 인식이 됩니다. 이 사이트의 글이 문법 설명보다 시각적 블록에서 출발하는 이유입니다.",
  },
  {
    id: "context",
    label: "02",
    titleEn: "Context first, rules later",
    titleKo: "규칙보다 맥락이 먼저",
    bodyEn:
      "Most Korean courses hand you a conjugation table on day one. We do the opposite. Each article starts from a situation a learner actually hits — why a stranger calls you 이모 in a restaurant, why your friend suddenly drops honorifics, why Korean clocks feel backwards — and lets the grammar fall out of the story. You remember the scene, and the rule rides along with it.",
    bodyKo:
      "대부분의 한국어 수업은 첫날부터 활용표를 건넵니다. 여기서는 순서를 뒤집습니다. 각각의 글은 학습자가 실제로 부딪히는 장면에서 시작합니다. 식당에서 처음 본 사람이 왜 나를 이모라고 부르는지, 친구가 왜 갑자기 반말로 바꾸는지, 한국어 시계는 왜 거꾸로 읽히는지. 장면을 기억하면 규칙은 거기 딸려옵니다.",
  },
  {
    id: "loop",
    label: "03",
    titleEn: "Read, touch, then watch",
    titleKo: "읽고, 만지고, 본다",
    bodyEn:
      "Reading alone plateaus fast. Every topic here has three surfaces: a long-form article in Learn, a small interactive widget in Hangul Play where you type and hear the result, and a clip on the channel. Build a syllable by hand in Jamo Builder after reading about keyboard layout, and the article stops being trivia.",
    bodyKo:
      "읽기만 하면 금세 정체됩니다. 이곳의 주제에는 세 개의 면이 있습니다. Learn의 긴 글, 직접 입력하고 소리를 들어 보는 Hangul Play 위젯, 그리고 채널의 영상입니다. 자판 배열에 관한 글을 읽은 뒤 Jamo Builder에서 음절을 직접 쌓아 보면, 그 글은 더 이상 잡학이 아니게 됩니다.",
  },
] as const;

const STARTING_POINTS = [
  {
    href: "/learn/why-typing-korean-feels-like-tetris-hangul-keyboards",
    titleEn: "Why typing Korean feels like Tetris",
    titleKo: "한글 자판이 테트리스 같은 이유",
    noteKo: "글자가 칸에 쌓이는 원리부터 보고 싶다면.",
  },
  {
    href: "/learn/how-to-say-uncle-in-korean-oppa-samchon-ahjussi",
    titleEn: "오빠, 삼촌, 아저씨 — which “uncle” do you mean?",
    titleKo: "호칭이 관계를 결정하는 방식",
    noteKo: "사람을 부르는 말이 왜 그렇게 많은지 궁금하다면.",
  },
  {
    href: "/learn/4-digit-shift-reading-big-korean-numbers",
    titleEn: "The 4-digit shift: reading big Korean numbers",
    titleKo: "큰 수를 만 단위로 끊어 읽기",
    noteKo: "숫자에서 매번 막힌다면 여기부터.",
  },
] as const;

export function HomeApproach() {
  return (
    <section
      id="approach"
      aria-labelledby="approach-heading"
      className="scroll-mt-16 border-t-[0.5px] border-[#D9D9D3] px-5 section-y md:px-8"
    >
      <div className="mx-auto w-full min-w-0 max-w-xl md:max-w-2xl">
        <p className="font-en text-xs font-bold uppercase tracking-[0.14em] text-foreground/45">
          How this site works
        </p>
        <h2
          id="approach-heading"
          className="font-ko mt-4 text-xl font-black leading-snug tracking-tight text-foreground md:text-2xl"
        >
          문법을 쪼개지 않고, 한국어를 보이게 만듭니다
        </h2>
        <p className="font-en mt-3 text-sm leading-relaxed text-foreground/65 md:text-base">
          Uncle Hangul is written by a certified Korean language teacher who
          spent his career as a 3D and product designer. That mix decides
          everything about how the material is built: you get visual structure
          and cultural context instead of drills. Here is the method in three
          parts.
        </p>

        <div className="mt-10 space-y-10">
          {PRINCIPLES.map((principle) => (
            <article key={principle.id}>
              <p className="font-en text-[10px] font-bold uppercase tracking-[0.18em] text-foreground/35">
                {principle.label}
              </p>
              <h3 className="font-en mt-2 text-lg font-black leading-snug tracking-tight text-foreground">
                {principle.titleEn}
              </h3>
              <p className="font-ko mt-1 text-sm font-bold text-foreground/55">
                {principle.titleKo}
              </p>
              <p className="font-en mt-4 text-sm leading-relaxed text-foreground/70 md:text-base">
                {principle.bodyEn}
              </p>
              <p className="font-ko mt-3 text-sm leading-relaxed text-foreground/60">
                {principle.bodyKo}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-12 border-t-[0.5px] border-[#D9D9D3] pt-8">
          <p className="font-en text-xs font-bold uppercase tracking-[0.14em] text-foreground/45">
            Not sure where to start?
          </p>
          <p className="font-ko mt-3 text-sm leading-relaxed text-foreground/60">
            순서대로 읽을 필요는 없습니다. 지금 가장 막히는 지점에서 고르세요.
          </p>

          <ul className="mt-6 list-none space-y-4">
            {STARTING_POINTS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group block border-[0.5px] border-[#D9D9D3] px-4 py-4 transition-colors hover:border-[#FF4B3E]"
                >
                  <span className="font-en block text-sm font-black tracking-tight text-foreground transition-colors group-hover:text-[#FF4B3E]">
                    {item.titleEn}
                  </span>
                  <span className="font-ko mt-1 block text-xs font-bold text-foreground/50">
                    {item.titleKo}
                  </span>
                  <span className="font-ko mt-2 block text-xs leading-relaxed text-foreground/55">
                    {item.noteKo}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/learn"
            className="font-en touch-target mt-6 inline-flex min-h-12 items-center justify-center border-[0.5px] border-[#D9D9D3] bg-background px-4 text-[11px] font-bold uppercase tracking-[0.12em] text-foreground transition-colors hover:border-[#FF4B3E] hover:text-[#FF4B3E]"
          >
            Browse all articles ➔
          </Link>
        </div>
      </div>
    </section>
  );
}
