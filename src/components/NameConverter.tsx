"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ContentFeedback } from "@/components/feedback/ContentFeedback";
import { convertEnglishName } from "@/lib/name-to-hangul";

/** Placeholder — swap for a dedicated Hangul structure post when published. */
const LEARN_STRUCTURE_HREF = "/learn/tongue-twister-girin";

export function NameConverter() {
  const [value, setValue] = useState("");
  const [copied, setCopied] = useState(false);

  const result = useMemo(
    () => (value.trim() ? convertEnglishName(value) : null),
    [value],
  );

  const displayHangul = result?.hangul ?? "—";

  async function handleCopy() {
    if (!result?.hangul) return;
    try {
      await navigator.clipboard.writeText(result.hangul);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section
      id="name-converter"
      aria-label="English name to Hangul converter"
      className="relative z-10 border-t-[0.5px] border-[#D9D9D3] px-5 section-y md:px-8"
    >
      <div className="mx-auto w-full min-w-0 max-w-xl md:max-w-2xl">
        <p className="font-en mb-6 text-[10px] font-bold uppercase tracking-widest text-foreground/40 md:mb-8">
          Name → Hangul
        </p>

        <label className="block">
          <span className="font-en mb-2 block text-[10px] font-bold uppercase tracking-widest text-foreground/35">
            English name
          </span>
          <input
            type="text"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setCopied(false);
            }}
            placeholder="Type English name here (e.g., John)..."
            autoComplete="name"
            spellCheck={false}
            className="font-en w-full min-w-0 rounded-none border-[0.5px] border-[#D9D9D3] border-b-[0.5px] bg-background px-3 py-3 text-base text-foreground shadow-none outline-none ring-0 placeholder:text-foreground/35 focus:border-[#FF4B3E] focus:outline-none focus:ring-0 focus-visible:outline-none md:px-4 md:py-3.5"
          />
        </label>

        <div
          aria-live="polite"
          aria-atomic="true"
          className={`mt-6 flex flex-col items-center justify-center border-[0.5px] border-[#D9D9D3] bg-background px-4 md:mt-8 ${
            result?.hangul
              ? "py-6 md:min-h-[168px] md:py-10"
              : "min-h-[88px] py-6 md:min-h-[132px] md:py-8"
          }`}
        >
          <p
            className={`font-ko text-center text-4xl font-black leading-none tracking-tight text-foreground md:text-5xl ${!result?.hangul ? "text-foreground/25" : ""}`}
          >
            {displayHangul}
          </p>
          {result?.guide ? (
            <p className="font-en mt-4 text-[11px] font-bold uppercase tracking-[0.12em] text-foreground/45">
              {result.guide}
            </p>
          ) : null}
        </div>

        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={handleCopy}
            disabled={!result?.hangul}
            className="font-en touch-target border-[0.5px] border-[#D9D9D3] bg-transparent px-4 text-xs font-bold uppercase tracking-[0.14em] text-foreground transition-colors duration-200 hover:border-[#FF4B3E] hover:bg-[#FF4B3E] hover:text-[#F2F2F0] active:border-[#FF4B3E] active:bg-[#FF4B3E] active:text-[#F2F2F0] disabled:pointer-events-none disabled:opacity-35"
          >
            {copied ? "Copied" : "Copy"}
          </button>
        </div>

        <ContentFeedback
          contentType="play"
          contentId="name-converter"
          className="mt-6 md:mt-8"
        />

        <Link
          href={LEARN_STRUCTURE_HREF}
          className="font-en group mt-6 block border-t-[0.5px] border-[#D9D9D3] py-6 text-sm leading-relaxed tracking-tight text-foreground transition-colors hover:text-[#FF4B3E] active:text-[#FF4B3E] md:mt-8 md:text-[15px]"
        >
          Curious why it sounds like this? Learn the core principles of Hangul
          structure{" "}
          <span
            aria-hidden
            className="inline-block transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          >
            ↗
          </span>
        </Link>
      </div>
    </section>
  );
}
