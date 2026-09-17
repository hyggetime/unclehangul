import { describe, expect, it } from "vitest";
import {
  extractHangulSpeech,
  segmentForSpeech,
} from "@/utils/hangul-speak-text";

describe("segmentForSpeech", () => {
  it("keeps English-only bold as text", () => {
    expect(segmentForSpeech("If you grew up in Korea")).toEqual([
      { kind: "text", value: "If you grew up in Korea" },
    ]);
  });

  it("isolates Hangul runs inside mixed labels", () => {
    expect(segmentForSpeech("Tiger (호랑이)")).toEqual([
      { kind: "text", value: "Tiger (" },
      { kind: "speak", value: "호랑이" },
      { kind: "text", value: ")" },
    ]);
  });

  it("splits multiple Hangul phrases in a lead sentence", () => {
    expect(
      segmentForSpeech(
        "When determining your 띠, keep the Lunar New Year (설날) in mind.",
      ),
    ).toEqual([
      { kind: "text", value: "When determining your " },
      { kind: "speak", value: "띠" },
      { kind: "text", value: ", keep the Lunar New Year (" },
      { kind: "speak", value: "설날" },
      { kind: "text", value: ") in mind." },
    ]);
  });
});

describe("extractHangulSpeech", () => {
  it("joins separated Hangul phrases for TTS", () => {
    expect(
      extractHangulSpeech(
        "When determining your 띠, keep the Lunar New Year (설날) in mind.",
      ),
    ).toBe("띠 설날");
  });
});
