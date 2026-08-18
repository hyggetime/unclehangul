import { ToolCrossLinks } from "@/components/tools/ToolCrossLinks";
import {
  JsonLd,
  buildFaqPageJsonLd,
  buildHowToJsonLd,
  buildWebApplicationJsonLd,
} from "@/lib/seo/json-ld";
import { getSiteUrl } from "@/lib/site-url";

const PAGE_PATH = "/tools/ems-address";

const SUPPORTED_COUNTRIES = [
  { code: "GB", nameKo: "영국", nameEn: "United Kingdom" },
  { code: "FR", nameKo: "프랑스", nameEn: "France" },
  { code: "NL", nameKo: "네덜란드", nameEn: "Netherlands" },
  { code: "BE", nameKo: "벨기에", nameEn: "Belgium" },
  { code: "SE", nameKo: "스웨덴", nameEn: "Sweden" },
  { code: "DE", nameKo: "독일", nameEn: "Germany" },
  { code: "US", nameKo: "미국", nameEn: "United States" },
  { code: "JP", nameKo: "일본", nameEn: "Japan" },
  { code: "CA", nameKo: "캐나다", nameEn: "Canada" },
  { code: "AU", nameKo: "호주", nameEn: "Australia" },
] as const;

const EMS_FIELDS = [
  { field: "Country", labelKo: "국가", example: "UNITED STATES" },
  { field: "Zipcode", labelKo: "우편번호", example: "10118" },
  { field: "City", labelKo: "도시", example: "New York" },
  { field: "State", labelKo: "주·도", example: "NY" },
  { field: "Line1", labelKo: "주소 1", example: "350 Fifth Avenue" },
  { field: "Line2", labelKo: "주소 2", example: "Apt 4B" },
] as const;

const FAQ_ITEMS = [
  {
    question: "우체국 계약EMS 해외주소 입력 형식은 무엇인가요?",
    answer:
      "계약EMS(Contract EMS) 해외 수취인 주소는 Country(국가), Zipcode(우편번호), City(도시), State(주·도), Line1(주소 1), Line2(주소 2) 여섯 칸으로 나눠 입력합니다. e-Post나 계약 발송 시스템마다 UI 라벨은 조금 다를 수 있지만, 필드 구조는 동일합니다.",
  },
  {
    question: "영문 주소를 EMS 입력 칸에 맞게 자동으로 나눌 수 있나요?",
    answer:
      "Uncle Hangul EMS Address Converter는 해외 구매자·수취인이 보낸 영문 주소 텍스트를 붙여 넣으면 우편번호·도시·주·도로명을 실시간으로 분석해 EMS 6필드로 분할합니다. 각 필드 옆 복사 버튼으로 우체국 입력창에 바로 붙여 넣을 수 있습니다.",
  },
  {
    question: "어떤 국가 주소를 지원하나요?",
    answer:
      "현재 영국(GB), 프랑스(FR), 네덜란드(NL), 벨기에(BE), 스웨덴(SE), 독일(DE), 미국(US), 일본(JP), 캐나다(CA), 호주(AU) 10개국을 지원합니다. 국가별 우편번호 패턴과 도로명 키워드를 기준으로 파싱하며, postcode-validator로 우편번호를 검증합니다.",
  },
  {
    question: "특수문자(쉼표, 하이픈, #)와 악센트(Ö, É, Ç)는 어떻게 처리되나요?",
    answer:
      "쉼표·하이픈·따옴표·# 등 특수문자는 공백으로 정리하고, Ö·Ä·É·Ç 같은 유럽 알파벳 악센트는 NFD 정규화로 ASCII(O, A, E, C)로 변환합니다. EMS 입력 규격에 맞는 영문 표기로 정제한 뒤 필드를 분할합니다.",
  },
  {
    question: "수취인 이름 줄은 어떻게 처리되나요?",
    answer:
      "첫 줄이 숫자·우편번호·도로명 없이 사람 이름만 있는 경우, 아래 줄에 실제 주소가 있으면 이름 줄은 자동으로 제외하고 주소 부분만 파싱합니다. 이름은 EMS 주소 필드에 넣지 않는 것이 일반적입니다.",
  },
  {
    question: "파싱 결과가 100% 정확한가요?",
    answer:
      "한 줄 주소, 비표준 표기, 누락된 우편번호 등은 국가·형식에 따라 오분류될 수 있습니다. 출고 전 Country·Zipcode·City·State·Line1·Line2를 한 번 더 확인하세요. 이 도구는 참고용이며, 최종 발송 책임은 발송인에게 있습니다.",
  },
  {
    question: "Pack Optimizer와 함께 쓰면 좋은 이유는?",
    answer:
      "Pack Optimizer는 K-Packet 분할·EMS 부피무게(체적중량)를 3D로 계산하고, EMS Address Converter는 해외 수취인 주소를 계약EMS 입력 규격으로 나눕니다. 박스·요금 최적화와 주소 입력을 함께 쓰면 해외 발송 준비 시간을 줄일 수 있습니다.",
  },
] as const;

