# SubcategoryFilter.md

## 컴포넌트 개요

**목적**: 중분류(Subcategory) 목록을 라디오 버튼 형태로 표시하여 하나의 중분류만 선택 가능하게 함

**위치**: `components/resource/SubcategoryFilter.tsx`

**타입**: Client Component (`'use client'` - 상태 관리)

---

## Props 정의

```typescript
interface SubcategoryFilterProps {
  /** 표시할 중분류 목록 */
  subcategories: Subcategory[]

  /** 현재 선택된 중분류 ID (null이면 "전체") */
  selectedId: string | null

  /** 선택 변경 콜백 */
  onChange: (id: string | null) => void
}
```

---

## UI 구조

```
┌─────────────────────────┐
│ 중분류                   │ ← 섹션 제목
├─────────────────────────┤
│ ● 전체 보기       (9)   │ ← 선택됨
│ ○ 청약·분양       (2)   │
│ ○ 공공임대        (2)   │
│ ○ 주거급여        (1)   │
│ ○ 금융지원        (2)   │
│ ○ 시세·실거래     (2)   │
└─────────────────────────┘
```

---

## 기능 요구사항

### 1. "전체 보기" 옵션
- **항상 첫 번째**: 목록 최상단 고정
- **기본 선택**: selectedId가 null일 때 선택됨
- **개수 표시**: 전체 리소스 개수
- **동작**: 선택 시 모든 중분류의 리소스 표시

### 2. 중분류 옵션
- **정렬**: JSON 파일 순서 유지
- **개수 표시**: 각 중분류에 속한 리소스 개수
- **단일 선택**: 라디오 버튼 (하나만 선택 가능)
- **아이콘**: 중분류 데이터의 icon 필드 표시 (있으면)

### 3. 선택 상태 표시
```typescript
// 선택됨
- 배경색: oklch(0.95 0.05 90) - 밝은 노랑
- 테두리: border-l-4 oklch(0.7 0.18 90)
- 폰트 굵기: font-semibold

// 선택 안됨
- 배경색: transparent
- 테두리: 없음
- 폰트 굵기: font-normal
```

### 4. 호버 효과
```typescript
- 배경색: gray-100
- 커서: cursor-pointer
- 전환: transition-colors duration-150
```

---

## 스타일링 가이드

### 섹션 제목
```typescript
<h3 className="
  text-lg
  font-semibold
  text-[oklch(0.25_0.08_250)]
  mb-4
  px-3
">
  중분류
</h3>
```

### 라디오 버튼 그룹
```typescript
<div role="radiogroup" aria-label="중분류 선택">
  {/* 옵션들 */}
</div>
```

### 개별 옵션
```typescript
<button
  role="radio"
  aria-checked={selected}
  className={cn(
    "w-full",
    "flex items-center justify-between",
    "px-4 py-3",
    "text-left text-base",
    "rounded-md",
    "transition-colors duration-150",
    "hover:bg-gray-100",
    selected && "bg-[oklch(0.95_0.05_90)] border-l-4 border-[oklch(0.7_0.18_90)] font-semibold"
  )}
>
  <span className="flex items-center gap-2">
    {icon && <span>{icon}</span>}
    <span>{name}</span>
  </span>
  <span className="text-sm text-gray-500">({count})</span>
</button>
```

---

## 접근성 (Accessibility)

### ARIA 속성
```typescript
<div role="radiogroup" aria-label="중분류 필터">
  <button
    role="radio"
    aria-checked={isSelected}
    aria-label={`${name}, ${count}개 항목`}
    onClick={() => onChange(id)}
  >
    {name} ({count})
  </button>
</div>
```

### 키보드 네비게이션
- Tab: 옵션 간 이동
- Space/Enter: 선택
- Arrow Up/Down: 이전/다음 옵션 (선택사항)

---

## 구현 예시

