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
    author: {
      "@type": "Organization",
      name: "Uncle Hangul",
      url: "https://unclehangul.com",
    },
    provider: {
      "@type": "Organization",
      name: "Uncle Hangul",
      url: "https://unclehangul.com",
    },
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