const HOWTO_STEPS = [
  {
    name: "국가 선택",
    text: "수취인 주소 국가(영국, 미국, 일본 등 10개국)를 드롭다운에서 선택합니다.",
  },
  {
    name: "영문 주소 붙여넣기",
    text: "해외 구매자·마켓플레이스에서 받은 영문 주소 전체를 Raw address 입력창에 붙여 넣습니다.",
  },
  {
    name: "EMS 필드 확인",
    text: "Country, Zipcode, City, State, Line1, Line2가 실시간으로 채워지는지 확인합니다.",
  },
  {
    name: "우체국 시스템에 복사",
    text: "각 필드 옆 [복사] 버튼으로 e-Post·계약EMS 발송 화면에 순서대로 붙여 넣습니다.",
  },
] as const;

function EmsAddressStructuredData({ pageUrl }: { pageUrl: string }) {
  const schemas = [
    buildFaqPageJsonLd(pageUrl, [...FAQ_ITEMS]),
    buildWebApplicationJsonLd({
      name: "해외 주소 EMS 변환기",
      description:
        "해외 영문 주소를 우체국 계약EMS 입력 폼(Country, Zipcode, City, State, Line1, Line2) 규격으로 실시간 분할·정제하는 무료 웹 도구.",
      url: pageUrl,
      featureList: [
        "10개국 우편번호 검증(postcode-validator)",
        "Country / Zipcode / City / State / Line1 / Line2 자동 분할",
        "특수문자·유럽 악센트 ASCII 정규화",
        "필드별 클립보드 복사",
        "실시간 파싱(프론트엔드 전용, 데이터 미전송)",
      ],
    }),
    buildHowToJsonLd(
      "우체국 계약EMS 해외주소 입력 방법",
      "영문 해외 주소를 우체국 계약EMS 6필드(Country, Zipcode, City, State, Line1, Line2)로 나누어 입력하는 절차.",
      [...HOWTO_STEPS],
    ),
  ];

  return <JsonLd data={schemas} />;
}

