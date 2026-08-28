import { BRAND_NAME, BRAND_NAME_COMPACT, BRAND_NAME_KO } from "@/lib/brand";
import {
  BRAND_ALTERNATE_NAMES,
  ORGANIZATION_KNOWS_ABOUT,
} from "@/lib/seo/keywords";
import { getSiteUrl } from "@/lib/site-url";

type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

type FaqItem = {
  question: string;
  answer: string;
};

export function buildFaqPageJsonLd(pageUrl: string, items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    url: pageUrl,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

type WebApplicationJsonLdOptions = {
  name: string;
  description: string;
  url: string;
  featureList: string[];
  applicationCategory?: string;
};

function brandOrganizationRef() {
  const siteUrl = getSiteUrl();
  return {
    "@type": "Organization" as const,
    name: BRAND_NAME,
    alternateName: [...BRAND_ALTERNATE_NAMES],
    url: siteUrl,
  };
}

export function buildOrganizationJsonLd() {
  const siteUrl = getSiteUrl();
  return [
    {
      "@context": "https://schema.org",
      ...brandOrganizationRef(),
      description: `${BRAND_NAME} (${BRAND_NAME_COMPACT}, ${BRAND_NAME_KO}) — typography-first Korean learning and seller utility tools.`,
      knowsAbout: [...ORGANIZATION_KNOWS_ABOUT],
      sameAs: [
        "https://www.youtube.com/@unclehangul",
        "https://www.instagram.com/uncle_hangul/",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: BRAND_NAME,
      alternateName: [...BRAND_ALTERNATE_NAMES],
      url: siteUrl,
      inLanguage: ["en-US", "ko-KR"],
      publisher: brandOrganizationRef(),
    },
  ];
}

export function buildWebApplicationJsonLd(options: WebApplicationJsonLdOptions) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: options.name,
    description: options.description,
    url: options.url,
    applicationCategory: options.applicationCategory ?? "BusinessApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    inLanguage: ["ko-KR", "en-US"],
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "KRW",
    },
    featureList: options.featureList,
    author: brandOrganizationRef(),
    provider: brandOrganizationRef(),
  };
}

type HowToStep = {
  name: string;
  text: string;
};

export function buildHowToJsonLd(name: string, description: string, steps: HowToStep[]) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}
