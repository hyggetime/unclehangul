import type { Metadata } from "next";
import Link from "next/link";
import { getSiteUrl } from "@/lib/site-url";

const CONTACT_EMAIL = "unclehangul@gmail.com";
const GOOGLE_ADS_POLICY = "https://policies.google.com/technologies/ads";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for UncleHangul (한글아저씨)—log data, cookies, Google AdSense, and contact information.",
  alternates: { canonical: `${getSiteUrl()}/privacy` },
};

export default function PrivacyPage() {
  const siteUrl = getSiteUrl();

  return (
    <div className="md:col-span-12">
      <div className="mx-auto w-full max-w-[1440px] p-4 md:p-8">
        <div className="flex h-10 items-center justify-between border-b-[0.5px] border-[#D9D9D3] px-1">
          <p className="font-en text-[10px] font-bold uppercase tracking-widest text-foreground/45">
            Legal
          </p>
          <Link
            href="/"
            className="font-en text-[10px] font-bold uppercase tracking-widest text-foreground/45 transition-colors hover:text-[#FF4B3E]"
          >
            Home ↗
          </Link>
        </div>

        <article className="mx-auto max-w-2xl px-1 py-10 md:py-12">
          <h1 className="font-en text-2xl font-black tracking-tight text-foreground md:text-3xl">
            Privacy Policy for UncleHangul (한글아저씨)
          </h1>
          <p className="font-en mt-2 text-[11px] uppercase tracking-widest text-foreground/40">
            Last Updated: July 25, 2026
          </p>

          <div className="font-en mt-8 space-y-8 text-sm leading-relaxed text-foreground/70 md:text-base">
            <p>
              Welcome to UncleHangul (한글아저씨). We value your privacy. This
              Privacy Policy explains how we collect, use, and protect your
              information when you visit our website{" "}
              <a
                href={siteUrl}
                className="text-foreground underline decoration-[0.5px] underline-offset-4 hover:text-[#FF4B3E]"
              >
                {siteUrl}
              </a>
              .
            </p>

            <section>
              <h2 className="font-en mb-3 text-base font-bold text-foreground md:text-lg">
                1. Information We Collect Automatically (Log Files and Cookies)
              </h2>
              <p>
                Like most websites, UncleHangul automatically gathers certain
                information and stores it in log files. This includes internet
                protocol (IP) addresses, browser type, internet service provider
                (ISP), referring/exit pages, operating system, date/time stamp,
                and clickstream data. We use this information to analyze trends,
                administer the site, and track users&apos; movements around the
                site.
              </p>
            </section>

            <section>
              <h2 className="font-en mb-3 text-base font-bold text-foreground md:text-lg">
                2. Google AdSense and Cookies
              </h2>
              <p>
                We use Google AdSense to serve ads when you visit our website.
                Google, as a third-party vendor, uses cookies to serve ads on
                our site. Google&apos;s use of the DART cookie enables it to
                serve ads to our users based on their visit to our site and other
                sites on the Internet. Users may opt out of the use of the DART
                cookie by visiting the{" "}
                <a
                  href={GOOGLE_ADS_POLICY}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground underline decoration-[0.5px] underline-offset-4 hover:text-[#FF4B3E]"
                >
                  Google ad and content network privacy policy
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="font-en mb-3 text-base font-bold text-foreground md:text-lg">
                3. Third-Party Analytics
              </h2>
              <p>
                We may use third-party service providers, such as Google
                Analytics, to monitor and analyze the use of our service. These
                third-party services use cookies to collect data regarding web
                traffic and user behavior.
              </p>
            </section>

            <section>
              <h2 className="font-en mb-3 text-base font-bold text-foreground md:text-lg">
                4. Data Security
              </h2>
              <p>
                We do not collect personal identifying information (such as names
                or physical addresses) unless you voluntarily contact us via
                email. Any email communications are kept strictly confidential
                and are never shared with third parties.
              </p>
            </section>

            <section>
              <h2 className="font-en mb-3 text-base font-bold text-foreground md:text-lg">
                5. Contact Us
              </h2>
              <p>
                If you have any questions about this Privacy Policy, please
                contact us at:
              </p>
              <ul className="mt-3 list-none space-y-1">
                <li>
                  Email:{" "}
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-foreground underline decoration-[0.5px] underline-offset-4 hover:text-[#FF4B3E]"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </li>
              </ul>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
}
