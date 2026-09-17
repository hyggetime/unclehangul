# EMS Address Converter - Country Expansion Work Plan

## Executive Summary

**Current State**: 10 countries with precise parsing (GB, FR, NL, BE, SE, DE, US, JP, CA, AU)  
**Target State**: 50+ countries with mixed-level support (precise for main countries, basic fallback for others)  
**Strategy**: Phased rollout prioritizing high-demand countries, with tiered implementation depth

---

## Phase 0: Infrastructure Preparation (현재 완료)

### ✅ Completed Tasks
- [x] Core modular architecture (`sanitizer`, `rules`, `parser`, `adapter`)
- [x] 10 precise countries with full regex + state lookup
- [x] SEO/AEO optimization (JSON-LD, FAQPage, SoftwareApplication)
- [x] Shipping label generation feature
- [x] Address Line 1/2 overflow logic (35-char limit)

---

## Phase 1: Quick Wins - Tier A Countries (Easy)
**Estimated Effort**: 2-3 days  
**Target**: +12 countries

### Countries & Rationale

| Country | ISO | Priority | Reason |
|---------|-----|----------|--------|
| **Italy** | IT | High | EU 주요국, 영문 주소 체계 유사 |
| **Spain** | ES | High | EU 주요국, 영문 주소 체계 유사 |
| **Portugal** | PT | Medium | EU, 간단한 5-digit postcode |
| **Switzerland** | CH | High | 4-digit postcode, 명확한 체계 |
| **Austria** | AT | Medium | 4-digit postcode, 독일어권 |
| **Denmark** | DK | Medium | 4-digit postcode, 명확한 체계 |
| **Norway** | NO | Medium | 4-digit postcode, 명확한 체계 |
| **Finland** | FI | Medium | 5-digit postcode, 명확한 체계 |
| **Poland** | PL | Medium | 5-digit postcode XX-XXX |
| **Czech Republic** | CZ | Medium | 5-digit postcode XXX XX |
| **Ireland** | IE | High | 영국과 유사한 Eircode 체계 |
| **New Zealand** | NZ | High | 4-digit postcode, 영어권 |

### Implementation Tasks per Country

1. **Meta Info** (5분)
   - `iso`, `emsName`, `nameEn`, `nameKo` 추가
   - `postcode-validator` 지원 확인

2. **Postcode Extract/Validate** (10분)
   - `extract`: regex for finding postcode in text
   - `validate`: regex for final validation
   - `formatPostalCode`: 공백/하이픈 정규화

3. **Street Patterns** (15분)
   - 해당 언어권 도로명 키워드 리스트
   - 예: IT → via, corso, piazza, viale / ES → calle, avenida, plaza

4. **City/State Recognition** (20분)
   - `cityLine`: 도시명 식별 패턴
   - `statePattern`: (필요 시) 주/도/지역 약어

5. **State Lookup** (선택, 30분)
   - 우편번호 prefix → State 매핑
   - 예: IT 00100-00199 → LAZIO, 20100-20199 → LOMBARDIA

6. **Smoke Tests** (10분)
   - 최소 2개 실제 주소로 파싱 테스트
   - Line1/Line2 분할, state lookup 검증

**Phase 1 Total**: ~90분/국가 × 12개국 = **18시간 (2.25일)**

---

## Phase 2: Medium Effort - Tier B Countries
**Estimated Effort**: 4-5 days  
**Target**: +15 countries

### Countries & Rationale

| Country | ISO | Priority | Reason | Challenge |
|---------|-----|----------|--------|-----------|
| **South Korea** | KR | High | 국내 발송자 편의 | 한글 주소 영문 변환 필요 |
| **China** | CN | High | 배송 물량 다수 | 병음 표기 불규칙 |
| **Taiwan** | TW | High | 아시아권 주요 배송지 | 병음/중문 혼재 |
| **Singapore** | SG | High | 영어권, 명확한 postcode | Unit/Block 표기 다양 |
| **Hong Kong** | HK | Medium | District 기반 주소 | Postcode 없음 (특수처리) |
| **Thailand** | TH | Medium | 동남아 주요국 | 영문 표기 불규칙 |
| **Malaysia** | MY | Medium | 5-digit postcode | State 식별 중요 |
| **India** | IN | High | 6-digit PIN code | State 28개, 다양한 표기 |
| **Brazil** | BR | Medium | 남미 최대 시장 | 8-digit CEP, 긴 주소명 |
| **Mexico** | MX | Medium | 5-digit CP | State 32개 |
| **Argentina** | AR | Low | 4-digit + letter code | 복잡한 주소 체계 |
| **Russia** | RU | Medium | 6-digit index | 키릴 문자 변환 필요 |
| **Turkey** | TR | Medium | 5-digit postcode | 터키어 특수문자 처리 |
| **Greece** | GR | Medium | 5-digit TK | 그리스어 영문 변환 |
| **Israel** | IL | Medium | 7-digit postcode | 히브리어 처리 |

