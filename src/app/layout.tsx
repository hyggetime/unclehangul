import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SiteShell } from "@/components/SiteShell";
import { AdSenseScript } from "@/components/AdSenseScript";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { GoogleAnalyticsToolActions } from "@/components/GoogleAnalyticsToolActions";
import { GoogleAnalyticsPageSection } from "@/components/GoogleAnalyticsPageSection";
import { GoogleAnalyticsScrollDepth } from "@/components/GoogleAnalyticsScrollDepth";
import { getRootMetadataBase } from "@/lib/site-metadata";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Uncle Hangul",
    template: "%s · Uncle Hangul",
  },
  description:
    "한국어를 배우는 이들을 위한 타이포그래피 중심의 학습 공간. Learn Hangul with clarity.",
  metadataBase: getRootMetadataBase(),
  openGraph: {
    siteName: "Uncle Hangul",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  verification: {
    google: "syGIjQ2Y9Lp5mZ2f-CcmZ_JAf8i2ZkAxjRhikuyCYJw",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${inter.variable} h-full antialiased`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="min-h-full bg-background text-foreground antialiased">
        <GoogleAnalytics />
        <GoogleAnalyticsPageSection />
        <GoogleAnalyticsToolActions />
        <GoogleAnalyticsScrollDepth />
        <AdSenseScript />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
