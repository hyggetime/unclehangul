import { describe, expect, it } from "vitest";
import { getPostHangulTileSpec } from "@/lib/blog/post-visuals";

describe("getPostHangulTileSpec", () => {
  it("uses grid2x2 for four-syllable Vol. 4 tile", () => {
    expect(
      getPostHangulTileSpec(
        "uncle-hangul-k-dictionary-vol-4-5-modern-slang-korean-young-people",
        "title",
      ),
    ).toEqual({ text: "내돈내산", layout: "grid2x2" });
  });

  it("keeps two-syllable tiles on single layout", () => {
    expect(
      getPostHangulTileSpec(
        "uncle-hangul-k-dictionary-vol-1-5-untranslatable-korean-words",
        "title",
      ),
    ).toEqual({ text: "눈치", layout: "single" });
  });
});
