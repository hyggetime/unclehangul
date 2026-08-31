type FaqItem = {
  question: string;
  answer: string;
};

type ToolFaqAccordionProps = {
  items: readonly FaqItem[];
  heading?: string;
  id?: string;
  itemLang?: "ko" | "en";
};

export function ToolFaqAccordion({
  items,
  heading = "FAQ",
  id = "tool-faq",
  itemLang = "ko",
}: ToolFaqAccordionProps) {
  const itemClass = itemLang === "en" ? "font-en" : "font-ko";
  return (
    <div className="pt-8">
      <h3
        id={id}
        className="font-en text-[10px] font-bold uppercase tracking-widest text-foreground/45"
      >
        {heading}
      </h3>
      <dl
        aria-labelledby={id}
        className="mt-4 divide-y-[0.5px] divide-[#D9D9D3] border-[0.5px] border-[#D9D9D3] bg-[#F2F2F0]"
      >
        {items.map((item) => (
          <details key={item.question} className="group" lang={itemLang}>
            <summary className={`${itemClass} cursor-pointer list-none px-4 py-4 text-sm font-bold leading-snug text-foreground marker:content-none md:px-6 md:py-5 md:text-base [&::-webkit-details-marker]:hidden`}>
              <span className="flex items-start justify-between gap-3">
                <span>{item.question}</span>
                <span
                  aria-hidden
                  className="font-en shrink-0 text-xs font-bold uppercase tracking-widest text-foreground/35 transition-colors group-open:text-[#FF4B3E]"
                >
                  +
                </span>
              </span>
            </summary>
            <dd className={`${itemClass} border-t-[0.5px] border-[#D9D9D3] px-4 pb-5 pt-3 text-sm leading-relaxed text-foreground/65 md:px-6 md:pb-6`}>
              {item.answer}
            </dd>
          </details>
        ))}
      </dl>
    </div>
  );
}

export type { FaqItem };
