const LATIN_FOLDS = {
  ß: "ss",
  Æ: "AE",
  æ: "ae",
  Œ: "OE",
  œ: "oe",
  Ø: "O",
  ø: "o",
  Ł: "L",
  ł: "l",
  Đ: "D",
  đ: "d",
  Ð: "D",
  ð: "d",
  Þ: "TH",
  þ: "th",
  Ĳ: "IJ",
  ĳ: "ij",
};

/**
 * Fold European diacritics to ASCII (Ö→O, Ä→A, É→E, Ç→C).
 * NFKC first (fullwidth digits), then NFD, then strip combining marks.
 */
export function foldDiacritics(text) {
  const compatibility = String(text ?? "").normalize("NFKC");
  const folded = compatibility.replace(/[ßÆæŒœØøŁłĐđÐðÞþĲĳ]/g, (ch) => LATIN_FOLDS[ch] ?? ch);
  return folded.normalize("NFD").replace(/\p{M}/gu, "");
}

/** Punctuation and symbols (`,`, `-`, `'`, `#`, …) become spaces. Newlines are kept. */
export function stripSpecialChars(text) {
  return String(text ?? "").replace(/[^\nA-Za-z0-9]+/g, " ");
}

function collapseLineSpaces(line) {
  return line.replace(/[ \t]+/g, " ").trim();
}

/** Full EMS sanitizer: diacritics → ASCII, specials → space, collapse whitespace. */
export function sanitizeAddress(rawText) {
  const folded = foldDiacritics(rawText);
  const stripped = stripSpecialChars(folded);
  return stripped
    .split("\n")
    .map(collapseLineSpaces)
    .join("\n")
    .replace(/\n{2,}/g, "\n")
    .trim();
}

export function splitSanitizedLines(rawText) {
  const sanitized = sanitizeAddress(rawText);
  return sanitized ? sanitized.split("\n").filter(Boolean) : [];
}
