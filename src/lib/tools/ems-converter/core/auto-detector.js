import { COUNTRY_RULES, getCountryRule } from "./rules.js";
import { GENERIC_COUNTRIES } from "./country-metadata.js";
import { splitSanitizedLines } from "./sanitizer.js";

/**
 * Auto-detect country from raw address text by analyzing postal code patterns.
 * @param {string} rawText
 * @returns {string|null} ISO country code or null if detection fails
 */
export function detectCountry(rawText) {
  const lines = splitSanitizedLines(rawText);
  if (!lines.length) return null;

  // Join all lines to search for postal codes
  const blob = lines.join(" ");

  // Test precision countries first (they have better patterns)
  const precisionMatches = [];
  for (const [iso, rule] of Object.entries(COUNTRY_RULES)) {
    const match = blob.match(rule.extract);
    if (match) {
      // Score by pattern specificity + context hints
      const score = calculatePatternScore(match[0], rule, blob);
      precisionMatches.push({ iso, score, matched: match[0] });
    }
  }

  if (precisionMatches.length > 0) {
    // Sort by score (descending) and return highest
    precisionMatches.sort((a, b) => b.score - a.score);
    
    // If top two scores are very close, use context hints to break tie
    if (precisionMatches.length > 1 && precisionMatches[0].score - precisionMatches[1].score < 15) {
      // Check for additional context clues
      for (const candidate of precisionMatches) {
        const rule = COUNTRY_RULES[candidate.iso];
        if (hasContextHints(blob, rule)) {
          return candidate.iso;
        }
      }
    }
    
    return precisionMatches[0].iso;
  }

  // Street-keyword hints when postal code is absent or ambiguous
  const streetHint = detectCountryFromStreetKeywords(blob);
  if (streetHint) return streetHint;

  // Fallback: try to match common generic patterns
  const genericMatches = detectGenericPattern(blob);
  if (genericMatches.length > 0) {
    return genericMatches[0];
  }

  return null;
}

/**
 * Detect country from distinctive street keywords (e.g. Rua → PT).
 * @param {string} text
 * @returns {string|null}
 */
function detectCountryFromStreetKeywords(text) {
  const hints = [
    { iso: "PT", regex: /\b(rua|avenida|av\.|praca|praceta|largo|travessa|calcada|estrada|alameda)\b/i },
    { iso: "ES", regex: /\b(calle|c\/|avenida|avda|paseo|plaza|camino|travesia|ronda)\b/i },
    { iso: "IT", regex: /\b(via|viale|corso|piazza|piazzale|vicolo|strada)\b/i },
    { iso: "FR", regex: /\b(rue|avenue|boulevard|bd|allee|chemin|impasse|quai)\b/i },
    { iso: "DE", regex: /(strasse|str\.|\bstr\b|weg|platz|gasse)/i },
    { iso: "NL", regex: /(straat|laan|\bweg\b|plein|gracht|kade)/i },
    { iso: "SE", regex: /(gatan|gata|vagen|vag|torg)/i },
    { iso: "BR", regex: /\b(rua|avenida|av\.|travessa|alameda|logradouro)\b/i },
    { iso: "JP", regex: /\b(chome|banchi|ku|shi|ken|to|do)\b/i },
    { iso: "TH", regex: /\b(thanon|soi|moo)\b/i },
    { iso: "CN", regex: /\b(lu|jie|dao|xiang|district|road|avenue)\b/i },
  ];

  for (const hint of hints) {
    if (hint.regex.test(text) && getCountryRule(hint.iso)) {
      return hint.iso;
    }
  }

  return null;
}

/**
 * Calculate pattern specificity score.
 * Higher score = more specific/unique pattern.
 */
