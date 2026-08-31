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
  { field: "Province / Metro (시·도)", example: "Seoul" },
  { field: "District (구)", example: "Yangcheon-gu" },
  { field: "Town / Village / Dong (읍·면·동)", example: "—" },
  { field: "Detail address (세부주소)", example: "1F, Nambusunhwan-ro 57-gil 17" },
  { field: "ZIP / Postal Code", example: "07997" },
  { field: "Korean address (한글)", example: "서울특별시 양천구 남부순환로57길 17 1층" },
] as const;

const FAQ_ITEMS = [
  {
    question: "How do I split a Korean address into Line 1 and Line 2?",
    answer:
      "Place the Street Name and Building Number in Line 1 (e.g., 19-4 Seogang-ro), and the Apartment/Room/Floor number in Line 2 (e.g., Rm 801). This tool also shows the full Korean admin order: Province → District → Locality → Detail.",
  },
  {
    question: "Why is the Korean address label needed in Korean text?",
    answer:
      "Local Korean delivery couriers read Korean much faster and more accurately, preventing lost packages once the shipment arrives in South Korea.",
  },
  {
    question: "How is this different from the EMS Address Converter?",
    answer:
      "EMS Address Converter splits an overseas English address for Korea Post outbound shipping. This tool does the reverse—it takes a Korean address written in English and reorganizes it into Korean administrative levels plus a Hangul line for inbound delivery.",
  },
  {
    question: "Do I need to search in Korean?",
    answer:
      "No. Paste the address as you would type it on an international form—English road names, district, and city are enough. Korean input is also supported.",
  },
  {
    question: "Is the Hangul conversion always official?",
    answer:
      "Romanized road names are converted using Revised Romanization rules and common place-name maps. Always confirm the Hangul line against your lease, ID, or a official document before shipping valuable items.",
  },
] as const;

const HOWTO_STEPS = [
  {
    name: "Paste the English Korean address",
    text: "Copy the full address from a marketplace, lease, or form—e.g. 1F, Nambusunhwan-ro 57-gil 17, Yangcheon, Seoul, Korea.",
  },
  {
    name: "Read the Korean admin split",
    text: "Province / Metro (시·도), District (구), Town / Dong (읍·면·동), and Detail (세부주소) appear in Korean administrative order.",
  },
  {
    name: "Copy the Hangul line",
    text: "Use the Korean address field or shipping label when you need couriers to read the official Hangul form.",
  },
  {
    name: "Print the dual-language label",
    text: "Attach the label to your box so both English and Korean lines are visible for inbound delivery.",
  },
] as const;

function KrAddressStructuredData({ pageUrl }: { pageUrl: string }) {
  const schemas = [
    buildFaqPageJsonLd(pageUrl, [...FAQ_ITEMS]),
    buildHowToJsonLd(
      "How to write a South Korean address for international shipping",
      "Paste a Korean address written in English, split it into Province, District, Locality, and Detail, and view the Hangul equivalent for inbound shipping.",
      [...HOWTO_STEPS],
    ),
    buildSoftwareApplicationJsonLd({
      name: "Korean Address in English Converter & Form Splitter",
      description:
        "Split a Korean address written in English into Province, District, Locality, and Detail fields, with a Hangul address line for inbound shipping.",
      url: pageUrl,
      applicationCategory: "UtilitiesApplication",
      featureList: [
        "Paste English-format Korean addresses",
        "Province / District / Locality / Detail split",
        "Hangul address line generation",
        "Dual-language inbound shipping label",
        "Runs entirely in your browser",
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
              Korean address in English — split &amp; convert
            </h2>
            <p className="font-en mt-1 text-sm text-foreground/50">
              Inbound · Paste parser · Hangul companion
            </p>
          </header>

          <div className="space-y-4 border-b-[0.5px] border-[#D9D9D3] py-8 text-sm leading-relaxed text-foreground/70 md:text-base">
            <p className="font-en">
              Expats and overseas shoppers often have a Korean address only in
              English—{" "}
              <strong className="font-normal text-foreground">
                1F, Nambusunhwan-ro 57-gil 17, Yangcheon, Seoul
              </strong>
              . This tool parses that text into Korean administrative levels (
              <strong className="font-normal text-foreground">
                Province → District → Locality → Detail
              </strong>
              ) and shows the Hangul line beside it—mirroring our{" "}
              <a
                href={getEmsAddressUrl()}
                className="font-en underline decoration-[#D9D9D3] underline-offset-4"
              >
                EMS Address Converter
              </a>{" "}
              for outbound shipping.
            </p>
          </div>

          <div className="border-b-[0.5px] border-[#D9D9D3] py-8">
            <h3 className="font-en text-[10px] font-bold uppercase tracking-widest text-foreground/45">
              Parsed fields
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
                  English input
                </p>
                <pre className="font-en mt-3 whitespace-pre-wrap text-xs leading-relaxed text-foreground/70">
                  {`1F, Nambusunhwan-ro 57-gil 17\nYangcheon, Seoul, Korea`}
                </pre>
              </div>
              <div className="border-[0.5px] border-[#D9D9D3] p-4">
                <p className="font-ko text-[10px] font-bold tracking-widest text-foreground/40">
                  한글 출력
                </p>
                <pre className="font-ko mt-3 whitespace-pre-wrap text-xs leading-relaxed text-foreground/70">
                  {`서울특별시 양천구\n남부순환로57길 17 1층`}
                </pre>
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
