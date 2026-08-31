import Link from "next/link";
import type { Metadata } from "next";
import { getPackOptimizerUrl, getToolsSiteUrl } from "@/lib/domains";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Seller Tools · Uncle Hangul",
  description:
    "Free seller utilities for shipping to and from Korea—Korean address English conversion, overseas address parsing for EMS/DHL/FedEx, and the Pack Optimizer.",
  path: "/",
  siteOrigin: getToolsSiteUrl(),
  locale: "ko_KR",
});

const TOOLS = [
  {
    href: "/korean-address-converter",
    title: "Korean Address Converter",
    descriptionKo:
      "영문 한국 주소 → 시·도·구·읍면동·세부주소 분할 + 한글 주소 (inbound).",
    descriptionEn:
      "Paste an English-format Korean address and split it into Province, District, Locality, Detail, plus Hangul.",
  },
  {
    href: "/overseas-address-converter",
    title: "Overseas Address Converter",
    descriptionKo:
      "해외 영문 주소 → EMS·DHL·FedEx 6칸(Country, Zipcode, City, State, Line1, Line2).",
    descriptionEn:
      "Split overseas addresses into Contract EMS and international carrier form fields.",
  },
  {
    href: getPackOptimizerUrl(),
    title: "Pack Optimizer",
    descriptionKo: "K-Packet 분할 vs EMS 부피무게 3D 시뮬레이션.",
    descriptionEn: "3D packing calculator on pack.unclehangul.com.",
    external: true,
  },
] as const;

export default function ToolsSiteIndexPage() {
  return (
    <div className="p-4 md:p-8">
      <header className="border-b-[0.5px] border-[#D9D9D3] pb-8 md:pb-10">
        <h1 className="font-en text-3xl font-black tracking-tight md:text-4xl">
          Seller Tools
        </h1>
        <p className="font-ko mt-3 max-w-2xl text-sm leading-relaxed text-foreground/55 md:text-base">
          해외배송·물류 실전 도구 — Uncle Hangul 브랜드의 유틸리티 서브도메인.
        </p>
      </header>

      <ul className="mt-8 divide-y-[0.5px] divide-[#D9D9D3] border-[0.5px] border-[#D9D9D3]">
        {TOOLS.map((tool) => {
          const inner = (
            <>
              <span className="font-en text-lg font-black tracking-tight transition-colors group-hover:text-[#FF4B3E]">
                {tool.title}
                {"external" in tool && tool.external ? (
                  <span className="ml-1 text-sm" aria-hidden>
                    ↗
                  </span>
                ) : null}
              </span>
              <span className="font-ko mt-2 block text-sm text-foreground/55">
                {tool.descriptionKo}
              </span>
              <span className="font-en mt-1 hidden text-sm text-foreground/45 md:block">
                {tool.descriptionEn}
              </span>
            </>
          );

          return (
            <li key={tool.href}>
              {"external" in tool && tool.external ? (
                <a
                  href={tool.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-5 transition-colors hover:bg-[#EBEBE5]/40 md:p-6"
                >
                  {inner}
                </a>
              ) : (
                <Link
                  href={tool.href}
                  className="group block p-5 transition-colors hover:bg-[#EBEBE5]/40 md:p-6"
                >
                  {inner}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
