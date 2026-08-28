import { ABOUT_BRAND_FAQ } from "@/lib/about/brand-faq";
import { ToolFaqAccordion } from "@/components/tools/ToolFaqAccordion";

export function AboutBrandFaq() {
  return (
    <section
      aria-labelledby="about-brand-faq-heading"
      className="border-t-[0.5px] border-[#D9D9D3] px-5 pb-8 pt-10 md:px-8 md:pb-12"
    >
      <ToolFaqAccordion
        id="about-brand-faq-heading"
        heading="Brand & spelling"
        items={ABOUT_BRAND_FAQ}
      />
    </section>
  );
}
