/**
 * Parser router: delegates to precision or generic parser based on country rules.
 */
import { getCountryRule } from "./rules.js";
import { parseAddressPrecision } from "./precision-parser.js";
import { parseAddressGeneric } from "./generic-parser.js";

/**
 * Parse a raw overseas address into Korea Post contract-EMS fields.
 * Routes to precision parser if country-specific rules exist, otherwise uses generic fallback.
 * @param {string} rawText
 * @param {string} selectedCountry ISO 3166-1 alpha-2 (GB, FR, NL, …)
 * @returns {{ country: string, postalCode: string, city: string, state: string, line1: string, line2: string }}
 */
export function parseAddress(rawText, selectedCountry) {
  const rule = getCountryRule(selectedCountry);

  if (rule) {
    // Country has precision rules
    return parseAddressPrecision(rawText, rule);
  }

  // Fallback to generic parser
  return parseAddressGeneric(rawText, selectedCountry);
}
