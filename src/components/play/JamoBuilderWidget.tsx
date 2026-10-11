"use client";

import { useMemo, useState } from "react";
import {
  BASIC_CHO,
  BASIC_JONG,
  BASIC_JUNG,
  composeBasicHangul,
} from "@/lib/hangul/basic-jamo";
import { speakKorean } from "@/lib/speech/speak-korean";

type SlotKind = "cho" | "jung" | "jong";

const SLOT_META: Record<
  SlotKind,
  { en: string; ko: string; hint: string }
> = {
  cho: {
    en: "Starting consonant",
    ko: "초성",
    hint: "Consonants only — every syllable starts here.",
  },
  jung: {
    en: "Vowel",
    ko: "중성",
    hint: "Vowels only — the middle slot is always a vowel.",
  },
  jong: {
    en: "Ending consonant",
    ko: "종성",
    hint: "Consonants only — optional. Pick ∅ for an open syllable.",
  },
};

function optionsForSlot(slot: SlotKind): readonly string[] {
  if (slot === "cho") return BASIC_CHO;
  if (slot === "jung") return BASIC_JUNG;
  return BASIC_JONG;
}

function JamoPickerSheet({
  slot,
  valueIndex,
  onPick,
  onClose,
}: {
  slot: SlotKind;
  valueIndex: number;
  onPick: (index: number) => void;
  onClose: () => void;
}) {
  const meta = SLOT_META[slot];
  const options = optionsForSlot(slot);

  return (
    <>
      <button
        type="button"
        aria-label="Close picker"
        className="fixed inset-0 z-40 bg-[#111111]/25 md:bg-[#111111]/15"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-labelledby="jamo-picker-title"
        className="fixed inset-x-0 bottom-0 z-50 max-h-[min(70vh,520px)] border-t-[0.5px] border-[#D9D9D3] bg-[#F2F2F0] p-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:inset-x-auto md:left-1/2 md:top-1/2 md:bottom-auto md:w-full md:max-w-md md:-translate-x-1/2 md:-translate-y-1/2 md:border md:pb-4"
      >
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <p
              id="jamo-picker-title"
              className="font-en text-[11px] font-bold uppercase tracking-[0.12em] text-foreground"
            >
              {meta.en}
            </p>
            <p className="font-ko mt-0.5 text-xs text-foreground/55">
              {meta.ko} · {meta.hint}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="font-en touch-target shrink-0 border-[0.5px] border-[#D9D9D3] bg-background px-3 text-[10px] font-bold uppercase tracking-widest text-foreground/60 hover:border-[#FF4B3E] hover:text-[#FF4B3E]"
          >
            Done
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1.5 sm:grid-cols-8">
          {options.map((option, index) => (
            <button
              key={`${slot}-${option || "empty"}`}
              type="button"
              onClick={() => {
                onPick(index);
                onClose();
              }}
              aria-pressed={valueIndex === index}
              className={`font-ko touch-target inline-flex min-h-11 min-w-11 items-center justify-center border-[0.5px] text-base font-bold transition-colors ${
                valueIndex === index
                  ? "border-[#111111] bg-[#111111] text-[#F2F2F0]"
                  : "border-[#D9D9D3] bg-background text-foreground hover:border-[#FF4B3E]"
              }`}
            >
              {option || "∅"}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export function JamoBuilderWidget() {
  const [choIndex, setChoIndex] = useState(0);
  const [jungIndex, setJungIndex] = useState(0);
  const [jongIndex, setJongIndex] = useState(0);
  const [openSlot, setOpenSlot] = useState<SlotKind | null>(null);

  const syllable = useMemo(
    () => composeBasicHangul(choIndex, jungIndex, jongIndex),
    [choIndex, jungIndex, jongIndex],
  );

  const choDisplay = BASIC_CHO[choIndex];
  const jungDisplay = BASIC_JUNG[jungIndex];
  const jongDisplay = BASIC_JONG[jongIndex];

  function pickSlot(slot: SlotKind, index: number) {
    if (slot === "cho") setChoIndex(index);
    else if (slot === "jung") setJungIndex(index);
    else setJongIndex(index);
  }

  return (
    <div className="mx-auto w-full max-w-lg">
      <p className="font-en mb-4 text-sm leading-relaxed text-foreground/70">
        Every syllable is{" "}
        <strong className="font-semibold text-foreground">consonant + vowel</strong>
        , with an{" "}
        <strong className="font-semibold text-foreground">
          optional consonant at the end
        </strong>
        . The middle is always a vowel; the first and last slots hold
        consonants (the last may be empty). In Korean grammar these three slots
        are called <span className="font-ko">초성 · 중성 · 종성</span>.
      </p>

      <div className="border-[0.5px] border-[#D9D9D3] bg-background px-4 py-6 md:py-8">
        <p className="font-ko text-center text-5xl font-black leading-none tracking-tight text-foreground md:text-6xl">
          {syllable}
        </p>

        <p className="font-en mt-3 text-center text-[10px] font-bold uppercase tracking-[0.14em] text-foreground/40">
          Tap a box to change it
        </p>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {(
            [
              {
                slot: "cho" as const,
                label: "Start",
                value: choDisplay,
                index: choIndex,
              },
              {
                slot: "jung" as const,
                label: "Vowel",
                value: jungDisplay,
                index: jungIndex,
              },
              {
                slot: "jong" as const,
                label: "End",
                value: jongDisplay || "∅",
                index: jongIndex,
              },
            ] as const
          ).map((item) => (
            <button
              key={item.slot}
              type="button"
              onClick={() => setOpenSlot(item.slot)}
              aria-expanded={openSlot === item.slot}
              className="touch-target flex flex-col items-center border-[0.5px] border-[#D9D9D3] bg-[#EBEBE5]/40 px-2 py-3 transition-colors hover:border-[#FF4B3E] active:border-[#111111]"
            >
              <span className="font-en text-[9px] font-bold uppercase tracking-widest text-foreground/45">
                {item.label}
              </span>
              <span className="font-ko mt-1 text-2xl font-bold leading-none text-foreground">
                {item.value}
              </span>
              <span className="font-ko mt-1 text-[10px] text-foreground/45">
                {SLOT_META[item.slot].ko}
              </span>
            </button>
          ))}
        </div>

        <p className="font-en mt-4 text-center text-[11px] font-bold uppercase tracking-[0.12em] text-foreground/45">
          {choDisplay} + {jungDisplay}
          {jongDisplay ? ` + ${jongDisplay}` : ""}
        </p>

        <div className="mt-5 flex justify-center">
          <button
            type="button"
            onClick={() => speakKorean(syllable)}
            className="font-en touch-target inline-flex min-h-12 items-center justify-center border-[0.5px] border-[#111111] bg-[#111111] px-5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#F2F2F0] transition-colors hover:border-[#FF4B3E] hover:bg-[#FF4B3E]"
          >
            Listen ↗
          </button>
        </div>
      </div>

      <p className="font-en mt-3 text-[11px] leading-relaxed text-foreground/45">
        Basic jamo only — double consonants, compound vowels, and compound
        batchim may come in an extended builder later.
      </p>

      {openSlot ? (
        <JamoPickerSheet
          slot={openSlot}
          valueIndex={
            openSlot === "cho"
              ? choIndex
              : openSlot === "jung"
                ? jungIndex
                : jongIndex
          }
          onPick={(index) => pickSlot(openSlot, index)}
          onClose={() => setOpenSlot(null)}
        />
      ) : null}
    </div>
  );
}
