import { ToolCrossLinks } from "@/components/tools/ToolCrossLinks";
import { ToolFaqAccordion } from "@/components/tools/ToolFaqAccordion";
import {
  JsonLd,
  buildFaqPageJsonLd,
  buildHowToJsonLd,
  buildWebApplicationJsonLd,
} from "@/lib/seo/json-ld";
import { getOverseasAddressConverterUrl, getPackOptimizerUrl } from "@/lib/domains";

const FAQ_ITEMS = [
  {
    question: "K-Packet 쪼개기(분할 배송)로 해외 배송비를 줄일 수 있나요?",
    answer:
      "K-Packet은 건당 중량·부피 한도 안에서 요금이 책정됩니다. 주문을 여러 소포로 나누면 각 건이 한도 이하로 들어가는지 3D packing으로 검증할 수 있고, 총 배송비가 단일 대형 소포보다 낮아지는 조합을 비교할 수 있습니다. 실제 분할 가능 여부는 수령국 규정·통관·패킹 재료에 따라 달라집니다.",
  },
  {
    question: "EMS 부피무게(체적중량)는 어떻게 계산되나요?",
    answer:
      "EMS는 실중량과 부피무게 중 큰 값을 청구 중량으로 사용합니다. 부피무게는 (가로×세로×높이 cm)÷6,000 등 우체국·택배사 공식을 적용합니다. 이 계산기는 박스 치수와 적재 방식을 3D로 시뮬레이션해 부피무게 청구 리스크와 여유 공간을 미리 확인하는 데 초점을 둡니다.",
  },
  {
    question: "3D packing 알고리즘은 무엇을 도와주나요?",
    answer:
      "SKU·박스 규격·수량을 입력하면 아이템을 상자 안에 어떻게 쌓을지 공간을 계산합니다. global sellers가 동일 주문을 한 박스 vs 여러 K-Packet vs EMS 대형 박스로 보낼 때 부피·중량·비용 트레이드를 빠르게 비교할 수 있습니다.",
  },
  {
    question: "누가 이 부피무게 계산기를 쓰면 좋나요?",
    answer:
      "한국에서 해외로 D2C·마켓플레이스 주문을 처리하는 셀러, 3PL·소규모 물류 담당자, K-Packet·EMS 요금표를 매번 손으로 계산하기 번거로운 팀에게 적합합니다. 최종 요금은 우체국·택배사 시스템과 시점에 따라 달라질 수 있습니다.",
  },
  {
    question: "계산 결과는 공식 우체국 견적과 동일한가요?",
    answer:
      "이 도구는 배송비 절감 시나리오를 탐색하는 참고용입니다. 통관·할증·연료할증·수령국 제한은 반영되지 않을 수 있으므로, 출고 전 우체국·EMS 공식 견적과 대조하세요.",
  },
  {
    question: "EMS 발송 전 해외 주소 입력은 어떻게 준비하나요?",
    answer:
      "계약EMS 발송 시 수취인 주소는 Country, Zipcode, City, State, Line1, Line2 여섯 필드로 나눠 입력합니다. Uncle Hangul Overseas Address Converter(tools.unclehangul.com/overseas-address-converter)에서 영문 주소를 붙여 넣으면 EMS·DHL·FedEx 필드별로 자동 분할·복사할 수 있습니다.",
  },
] as const;

const HOWTO_STEPS = [
  {
    name: "SKU·박스 정보 입력",
    text: "발송할 상품 SKU, 수량, 박스(카톤) 규격을 Pack Optimizer 위젯에 입력합니다.",
  },
  {
    name: "3D 적재 시뮬레이션 확인",
    text: "아이템이 박스 안에 어떻게 배치되는지 3D packing 결과를 확인합니다.",
  },
  {
    name: "K-Packet vs EMS 비교",
    text: "한 박스 EMS vs K-Packet 분할 등 시나리오별 부피·중량·비용 트레이드를 비교합니다.",
  },
  {
    name: "발송 전 견적 대조",
    text: "선택한 전략을 우체국·EMS 공식 견적과 대조한 뒤, 해외 주소는 Overseas Address Converter로 입력 필드를 준비합니다.",
  },
] as const;

