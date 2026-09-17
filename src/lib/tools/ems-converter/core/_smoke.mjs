import { parseAddress } from "./parser.js";
import { detectCountry } from "./auto-detector.js";

console.log("🧪 EMS Address Converter - Smoke Test\n");

const tests = [
  {
    name: "GB - England",
    address: "123 Baker Street\nLondon\nNW1 6XE",
    expectedCountry: "GB",
  },
  {
    name: "US - New York",
    address: "350 5th Ave\nNew York, NY 10118",
    expectedCountry: "US",
  },
  {
    name: "FR - Paris",
    address: "5 Avenue Anatole France\n75007 Paris",
    expectedCountry: "FR",
  },
  {
    name: "ES - Madrid",
    address: "Calle Gran Via 1\n28013 Madrid",
    expectedCountry: "ES",
  },
  {
    name: "PT - Lisbon",
    address: "Rua Augusta 123\n1100-053 Lisboa",
    expectedCountry: "PT",
  },
  {
    name: "IT - Rome",
    address: "Via del Corso 506\n00186 Roma",
    expectedCountry: "IT",
  },
  {
    name: "JP - Tokyo",
    address: "1-1-1 Marunouchi\nChiyoda-ku\nTokyo 100-0005",
    expectedCountry: "JP",
  },
  {
    name: "CN - Beijing",
    address: "No. 1 Jianguomenwai Avenue\nBeijing 100004",
    expectedCountry: "CN",
  },
  {
    name: "SG - Singapore",
    address: "1 Raffles Place\nSingapore 048616",
    expectedCountry: "SG",
  },
  {
    name: "AU - Sydney",
    address: "1 Macquarie Place\nSydney NSW 2000",
    expectedCountry: "AU",
  },
  {
    name: "BR - Sao Paulo (Generic)",
    address: "Avenida Paulista 1578\n01310-200 Sao Paulo",
    expectedCountry: null, // Should use generic parser
  },
];

let passed = 0;
let failed = 0;

for (const test of tests) {
  try {
    const detected = detectCountry(test.address);
    const parsed = parseAddress(test.address, detected || test.expectedCountry || "US");

    const detectionOk = test.expectedCountry
      ? detected === test.expectedCountry
      : detected !== null;
    const hasPostalCode = parsed.postalCode.length > 0;
    const hasAddress = parsed.line1.length > 0;

    if (detectionOk && hasPostalCode && hasAddress) {
      console.log(`✅ ${test.name}`);
      console.log(`   Detected: ${detected || "(none)"}`);
      console.log(`   Postal: ${parsed.postalCode}`);
      console.log(`   City: ${parsed.city || "(none)"}`);
      console.log(`   State: ${parsed.state || "(none)"}`);
      console.log(`   Line1: ${parsed.line1}`);
      console.log(`   Line2: ${parsed.line2 || "(none)"}`);
      passed++;
    } else {
      console.log(`❌ ${test.name}`);
      console.log(`   Expected country: ${test.expectedCountry || "(any)"}`);
      console.log(`   Detected: ${detected || "(none)"}`);
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
