import { postcodeValidator } from "postcode-validator";
import { splitSanitizedLines } from "./sanitizer.js";
import { formatPostalCode, getCountryRule } from "./rules.js";

const EMS_LINE_MAX = 35;

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

function lastRegexMatch(text, regex) {
  const copy = new RegExp(regex.source, regex.flags.includes("g") ? regex.flags : `${regex.flags}g`);
  let last = "";
  let match = copy.exec(text);
  while (match) {
    last = match[0];
    match = copy.exec(text);
  }
  return last;
}

function isValidPostal(formatted, country, fallback) {
  try {
    if (postcodeValidator(formatted, country)) return true;
  } catch {
    /* unknown country in the library — fall through */
  }
  return fallback.test(formatted);
}

function extractPostal(lines, rule) {
  const windows = [lines.slice(-1), lines.slice(-2), lines];
  for (const slice of windows) {
    const blob = slice.join(" ");
    const candidate = lastRegexMatch(blob, rule.extract);
    if (!candidate) continue;
    const formatted = formatPostalCode(candidate, rule.iso);
    if (isValidPostal(formatted, rule.iso, rule.validate)) {
      return { raw: candidate, formatted };
    }
  }
  return { raw: "", formatted: "" };
}

function tokenPattern(token) {
  return new RegExp(token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\s+/g, "\\s+"), "i");
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

function looksLikeStreet(line, rule) {
  if (rule.street.test(line)) return true;
  return /\d/.test(line);
}

function looksLikeRecipient(line, rule) {
  if (!line || /\d/.test(line)) return false;
  if (rule.street.test(line)) return false;
  if (rule.state && rule.state.test(line)) return false;
  return true;
}

function takeState(lines, rule) {
  if (!rule.state) return { state: "", lines };
  const next = [...lines];
  for (let i = next.length - 1; i >= 0; i -= 1) {
    const match = next[i].match(rule.state);
    if (!match) continue;
    const state = match[1] ? match[1].toUpperCase() : match[0].toUpperCase();
    next[i] = next[i].replace(match[0], " ").replace(/\s+/g, " ").trim();
    if (!next[i]) next.splice(i, 1);
    return { state, lines: next.filter(Boolean) };
  }
  return { state: "", lines: next };
}

function takeCity(lines, rule) {
  const next = [...lines];
  for (let i = next.length - 1; i >= 0; i -= 1) {
    const line = next[i];
    if (looksLikeStreet(line, rule) && !rule.cityLine?.test(line)) continue;
    const city = line.trim();
    if (!city) continue;
    next.splice(i, 1);
    return { city, lines: next };
  }
  return { city: "", lines: next };
}

/** US/CA/AU one-liners: "123 Main St New York" → city from the trailing words. */
function peelCityFromStreet(line, rule) {
  const words = line.split(/\s+/).filter(Boolean);
  const cityWords = [];
  while (words.length) {
    const last = words[words.length - 1];
    if (rule.street.test(last) || /\d/.test(last)) break;
    cityWords.unshift(words.pop());
    if (cityWords.length >= 3) break;
  }
  if (!cityWords.length || !words.length) return { city: "", street: line };
  return { city: cityWords.join(" "), street: words.join(" ") };
}

function wrapEmsLines(parts) {
  const words = parts.join(" ").split(/\s+/).filter(Boolean);
  const line1 = [];
  const line2 = [];
  let bucket = line1;

  for (const word of words) {
    const preview = bucket.length ? `${bucket.join(" ")} ${word}` : word;
    if (bucket === line1 && preview.length > EMS_LINE_MAX && line1.length) {
      bucket = line2;
      bucket.push(word);
    } else {
      bucket.push(word);
    }
  }

  return {
    line1: line1.join(" "),
    line2: line2.join(" "),
  };
}

/**
 * Parse a raw overseas address into Korea Post contract-EMS fields.
 * @param {string} rawText
 * @param {string} selectedCountry ISO 3166-1 alpha-2 (GB, FR, NL, …)
 * @returns {{ country: string, postalCode: string, city: string, state: string, line1: string, line2: string }}
 */
export function parseAddress(rawText, selectedCountry) {
  const rule = getCountryRule(selectedCountry);
  if (!rule) return emptyResult(String(selectedCountry ?? "").toUpperCase());

  const lines = splitSanitizedLines(rawText);
  if (!lines.length) return emptyResult(rule.iso);

  const restLooksLikeAddress = lines
    .slice(1)
    .some((line) => looksLikeStreet(line, rule) || rule.extract.test(line));
  const working =
    looksLikeRecipient(lines[0], rule) && restLooksLikeAddress ? lines.slice(1) : [...lines];

  const postal = extractPostal(working, rule);
  let cityFromPostal = "";
  const withoutPostal = working
    .map((line) => {
      if (!postal.raw || !tokenPattern(postal.raw).test(line)) return line;
      const { before, after } = splitAroundPostal(line, postal.raw);
      if (after && !looksLikeStreet(after, rule)) cityFromPostal = after;
      return before;
    })
    .map((line) => line.trim())
    .filter(Boolean);

  const withState = takeState(withoutPostal, rule);
  let city = cityFromPostal;
  let streets = withState.lines;

  if (!city) {
    const taken = takeCity(streets, rule);
    city = taken.city;
    streets = taken.lines;
  }

  if (!city && streets.length && rule.state) {
    const peeled = peelCityFromStreet(streets[streets.length - 1], rule);
    if (peeled.city) {
      city = peeled.city;
      streets = [...streets.slice(0, -1), peeled.street].filter(Boolean);
    }
  }

  return {
    country: rule.iso,
    postalCode: postal.formatted,
    city,
    state: withState.state,
    ...wrapEmsLines(streets),
  };
}
