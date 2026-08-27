import Script from "next/script";
import { getGaMeasurementId } from "@/lib/analytics/ga4";

export function GoogleAnalytics() {
  const measurementId = getGaMeasurementId();

  if (!measurementId || process.env.NODE_ENV === "development") {
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
          gtag('config', '${measurementId}', {
            send_page_view: true,
            page_path: window.location.pathname,
            page_location: window.location.href,
            page_title: document.title
          });
        `}
      </Script>
    </>
  );
}
