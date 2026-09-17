import { describe, expect, it } from "vitest";
import {
  findNextBoldPair,
  findNonNestedBoldPairs,
} from "@/lib/markdown/bold-pairs";

describe("findNextBoldPair", () => {
  it("returns the leftmost simple bold span", () => {
    expect(findNextBoldPair("(**말랑말랑**, soft)")).toEqual({
      start: 1,
      end: 9,
      inner: "말랑말랑",
    });
  });

  it("returns the first of two separate bold spans", () => {
    const pair = findNextBoldPair("(**존댓말** and **반말**)");
    expect(pair?.inner).toBe("존댓말");
  });

  it("returns the Hangul span inside nested markers", () => {
    const pair = findNextBoldPair("**Years (**년**)**");
    expect(pair?.inner).toBe("년");
  });

  it("returns a full lead sentence when it has no nested markers", () => {
    const pair = findNextBoldPair(
      "**When determining your 띠, keep the Lunar New Year (설날) in mind.**",
    );
    expect(pair?.inner).toBe(
      "When determining your 띠, keep the Lunar New Year (설날) in mind.",
    );
  });
});

describe("findNonNestedBoldPairs", () => {
  it("collects sibling spans without splitting nested markers early", () => {
    const pairs = findNonNestedBoldPairs("**Years (**년**)**");
    expect(pairs.map((pair) => pair.inner)).toEqual(["Years (", "년", ")"]);
  });
});
