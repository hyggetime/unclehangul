import { ToolCrossLinks } from "@/components/tools/ToolCrossLinks";
import { ToolFaqAccordion } from "@/components/tools/ToolFaqAccordion";
import {
  JsonLd,
  buildFaqPageJsonLd,
  buildHowToJsonLd,
  buildSoftwareApplicationJsonLd,
} from "@/lib/seo/json-ld";
import { getEmsAddressUrl, getKrAddressFormatterUrl } from "@/lib/domains";

const FORM_FIELDS = [
  { field: "Address Line 1", example: "19-4 Seogang-ro" },
  { field: "Address Line 2", example: "8F, Room 801" },
  { field: "City / District", example: "Mapo-gu" },
  { field: "State / Province", example: "Seoul" },
  { field: "ZIP / Postal Code", example: "04058" },
] as const;

const FAQ_ITEMS = [
  {
    question: "How do I split a Korean address into Line 1 and Line 2?",
    answer:
      "Place the Street Name and Building Number in Line 1 (e.g., 19-4 Seogang-ro), and the Apartment/Room/Floor number in Line 2 (e.g., Rm 801).",
  },
  {
    question: "Why is the Korean address label needed in Korean text?",
    answer:
      "Local Korean delivery couriers read Korean much faster and more accurately, preventing lost packages once the shipment arrives in South Korea.",
  },
  {
    question: "What is the standard English order for a South Korean address?",
    answer:
      "Use Western order: unit/floor, street + building number, district (gu/si/gun), city or province, 5-digit postal code, then Rep. of KOREA. Example: 8F Room 801, 19-4 Seogang-ro, Mapo-gu, Seoul, 04058, Rep. of KOREA.",
  },
  {
    question: "Where does the address data come from?",
    answer:
      "Street search uses the Ministry of the Interior and Safety address API (juso.go.kr). It returns the official 5-digit postal code plus English road-name, district, and province fields.",
  },
  {
    question: "Can I use this for Amazon, iHerb, or other overseas checkouts?",
    answer:
      "Yes. Copy Address Line 1, Line 2, City, State, and ZIP into any international form. Country is South Korea / Republic of Korea. Always confirm the merchant’s field labels before you submit.",
  },
] as const;

const HOWTO_STEPS = [
  {
    name: "Search the Korean street address",
    text: "Type a road-name address in Korean (for example 마포구 서강로 19-4) and pick the official juso.go.kr result.",
  },
  {
    name: "Add the unit, floor, or room",
    text: "Enter the apartment or office detail. The tool romanizes it into Address Line 2 (8층 801호 becomes 8F, Room 801).",
  },
  {
    name: "Copy the five overseas form fields",
    text: "Copy Address Line 1, Line 2, City / District, State / Province, and the 5-digit ZIP into the merchant or carrier form.",
  },
  {
    name: "Print the bilingual shipping label",
    text: "Add the recipient name and phone, then copy or print the dual-language label so Korean couriers can read the Hangul line.",
  },
] as const;

function KrAddressStructuredData({ pageUrl }: { pageUrl: string }) {
  const schemas = [
    buildFaqPageJsonLd(pageUrl, [...FAQ_ITEMS]),
    buildHowToJsonLd(
      "How to write a South Korean address for international shipping",
      "Convert a South Korean road-name address into English Address Line 1, Line 2, City, State, and ZIP for overseas checkout forms, then print a bilingual delivery label.",
      [...HOWTO_STEPS],
    ),
    buildSoftwareApplicationJsonLd({
      name: "Korean Address in English Converter & Form Splitter",
      description:
        "Convert South Korean addresses into English form fields (Address Line 1, Line 2, City, State, ZIP) and generate a bilingual inbound shipping label.",
      url: pageUrl,
      applicationCategory: "UtilitiesApplication",
      featureList: [
        "MOIS juso.go.kr Korean street-address search",
        "English Address Line 1 / Line 2 / City / State / ZIP split",
        "5-digit South Korea postal code lookup",
        "Apartment, floor, and room romanization",
        "Dual-language inbound shipping label",
        "Copy field and print label actions",
      ],
    }),
  ];

  return <JsonLd data={schemas} />;
}

