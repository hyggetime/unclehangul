"use client";

import { useMemo, useState } from "react";
import { getZodiacAnimalForBirthDate } from "@/lib/zodiac/korean-zodiac";
import { speakText } from "@/utils/speak";

export function KoreanZodiacWidget() {
  const [dob, setDob] = useState("");
  const [revealed, setRevealed] = useState(false);

  const animal = useMemo(() => {
    if (!dob || !revealed) return null;
    return getZodiacAnimalForBirthDate(new Date(`${dob}T12:00:00`));
  }, [dob, revealed]);

  function handleCalculate() {
    if (!dob) return;
    setRevealed(true);
  }

  function handleListen() {
    if (!animal) return;
    speakText(animal.sentence, "ko-KR");
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
        Born in January or early February? We apply the Seollal (설날) cutoff so
        your animal matches the lunar zodiac year.
      </p>

      <label className="mt-5 block">
        <span className="font-en mb-2 block text-[10px] font-bold uppercase tracking-widest text-foreground/35">
          Date of birth
        </span>
        <input
          type="date"
          value={dob}
          onChange={(e) => {
            setDob(e.target.value);
            setRevealed(false);
          }}
          className="font-en w-full max-w-xs rounded-none border-[0.5px] border-[#D9D9D3] bg-background px-3 py-3 text-base text-foreground outline-none focus:border-[#FF4B3E] md:px-4"
        />
      </label>

      <button
        type="button"
        onClick={handleCalculate}
        disabled={!dob}
        className="font-en touch-target mt-4 inline-flex min-h-11 items-center justify-center border-[0.5px] border-[#111111] bg-[#111111] px-5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#F2F2F0] transition-colors hover:border-[#FF4B3E] hover:bg-[#FF4B3E] disabled:cursor-not-allowed disabled:opacity-40"
      >
        Calculate animal
      </button>

      {animal ? (
        <div
          aria-live="polite"
          className="mt-6 border-[0.5px] border-[#D9D9D3] bg-background px-4 py-6 text-center md:py-8"
        >
          <p className="text-5xl leading-none" aria-hidden>
            {animal.emoji}
          </p>
          <p className="font-en mt-3 text-[10px] font-bold uppercase tracking-widest text-foreground/45">
            {animal.english} · {animal.romanization}
          </p>
          <p className="font-ko mt-4 text-2xl font-black leading-snug tracking-tight text-foreground md:text-3xl">
            {animal.sentence}
          </p>
          <button
            type="button"
            onClick={handleListen}
            className="font-en touch-target mt-5 inline-flex min-h-11 items-center justify-center border-[0.5px] border-[#D9D9D3] bg-[#EBEBE5]/40 px-5 text-[11px] font-bold uppercase tracking-[0.12em] text-foreground transition-colors hover:border-[#FF4B3E] hover:text-[#FF4B3E]"
          >
            Listen pronunciation ↗
          </button>
        </div>
      ) : revealed && dob ? (
        <p className="font-en mt-4 text-sm text-foreground/55">
          Could not determine an animal for that date — try a year between 1900
          and 2100.
        </p>
      ) : null}
    </div>
  );
}