### Additional Tasks per Country (on top of Tier A)

7. **Multi-script Handling** (+30분)
   - Pinyin, Hangeul romanization 처리
   - Cyrillic → Latin transliteration

8. **Address Format Variations** (+20분)
   - Unit/Block/Floor 다양한 표기
   - Building name 위치 불규칙 처리

9. **State/Region Mapping** (+40분)
   - 복잡한 행정구역 (인도 28개 주, 중국 34개 성)
   - Postcode prefix 매핑 테이블 구축

10. **Extended Testing** (+20분)
    - 최소 5개 다양한 케이스 테스트
    - Edge case 검증 (우편번호 없음, 불완전 주소)

**Phase 2 Total**: ~2시간/국가 × 15개국 = **30시간 (3.75일)**, 실제 4-5일 (QA 포함)

---

## Phase 3: Complex Cases - Tier C Countries
**Estimated Effort**: 5-7 days  
**Target**: +10 countries (선택적)

### Countries & Rationale

| Country | ISO | Priority | Challenge |
|---------|-----|----------|-----------|
| **Japan (Enhanced)** | JP | High | 현재 기본 지원, 정밀도 향상 필요. 7-digit 우편번호 세부 매핑 |
| **Vietnam** | VN | Medium | Postcode 6-digit, District/Ward 체계 복잡 |
| **Philippines** | PH | Medium | 4-digit ZIP, Metro Manila 복잡 |
| **Indonesia** | ID | Medium | 5-digit, 34개 province |
| **South Africa** | ZA | Medium | 4-digit postcode, 복잡한 township 주소 |
| **Egypt** | EG | Low | 5-digit, 아랍어 변환 |
| **Saudi Arabia** | SA | Low | 5-digit + 4-digit, 아랍어 |
| **UAE** | AE | Medium | Emirate 기반, postcode 없거나 신규 |
| **Pakistan** | PK | Low | 5-digit, 우르두어 변환 |
| **Chile** | CL | Low | 7-digit, 복잡한 comuna 체계 |

### High-Complexity Tasks

11. **Deep Linguistic Processing** (+60분)
    - RTL (Right-to-Left) 언어 처리
    - 복잡한 transliteration 규칙

12. **Special Address Systems** (+40분)
    - PO Box only 국가
    - Postcode 없는 국가 (HK, IE 일부 지역)

13. **Comprehensive State Lookup** (+90분)
    - 수십 개 행정구역 매핑
    - 다층 행정 체계 (District/Ward/Subdistrict)

14. **Extensive QA** (+60분)
    - 10+ 실제 케이스 테스트
    - 사용자 피드백 반영 사이클

**Phase 3 Total**: ~4시간/국가 × 10개국 = **40시간 (5일)**, 실제 6-7일 (deep QA)

---

## Phase 4: Long Tail - Basic Fallback (나머지 모든 국가)
**Estimated Effort**: 1-2 days  
**Target**: +100 countries (generic parsing)

### Implementation Strategy

- **Generic Parser** (`rules.js`에 `FALLBACK_RULE` 추가)
  - `postcode-validator` 라이브러리의 validation만 사용
  - Format 정규화 없이 원문 보존
  - Street/City/State 구분 없이 Line1/Line2에 순차 배치
  - SEO 페이지에 "기본 모드" 안내 문구 추가

### Tasks

1. **Fallback Rule Implementation** (4시간)
   - `postcode-validator` 전체 지원 국가 리스트 매핑
   - Generic `extract`: 숫자+문자 조합 추출
   - State lookup 생략

2. **UI/UX Update** (2시간)
   - Country dropdown에 전체 국가 추가
   - Tooltip: "정밀 분석 지원 국가" vs "기본 분석 국가" 구분 표시

