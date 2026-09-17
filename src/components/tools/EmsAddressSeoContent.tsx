import { ToolCrossLinks } from "@/components/tools/ToolCrossLinks";
import { ToolFaqAccordion } from "@/components/tools/ToolFaqAccordion";
import {
  JsonLd,
  buildFaqPageJsonLd,
  buildHowToJsonLd,
  buildSoftwareApplicationJsonLd,
} from "@/lib/seo/json-ld";
import {
  getKoreanAddressConverterUrl,
  getOverseasAddressConverterUrl,
  getPackOptimizerUrl,
} from "@/lib/domains";

const PRECISION_COUNTRIES = [
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
  { code: "ES", nameKo: "스페인", nameEn: "Spain" },
  { code: "PT", nameKo: "포르투갈", nameEn: "Portugal" },
  { code: "IT", nameKo: "이탈리아", nameEn: "Italy" },
  { code: "IE", nameKo: "아일랜드", nameEn: "Ireland" },
  { code: "AT", nameKo: "오스트리아", nameEn: "Austria" },
  { code: "CH", nameKo: "스위스", nameEn: "Switzerland" },
  { code: "DK", nameKo: "덴마크", nameEn: "Denmark" },
  { code: "NO", nameKo: "노르웨이", nameEn: "Norway" },
  { code: "FI", nameKo: "핀란드", nameEn: "Finland" },
  { code: "IS", nameKo: "아이슬란드", nameEn: "Iceland" },
  { code: "PL", nameKo: "폴란드", nameEn: "Poland" },
  { code: "CZ", nameKo: "체코", nameEn: "Czech Republic" },
  { code: "SK", nameKo: "슬로바키아", nameEn: "Slovakia" },
  { code: "HU", nameKo: "헝가리", nameEn: "Hungary" },
  { code: "RO", nameKo: "루마니아", nameEn: "Romania" },
  { code: "GR", nameKo: "그리스", nameEn: "Greece" },
  { code: "NZ", nameKo: "뉴질랜드", nameEn: "New Zealand" },
  { code: "MX", nameKo: "멕시코", nameEn: "Mexico" },
  { code: "BR", nameKo: "브라질", nameEn: "Brazil" },
  { code: "AR", nameKo: "아르헨티나", nameEn: "Argentina" },
  { code: "CL", nameKo: "칠레", nameEn: "Chile" },
  { code: "SG", nameKo: "싱가포르", nameEn: "Singapore" },
  { code: "CN", nameKo: "중국", nameEn: "China" },
  { code: "IN", nameKo: "인도", nameEn: "India" },
  { code: "TH", nameKo: "태국", nameEn: "Thailand" },
  { code: "IL", nameKo: "이스라엘", nameEn: "Israel" },
  { code: "TR", nameKo: "튀르키예", nameEn: "Turkey" },
] as const;

const EMS_FIELDS = [
  { field: "Country", labelKo: "국가", example: "UNITED STATES" },
  { field: "Zipcode", labelKo: "우편번호", example: "10118" },
  { field: "State", labelKo: "주·도", example: "NY" },
  { field: "City", labelKo: "도시", example: "New York" },
  { field: "Line1", labelKo: "주소 1", example: "350 Fifth Avenue" },
  { field: "Line2", labelKo: "주소 2", example: "Apt 4B" },
] as const;