function calculatePatternScore(matched, rule, fullText) {
  let score = 0;

  // Length score: longer postal codes are more specific
  score += matched.length * 10;

  // Character diversity score
  const hasLetters = /[A-Z]/i.test(matched);
  const hasDigits = /\d/.test(matched);
  const hasSpaces = /\s/.test(matched);
  const hasHyphen = /-/.test(matched);

  if (hasLetters && hasDigits) score += 25; // Mixed alphanumeric is very specific
  if (hasSpaces) score += 12; // Formatted with spaces is specific
  if (hasHyphen) score += 10; // Hyphenated format is specific
  if (hasLetters && !hasDigits) score += 5; // Letter-only is less common

  // Pattern uniqueness: some patterns are very distinctive
  if (rule.iso === "GB") score += 20; // UK postcodes are very distinctive (XX0X 0XX)
  if (rule.iso === "CA") score += 20; // Canadian postcodes are very distinctive (X0X 0X0)
  if (rule.iso === "NL") score += 15; // Dutch postcodes are distinctive (0000 XX)
  if (rule.iso === "JP") score += 15; // Japanese postcodes are distinctive (000-0000)
  if (rule.iso === "SE") score += 12; // Swedish postcodes often have SE prefix
  if (rule.iso === "PT") score += 12; // Portuguese postcodes are distinctive (0000-000)
  if (rule.iso === "BR") score += 18; // Brazilian CEP (00000-000) is more specific than bare 5 digits
  if (rule.iso === "CL") score += 15; // Chilean 7-digit codes
  if (rule.iso === "AR") score += 14; // Argentine CPA (A0000AAA)
  if (rule.iso === "IE") score += 12; // Irish Eircode is distinctive
  if (rule.iso === "PL") score += 10; // Polish postcodes are distinctive (00-000)

  // Penalty for very common patterns that many countries share
  if (matched.length === 5 && /^\d{5}$/.test(matched)) {
    // US, FR, DE, ES, IT, MX, TH, TR all use 5-digit codes
    score -= 10; // Reduce confidence when pattern is ambiguous
  }
  if (matched.length === 4 && /^\d{4}$/.test(matched)) {
    // AU, AT, BE, CH, DK, NO, NZ all use 4-digit codes
    score -= 10;
  }
  if (matched.length === 6 && /^\d{6}$/.test(matched)) {
    // SG, IN, CN all use 6-digit codes
    score -= 10;
  }

  // Context hints bonus
  if (hasContextHints(fullText, rule)) {
    score += 20; // Significant bonus for matching state/street patterns
  }

  return score;
}

/**
 * Check if the text contains context hints for the given country rule.
 */
function hasContextHints(text, rule) {
  // Check for state/province matches
  if (rule.state && rule.state.test(text)) {
    return true;
  }

  // Check for distinctive street patterns
  if (rule.street && rule.street.test(text)) {
    // Only count as strong hint for distinctive patterns
    const streetHints = {
      GB: /\b(street|road|avenue|lane|close|way)\b/i,
      FR: /\b(rue|avenue|boulevard|place)\b/i,
      ES: /\b(calle|avenida|plaza|paseo)\b/i,
      PT: /\b(rua|avenida|praca|largo)\b/i,
      IT: /\b(via|viale|corso|piazza)\b/i,
      DE: /(strasse|weg|platz|allee)/i,
      NL: /(straat|laan|weg|plein)/i,
      SE: /(gatan|vagen|torg)/i,
      DK: /(vej|gade|alle)/i,
      NO: /(gate|vei|plass)/i,
      FI: /(katu|tie|tori)/i,
      PL: /\b(ulica|aleja|plac)\b/i,
      TR: /\b(sokak|cadde|bulvar)\b/i,
      CN: /\b(road|avenue|jie|lu)\b/i,
      TH: /\b(thanon|soi|road)\b/i,
    };
    
    const hint = streetHints[rule.iso];
    if (hint && hint.test(text)) {
      return true;
    }
  }

  return false;
}

/**
 * Detect country from generic postal code patterns.
 * Used as fallback when precision rules don't match.
 */
function detectGenericPattern(text) {
  const candidates = [];

  // Common patterns
  const patterns = [
    { regex: /\b\d{6}\b/, countries: ["SG", "IN", "CN"] }, // 6-digit codes
    { regex: /\b\d{7}\b/, countries: ["IL"] }, // 7-digit codes
    { regex: /\b\d{5}\b/, countries: ["US", "DE", "FR", "ES", "MX", "TH", "TR"] }, // 5-digit codes
    { regex: /\b\d{4}\b/, countries: ["AU", "AT", "BE", "CH", "DK", "NO", "NZ"] }, // 4-digit codes
    { regex: /\b\d{3}\b/, countries: ["IS"] }, // 3-digit codes
  ];

  for (const { regex, countries } of patterns) {
    if (regex.test(text)) {
      candidates.push(...countries);
    }
  }

  // Return unique candidates
  return [...new Set(candidates)];
}

/**
 * Get all countries (precision + generic) sorted by priority.
 * Precision countries come first.
 */
export function getAllCountriesSorted() {
  const precision = Object.keys(COUNTRY_RULES);
  const generic = Object.keys(GENERIC_COUNTRIES).filter((iso) => !precision.includes(iso));
  return [...precision, ...generic];
}
