# FilterSidebar.md

## 컴포넌트 개요

**목적**: SubcategoryFilter와 TagFilter를 담는 좌측 사이드바 컨테이너

**위치**: `components/resource/FilterSidebar.tsx`

**타입**: Server Component (단순 레이아웃 컴포넌트)

---

## Props 정의

```typescript
interface FilterSidebarProps {
  /** 사이드바에 표시할 자식 컴포넌트들 */
  children: React.ReactNode
}
```

---

## UI 구조

```
┌─────────────────────┐
│                     │
│  SubcategoryFilter  │ ← children[0]
│                     │
├─────────────────────┤
│                     │
│     TagFilter       │ ← children[1]
│                     │
└─────────────────────┘
```

---

## 기능 요구사항

### 1. 레이아웃
- **위치**: 화면 좌측 고정
- **너비**:
  - Desktop: 280px
  - Tablet: 240px
  - Mobile: 전체 너비 (상단 배치)
- **스크롤**: 독립적인 스크롤 (내용이 길 때)

### 2. Sticky 동작
```typescript
// Desktop: 상단에 고정
position: sticky
top: 80px  // 헤더 높이 + 여백

// Mobile: sticky 없음 (일반 블록)
```

### 3. 반응형 동작
```typescript
// Desktop (lg+): 좌측 사이드바
- display: block
- position: sticky
- width: 280px

// Tablet (md): 좌측 사이드바 (좁음)
- display: block
- position: sticky
- width: 240px

// Mobile (~sm): 상단 배치
- display: block
- position: relative
- width: 100%
- 접기/펼치기 버튼 추가 (선택)
```

---

## 스타일링 가이드

### Desktop/Tablet
```typescript
<aside className="
  hidden md:block
  w-60 lg:w-70
  sticky top-20
  h-fit
  max-h-[calc(100vh-6rem)]
  overflow-y-auto
  pr-6
  space-y-6
">
  {children}
</aside>
```

### Mobile (선택사항 - 접기/펼치기)
```typescript
<div className="md:hidden mb-6">
  <button
    onClick={toggleFilters}
    className="w-full flex items-center justify-between p-4 bg-white border rounded-lg"
  >
    <span className="font-semibold">필터</span>
    <ChevronDown className={cn("transition-transform", isOpen && "rotate-180")} />
  </button>

  {isOpen && (
    <div className="mt-4 space-y-6 p-4 bg-gray-50 rounded-lg">
      {children}
    </div>
  )}
</div>
```

---

## 접근성 (Accessibility)

### ARIA 속성
```typescript
<aside
  role="complementary"
  aria-label="필터 사이드바"
  className="..."
>
  {children}
</aside>
```

### 랜드마크 역할
- `<aside>` 태그 사용
- `role="complementary"` 명시
- 스크린리더가 "필터 사이드바" 영역으로 인식

---

## 구현 예시

### Desktop/Tablet (기본)
```typescript
interface FilterSidebarProps {
  children: React.ReactNode
}

export default function FilterSidebar({ children }: FilterSidebarProps) {
  return (
    <aside
      role="complementary"
      aria-label="필터 사이드바"
      className="
        hidden md:block
        w-60 lg:w-70
        sticky top-20
        h-fit
        max-h-[calc(100vh-6rem)]
        overflow-y-auto
        pr-6
        space-y-6
      "
    >
      {children}
    </aside>
  )
}
```

### Mobile 지원 (선택사항)
```typescript
'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FilterSidebarProps {
  children: React.ReactNode
}

export default function FilterSidebar({ children }: FilterSidebarProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile: 접기/펼치기 */}
      <div className="md:hidden mb-6">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-4 bg-white border-2 rounded-lg hover:border-gray-300 transition-colors"
          aria-expanded={isOpen}
          aria-controls="mobile-filters"
        >
          <span className="font-semibold text-lg">필터</span>
          <ChevronDown
            className={cn(
              "w-5 h-5 transition-transform",
              isOpen && "rotate-180"
            )}
          />
        </button>

        {isOpen && (
          <div
            id="mobile-filters"
            className="mt-4 space-y-6 p-4 bg-gray-50 rounded-lg"
          >
            {children}
          </div>
        )}
      </div>

      {/* Desktop/Tablet: 고정 사이드바 */}
      <aside
        role="complementary"
        aria-label="필터 사이드바"
        className="
          hidden md:block
          w-60 lg:w-70
          sticky top-20
          h-fit
          max-h-[calc(100vh-6rem)]
          overflow-y-auto
          pr-6
          space-y-6
        "
      >
        {children}
      </aside>
    </>
  )
}
```