const FAQ_ITEMS = [
  {
    question: "EMS 주소 입력 시 Address Line 1과 Line 2는 어떻게 나눠야 하나요?",
    answer:
      "건물명과 도로명, 번지수를 Line 1에 우선 합성하고, 35자가 넘는 초과분만 Line 2로 넘겨 분할합니다. Uncle Hangul EMS 변환기는 이 규칙을 자동 적용하며, 박스 부착용 배송 라벨에도 동일한 Line 1·Line 2가 반영됩니다.",
  },
  {
    question: "영문 주소 표기 순서가 반대로 나와도 배송에 문제가 없나요?",
    answer:
      "서구권 주소 체계는 [건물명 → 번지수/도로명 → 도시 → 우편번호] 순서가 표준이므로 정상 배송됩니다. 배송 라벨(Shipping Label) 뷰는 박스 부착용으로 이 순서에 맞춰 Country, Zip, Address Line 1·2, City/State를 정리해 보여줍니다.",
  },
  {
    question: "배송 라벨은 어떻게 출력하나요?",
    answer:
      "주소를 붙여 넣으면 파싱 결과 하단에 실물 박스 부착용 Shipping Label이 생성됩니다. [라벨 텍스트 전체 복사]로 클립보드에 복사하거나, [라벨 인쇄 / PDF]로 A4 상단에 라벨만 깔끔하게 인쇄·PDF 저장할 수 있습니다.",
  },
  {
    question: "우체국 계약EMS 해외주소 입력 형식은 무엇인가요?",
    answer:
      "계약EMS(Contract EMS) 해외 수취인 주소는 Country(국가), Zipcode(우편번호), City(도시), State(주·도), Line1(주소 1), Line2(주소 2) 여섯 칸으로 나눠 입력합니다. e-Post나 계약 발송 시스템마다 UI 라벨은 조금 다를 수 있지만, 필드 구조는 동일합니다.",
  },
  {
    question: "영문 주소를 EMS 입력 칸에 맞게 자동으로 나눌 수 있나요?",
    answer:
      "Uncle Hangul Overseas Address Converter는 해외 구매자·수취인이 보낸 영문 주소 텍스트를 붙여 넣으면 우편번호·도시·주·도로명을 실시간으로 분석해 EMS·DHL·FedEx 6필드로 분할합니다. 각 필드 옆 복사 버튼으로 우체국·택배사 입력창에 바로 붙여 넣을 수 있습니다.",
  },
  {
    question: "어떤 국가 주소를 지원하나요?",
    answer:
      "150개국 이상을 지원합니다. 37개국은 정밀 모드(국가별 우편번호·도로명·State 규칙)로 Zipcode·City·State·Line1/2를 세밀하게 분할하고, 나머지는 기본 모드(postcode-validator + 공통 휴리스틱)로 최소 Zipcode·Line1을 채웁니다. 드롭다운에서 ★ 표시는 정밀 지원 국가입니다.",
  },
  {
    question: "정밀 지원과 기본 지원의 차이는?",
    answer:
      "정밀 지원(★)은 Rua·Calle·Via 등 국가별 도로명 키워드, 우편번호 prefix State lookup, 수취인/건물명 구분까지 적용합니다. 기본 지원은 우편번호 검증과 공통 주소 분할만 수행하므로 City·State가 비어 있을 수 있습니다. 출고 전 필드를 한 번 더 확인하세요.",
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
      "Pack Optimizer는 K-Packet 분할·EMS 부피무게(체적중량)를 3D로 계산하고, Overseas Address Converter는 해외 수취인 주소를 EMS·DHL·FedEx 입력 규격으로 나눕니다. 박스·요금 최적화와 주소 입력을 함께 쓰면 해외 발송 준비 시간을 줄일 수 있습니다.",
  },
] as const;

