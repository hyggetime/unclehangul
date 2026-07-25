import Script from "next/script";

const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

const GA_MEASUREMENT_ID_PATTERN = /^G-[A-Z0-9]+$/;

export function GoogleAnalytics() {
  if (
    !measurementId ||
    !GA_MEASUREMENT_ID_PATTERN.test(measurementId) ||
    process.env.NODE_ENV === "development"
  ) {
    return null;
  }

  return (
    <>
      <Script
        id="google-analytics-gtag"
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}');
        `}
      </Script>
    </>
  );
}
