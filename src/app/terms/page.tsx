import type { Metadata } from "next";
import Link from "next/link";
import { getSiteUrl } from "@/lib/site-url";

const CONTACT_EMAIL = "unclehangul@gmail.com";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for UncleHangul (한글아저씨)—use license, intellectual property, and liability.",
  alternates: { canonical: `${getSiteUrl()}/terms` },
};

export default function TermsPage() {
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
            Terms of Service for UncleHangul (한글아저씨)
          </h1>
          <p className="font-en mt-2 text-[11px] uppercase tracking-widest text-foreground/40">
            Last Updated: July 25, 2026
          </p>

          <div className="font-en mt-8 space-y-8 text-sm leading-relaxed text-foreground/70 md:text-base">
            <p>
              Welcome to UncleHangul (한글아저씨). By accessing this website{" "}
              <a
                href={siteUrl}
                className="text-foreground underline decoration-[0.5px] underline-offset-4 hover:text-[#FF4B3E]"
              >
                {siteUrl}
              </a>
              , you agree to be bound by these Terms of Service. If you do not
              agree with any of these terms, you are prohibited from using or
              accessing this site.
            </p>

            <section>
              <h2 className="font-en mb-3 text-base font-bold text-foreground md:text-lg">
                1. Intellectual Property Rights
              </h2>
              <p>
                All content published on UncleHangul—including but not limited
                to English essays, Korean text scripts, visual graphics,
                diagrams, and media—is the intellectual property of UncleHangul
                (한글아저씨) and is protected by applicable copyright and
                trademark law. You may not copy, reproduce, or redistribute any
                content for commercial purposes without explicit written
                permission.
              </p>
            </section>

            <section>
              <h2 className="font-en mb-3 text-base font-bold text-foreground md:text-lg">
                2. Use License
              </h2>
              <p>
                You are granted permission to temporarily view the materials on
                UncleHangul for personal, non-commercial, and educational
                language acquisition purposes only. This is the grant of a
                license, not a transfer of title.
              </p>
            </section>

            <section>
              <h2 className="font-en mb-3 text-base font-bold text-foreground md:text-lg">
                3. Disclaimer
              </h2>
              <p>
                The materials on UncleHangul are provided on an &apos;as is&apos;
                basis. UncleHangul makes no warranties, expressed or implied,
                and hereby disclaims all other warranties including, without
                limitation, implied warranties of merchantability or fitness for
                a particular purpose.
              </p>
            </section>

            <section>
              <h2 className="font-en mb-3 text-base font-bold text-foreground md:text-lg">
                4. Limitations of Liability
              </h2>
              <p>
                In no event shall UncleHangul or its creators be liable for any
                damages arising out of the use or inability to use the materials
                on this website.
              </p>
            </section>

            <section>
              <h2 className="font-en mb-3 text-base font-bold text-foreground md:text-lg">
                5. Governing Law
              </h2>
              <p>
                Any claim relating to UncleHangul shall be governed by the laws
                of South Korea without regard to its conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="font-en mb-3 text-base font-bold text-foreground md:text-lg">
                6. Contact Us
              </h2>
              <p>
                If you have any questions regarding these Terms, please contact
                us at:
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
