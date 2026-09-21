import type { Metadata } from "next";
import Link from "next/link";
import { getContactMetadata } from "@/lib/contact/metadata";

const INSTAGRAM_URL = "https://www.instagram.com/uncle_hangul/";
const YOUTUBE_CHANNEL_URL =
  "https://www.youtube.com/channel/UC0Rtx0qDJhDqet5xWVMslfg";
const CONTACT_EMAIL = "unclehangul@gmail.com";

export const metadata: Metadata = getContactMetadata();

export default function ContactPage() {
  return (
    <div className="md:col-span-12">
      <div className="mx-auto w-full max-w-[1440px] p-4 md:p-8">
        <div className="flex h-10 items-center justify-between border-b-[0.5px] border-[#D9D9D3] px-1">
          <p className="font-en text-[10px] font-bold uppercase tracking-widest text-foreground/45">
            Contact
          </p>
          <Link
            href="/"
            className="font-en text-[10px] font-bold uppercase tracking-widest text-foreground/45 transition-colors hover:text-[#FF4B3E]"
          >
            Home ↗
          </Link>
        </div>

        <article className="mx-auto max-w-2xl border-b-[0.5px] border-[#D9D9D3] px-1 section-y">
          <h1 className="font-en text-2xl font-black leading-tight tracking-tight text-foreground md:text-3xl">
            Say Hello to Uncle Hangul!
          </h1>

          <div className="font-en mt-8 space-y-4 text-sm leading-relaxed text-foreground/70 md:text-base">
            <p>
              Have a question about Korean cultural contexts? Or maybe you want
              to suggest the next vocabulary pair for me to cover? Feel free to
              reach out. I&apos;m always open to interesting conversations.
            </p>
            <p>
              The messages I enjoy most are the specific ones. &ldquo;Korean is
              hard&rdquo; is difficult to answer; &ldquo;why did my coworker
              switch to 반말 after one lunch, and did I miss a signal?&rdquo; is
              a question I can actually build something around. Several articles
              on this site started as a reader&apos;s confusion about a single
              moment, so a detailed question genuinely changes what gets
              published next.
            </p>
          </div>

          <div className="mt-10 border-t-[0.5px] border-[#D9D9D3] pt-8">
            <h2 className="font-en text-xs font-bold uppercase tracking-[0.14em] text-foreground/45">
              What people usually write about
            </h2>
            <dl className="mt-6 space-y-6">
              <div>
                <dt className="font-en text-sm font-black tracking-tight text-foreground">
                  A word or situation you want explained
                </dt>
                <dd className="font-en mt-2 text-sm leading-relaxed text-foreground/65 md:text-base">
                  Send the sentence you heard and where you heard it — a drama,
                  a coworker, a shop. Context is what makes an explanation
                  useful, and it is usually the part that gets left out.
                </dd>
                <dd className="font-ko mt-2 text-sm leading-relaxed text-foreground/55">
                  들었던 문장과 그 상황을 함께 적어 주세요. 드라마인지, 동료가
                  한 말인지, 가게에서 들은 말인지. 설명을 쓸모 있게 만드는 건
                  맥락인데 대개 그 부분이 빠집니다.
                </dd>
              </div>
              <div>
                <dt className="font-en text-sm font-black tracking-tight text-foreground">
                  A correction
                </dt>
                <dd className="font-en mt-2 text-sm leading-relaxed text-foreground/65 md:text-base">
                  If something here is wrong, outdated, or reads as a regional
                  usage presented as universal, please tell me. I would rather
                  fix an article than defend it, and corrections get credited
                  unless you ask otherwise.
                </dd>
                <dd className="font-ko mt-2 text-sm leading-relaxed text-foreground/55">
                  틀렸거나, 지금은 쓰지 않거나, 특정 지역에서만 쓰는 표현을
                  일반적인 것처럼 써 둔 부분이 있다면 알려 주세요. 글을 방어하기
                  보다 고치는 쪽이 낫습니다. 원하지 않는다고 하시지 않는 한
                  수정에는 제보해 주신 분을 밝힙니다.
                </dd>
              </div>
              <div>
                <dt className="font-en text-sm font-black tracking-tight text-foreground">
                  Collaboration, teaching, or using the material
                </dt>
                <dd className="font-en mt-2 text-sm leading-relaxed text-foreground/65 md:text-base">
                  Teachers are welcome to use these articles and the Hangul Play
                  widgets in class — no permission needed, a link back is
                  enough. For reposting full articles, translations, or brand
                  work, email me with what you have in mind.
                </dd>
                <dd className="font-ko mt-2 text-sm leading-relaxed text-foreground/55">
                  수업에서 이곳의 글과 Hangul Play 위젯을 쓰셔도 됩니다. 따로
                  허락을 받을 필요는 없고 출처 링크만 남겨 주시면 충분합니다. 글
                  전문 재게시, 번역, 브랜드 협업은 메일로 내용을 보내 주세요.
                </dd>
              </div>
            </dl>
          </div>

          <ul className="font-en mt-8 space-y-4 border-t-[0.5px] border-[#D9D9D3] pt-8 text-sm leading-relaxed text-foreground/75 md:text-base">
            <li>
              <span className="font-bold text-foreground">Email</span>
              <br />
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-foreground underline decoration-[0.5px] underline-offset-4 transition-colors hover:text-[#FF4B3E]"
              >
                {CONTACT_EMAIL}
              </a>
            </li>
            <li>
              <span className="font-bold text-foreground">Socials</span>
              <br />
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline decoration-[0.5px] underline-offset-4 transition-colors hover:text-[#FF4B3E]"
              >
                Instagram · @uncle_hangul
              </a>
              <span className="text-foreground/40"> / </span>
              <a
                href={YOUTUBE_CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline decoration-[0.5px] underline-offset-4 transition-colors hover:text-[#FF4B3E]"
              >
                YouTube ↗
              </a>
            </li>
          </ul>

          <div className="mt-10 border-t-[0.5px] border-[#D9D9D3] pt-8">
            <h2 className="font-en text-xs font-bold uppercase tracking-[0.14em] text-foreground/45">
              Before you write
            </h2>
            <p className="font-en mt-4 text-sm leading-relaxed text-foreground/65 md:text-base">
              I read every message myself — there is no team here. Replies
              usually take a few days and occasionally longer when I am deep in
              a design project, so please do not read silence as disinterest. I
              answer in English or Korean, whichever you write in.
            </p>
            <p className="font-ko mt-3 text-sm leading-relaxed text-foreground/55">
              모든 메일을 직접 읽습니다. 팀이 따로 있지 않습니다. 답장은 보통 며칠
              걸리고, 디자인 작업이 몰린 시기에는 더 길어지기도 합니다. 답이 늦는
              것이 관심이 없어서는 아닙니다. 한국어로 보내시면 한국어로, 영어로
              보내시면 영어로 답합니다.
            </p>
            <p className="font-en mt-4 text-sm leading-relaxed text-foreground/65 md:text-base">
              One thing I cannot take on: full homework sets, document
              translation, or proofreading long texts. Those need a paid
              translator rather than a hurried favor, and I would rather say so
              than do a poor job.
            </p>
            <p className="font-ko mt-3 text-sm leading-relaxed text-foreground/55">
              다만 과제 전체 풀이, 문서 번역, 긴 글 교정은 받지 않습니다. 그런
              일은 급히 도와주는 것보다 전문 번역가에게 맡기는 편이 맞습니다.
              어설프게 해 드리기보다 미리 말씀드립니다.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
