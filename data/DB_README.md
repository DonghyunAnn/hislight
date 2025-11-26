# HisLight 데이터 구조

## 개요

은퇴한 선교사와 목회자를 위한 주거 및 생활 정보 제공 서비스의 데이터 구조입니다.
JSON 형식으로 관리되며, 3개의 주요 파일로 구성됩니다.

## 파일 구조

```
data/
├── categories.json      # 대분류 (주거, 생활)
├── subcategories.json   # 중분류 (임대·공공 주택, 내집마련·분양 등)
└── resources.json       # 개별 리소스 (URL + 설명)
```

## 데이터 계층 구조

```
대분류 (Category)
 └─ 중분류 (Subcategory)
     └─ 리소스 (Resource)
```

### 예시

```
주거 (Category)
 └─ 자금·대출 (Subcategory)
     └─ 버팀목 전세자금대출 (Resource)
```

---

## 1. categories.json (대분류)

최상위 카테고리 정의

### 구조

```json
{
  "id": "housing",              // 고유 ID
  "name": "주거",               // 화면 표시명
  "description": "주거 관련 정보"
}
```

### 현재 데이터

- `housing`: 주거
- `life`: 생활

---

## 2. subcategories.json (중분류)

각 대분류의 하위 카테고리

### 구조

```json
{
  "id": "housing-rental-public",    // 고유 ID
  "categoryId": "housing",           // 연결된 대분류 ID
  "name": "임대·공공 주택",          // 화면 표시명
  "description": "임대·공공 주택 관련 서비스"
}
```

### 현재 데이터

**주거 (housing)** - 5개
- `housing-rental-public`: 임대·공공 주택
- `housing-ownership-sales`: 내집마련·분양
- `housing-finance-loan`: 자금·대출
- `housing-welfare-service`: 복지·창구
- `housing-rights-mediation`: 권리·조정

**생활 (life)** - 4개
- `life-basic-welfare`: 기초 생활 지원 및 복지 혜택
- `life-admin-civil`: 행정·민원
- `life-health-medical`: 건강·의료
- `life-consulting-community`: 컨설팅과 커뮤니티

---

## 3. resources.json (리소스)

실제 서비스 링크와 정보

### 구조

```json
{
  "id": "res-001",                         // 고유 ID
  "subcategoryId": "housing-welfare-service", // 연결된 중분류 ID
  "title": "청년, 신혼부부 주거지원",         // 제목 (20자 이내 권장)
  "description": "지역별 청년·신혼부부를...", // 설명 (100자 내외)
  "url": "https://www.myhome.go.kr/..."     // 서비스 URL
}
```

### Title 작성 규칙

- 20자 이내 권장
- 구체적인 서비스명 사용
- 사용자가 이해하기 쉬운 명확한 이름

### Description 작성 규칙

**2-3문장 구조**:
1. 서비스의 주요 기능과 목적
2. 누가, 어떻게 활용할 수 있는지

**예시**:
```
지역별 청년·신혼부부를 주거복지현황을 한눈에 확인할 수 있습니다.
```

### 현재 데이터

- 주거 관련: 107개
- 생활 관련: 34개
- **총 141개 리소스**

---

## 사용 방법

### TypeScript에서 불러오기

```typescript
import categories from '@/data/categories.json'
import subcategories from '@/data/subcategories.json'
import resources from '@/data/resources.json'

// 특정 카테고리의 중분류 가져오기
const housingSubcategories = subcategories.filter(
  s => s.categoryId === 'housing'
)

// 특정 중분류의 리소스 가져오기
const rentalResources = resources.filter(
  r => r.subcategoryId === 'housing-rental-public'
)
```

### Next.js에서 사용 예시

```typescript
// app/housing/page.tsx
import ResourcePageLayout from '@/components/resource/ResourcePageLayout'

export default function HousingPage() {
  return <ResourcePageLayout categoryId="housing" />
}
```

---

## 데이터 추가 가이드

### 1. 새 리소스 추가

1. `resources.json`에 새 항목 추가
2. `id`는 순차적으로 증가 (res-142, res-143...)
3. `subcategoryId`는 기존 중분류 ID 사용
4. `title`과 `description` 작성 규칙 준수
5. 정확한 URL 확인

```json
{
  "id": "res-142",
  "subcategoryId": "housing-finance-loan",
  "title": "서비스명",
  "description": "서비스 설명...",
  "url": "https://example.com"
}
```

### 2. 새 중분류 추가

1. `subcategories.json`에 새 항목 추가
2. `id` 형식: `{categoryId}-{name}` (예: `housing-newservice`)
3. 적절한 `categoryId` 연결

```json
{
  "id": "housing-newservice",
  "categoryId": "housing",
  "name": "새로운 서비스",
  "description": "새로운 서비스 설명"
}
```

### 3. 새 대분류 추가

1. `categories.json`에 새 항목 추가
2. `subcategories.json`에 하위 중분류 추가
3. `resources.json`에 리소스 추가

---

## 데이터 검증

### 체크리스트

- [ ] 모든 `subcategoryId`가 `subcategories.json`에 존재하는가?
- [ ] 모든 `categoryId`가 `categories.json`에 존재하는가?
- [ ] `title`이 명확하고 간결한가?
- [ ] `description`이 서비스를 정확히 설명하는가?
- [ ] URL이 정확하게 작동하는가?
- [ ] ID가 중복되지 않는가?

---

## 통계 (현재)

- **대분류**: 2개 (주거, 생활)
- **중분류**: 9개 (주거 5개, 생활 4개)
- **리소스**: 141개 (주거 107개, 생활 34개)

---

## 유지보수 가이드

### 정기 점검 사항

1. **URL 유효성 검증**
   - 리소스 URL이 여전히 유효한지 확인
   - 정부 사이트 개편 시 URL 업데이트

2. **데이터 최신성 유지**
   - 신규 정책/서비스 추가
   - 종료된 서비스 제거
   - 정보 업데이트

3. **ID 관리**
   - 삭제된 리소스의 ID 재사용 금지
   - 순차적 ID 유지

---

## 타입 정의

TypeScript 타입은 `lib/types.ts`에 정의되어 있습니다:

```typescript
export interface Category {
  id: string
  name: string
  description: string
}

export interface Subcategory {
  id: string
  categoryId: string
  name: string
  description: string
}

export interface Resource {
  id: string
  subcategoryId: string
  title: string
  description: string
  url: string
}
```

---

## 라이선스

내부 프로젝트용
