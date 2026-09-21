import Link from "next/link";

const THREADS = [
  {
    id: "writing-system",
    titleEn: "How the writing system is built",
    titleKo: "글자가 조립되는 방식",
    bodyEn:
      "Start here if Hangul still looks like decoration. These explain why a syllable is a square, what happens when foreign sounds get forced into that square, and why your mouth stumbles where it does.",
    bodyKo:
      "한글이 아직 장식처럼 보인다면 여기서 시작하세요. 음절이 왜 네모인지, 외래어가 그 네모에 밀어 넣어질 때 무슨 일이 벌어지는지, 그리고 입이 어디에서 걸리는지를 다룹니다.",
    posts: [
      {
        href: "/learn/why-typing-korean-feels-like-tetris-hangul-keyboards",
        label: "Why typing Korean feels like Tetris",
      },
      {
        href: "/learn/graphic-blueprint-hangul-loanwords",
        label: "The graphic blueprint of Hangul loanwords",
      },
      {
        href: "/learn/tongue-twister-girin",
        label: "Tongue twisters: 기린 그림",
      },
    ],
  },
  {
    id: "ordering",
    titleEn: "How Korean orders information",
    titleKo: "정보를 늘어놓는 순서",
    bodyEn:
      "Korean consistently goes from large to small — in addresses, dates, and clocks — and it groups numbers in fours rather than threes. Once you see that both rules are the same instinct, a lot of confusion resolves at once.",
    bodyKo:
      "한국어는 주소, 날짜, 시계에서 언제나 큰 단위에서 작은 단위로 갑니다. 숫자는 세 자리가 아니라 네 자리로 끊습니다. 이 둘이 같은 본능에서 나왔다는 것이 보이면 여러 혼란이 한꺼번에 풀립니다.",
    posts: [
      {
        href: "/learn/from-universe-to-doorstep-korea-big-to-small-logic",
        label: "From the universe to your doorstep",
      },
      {
        href: "/learn/why-you-are-reading-korean-clocks-backwards",
        label: "Why you're reading Korean clocks backwards",
      },
      {
        href: "/learn/4-digit-shift-reading-big-korean-numbers",
        label: "The 4-digit shift for big numbers",
      },
    ],
  },
  {
    id: "address",
    titleEn: "How people position each other",
    titleKo: "서로를 부르고 자리매김하는 법",
    bodyEn:
      "Korean makes you declare a relationship before you can finish a sentence — which title to use, which speech level, whether to say 우리 or 내. These are the articles learners tend to need soonest after arriving.",
    bodyKo:
      "한국어에서는 문장을 끝맺기 전에 관계를 먼저 선언해야 합니다. 어떤 호칭을 쓸지, 어떤 말투를 쓸지, 우리라고 할지 내라고 할지. 한국에 도착한 학습자가 가장 빨리 필요로 하는 글들입니다.",
    posts: [
      {
        href: "/learn/how-to-say-uncle-in-korean-oppa-samchon-ahjussi",
        label: "오빠, 삼촌, 아저씨 — which uncle?",
      },
      {
        href: "/learn/when-do-koreans-switch-jondaetmal-to-banmal",
        label: "When Koreans switch 존댓말 to 반말",
      },
      {
        href: "/learn/why-solo-dwellers-korea-still-say-our-house",
        label: "Why solo dwellers still say 우리 집",
      },
    ],
  },
  {
    id: "culture",
    titleEn: "Words and rituals that carry culture",
    titleKo: "문화를 실어 나르는 말과 의례",
    bodyEn:
      "Vocabulary that has no clean English equivalent, and the customs behind it — birth dreams, womb names, zodiac pairings, and the annual traffic jam that explains more about Korean family life than any essay could.",
    bodyKo:
      "영어로 깔끔하게 옮겨지지 않는 어휘와 그 뒤의 관습입니다. 태몽, 태명, 띠 궁합, 그리고 어떤 글보다 한국 가족 문화를 잘 설명하는 연례 교통 체증까지.",
    posts: [
      {
        href: "/learn/uncle-hangul-k-dictionary-vol-1-5-untranslatable-korean-words",
        label: "Five words English keeps getting wrong",
      },
      {
        href: "/learn/tae-mong-birth-dream-experience-korea",
        label: "태몽: Korean birth dreams",
      },
      {
        href: "/learn/23-hours-highway-korea-chuseok-thanksgiving-traffic",
        label: "23 hours on the highway: Chuseok traffic",
      },
    ],
  },
] as const;

export function LearnIndexIntro() {
  return (
    <section
      aria-labelledby="learn-threads-heading"
      className="border-b-[0.5px] border-[#D9D9D3] py-8 md:py-10"
    >
      <div className="max-w-2xl">
        <h2
          id="learn-threads-heading"
          className="font-ko text-lg font-black leading-snug tracking-tight text-foreground md:text-xl"
        >
          목록은 최신순이지만, 읽는 순서는 따로 있습니다
        </h2>
        <p className="font-en mt-4 text-sm leading-relaxed text-foreground/70 md:text-base">
          These articles are not a course and they do not need to be read in
          order. They do, however, fall into four recurring threads, and reading
          two or three from the same thread is far more useful than sampling one
          from each. Pick the thread that matches what is currently tripping you
          up.
        </p>
        <p className="font-ko mt-3 text-sm leading-relaxed text-foreground/60">
          이 글들은 강의가 아니고 순서대로 읽을 필요도 없습니다. 다만 네 개의
          줄기로 반복해서 묶이며, 여러 줄기에서 하나씩 골라 읽는 것보다 한 줄기에서
          두세 편을 이어 읽는 쪽이 훨씬 효과적입니다. 지금 가장 막히는 쪽을
          고르세요.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
        {THREADS.map((thread) => (
          <div key={thread.id}>
            <h3 className="font-en text-sm font-black tracking-tight text-foreground">
              {thread.titleEn}
            </h3>
            <p className="font-ko mt-1 text-xs font-bold text-foreground/50">
              {thread.titleKo}
            </p>
            <p className="font-en mt-3 text-sm leading-relaxed text-foreground/65">
              {thread.bodyEn}
            </p>
            <p className="font-ko mt-2 text-xs leading-relaxed text-foreground/55">
              {thread.bodyKo}
            </p>
            <ul className="mt-4 list-none space-y-2">
              {thread.posts.map((post) => (
                <li key={post.href}>
                  <Link
                    href={post.href}
                    className="font-en text-xs font-bold leading-snug text-foreground/75 underline decoration-[0.5px] underline-offset-4 transition-colors hover:text-[#FF4B3E]"
                  >
                    {post.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
