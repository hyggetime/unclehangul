export type KrAddressFields = {
  line1: string;
  line2: string;
  city: string;
  state: string;
  zip: string;
};

export type KrAddressSelection = KrAddressFields & {
  koreanBase: string;
  englishFull: string;
  roadNameEn: string;
  buildingNumber: string;
};

export type JusoSearchHit = {
  id: string;
  zip: string;
  line1: string;
  city: string;
  state: string;
  koreanBase: string;
  englishFull: string;
  roadNameEn: string;
  buildingNumber: string;
  buildingName?: string;
};

export type JusoSearchResponse = {
  ok: boolean;
  page: number;
  countPerPage: number;
  totalCount: number;
  hits: JusoSearchHit[];
  error?: string;
};

export type InboundLabelInput = {
  name: string;
  phone: string;
  fields: KrAddressFields;
  koreanBase: string;
  detailKo: string;
};
