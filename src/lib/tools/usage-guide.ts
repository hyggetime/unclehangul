export type UsageGuideLocale = "en" | "ko";

export type UsageGuideStep = {
  title: string;
  body: string;
};

export type UsageGuideContent = {
  title: string;
  intro: string;
  steps: UsageGuideStep[];
  tip?: string;
};

export type ToolUsageGuide = Record<UsageGuideLocale, UsageGuideContent>;
