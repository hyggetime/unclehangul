import Link from "next/link";
import { ToolFaqAccordion } from "@/components/tools/ToolFaqAccordion";
import { JsonLd, buildFaqPageJsonLd } from "@/lib/seo/json-ld";
import type { PlayWidgetGuide as PlayWidgetGuideData } from "@/lib/play/widget-guides";

type PlayWidgetGuideProps = {
  guide: PlayWidgetGuideData;
  pageUrl: string;
  faqId: string;
};

export function PlayWidgetGuide({
  guide,
  pageUrl,
  faqId,
}: PlayWidgetGuideProps) {
  return (
    <section
      aria-labelledby={`${faqId}-heading`}
      className="border-t-[0.5px] border-[#D9D9D3] bg-[#F2F2F0]"
    >
      <JsonLd data={buildFaqPageJsonLd(pageUrl, [...guide.faq])} />
      <div className="mx-auto w-full max-w-[1440px] px-5 section-y md:px-8">
        <article className="mx-auto max-w-2xl">
          <h2
            id={`${faqId}-heading`}
            className="font-ko text-xl font-black tracking-tight text-foreground md:text-2xl"
          >
            {guide.headingKo}
          </h2>
          <p className="font-en mt-4 text-sm leading-relaxed text-foreground/70 md:text-base">
            {guide.introEn}
          </p>
          <p className="font-ko mt-3 text-sm leading-relaxed text-foreground/60">
            {guide.introKo}
          </p>

          <div className="mt-10 space-y-10">
            {guide.sections.map((section) => (
              <div
                key={section.headingEn}
                className="border-t-[0.5px] border-[#D9D9D3] pt-8"
              >
                <h3 className="font-en text-lg font-black leading-snug tracking-tight text-foreground">
                  {section.headingEn}
                </h3>
                <p className="font-ko mt-1 text-sm font-bold text-foreground/55">
                  {section.headingKo}
                </p>
                <p className="font-en mt-4 text-sm leading-relaxed text-foreground/70 md:text-base">
                  {section.bodyEn}
                </p>
                <p className="font-ko mt-3 text-sm leading-relaxed text-foreground/60">
                  {section.bodyKo}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 border-t-[0.5px] border-[#D9D9D3]">
            <ToolFaqAccordion items={guide.faq} id={faqId} />
          </div>

          <div className="mt-10 border-t-[0.5px] border-[#D9D9D3] pt-8">
            <h3 className="font-en text-[10px] font-bold uppercase tracking-widest text-foreground/45">
              Read the full story
            </h3>
            <ul className="mt-4 list-none space-y-3">
              {guide.related.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group block border-[0.5px] border-[#D9D9D3] bg-background px-4 py-4 transition-colors hover:border-[#FF4B3E]"
                  >
                    <span className="font-en block text-sm font-black tracking-tight text-foreground transition-colors group-hover:text-[#FF4B3E]">
                      {item.label}
                    </span>
                    <span className="font-ko mt-2 block text-xs leading-relaxed text-foreground/55">
                      {item.noteKo}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </article>
      </div>
    </section>
  );
}