export function EmsAddressSeoContent() {
  const pageUrl = `${getSiteUrl()}${PAGE_PATH}`;

  return (
    <section
      className="border-t-[0.5px] border-[#D9D9D3] bg-[#F2F2F0]"
      aria-label="EMS Address Converter guide and FAQ"
    >
      <EmsAddressStructuredData pageUrl={pageUrl} />
      <div className="mx-auto w-full max-w-[1440px] px-5 section-y md:px-8">
        <article className="mx-auto max-w-2xl">
          <header className="hidden border-b-[0.5px] border-[#D9D9D3] pb-8 md:block">
            <h2
              id="ems-address-seo-heading"
              className="font-ko text-xl font-black tracking-tight text-foreground md:text-2xl"
            >
              해외 주소 EMS 변환기
            </h2>
            <p className="font-en mt-1 text-sm text-foreground/50">
              Contract EMS · Address parsing · 10 countries
            </p>
          </header>

          <div className="space-y-4 border-b-[0.5px] border-[#D9D9D3] py-8 text-sm leading-relaxed text-foreground/70 md:text-base">
            <p className="font-ko">
              해외 D2C·마켓플레이스 셀러가 우체국{" "}
              <span className="font-en">Contract EMS</span>(계약EMS)로 발송할
              때, 수취인 영문 주소를 시스템 칸에 맞게 나누는 작업은 반복적이고
              오류가 나기 쉽습니다. 이 도구는 붙여 넣은 주소를{" "}
              <strong className="font-normal text-foreground">
                Country, Zipcode, City, State, Line1, Line2
              </strong>
              로 자동 분할하고, 특수문자·악센트를 EMS 입력에 맞게 정리합니다.
            </p>
            <p className="font-en hidden md:block">
              Paste a buyer&apos;s overseas English address and get Korea Post
              contract-EMS fields in real time. Supports GB, FR, NL, BE, SE, DE,
              US, JP, CA, and AU with postcode validation—runs entirely in your
              browser.
            </p>
          </div>

          <div className="border-b-[0.5px] border-[#D9D9D3] py-8">
            <h3 className="font-en text-[10px] font-bold uppercase tracking-widest text-foreground/45">
              EMS input fields
            </h3>
            <div className="mt-4 overflow-x-auto border-[0.5px] border-[#D9D9D3]">
              <table className="w-full min-w-[480px] text-left text-sm">
                <thead className="border-b-[0.5px] border-[#D9D9D3] bg-[#EBEBE5]/40">
                  <tr>
                    <th className="font-en px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-foreground/45">
                      Field
                    </th>
                    <th className="font-ko px-4 py-3 text-[10px] font-bold tracking-widest text-foreground/45">
                      한글
                    </th>
                    <th className="font-en px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-foreground/45">
                      Example
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y-[0.5px] divide-[#D9D9D3]">
                  {EMS_FIELDS.map((row) => (
                    <tr key={row.field}>
                      <td className="font-en px-4 py-3 font-bold text-foreground">
                        {row.field}
                      </td>
                      <td className="font-ko px-4 py-3 text-foreground/70">
                        {row.labelKo}
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
              Supported countries
            </h3>
            <ul className="mt-4 grid grid-cols-2 gap-2 border-[0.5px] border-[#D9D9D3] p-4 sm:grid-cols-3">
              {SUPPORTED_COUNTRIES.map((country) => (
                <li
                  key={country.code}
                  className="font-ko text-sm text-foreground/70"
                >
                  <span className="font-en font-bold text-foreground">
                    {country.code}
                  </span>{" "}
                  {country.nameKo}{" "}
                  <span className="font-en text-foreground/45">
                    ({country.nameEn})
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-b-[0.5px] border-[#D9D9D3] py-8">
            <h3 className="font-en text-[10px] font-bold uppercase tracking-widest text-foreground/45">
              Example
            </h3>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="border-[0.5px] border-[#D9D9D3] p-4">
                <p className="font-en text-[10px] font-bold uppercase tracking-widest text-foreground/40">
                  Input (US)
                </p>
                <pre className="font-en mt-3 whitespace-pre-wrap text-xs leading-relaxed text-foreground/70">
                  {`John Smith\n350 Fifth Avenue\nNew York, NY 10118`}
                </pre>
              </div>
              <div className="border-[0.5px] border-[#D9D9D3] p-4">
                <p className="font-en text-[10px] font-bold uppercase tracking-widest text-foreground/40">
                  Output (EMS fields)
                </p>
                <dl className="font-en mt-3 space-y-1 text-xs text-foreground/70">
                  <div>
                    <dt className="inline font-bold">Country:</dt> UNITED STATES
                  </div>
                  <div>
                    <dt className="inline font-bold">Zipcode:</dt> 10118
                  </div>
                  <div>
                    <dt className="inline font-bold">City:</dt> New York
                  </div>
                  <div>
                    <dt className="inline font-bold">State:</dt> NY
                  </div>
                  <div>
                    <dt className="inline font-bold">Line1:</dt> 350 Fifth
                    Avenue
                  </div>
                </dl>
              </div>
            </div>
          </div>

          <div className="pt-8">
            <h3 className="font-en text-[10px] font-bold uppercase tracking-widest text-foreground/45">
              FAQ
            </h3>
            <dl className="mt-4 divide-y-[0.5px] divide-[#D9D9D3] border-[0.5px] border-[#D9D9D3] bg-[#F2F2F0]">
              {FAQ_ITEMS.map((item) => (
                <div key={item.question} className="px-4 py-5 md:px-6">
                  <dt className="font-ko text-sm font-bold leading-snug text-foreground md:text-base">
                    {item.question}
                  </dt>
                  <dd className="font-ko mt-3 text-sm leading-relaxed text-foreground/65">
                    {item.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <ToolCrossLinks
            heading="Related tools"
            links={[
              {
                href: "/tools/pack-optimizer",
                title: "Pack Optimizer · 국제 배송비 3D 계산기",
                descriptionKo:
                  "K-Packet 분할 배송·EMS 부피무게를 3D packing으로 비교해 배송비 절감 시나리오를 확인합니다.",
              },
            ]}
          />
        </article>
      </div>
    </section>
  );
}
