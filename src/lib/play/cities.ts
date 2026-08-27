export type CityEntry = {
  en: string;
  hangul: string;
  romanization: string;
};

export const CITIES: readonly CityEntry[] = [
  { en: "Seoul", hangul: "서울", romanization: "Seoul" },
  { en: "Busan", hangul: "부산", romanization: "Busan" },
  { en: "Incheon", hangul: "인천", romanization: "Incheon" },
  { en: "Daegu", hangul: "대구", romanization: "Daegu" },
  { en: "Tokyo", hangul: "도쿄", romanization: "Tokyo" },
  { en: "Paris", hangul: "파리", romanization: "Paris" },
  { en: "London", hangul: "런던", romanization: "London" },
  { en: "New York", hangul: "뉴욕", romanization: "Nyuyok" },
  { en: "Los Angeles", hangul: "로스앤젤레스", romanization: "Rosseu-aenjelloseu" },
  { en: "Berlin", hangul: "베를린", romanization: "Bereullin" },
  { en: "Sydney", hangul: "시드니", romanization: "Sideuni" },
  { en: "Bangkok", hangul: "방콕", romanization: "Bangkok" },
] as const;

export function lookupCity(query: string): CityEntry | null {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return null;

  const exact = CITIES.find((city) => city.en.toLowerCase() === normalized);
  if (exact) return exact;

  return (
    CITIES.find((city) => city.en.toLowerCase().startsWith(normalized)) ?? null
  );
}
