"use client";

import { useMemo, useState } from "react";
import { getZodiacAnimalForYmd } from "@/lib/zodiac/korean-zodiac";
import {
  daysInMonth,
  isValidBirthDate,
  solarToLunar,
  type BirthDateParts,
} from "@/lib/zodiac/lunar-date";
import { speakText } from "@/utils/speak";

const YEAR_MIN = 1950;
const YEAR_MAX = 2025;

const selectClassName =
  "font-en w-full min-w-0 appearance-none rounded-none border-[0.5px] border-[#D9D9D3] bg-background px-3 py-3 text-base text-foreground outline-none focus:border-[#FF4B3E] md:px-4";

function emptyParts(): BirthDateParts {
  return { year: 0, month: 0, day: 0 };
}

export function KoreanZodiacWidget() {
  const [parts, setParts] = useState<BirthDateParts>(emptyParts);
  const [revealed, setRevealed] = useState(false);

  const years = useMemo(
    () =>
      Array.from({ length: YEAR_MAX - YEAR_MIN + 1 }, (_, i) => YEAR_MAX - i),
    [],
  );

  const maxDay = useMemo(() => {
    if (!parts.year || !parts.month) return 31;
    return daysInMonth(parts.year, parts.month);
  }, [parts.year, parts.month]);

  const canCalculate =
    parts.year > 0 && parts.month > 0 && parts.day > 0 && isValidBirthDate(parts);

  const result = useMemo(() => {
    if (!revealed || !canCalculate) return null;

    const lunar = solarToLunar(parts);
    const animal = getZodiacAnimalForYmd(parts.year, parts.month, parts.day);

    if (!lunar || !animal) return null;

    return { lunar, animal };
  }, [revealed, canCalculate, parts]);

  function updatePart(key: keyof BirthDateParts, raw: string) {
    const value = Number.parseInt(raw, 10) || 0;
    setParts((prev) => {
      const next = { ...prev, [key]: value };
      if (key !== "day" && next.year && next.month && next.day) {
        const max = daysInMonth(next.year, next.month);
        if (next.day > max) next.day = max;
      }
      return next;
    });
    setRevealed(false);
  }

  function handleCalculate() {
    if (!canCalculate) return;
    setRevealed(true);
  }

  function handleListen() {
    if (!result?.animal) return;
    speakText(result.animal.sentence, "ko-KR");
  }

  return (
    <div
      id="zodiac-calculator"
      className="my-8 border-[0.5px] border-[#D9D9D3] bg-[#EBEBE5]/25 p-5 md:p-6"
    >
      <h3 className="font-en text-lg font-bold tracking-tight text-foreground md:text-xl">
        Check Your Korean Zodiac
      </h3>
      <p className="font-en mt-2 text-sm leading-relaxed text-foreground/60">
        Enter your solar (양력) birthday, then see the lunar (음력) date, your
        띠 animal, and a ready-made Korean sentence.
      </p>

      <fieldset className="mt-5">
        <legend className="font-en mb-2 block text-[10px] font-bold uppercase tracking-widest text-foreground/35">
          Solar birthday (양력)
        </legend>
        <div className="grid grid-cols-3 gap-2 md:max-w-md md:gap-3">
          <label className="block min-w-0">
            <span className="font-en sr-only">Year</span>
            <select
              value={parts.year || ""}
              onChange={(e) => updatePart("year", e.target.value)}
              className={selectClassName}
            >
              <option value="">Year</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </label>
          <label className="block min-w-0">
            <span className="font-en sr-only">Month</span>
            <select
              value={parts.month || ""}
              onChange={(e) => updatePart("month", e.target.value)}
              className={selectClassName}
            >
              <option value="">Month</option>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </label>
          <label className="block min-w-0">
            <span className="font-en sr-only">Day</span>
            <select
              value={parts.day || ""}
              onChange={(e) => updatePart("day", e.target.value)}
              className={selectClassName}
            >
              <option value="">Day</option>
              {Array.from({ length: maxDay }, (_, i) => i + 1).map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </label>
        </div>
      </fieldset>

      <button
        type="button"
        onClick={handleCalculate}
        disabled={!canCalculate}
        className="font-en touch-target mt-4 inline-flex min-h-11 items-center justify-center border-[0.5px] border-[#111111] bg-[#111111] px-5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#F2F2F0] transition-colors hover:border-[#FF4B3E] hover:bg-[#FF4B3E] disabled:cursor-not-allowed disabled:opacity-40"
      >
        Calculate
      </button>

      {result ? (
        <div
          aria-live="polite"
          className="mt-6 space-y-4 border-[0.5px] border-[#D9D9D3] bg-background px-4 py-6 md:px-6 md:py-8"
        >
          <div className="border-b-[0.5px] border-[#D9D9D3] pb-4">
            <p className="font-en text-[10px] font-bold uppercase tracking-widest text-foreground/40">
              1 · Lunar birthday
            </p>
            <p className="font-ko mt-1 text-lg font-semibold text-foreground">
              {result.lunar.labelKo}
            </p>
          </div>

          <div className="border-b-[0.5px] border-[#D9D9D3] pb-4 text-center">
            <p className="font-en text-[10px] font-bold uppercase tracking-widest text-foreground/40">
              2 · Zodiac animal (띠)
            </p>
            <p className="mt-2 text-5xl leading-none" aria-hidden>
              {result.animal.emoji}
            </p>
            <p className="font-ko mt-3 text-xl font-black text-foreground">
              {result.animal.hangul}띠
            </p>
            <p className="font-en mt-1 text-[11px] font-bold uppercase tracking-[0.12em] text-foreground/45">
              {result.animal.english} · {result.animal.romanization}
            </p>
          </div>

          <div className="text-center">
            <p className="font-en text-[10px] font-bold uppercase tracking-widest text-foreground/40">
              3 · Korean sentence
            </p>
            <p className="font-ko mt-3 text-2xl font-black leading-snug tracking-tight text-foreground md:text-3xl">
              {result.animal.sentence}
            </p>
            <button
              type="button"
              onClick={handleListen}
              className="font-en touch-target mt-5 inline-flex min-h-11 items-center justify-center border-[0.5px] border-[#D9D9D3] bg-[#EBEBE5]/40 px-5 text-[11px] font-bold uppercase tracking-[0.12em] text-foreground transition-colors hover:border-[#FF4B3E] hover:text-[#FF4B3E]"
            >
              Listen pronunciation ↗
            </button>
          </div>
        </div>
      ) : revealed && canCalculate ? (
        <p className="font-en mt-4 text-sm text-foreground/55">
          Could not calculate for that date — try another year, month, or day.
        </p>
      ) : null}
    </div>
  );
}
