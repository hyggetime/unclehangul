import { Solar } from "lunar-javascript";

export type BirthDateParts = {
  year: number;
  month: number;
  day: number;
};

export type SolarDateLabel = {
  year: number;
  month: number;
  day: number;
  /** 양력 1990년 5월 15일 */
  labelKo: string;
};

export type LunarDateLabel = {
  year: number;
  month: number;
  day: number;
  isLeapMonth: boolean;
  /** 음력 1990년 4월 21일 (윤달이면 윤 표기) */
  labelKo: string;
};

export function daysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

export function isValidBirthDate(parts: BirthDateParts): boolean {
  const { year, month, day } = parts;
  if (year < 1900 || year > 2100) return false;
  if (month < 1 || month > 12) return false;
  if (day < 1 || day > daysInMonth(year, month)) return false;
  return true;
}

export function formatSolarDateKo(parts: BirthDateParts): SolarDateLabel {
  return {
    ...parts,
    labelKo: `양력 ${parts.year}년 ${parts.month}월 ${parts.day}일`,
  };
}

export function solarToLunar(parts: BirthDateParts): LunarDateLabel | null {
  if (!isValidBirthDate(parts)) return null;

  try {
    const lunar = Solar.fromYmd(parts.year, parts.month, parts.day).getLunar();
    const rawMonth = lunar.getMonth();
    const isLeapMonth = rawMonth < 0;
    const month = Math.abs(rawMonth);
    const day = lunar.getDay();
    const year = lunar.getYear();
    const leapPrefix = isLeapMonth ? "윤" : "";

    return {
      year,
      month,
      day,
      isLeapMonth,
      labelKo: `음력 ${year}년 ${leapPrefix}${month}월 ${day}일`,
    };
  } catch {
    return null;
  }
}
