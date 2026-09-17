import { postcodeValidator } from "postcode-validator";
import { splitSanitizedLines } from "./sanitizer.js";

const EMS_LINE_MAX = 35;

/**
 * Generic fallback parser for countries without precision rules.
 * Uses postcode-validator for postal code validation only.
 * Does NOT extract State/Province (requires country-specific rules).
 */

const GENERIC_STREET_EN =
  /\b(street|st|road|rd|avenue|ave|boulevard|blvd|drive|dr|lane|ln|way|place|pl|court|ct|square|sq|highway|hwy|terrace|close|crescent|loop|parkway|pkwy|trail|circle|unit|apt|apartment|suite|floor|bldg|building|po box|pobox|number|no)\b/i;

function emptyResult(country = "") {
  return {
    country,
    postalCode: "",
    city: "",
    state: "",
    line1: "",
    line2: "",
  };
}

function looksLikeBuilding(line) {
  return /\b(cottage|house|building|flat|apt|apartment|suite|floor|tower|manor|villa|mansion|block|unit|bldg|residence|lodge|court|place)\b/i.test(
    line,
  );
}

function looksLikeStreetGeneric(line) {
  if (GENERIC_STREET_EN.test(line)) return true;
  return /\d/.test(line);
}

function looksLikeRecipientGeneric(line) {
  if (!line || /\d/.test(line)) return false;
  if (looksLikeBuilding(line)) return false;
  if (GENERIC_STREET_EN.test(line)) return false;
  return true;
}

/**
 * Extract postal code using postcode-validator.
 * Strategy: try each line, validate with the library.
 */
function extractPostalGeneric(lines, countryISO) {
  const windows = [lines.slice(-1), lines.slice(-2), lines];

  for (const slice of windows) {
    for (const line of slice) {
      const tokens = line.split(/\s+/);
      for (let i = 0; i < tokens.length; i++) {
        for (let j = i + 1; j <= Math.min(i + 4, tokens.length); j++) {
          const candidate = tokens.slice(i, j).join(" ");
          try {
            if (postcodeValidator(candidate, countryISO)) {
              return { raw: candidate, formatted: candidate.trim() };
            }
          } catch {
            // Library doesn't know this country, skip
          }
        }
      }
    }
  }

  return { raw: "", formatted: "" };
}

function tokenPattern(token) {
  return new RegExp(
    token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\s+/g, "\\s+"),
    "i",
  );
}

function stripToken(line, token) {
  if (!token) return line;
  return line.replace(tokenPattern(token), " ").replace(/\s+/g, " ").trim();
}

function splitAroundPostal(line, rawPostal) {
  if (!rawPostal) return { before: line, after: "" };
  const match = line.match(tokenPattern(rawPostal));
  if (!match || match.index == null) return { before: line, after: "" };
  return {
    before: line.slice(0, match.index).trim(),
    after: stripToken(line.slice(match.index), rawPostal),
  };
}

function takeCityGeneric(lines) {
  const next = [...lines];
  for (let i = next.length - 1; i >= 0; i -= 1) {
    const line = next[i];
    if (looksLikeStreetGeneric(line)) continue;
    const city = line.trim();
    if (!city) continue;
    next.splice(i, 1);
    return { city, lines: next };
  }
  return { city: "", lines: next };
}

function wrapEmsLines(parts) {
  const combined = parts
    .map((part) => String(part ?? "").trim())
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();

  if (!combined) {
    return { line1: "", line2: "" };
  }

  if (combined.length <= EMS_LINE_MAX) {
    return { line1: combined, line2: "" };
  }

  const withinLimit = combined.slice(0, EMS_LINE_MAX);
  const lastSpace = withinLimit.lastIndexOf(" ");

  if (lastSpace <= 0) {
    return {
      line1: combined.slice(0, EMS_LINE_MAX).trim(),
      line2: combined.slice(EMS_LINE_MAX).trim(),
    };
  }

  return {
    line1: combined.slice(0, lastSpace).trim(),
    line2: combined.slice(lastSpace + 1).trim(),
  };
}

/**
 * Parse address using generic fallback rules.
 * @param {string} rawText
 * @param {string} countryISO ISO 3166-1 alpha-2
 * @returns {{ country: string, postalCode: string, city: string, state: string, line1: string, line2: string }}
 */
export function parseAddressGeneric(rawText, countryISO) {
  const iso = String(countryISO ?? "").toUpperCase();
  const lines = splitSanitizedLines(rawText);

  if (!lines.length) return emptyResult(iso);

  const restLooksLikeAddress = lines
    .slice(1)
    .some((line) => looksLikeStreetGeneric(line) || /\d{3,}/.test(line));

  const working =
    looksLikeRecipientGeneric(lines[0]) && restLooksLikeAddress
      ? lines.slice(1)
      : [...lines];

  const postal = extractPostalGeneric(working, iso);
  let cityFromPostal = "";

  const withoutPostal = working
    .map((line) => {
      if (!postal.raw || !tokenPattern(postal.raw).test(line)) return line;
      const { before, after } = splitAroundPostal(line, postal.raw);
      if (after && !looksLikeStreetGeneric(after)) cityFromPostal = after;
      return before;
    })
    .map((line) => line.trim())
    .filter(Boolean);

  let city = cityFromPostal;
  let streets = withoutPostal;

  if (!city) {
    const taken = takeCityGeneric(streets);
    city = taken.city;
    streets = taken.lines;
  }

  return {
    country: iso,
    postalCode: postal.formatted,
    city,
    state: "", // Generic parser doesn't extract state
    ...wrapEmsLines(streets),
  };
}
