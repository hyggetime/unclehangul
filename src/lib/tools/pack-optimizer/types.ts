export type DestinationCode =
  | "IT"
  | "FR"
  | "DE"
  | "ES"
  | "GB"
  | "US"
  | "JP"
  | "CN"
  | "AU"
  | "SG";

export type OptimizeRequest = {
  product: {
    width: number;
    length: number;
    height: number;
    weight: number;
  };
  quantity: number;
  destination: DestinationCode;
  packingMargin: number;
};

export type BoxSize = { w: number; l: number; h: number };

export type BoxDetail = {
  itemsPerBox: number;
  estimatedBoxSize: BoxSize;
  customBoxSize: BoxSize;
  totalThreeSides: number;
  actualWeight: number;
  volumeWeight: number;
  billableWeight: number;
  cost: number;
  recommendedPostBox: string;
  postBoxNotice?: string;
};

export type OptimizeResponse = {
  status: "success" | "error";
  errorMessage?: string;
  recommendation: "SPLIT_K_PACKET" | "BUNDLE_EMS" | "NONE";
  potentialSavings: number;
  strategies: {
    kPacketSplit: {
      available: boolean;
      boxCount: number;
      details: BoxDetail[];
      totalCost: number;
    };
    emsBundle: {
      available: boolean;
      boxCount: number;
      details: BoxDetail;
      totalCost: number;
    };
  };
};

export const DESTINATIONS: { code: DestinationCode; labelKo: string; labelEn: string }[] =
  [
    { code: "IT", labelKo: "이탈리아 (IT)", labelEn: "Italy (IT)" },
    { code: "FR", labelKo: "프랑스 (FR)", labelEn: "France (FR)" },
    { code: "DE", labelKo: "독일 (DE)", labelEn: "Germany (DE)" },
    { code: "ES", labelKo: "스페인 (ES)", labelEn: "Spain (ES)" },
    { code: "GB", labelKo: "영국 (GB)", labelEn: "United Kingdom (GB)" },
    { code: "US", labelKo: "미국 (US)", labelEn: "United States (US)" },
    { code: "JP", labelKo: "일본 (JP)", labelEn: "Japan (JP)" },
    { code: "CN", labelKo: "중국 (CN)", labelEn: "China (CN)" },
    { code: "AU", labelKo: "호주 (AU)", labelEn: "Australia (AU)" },
    { code: "SG", labelKo: "싱가포르 (SG)", labelEn: "Singapore (SG)" },
  ];

export function emptyOptimizeResponse(message?: string): OptimizeResponse {
  return {
    status: "error",
    errorMessage: message ?? "계산 결과를 불러오는 중입니다.",
    recommendation: "NONE",
    potentialSavings: 0,
    strategies: {
      kPacketSplit: {
        available: false,
        boxCount: 0,
        details: [],
        totalCost: 0,
      },
      emsBundle: {
        available: false,
        boxCount: 0,
        details: {
          itemsPerBox: 0,
          estimatedBoxSize: { w: 0, l: 0, h: 0 },
          customBoxSize: { w: 0, l: 0, h: 0 },
          totalThreeSides: 0,
          actualWeight: 0,
          volumeWeight: 0,
          billableWeight: 0,
          cost: 0,
          recommendedPostBox: "—",
        },
        totalCost: 0,
      },
    },
  };
}

export function formatKrw(amount: number): string {
  return `₩${Math.round(amount).toLocaleString("ko-KR")}`;
}

export function formatSize(size: BoxSize): string {
  return `${size.w}×${size.l}×${size.h} cm`;
}

export function formatWeight(grams: number): string {
  if (grams >= 1000) {
    const kg = grams / 1000;
    return `${kg.toFixed(grams % 1000 !== 0 ? 2 : 0)} kg`;
  }
  return `${Math.round(grams)} g`;
}
