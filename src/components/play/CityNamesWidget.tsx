"use client";

import { useMemo, useState } from "react";
import { CITIES, lookupCity } from "@/lib/play/cities";
import { speakKorean } from "@/lib/speech/speak-korean";

export function CityNamesWidget() {
  const [query, setQuery] = useState("Seoul");

  const match = useMemo(() => lookupCity(query), [query]);

  return (
    <div className="mx-auto w-full max-w-xl">
      <label className="block">
        <span className="font-en mb-2 block text-[10px] font-bold uppercase tracking-widest text-foreground/35">
          City name (English)
        </span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Try Seoul, Paris, Tokyo…"
          autoComplete="off"
          spellCheck={false}
          className="font-en w-full min-w-0 rounded-none border-[0.5px] border-[#D9D9D3] bg-background px-3 py-3 text-base text-foreground outline-none placeholder:text-foreground/35 focus:border-[#FF4B3E] md:px-4 md:py-3.5"
        />
      </label>

      <div
        aria-live="polite"
        className="mt-6 flex flex-col items-center border-[0.5px] border-[#D9D9D3] bg-background px-4 py-8 md:py-10"
      >
        {match ? (
          <>
            <p className="font-ko text-center text-4xl font-black leading-none tracking-tight text-foreground md:text-5xl">
              {match.hangul}
            </p>
            <p className="font-en mt-4 text-[11px] font-bold uppercase tracking-[0.12em] text-foreground/45">
              {match.en} · {match.romanization}
            </p>
            <button
              type="button"
              onClick={() => speakKorean(match.hangul)}
              className="font-en touch-target mt-6 inline-flex min-h-12 items-center justify-center border-[0.5px] border-[#111111] bg-[#111111] px-5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#F2F2F0] transition-colors hover:border-[#FF4B3E] hover:bg-[#FF4B3E]"
            >
              Listen ↗
            </button>
          </>
        ) : (
          <p className="font-en text-center text-sm text-foreground/45">
            No match yet — try a city from the list below.
          </p>
        )}
      </div>

      <p className="font-en mt-6 text-[10px] font-bold uppercase tracking-widest text-foreground/35">
        Quick picks
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {CITIES.slice(0, 8).map((city) => (
          <button
            key={city.en}
            type="button"
            onClick={() => setQuery(city.en)}
            className="font-en touch-target inline-flex min-h-12 items-center border-[0.5px] border-[#D9D9D3] px-3 text-xs font-bold tracking-tight transition-colors hover:border-[#FF4B3E] hover:text-[#FF4B3E]"
          >
            {city.en}
          </button>
        ))}
      </div>
    </div>
  );
}