const HOWTO_STEPS = [
  {
    name: "국가 선택",
    text: "수취인 주소 국가를 드롭다운에서 선택합니다. 주소 붙여넣기 시 국가가 자동 감지될 수 있습니다.",
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
  {
    name: "배송 라벨 출력",
    text: "파싱 결과 하단 Shipping Label에서 [라벨 텍스트 전체 복사] 또는 [라벨 인쇄 / PDF]로 박스 부착용 라벨을 저장합니다.",
  },
] as const;

function EmsAddressStructuredData({ pageUrl }: { pageUrl: string }) {
  const schemas = [
    buildFaqPageJsonLd(pageUrl, [...FAQ_ITEMS]),
    buildSoftwareApplicationJsonLd({
      name: "Overseas Address Converter — EMS · DHL · FedEx",
      description:
        "영문 해외 주소를 우체국 EMS, DHL, FedEx 입력 필드(Country, Zipcode, City, State, Line1, Line2)로 자동 분할하고 박스 부착용 배송 라벨을 즉시 출력하는 무료 웹 도구.",
      url: pageUrl,
      featureList: [
        "150+ 국가 지원(37개국 정밀 + 기본 fallback)",
        "우편번호 검증(postcode-validator)",
        "주소 붙여넣기 시 국가 자동 감지",
        "Country / Zipcode / State / City / Line1 / Line2 자동 분할",
        "35자 초과분 Line 2 overflow 분할",
        "실물 박스 부착용 Shipping Label 생성",
        "라벨 전체 복사 및 인쇄/PDF 저장",
        "우편번호 prefix 기반 State/County 자동 보완",
        "프론트엔드 전용(주소 데이터 미전송)",
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
  const pageUrl = getOverseasAddressConverterUrl();

  return (
    <section
      className="border-t-[0.5px] border-[#D9D9D3] bg-[#F2F2F0]"
      aria-label="Overseas Address Converter guide and FAQ"
    >
      <EmsAddressStructuredData pageUrl={pageUrl} />
      <div className="mx-auto w-full max-w-[1440px] px-5 section-y md:px-8">
        <article className="mx-auto max-w-2xl">
          <header className="hidden border-b-[0.5px] border-[#D9D9D3] pb-8 md:block">
            <h2
              id="overseas-address-seo-heading"
              className="font-ko text-xl font-black tracking-tight text-foreground md:text-2xl"
            >
              해외 주소 변환기 — EMS · DHL · FedEx
            </h2>
            <p className="font-en mt-1 text-sm text-foreground/50">
              Overseas Address Converter · Contract EMS · Shipping label · 150+
              countries
            </p>
          </header>

          <div className="space-y-4 border-b-[0.5px] border-[#D9D9D3] py-8 text-sm leading-relaxed text-foreground/70 md:text-base">
            <p className="font-ko">
              해외 D2C·마켓플레이스 셀러가 우체국{" "}
              <span className="font-en">Contract EMS</span>(계약EMS),{" "}
              <span className="font-en">DHL</span>,{" "}
              <span className="font-en">FedEx</span> 등 해외 택배로 발송할
              때, 수취인 영문 주소를 시스템 칸에 맞게 나누는 작업은 반복적이고
              오류가 나기 쉽습니다. 이 도구는 붙여 넣은 주소를{" "}
              <strong className="font-normal text-foreground">
                Country, Zipcode, City, State, Line1, Line2
              </strong>
              로 자동 분할하고, 특수문자·악센트를 EMS 입력에 맞게 정리합니다.
            </p>
            <p className="font-en hidden md:block">
              Paste a buyer&apos;s overseas English address and get Korea Post
              EMS, DHL, and FedEx form fields in real time. Supports 150+
              countries (37 with precision rules)—runs entirely in your browser.
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
              Precision countries (★)
            </h3>
            <p className="font-ko mt-2 text-sm text-foreground/60">
              아래 37개국은 국가별 규칙으로 정밀 분할합니다. 그 외 110여 개국은
              기본 모드로 Zipcode·Line1 중심 지원합니다.
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-2 border-[0.5px] border-[#D9D9D3] p-4 sm:grid-cols-3">
              {PRECISION_COUNTRIES.map((country) => (
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
                    <dt className="inline font-bold">State:</dt> NY
                  </div>
                  <div>
                    <dt className="inline font-bold">City:</dt> New York
                  </div>
                  <div>
                    <dt className="inline font-bold">Line1:</dt> 350 Fifth
                    Avenue
                  </div>
                </dl>
              </div>
            </div>
          </div>

          <ToolFaqAccordion items={FAQ_ITEMS} />

          <ToolCrossLinks
            heading="Related tools"
            links={[
              {
                href: getKoreanAddressConverterUrl(),
                title: "Korean Address Converter · inbound to Korea",
                descriptionKo:
                  "해외에서 한국으로 보낼 때 영문 한국 주소를 Province, District, Detail, Hangul로 나눕니다.",
                external: true,
              },
              {
                href: getPackOptimizerUrl(),
                title: "Pack Optimizer · 국제 배송비 3D 계산기",
                descriptionKo:
                  "K-Packet 분할 배송·EMS 부피무게를 3D packing으로 비교해 배송비 절감 시나리오를 확인합니다.",
                external: true,
              },
            ]}
          />
        </article>
      </div>
    </section>
  );
}