---

## 사용 예시

```typescript
// ResourcePageLayout.tsx에서
<div className="flex gap-8">
  {/* 좌측 사이드바 */}
  <FilterSidebar>
    <SubcategoryFilter {...subcategoryProps} />
    <TagFilter {...tagProps} />
  </FilterSidebar>

  {/* 우측 컨텐츠 */}
  <main className="flex-1">
    <ResourceGrid>
      {filteredResources.map(resource => (
        <ResourceCard key={resource.id} {...resource} />
      ))}
    </ResourceGrid>
  </main>
</div>
```

---

## 레이아웃 고려사항

### Sticky Top 값 계산
```typescript
// top-20 = 80px
// 이유: Header 높이(64px) + 여백(16px)

// 만약 Header가 다른 높이면 조정 필요
// 예: Header 80px인 경우
top-24  // 96px
```

### 최대 높이
```typescript
max-h-[calc(100vh-6rem)]
// viewport 높이에서 헤더 영역 제외
// 6rem = 96px (top 80px + 여백)
```

### 스크롤바 스타일 (선택사항)
```css
/* globals.css에 추가 */
.filter-sidebar::-webkit-scrollbar {
  width: 6px;
}

.filter-sidebar::-webkit-scrollbar-track {
  background: transparent;
}

.filter-sidebar::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 3px;
}

.filter-sidebar::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}
```

---

## 반응형 브레이크포인트

### Tailwind 기준
```typescript
// Mobile: ~768px
// - 숨김 (또는 상단 접기/펼치기)

// Tablet: 768px~1024px
// - w-60 (240px)
// - sticky

// Desktop: 1024px+
// - w-70 (280px)
// - sticky
```

---

## 테스트 시나리오

1. **Desktop 레이아웃**: 사이드바 좌측 고정 표시
2. **Sticky 동작**: 스크롤 시 상단에 고정
3. **독립 스크롤**: 사이드바 내용이 길 때 독립적으로 스크롤
4. **Mobile 접기**: 모바일에서 필터 버튼으로 접기/펼치기
5. **반응형 전환**: 화면 크기 변경 시 자연스러운 전환

---

## 시니어 친화적 고려사항

### 큰 여백
- children 간 간격: space-y-6 (24px)
- 우측 여백: pr-6 (24px)

### 모바일 접근성
- 필터 버튼 크기: h-12 이상
- 명확한 "필터" 레이블

### 스크롤 인디케이터
- 스크롤 가능 시 시각적 힌트
- 부드러운 스크롤바

---

## 개발 체크리스트

- [x] Server Component (상태 없으면) 또는 Client Component (Mobile 접기 있으면)
- [x] `<aside>` 태그 및 `role="complementary"` 사용
- [x] Sticky 포지셔닝 구현
- [x] 독립적인 스크롤 영역
- [x] 반응형 브레이크포인트 적용
- [x] Mobile 접기/펼치기 (선택)
- [x] 최대 높이 제한
- [ ] 스크롤바 스타일 (선택)
- [ ] Desktop/Tablet/Mobile 테스트

---

## 주의사항

### Parent Container 요구사항
```typescript
// ResourcePageLayout.tsx에서
<div className="flex gap-8">
  {/* ✅ Flex 레이아웃 필요 */}
  <FilterSidebar>...</FilterSidebar>
  <main className="flex-1">...</main>
</div>
```

### Sticky 작동 조건
```typescript
// 1. 부모가 overflow: hidden이면 안 됨
// 2. 부모가 height: 100%이면 안 됨
// 3. top 값 설정 필수
```

---

## 확장 기능 (선택사항)

### 1. "필터 초기화" 버튼
```typescript
<aside>
  <div className="flex items-center justify-between mb-6">
    <h2 className="text-xl font-bold">필터</h2>
    <button onClick={clearAllFilters}>
      모두 초기화
    </button>
  </div>
  {children}
</aside>
```

### 2. 선택된 필터 요약
```typescript
<div className="mb-4 p-3 bg-blue-50 rounded-lg">
  <p className="text-sm">
    <strong>2개</strong> 필터 적용 중
  </p>
</div>
```

### 3. 로딩 상태
```typescript
{isLoading && (
  <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
    <Spinner />
  </div>
)}
```