function PackOptimizerStructuredData({ pageUrl }: { pageUrl: string }) {
  const schemas = [
    buildFaqPageJsonLd(pageUrl, [...FAQ_ITEMS]),
    buildWebApplicationJsonLd({
      name: "국제 배송비 최적화 3D 계산기 (Pack Optimizer)",
      description:
        "K-Packet 분할 배송(쪼개기)과 EMS 부피무게(체적중량) 청구 리스크를 3D packing 알고리즘으로 시뮬레이션하는 무료 웹 도구.",
      url: pageUrl,
      featureList: [
        "3D carton packing simulation",
        "K-Packet split-shipment scenario comparison",
        "EMS volumetric weight risk preview",
        "SKU and box dimension input",
        "Global seller logistics planning",
      ],
    }),
    buildHowToJsonLd(
      "K-Packet 분할·EMS 부피무게로 해외 배송비 절감하기",
      "3D packing 계산기로 K-Packet 쪼개기와 EMS 체적중량 리스크를 비교하는 절차.",
      [...HOWTO_STEPS],
    ),
  ];

  return <JsonLd data={schemas} />;
}

export function PackOptimizerSeoContent() {
  const appUrl = getPackOptimizerUrl();

  return (
    <section
      className="border-t-[0.5px] border-[#D9D9D3] bg-[#F2F2F0]"
      aria-label="Pack Optimizer guide and FAQ"
    >
      <PackOptimizerStructuredData pageUrl={appUrl} />
      <div className="mx-auto w-full max-w-[1440px] px-5 section-y md:px-8">
        <article className="mx-auto max-w-2xl">
          <header className="hidden border-b-[0.5px] border-[#D9D9D3] pb-8 md:block">
            <h2
              id="pack-optimizer-seo-heading"
              className="font-ko text-xl font-black tracking-tight text-foreground md:text-2xl"
            >
              국제 배송비 최적화 3D 계산기
            </h2>
            <p className="font-en mt-1 text-sm text-foreground/50">
              K-Packet · EMS · 3D packing
            </p>
          </header>

          <div className="space-y-4 border-b-[0.5px] border-[#D9D9D3] py-8 text-sm leading-relaxed text-foreground/70 md:text-base">
            <p className="font-ko">
              해외 배송비 절감은 “얼마나 무겁게” 보내느냐보다 “어떻게
              담아 보내느냐”에 달려 있습니다. 우체국{" "}
              <span className="font-en">K-Packet</span> 분할 배송(쪼개기)과{" "}
              <span className="font-en">EMS</span> 부피무게(체적중량) 청구를
              동시에 고려하면, 한 번에 큰 박스를 보내는 것보다 비용·리스크
              면에서 유리한 물류 전략이 드러나는 경우가 많습니다.
            </p>
            <p className="font-en hidden md:block">
              This 3D packing calculator simulates how SKUs fit inside cartons so
              global sellers can compare split K-Packet shipments against a
              single EMS box before you tape the first carton. Use it as a
              volumetric-weight planning layer on top of your rate cards—not a
              substitute for carrier quotes.
            </p>
          </div>

          <ToolFaqAccordion items={FAQ_ITEMS} />

          <ToolCrossLinks
            heading="Related tools"
            links={[
              {
                href: getOverseasAddressConverterUrl(),
                title: "Overseas Address Converter · EMS · DHL · FedEx",
                descriptionKo:
                  "해외 영문 주소를 계약EMS Country, Zipcode, City, State, Line1, Line2 필드로 실시간 분할합니다.",
                external: true,
              },
            ]}
          />
        </article>
      </div>
    </section>
  );
}
