"use client";

import { useMemo, useState } from "react";
import { CHO, JONG, JUNG, composeHangul } from "@/lib/hangul/syllables";
import { speakKorean } from "@/lib/speech/speak-korean";

function JamoPicker({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly string[];
  value: number;
  onChange: (index: number) => void;
}) {
  return (
    <div>
      <p className="font-en mb-2 text-[10px] font-bold uppercase tracking-widest text-foreground/35">
        {label}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {options.map((option, index) => (
          <button
            key={`${label}-${option || "none"}`}
            type="button"
            onClick={() => onChange(index)}
            aria-pressed={value === index}
            className={`font-ko touch-target inline-flex min-h-10 min-w-10 items-center justify-center border-[0.5px] px-2 text-base font-bold transition-colors ${
              value === index
                ? "border-[#111111] bg-[#111111] text-[#F2F2F0]"
                : "border-[#D9D9D3] bg-background text-foreground hover:border-[#FF4B3E]"
            }`}
          >
            {option || "∅"}
          </button>
        ))}
      </div>
    </div>
  );
}

export function JamoBuilderWidget() {
  const [choIndex, setChoIndex] = useState(0);
  const [jungIndex, setJungIndex] = useState(0);
  const [jongIndex, setJongIndex] = useState(0);

  const syllable = useMemo(
    () => composeHangul(choIndex, jungIndex, jongIndex),
    [choIndex, jungIndex, jongIndex],
  );

  return (
    <div className="mx-auto w-full max-w-xl space-y-6">
      <JamoPicker
        label="Initial (초성)"
        options={CHO}
        value={choIndex}
        onChange={setChoIndex}
      />
      <JamoPicker
        label="Medial (중성)"
        options={JUNG}
        value={jungIndex}
        onChange={setJungIndex}
      />
      <JamoPicker
        label="Final (종성)"
        options={JONG}
        value={jongIndex}
        onChange={setJongIndex}
      />

      <div className="flex flex-col items-center border-[0.5px] border-[#D9D9D3] bg-background px-4 py-8 md:py-10">
        <p className="font-ko text-center text-5xl font-black leading-none tracking-tight text-foreground md:text-6xl">
          {syllable}
        </p>
        <p className="font-en mt-4 text-[11px] font-bold uppercase tracking-[0.12em] text-foreground/45">
          {CHO[choIndex]} + {JUNG[jungIndex]}
          {JONG[jongIndex] ? ` + ${JONG[jongIndex]}` : ""}
        </p>
        <button
          type="button"
          onClick={() => speakKorean(syllable)}
          className="font-en touch-target mt-6 inline-flex min-h-12 items-center justify-center border-[0.5px] border-[#111111] bg-[#111111] px-5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#F2F2F0] transition-colors hover:border-[#FF4B3E] hover:bg-[#FF4B3E]"
        >
          Listen ↗
        </button>
      </div>
    </div>
  );
}
