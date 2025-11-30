# HisLight

은퇴 선교사와 목회자를 위한 생활정보 플랫폼

> "어두운 밤바다를 비추는 등대처럼, 은퇴 이후의 길을 밝히는 빛"

## 프로젝트 소개

HisLight는 50세 이상 은퇴 선교사와 목회자를 위한 생활정보 리소스 플랫폼입니다. 주거, 일상생활 등 다양한 카테고리의 정보를 체계적으로 정리하여 제공합니다.

### 핵심 컨셉

**등대 (Lighthouse)**
- 빛 = 희망, 인도, 방향
- 황색(등대 빔) + 네이비(밤바다)의 색상 시스템

**시편 71:18**
```
오! 하나님,
내가 늙고 머리가 희어졌다고
나를 버리지 마소서
내가 늙어 죽을 때까지
내 후손에게
주의 크신 능력을 전하겠습니다.
```

## 주요 기능

- **카테고리별 리소스 브라우징**: 주거, 일상생활 등 체계적으로 분류된 정보
- **고급 검색 및 필터링**: 서브카테고리 + 태그 기반 다단계 필터링
- **반응형 디자인**: PC 우선, 모바일 지원
- **접근성 최적화**:
  - 큰 폰트 (16px+ 본문, 24px+ 제목)
  - 고대비 (WCAG AAA 목표)
  - 넓은 클릭/탭 영역
  - 명확한 타이포그래피

## 기술 스택

### Core
- **Next.js 16** - App Router, React Server Components
- **React 19** - 최신 React 기능
- **TypeScript** - 타입 안정성

### Styling
- **Tailwind CSS v4** - 유틸리티 우선 CSS 프레임워크
- **shadcn/ui** - 재사용 가능한 컴포넌트 시스템
- **lucide-react** - 아이콘 라이브러리

### Data
- JSON 기반 데이터 구조
- 카테고리 → 서브카테고리 → 리소스 → 태그 계층 구조

## 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 빌드

```bash
npm run build
npm start
```

### 린팅

```bash
npm run lint
```

## 프로젝트 구조

```
hislight/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # 루트 레이아웃
│   ├── page.tsx            # 홈페이지 (카테고리 선택)
│   ├── housing/            # 주거 카테고리 페이지
│   ├── life/               # 일상생활 카테고리 페이지
│   └── components-demo/    # 컴포넌트 쇼케이스 (개발용)
├── components/             # React 컴포넌트
│   ├── ui/                 # shadcn/ui 컴포넌트
│   ├── common/             # 공통 컴포넌트
│   │   ├── PageContainer.tsx
│   │   ├── CategoryCard.tsx
│   │   └── UnicornBackground.tsx
│   ├── layout/             # 레이아웃 컴포넌트
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── resource/           # 리소스 브라우징 컴포넌트
│   │   ├── ResourcePageLayout.tsx
│   │   ├── SearchBar.tsx
│   │   ├── FilterSidebar.tsx
│   │   ├── SubcategoryFilter.tsx
│   │   ├── TagFilter.tsx
│   │   └── ResourceCard.tsx
│   └── icons/              # 커스텀 아이콘
│       └── LighthouseIcon.tsx
├── lib/                    # 유틸리티 함수
│   ├── utils.ts            # cn() 등 헬퍼 함수
│   └── types.ts            # TypeScript 타입 정의
├── data/                   # JSON 데이터
│   ├── categories.json     # 2개 대분류
│   ├── subcategories.json  # 9개 중분류
│   ├── resources.json      # 20개 리소스
│   ├── tags.json           # 40+ 태그
│   └── DB_README.md        # 데이터 구조 문서
└── public/                 # 정적 파일
    └── logo.svg            # HisLight 로고
```

## 데이터 구조

HisLight는 계층적 JSON 데이터 구조를 사용합니다:

```
Category (대분류)
 └─ Subcategory (중분류)
     └─ Resource (리소스)
         └─ Tags (태그)
```

**예시:**
```
주거 (Category)
 └─ 금융지원 (Subcategory)
     └─ 버팀목 전세자금대출 (Resource)
         └─ #전세 #대출 #무주택 (Tags)
```

자세한 내용은 `data/DB_README.md`를 참조하세요.

## 개발 가이드

### 컴포넌트 개발

1. 적절한 디렉토리에 컴포넌트 구현:
   - `components/common/`: 범용 재사용 컴포넌트
   - `components/layout/`: 레이아웃 컴포넌트
   - `components/resource/`: 리소스 관련 컴포넌트

2. `/components-demo` 페이지에 추가하여 테스트

3. Server Component 우선 사용 (필요시에만 Client Component)

### 컴포넌트 데모 페이지

- URL: `http://localhost:3000/components-demo`
- 모든 구현된 컴포넌트의 시각적 쇼케이스
- 새 컴포넌트 구현 시 반드시 데모 페이지에 추가

### 스타일링 규칙

- Tailwind CSS 유틸리티 클래스 사용
- 조건부 클래스명은 `cn()` 유틸리티 사용
- 색상 시스템:
  - Primary (Yellow): `oklch(0.7 0.18 90)`
  - Secondary (Navy): `oklch(0.25 0.08 250)`

### Path Aliases

tsconfig.json에 설정된 alias:
- `@/*` - 루트 디렉토리
- `@/components` - 컴포넌트
- `@/lib/utils` - 유틸리티 함수
- `@/hooks` - 커스텀 훅

## MVP 범위 (Phase 1)

- 2개 카테고리: 주거, 일상생활
- 9개 서브카테고리
- 20개 리소스
- 40+ 필터링 태그
- 검색 + 다단계 필터링
- Vercel Templates 스타일 UI (SearchBar + Sidebar + Grid)

## 향후 계획

- 관리자 패널 (링크 관리)
- 카테고리 확장
- 사용자 피드백 시스템
- 추가 필터링 옵션

## 라이선스

MIT License

## 문의

프로젝트 관련 문의사항은 이슈를 통해 남겨주세요.

---

Built with Next.js 16, React 19, and Tailwind CSS v4
