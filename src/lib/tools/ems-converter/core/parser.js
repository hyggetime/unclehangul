import { getCountryRule } from "./rules.js";
import { parseAddressPrecision } from "./precision-parser.js";
import { parseAddressGeneric } from "./generic-parser.js";

/**
 * Main parser router: delegates to precision or generic parser based on country rules.
 * @param {string} rawText
 * @param {string} selectedCountry ISO 3166-1 alpha-2
 * @returns {{ country: string, postalCode: string, city: string, state: string, line1: string, line2: string }}
 */
export function parseAddress(rawText, selectedCountry) {
  const rule = getCountryRule(selectedCountry);
  
  if (rule) {
    // Precision parsing with country-specific rules
    return parseAddressPrecision(rawText, selectedCountry);
  }
  
  // Generic fallback parsing
  return parseAddressGeneric(rawText, selectedCountry);
}