export function KrAddressSeoContent() {
  const pageUrl = getKrAddressFormatterUrl();

  return (
    <section
      className="border-t-[0.5px] border-[#D9D9D3] bg-[#F2F2F0]"
      aria-label="Korean address in English guide and FAQ"
      lang="en"
    >
      <KrAddressStructuredData pageUrl={pageUrl} />
      <div className="mx-auto w-full max-w-[1440px] px-5 section-y md:px-8">
        <article className="mx-auto max-w-2xl">
          <header className="border-b-[0.5px] border-[#D9D9D3] pb-8">
            <h2
              id="kr-address-seo-heading"
              className="font-en text-xl font-black tracking-tight text-foreground md:text-2xl"
            >
              How to write a South Korean address in English
            </h2>
            <p className="font-en mt-1 text-sm text-foreground/50">
              Inbound shipping · Form splitter · Dual-language label
            </p>
          </header>

          <div className="space-y-4 border-b-[0.5px] border-[#D9D9D3] py-8 text-sm leading-relaxed text-foreground/70 md:text-base">
            <p className="font-en">
              Overseas stores and carriers expect{" "}
              <strong className="font-normal text-foreground">
                Address Line 1, Line 2, City, State, and ZIP
              </strong>
              — not a single Korean line. This tool looks up the official
              road-name address, then splits it so expats, K-pop shoppers, and
              overseas Koreans can paste fields into Amazon, iHerb, and similar
              forms.
            </p>
            <p className="font-en">
              Keep a Korean line on the box. Once the parcel reaches Korea,
              local couriers read Hangul far faster than romanized streets.
            </p>
          </div>

          <div className="border-b-[0.5px] border-[#D9D9D3] py-8">
            <h3 className="font-en text-[10px] font-bold uppercase tracking-widest text-foreground/45">
              Overseas form fields
            </h3>
            <div className="mt-4 overflow-x-auto border-[0.5px] border-[#D9D9D3]">
              <table className="w-full min-w-[420px] text-left text-sm">
                <thead className="border-b-[0.5px] border-[#D9D9D3] bg-[#EBEBE5]/40">
                  <tr>
                    <th className="font-en px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-foreground/45">
                      Field
                    </th>
                    <th className="font-en px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-foreground/45">
                      Example
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y-[0.5px] divide-[#D9D9D3]">
                  {FORM_FIELDS.map((row) => (
                    <tr key={row.field}>
                      <td className="font-en px-4 py-3 font-bold text-foreground">
                        {row.field}
                      </td>
                      <td className="font-en px-4 py-3 text-foreground/65">
                        {row.example}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="border-b-[0.5px] border-[#D9D9D3] py-8">
            <h3 className="font-en text-[10px] font-bold uppercase tracking-widest text-foreground/45">
              Example
            </h3>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="border-[0.5px] border-[#D9D9D3] p-4">
                <p className="font-en text-[10px] font-bold uppercase tracking-widest text-foreground/40">
                  Korean input
                </p>
                <pre className="font-ko mt-3 whitespace-pre-wrap text-xs leading-relaxed text-foreground/70">
                  {`서울특별시 마포구 서강로 19-4\n8층 801호`}
                </pre>
              </div>
              <div className="border-[0.5px] border-[#D9D9D3] p-4">
                <p className="font-en text-[10px] font-bold uppercase tracking-widest text-foreground/40">
                  English fields
                </p>
                <dl className="font-en mt-3 space-y-1 text-xs text-foreground/70">
                  <div>
                    <dt className="inline font-bold">Line 1:</dt> 19-4
                    Seogang-ro
                  </div>
                  <div>
                    <dt className="inline font-bold">Line 2:</dt> 8F, Room 801
                  </div>
                  <div>
                    <dt className="inline font-bold">City:</dt> Mapo-gu
                  </div>
                  <div>
                    <dt className="inline font-bold">State:</dt> Seoul
                  </div>
                  <div>
                    <dt className="inline font-bold">ZIP:</dt> 04058
                  </div>
                </dl>
              </div>
            </div>
          </div>

          <ToolFaqAccordion items={FAQ_ITEMS} itemLang="en" />

          <ToolCrossLinks
            heading="Related tools"
            links={[
              {
                href: getEmsAddressUrl(),
                title: "EMS Overseas Address Parser",
                descriptionKo:
                  "Shipping FROM Korea? Split an overseas English address into Korea Post Contract EMS fields.",
                external: true,
              },
            ]}
          />
        </article>
      </div>
    </section>
  );
}