3. **SEO Content Update** (2시간)
   - 지원 국가 목록 페이지 추가
   - FAQ: "내 국가가 정밀 분석을 지원하지 않는다면?"

**Phase 4 Total**: **8시간 (1일)**

---

## Phase 5: Quality Assurance & Optimization
**Estimated Effort**: 3-4 days

### Tasks

1. **Automated Testing Suite** (1일)
   - `_smoke.mjs` 확장: 각 국가별 2-3개 케이스
   - CI/CD integration (lint + test on commit)

2. **Performance Optimization** (0.5일)
   - 대규모 COUNTRY_RULES 객체 lazy loading
   - State lookup 테이블 압축 (prefix tree 등)

3. **User Feedback Loop** (1일)
   - 사용자 제보 주소 파싱 실패 케이스 수집
   - 국가별 파싱 정확도 모니터링

4. **Documentation** (0.5일)
   - `README.md` 업데이트: 지원 국가 목록
   - 개발자 가이드: 신규 국가 추가 방법

5. **SEO/AEO Re-optimization** (1일)
   - `llms.txt` 업데이트: 확장된 국가 리스트
   - JSON-LD: `serviceArea` 추가 (전 세계 50+ 국가)
   - Meta description 업데이트

**Phase 5 Total**: **3-4일**

---

## Total Timeline & Resource Estimation

| Phase | Duration | Countries Added | Cumulative Total |
|-------|----------|-----------------|------------------|
| Phase 0 | Complete | 10 (precise) | 10 |
| Phase 1 | 2-3 days | +12 (precise) | 22 |
| Phase 2 | 4-5 days | +15 (precise) | 37 |
| Phase 3 | 5-7 days (optional) | +10 (precise) | 47 |
| Phase 4 | 1-2 days | +100 (basic) | 147 |
| Phase 5 | 3-4 days | - (QA) | 147 |

**Total Effort**: 15-21 working days (~3-4 weeks)

---

## Prioritized Execution Plan (Recommended)

### Sprint 1 (Week 1): Core Expansion
- **Day 1-3**: Phase 1 완료 (Tier A 12개국)
- **Day 4-5**: Phase 2 시작 (High priority 5개국: KR, CN, TW, SG, IN)

### Sprint 2 (Week 2): Asian Markets
- **Day 6-10**: Phase 2 계속 (나머지 10개국)

### Sprint 3 (Week 3): Cleanup & Scale
- **Day 11-12**: Phase 4 완료 (Basic fallback 100+ 국가)
- **Day 13-15**: Phase 5 시작 (Testing, SEO, Documentation)

### Sprint 4 (Week 4): Optional Deep Dive
- **Day 16-20**: Phase 3 (Tier C 복잡한 국가들, 선택적)
- **Day 21**: Phase 5 완료 (Final QA, deployment)

---

## Risk Mitigation

### Technical Risks
1. **Postcode-validator 라이브러리 제약**
   - Mitigation: Fallback regex 병행 사용, 직접 validation 구현

2. **State Lookup 데이터 정확성**
   - Mitigation: 공식 우편청 데이터 참조, 사용자 피드백 반영

3. **복잡한 주소 체계 (일본, 중국 등)**
   - Mitigation: Phase 3로 분리, 충분한 시간 확보

### Resource Risks
1. **시간 부족**
   - Mitigation: Phase 3 optional 처리, Phase 1-2-4 우선 실행

2. **데이터 수집 어려움**
   - Mitigation: 오픈소스 데이터셋 활용 (GeoNames, OpenAddresses)

---

## Success Metrics

### Quantitative
- **Coverage**: 147개국 지원 (precise 37개 + basic 110개)
- **Accuracy**: Precise 국가 파싱 성공률 >90%
- **Performance**: 평균 파싱 시간 <50ms

### Qualitative
- **User Feedback**: 주요 배송 국가 커버리지 만족도
- **SEO Impact**: "EMS 주소 변환" 검색 순위 상승
- **AEO Impact**: AI 답변 엔진 citation 증가

---

## Next Steps

1. **Immediate Action**: Phase 1 착수 (Tier A 12개국)
2. **Data Gathering**: OpenAddresses, GeoNames API 활용 준비
3. **Stakeholder Review**: 우선순위 국가 리스트 최종 확인
4. **CI/CD Setup**: Automated testing 환경 구축

---

**Document Version**: 1.0  
**Last Updated**: 2026-09-17  
**Owner**: UncleHangul Development Team
