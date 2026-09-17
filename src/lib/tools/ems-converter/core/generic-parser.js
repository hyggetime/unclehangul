import { postcodeValidator } from "postcode-validator";
import { splitSanitizedLines } from "./sanitizer.js";

const EMS_LINE_MAX = 35;

/**
 * Generic fallback parser for countries without precision rules.
 * Uses postcode-validator for postal code validation and basic heuristics.
 * @param {string} rawText
 * @param {string} countryISO ISO 3166-1 alpha-2
 * @returns {{ country: string, postalCode: string, city: string, state: string, line1: string, line2: string }}
 */
export function parseAddressGeneric(rawText, countryISO) {
  const iso = String(countryISO ?? "").toUpperCase();
  const lines = splitSanitizedLines(rawText);

  if (!lines.length) {
    return emptyResult(iso);
  }

  // Remove recipient line if first line has no numbers and rest looks like address
  const working = shouldSkipFirstLine(lines) ? lines.slice(1) : [...lines];

  // Try to extract postal code using pattern matching
  const postal = extractPostalGeneric(working, iso);

  // Lines with postal code removed
  let cityFromPostal = "";
  const withoutPostal = working
    .map((line) => {
      if (!postal.raw) return line;
      const { before, after } = splitAroundToken(line, postal.raw);
      // Text after postal code is likely city name
      if (after && !hasDigits(after)) cityFromPostal = after;
      return before;
    })
    .map((line) => line.trim())
    .filter(Boolean);

  // Extract city: prioritize text near postal code
  let city = cityFromPostal;
  let streets = withoutPostal;

  if (!city && streets.length) {
    // Take the last non-street-looking line as city
    for (let i = streets.length - 1; i >= 0; i -= 1) {
      const line = streets[i];
      if (!hasDigits(line) && !looksLikeStreetGeneric(line)) {
        city = line;
        streets = [...streets.slice(0, i), ...streets.slice(i + 1)];
        break;
      }
    }
  }

  // Remaining lines are address (Line1/Line2)
  const { line1, line2 } = wrapEmsLines(streets);

  return {
    country: iso,
    postalCode: postal.formatted,
    city,
    state: "", // Generic parser doesn't infer state
    line1,
    line2,
  };
}

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

function shouldSkipFirstLine(lines) {
  if (lines.length < 2) return false;
  const first = lines[0];
  const rest = lines.slice(1);
  // Skip if first line has no digits and rest looks like address
  return !hasDigits(first) && rest.some((line) => hasDigits(line));
}

function hasDigits(text) {
  return /\d/.test(text);
}

const GENERIC_STREET_EN =
  /\b(street|st|road|rd|avenue|ave|boulevard|blvd|drive|dr|lane|ln|way|place|pl|court|ct|square|sq|highway|hwy|terrace|close|crescent|loop|parkway|pkwy|trail|circle|unit|apt|suite|floor|bldg|building|po box|pobox|box|number|no)\b/i;

const GENERIC_STREET_ROMANCE =
  /\b(rua|avenida|avda|av|calle|c|via|viale|corso|piazza|rue|boulevard|bd|allee|chemin|strasse|str|weg|platz|ulica|ul|aleja|plac)\b/i;

function looksLikeStreetGeneric(line) {
  return GENERIC_STREET_EN.test(line) || GENERIC_STREET_ROMANCE.test(line) || hasDigits(line);
}

/**
 * Extract postal code using generic patterns and validation.
 * Tries common postal code positions (last line, second-to-last, any line with digits).
 */
function extractPostalGeneric(lines, countryISO) {
  // Common postal code patterns by length and format
  const candidates = [];

  for (const line of lines) {
    // Look for digit sequences: 5 digits, 4 digits, 6 digits, 7 digits
    const matches = [
      ...line.matchAll(/\b\d{5}(?:\s+\d{4})?\b/g), // US style: 12345 or 12345 1234
      ...line.matchAll(/\b[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}\b/gi), // UK style
      ...line.matchAll(/\b[A-Z]\d[A-Z]\s*\d[A-Z]\d\b/gi), // CA style
      ...line.matchAll(/\b\d{4}\s*[A-Z]{2}\b/gi), // NL style
      ...line.matchAll(/\b\d{3}\s+\d{2}\b/g), // SE style
      ...line.matchAll(/\b\d{7}\b/g), // JP style (no hyphen)
      ...line.matchAll(/\b\d{3}\s+\d{4}\b/g), // JP style (with space)
      ...line.matchAll(/\b\d{6}\b/g), // 6-digit codes
      ...line.matchAll(/\b\d{5}\b/g), // 5-digit codes
      ...line.matchAll(/\b\d{4}\b/g), // 4-digit codes
    ];

    for (const match of matches) {
      candidates.push(match[0]);
    }
  }

  // Validate candidates using postcode-validator
  for (const candidate of candidates) {
    const cleaned = candidate.toUpperCase().trim();
    try {
      if (postcodeValidator(cleaned, countryISO)) {
        return { raw: candidate, formatted: cleaned };
      }
    } catch {
      // Country not supported or validation failed
      continue;
    }
  }

  // If no valid postal code found, return empty
  return { raw: "", formatted: "" };
}

function splitAroundToken(line, token) {
  if (!token) return { before: line, after: "" };
  const pattern = new RegExp(
    token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\s+/g, "\\s+"),
    "i",
  );
  const match = line.match(pattern);
  if (!match || match.index == null) return { before: line, after: "" };
  const before = line.slice(0, match.index).trim();
  const after = line
    .slice(match.index + match[0].length)
    .trim();
  return { before, after };
}

/**
 * Combine address parts into Line1/Line2 with 35-char limit.
 * Line2 is used only for overflow.
 */
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

  // Split at last word boundary within limit
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
