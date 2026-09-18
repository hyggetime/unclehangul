import { parseAddress } from "./parser.js";
import { detectCountry } from "./auto-detector.js";
import { COUNTRY_LIST } from "./rules.js";

console.log("🧪 EMS Address Converter - Smoke Test\n");

const precisionCount = COUNTRY_LIST.filter((c) => c.isPrecision).length;
const genericCount = COUNTRY_LIST.filter((c) => !c.isPrecision).length;
console.log(`📍 Countries: ${COUNTRY_LIST.length} total (${precisionCount} precision, ${genericCount} generic)\n`);

const tests = [
  {
    name: "GB - England",
    address: "123 Baker Street\nLondon\nNW1 6XE",
    country: "GB",
    expectDetect: "GB",
    requirePostal: true,
  },
  {
    name: "US - New York",
    address: "350 5th Ave\nNew York, NY 10118",
    country: "US",
    expectDetect: "US",
    requirePostal: true,
  },
  {
    name: "FR - Paris",
    address: "5 Avenue Anatole France\n75007 Paris",
    country: "FR",
    expectDetect: "FR",
    requirePostal: true,
  },
  {
    name: "ES - Madrid",
    address: "Calle Gran Via 1\n28013 Madrid",
    country: "ES",
    expectDetect: "ES",
    requirePostal: true,
  },
  {
    name: "PT - Lisbon",
    address: "Rua Augusta 123\n1100-053 Lisboa",
    country: "PT",
    expectDetect: "PT",
    requirePostal: true,
  },
  {
    name: "PT - Ericeira (no postcode)",
    address: "Rua 1 Moinhos do Mar 2 Ericeira",
    country: "PT",
    expectDetect: "PT",
    requirePostal: false,
    expectCity: "Ericeira",
  },
  {
    name: "FR - Guemar with country name line",
    address: "Hotel La Clairiere\n50 route d illhaeusern\nguemar, 68970\nFrance",
    country: "FR",
    expectDetect: "FR",
    requirePostal: true,
    expectCity: "guemar",
    rejectState: /^LA$/i,
  },
  {
    name: "FR - Guemar with Korean country name",
    address: "Hotel La Clairiere\n50 route d illhaeusern\nguemar, 68970\n프랑스",
    country: "FR",
    expectDetect: "FR",
    requirePostal: true,
    expectCity: "guemar",
    rejectState: /^LA$/i,
  },
  {
    name: "IT - Rome",
    address: "Via del Corso 506\n00186 Roma",
    country: "IT",
    expectDetect: "IT",
    requirePostal: true,
  },
  {
    name: "JP - Tokyo",
    address: "1-1-1 Marunouchi\nChiyoda-ku\nTokyo 100-0005",
    country: "JP",
    expectDetect: "JP",
    requirePostal: true,
  },
  {
    name: "CN - Beijing",
    address: "No. 1 Jianguomenwai Avenue\nBeijing 100004",
    country: "CN",
    expectDetect: "CN",
    requirePostal: true,
  },
  {
    name: "SG - Singapore",
    address: "1 Raffles Place\nSingapore 048616",
    country: "SG",
    expectDetect: "SG",
    requirePostal: true,
  },
  {
    name: "AU - Sydney",
    address: "1 Macquarie Place\nSydney NSW 2000",
    country: "AU",
    expectDetect: "AU",
    requirePostal: true,
  },
  {
    name: "BR - Sao Paulo",
    address: "Avenida Paulista 1578\n01310-200 Sao Paulo SP",
    country: "BR",
    expectDetect: "BR",
    requirePostal: true,
    expectPostalPrefix: "01310",
  },
  {
    name: "CZ - Prague (generic fallback)",
    address: "Vaclavske namesti 1\n110 00 Praha",
    country: "CZ",
    requirePostal: true,
  },
  {
    name: "PH - Manila (generic)",
    address: "123 Ayala Avenue\nMakati 1200",
    country: "PH",
    requirePostal: false,
    requireLine1: true,
  },
  {
    name: "NZ - Auckland",
    address: "1 Queen Street\nAuckland 1010",
    country: "NZ",
    requirePostal: true,
    rejectCity: /new zealand/i,
  },
];

let passed = 0;
let failed = 0;

for (const test of tests) {
  try {
    const detected = detectCountry(test.address);
    const country = test.country || detected || "US";
    const parsed = parseAddress(test.address, country);

    const detectionOk = test.expectDetect ? detected === test.expectDetect : true;
    const postalOk = test.requirePostal === false || parsed.postalCode.length > 0;
    const lineOk = test.requireLine1 !== false ? parsed.line1.length > 0 : true;
    const cityOk = test.expectCity ? parsed.city === test.expectCity : true;
    const postalPrefixOk = test.expectPostalPrefix
      ? parsed.postalCode.includes(test.expectPostalPrefix)
      : true;
    const rejectCityOk = test.rejectCity ? !test.rejectCity.test(parsed.city) : true;
    const rejectStateOk = test.rejectState ? !test.rejectState.test(parsed.state) : true;

    if (detectionOk && postalOk && lineOk && cityOk && postalPrefixOk && rejectCityOk && rejectStateOk) {
      console.log(`✅ ${test.name}`);
      console.log(`   Detected: ${detected || "(none)"} → parsed as ${country}`);
      console.log(`   Postal: ${parsed.postalCode || "(none)"}`);
      console.log(`   City: ${parsed.city || "(none)"}`);
      console.log(`   State: ${parsed.state || "(none)"}`);
      console.log(`   Line1: ${parsed.line1}`);
      passed++;
    } else {
      console.log(`❌ ${test.name}`);
      console.log(`   Expected detect: ${test.expectDetect ?? "(any)"}, got: ${detected ?? "(none)"}`);
      console.log(`   Parsed:`, parsed);
      failed++;
    }
    console.log();
  } catch (error) {
    console.log(`❌ ${test.name} - ERROR`);
    console.log(`   ${error.message}`);
    console.log();
    failed++;
  }
}

console.log(`\n📊 Results: ${passed} passed, ${failed} failed out of ${tests.length} tests\n`);

if (failed > 0) {
  process.exit(1);
}