```typescript
'use client'

import { cn } from '@/lib/utils'
import type { Subcategory } from '@/lib/types'

interface SubcategoryFilterProps {
  subcategories: Subcategory[]
  selectedId: string | null
  onChange: (id: string | null) => void
  totalCount: number  // 전체 리소스 개수
  counts: Record<string, number>  // 각 중분류별 개수
}

export default function SubcategoryFilter({
  subcategories,
  selectedId,
  onChange,
  totalCount,
  counts
}: SubcategoryFilterProps) {
  return (
    <div className="mb-8">
      {/* 섹션 제목 */}
      <h3 className="text-lg font-semibold text-[oklch(0.25_0.08_250)] mb-4 px-3">
        중분류
      </h3>

      {/* 라디오 그룹 */}
      <div
        role="radiogroup"
        aria-label="중분류 필터"
        className="space-y-1"
      >
        {/* 전체 보기 */}
        <button
          role="radio"
          aria-checked={selectedId === null}
          aria-label={`전체 보기, ${totalCount}개 항목`}
          onClick={() => onChange(null)}
          className={cn(
            "w-full",
            "flex items-center justify-between",
            "px-4 py-3",
            "text-left text-base",
            "rounded-md",
            "transition-colors duration-150",
            "hover:bg-gray-100",
            selectedId === null && "bg-[oklch(0.95_0.05_90)] border-l-4 border-[oklch(0.7_0.18_90)] font-semibold"
          )}
        >
          <span>전체 보기</span>
          <span className="text-sm text-gray-500">({totalCount})</span>
        </button>

        {/* 중분류 옵션들 */}
        {subcategories.map((subcategory) => {
          const isSelected = selectedId === subcategory.id
          const count = counts[subcategory.id] || 0

          return (
            <button
              key={subcategory.id}
              role="radio"
              aria-checked={isSelected}
              aria-label={`${subcategory.name}, ${count}개 항목`}
              onClick={() => onChange(subcategory.id)}
              className={cn(
                "w-full",
                "flex items-center justify-between",
                "px-4 py-3",
                "text-left text-base",
                "rounded-md",
                "transition-colors duration-150",
                "hover:bg-gray-100",
                isSelected && "bg-[oklch(0.95_0.05_90)] border-l-4 border-[oklch(0.7_0.18_90)] font-semibold"
              )}
            >
              <span className="flex items-center gap-2">
                {subcategory.icon && <span>{subcategory.icon}</span>}
                <span>{subcategory.name}</span>
              </span>
              <span className="text-sm text-gray-500">({count})</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
```

---

## 개수 계산 로직 (부모에서 구현)

```typescript
// ResourcePageLayout.tsx에서
const subcategoryCounts = useMemo(() => {
  const counts: Record<string, number> = {}

  resources.forEach(resource => {
    const id = resource.subcategoryId
    counts[id] = (counts[id] || 0) + 1
  })

  return counts
}, [resources])

const totalCount = resources.length

<SubcategoryFilter
  subcategories={subcategories}
  selectedId={selectedSubcategoryId}
  onChange={setSelectedSubcategoryId}
  totalCount={totalCount}
  counts={subcategoryCounts}
/>
```

---

## URL 동기화

```typescript
// URL 쿼리 파라미터와 동기화
// /housing?subcategory=housing-finance

const searchParams = useSearchParams()
const router = useRouter()
const pathname = usePathname()

const handleChange = (id: string | null) => {
  const params = new URLSearchParams(searchParams)

  if (id) {
    params.set('subcategory', id)
  } else {
    params.delete('subcategory')
  }

  router.replace(`${pathname}?${params.toString()}`)
  onChange(id)
}
```

---

## 필터링 로직 (부모에서 구현)

```typescript
const filteredResources = useMemo(() => {
  let result = resources

  // 중분류 필터
  if (selectedSubcategoryId) {
    result = result.filter(
      r => r.subcategoryId === selectedSubcategoryId
    )
  }

  return result
}, [resources, selectedSubcategoryId])
```

---

## 테스트 시나리오

1. **기본 선택**: 처음 로드 시 "전체 보기" 선택됨
2. **단일 선택**: 하나의 중분류만 선택 가능
3. **개수 표시**: 각 중분류의 리소스 개수 정확히 표시
4. **전체 보기**: 선택 시 모든 리소스 표시
5. **시각적 피드백**: 선택된 항목 강조 표시
6. **키보드 접근**: Tab과 Enter로 선택 가능

---

## 시니어 친화적 고려사항

### 큰 클릭 영역
- 버튼 높이 48px (py-3)
- 전체 너비 버튼

### 명확한 시각적 구분
- 선택된 항목 배경색 + 좌측 테두리
- 개수 표시로 정보 제공

### 읽기 쉬운 텍스트
- 폰트 크기 16px (text-base)
- 선택된 항목 font-semibold

### 즉각적인 피드백
- 호버 시 배경색 변경
- 클릭 시 즉시 선택 상태 표시

---

## 개발 체크리스트

- [x] Client Component 선언 (`'use client'`)
- [x] Subcategory 타입 import
- [x] "전체 보기" 옵션 항상 첫 번째
- [x] 선택 상태에 따른 스타일 적용
- [x] 개수 표시 구현
- [x] 아이콘 표시 (있으면)
- [x] ARIA 속성 추가 (role="radiogroup", "radio")
- [ ] URL 쿼리 파라미터 동기화 (선택)
- [ ] 키보드 네비게이션 테스트
