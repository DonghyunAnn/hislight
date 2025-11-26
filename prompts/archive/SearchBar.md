# SearchBar.md

## 컴포넌트 개요

**목적**: 사용자가 리소스의 제목과 설명을 검색할 수 있는 입력 필드 제공

**위치**: `components/resource/SearchBar.tsx`

**타입**: Client Component (`'use client'` 필요 - 상태 관리)

---

## Props 정의

```typescript
interface SearchBarProps {
  /** 검색어 변경 콜백 */
  onSearch: (query: string) => void

  /** 플레이스홀더 텍스트 */
  placeholder?: string

  /** 초기 검색어 (URL 쿼리에서 복원용) */
  defaultValue?: string
}
```

---

## UI 구조

```
┌──────────────────────────────────────────────────┐
│  🔍  [리소스 검색...]                     [×]    │
└──────────────────────────────────────────────────┘
     ↑           ↑                            ↑
   아이콘    입력 필드                   초기화 버튼
```

---

## 기능 요구사항

### 1. 검색 입력
- **실시간 검색**: onChange 이벤트로 즉시 필터링
- **Debounce**: 300ms 딜레이 적용 (과도한 렌더링 방지)
- **대소문자 무시**: 검색 시 case-insensitive

### 2. 초기화 버튼
- **표시 조건**: 검색어가 있을 때만 표시
- **동작**: 클릭 시 입력 필드 비우기
- **아이콘**: X (lucide-react)

### 3. 키보드 단축키
- **Ctrl/Cmd + K**: 포커스 이동
- **Escape**: 검색어 초기화

### 4. 검색 대상
```typescript
// Resource의 다음 필드에서 검색
- title (제목)
- description (설명)
- tags (태그 배열) - optional
```

---

## 스타일링 가이드

### 레이아웃
```
- 너비: w-full (부모 컨테이너에 맞춤)
- 최대 너비: max-w-2xl
- 높이: h-14 (56px - 큰 클릭 영역)
- 여백: mb-8 (하단 여백)
```

### 입력 필드
```typescript
<Input
  type="search"
  className="
    h-14
    pl-12        // 좌측 아이콘 공간
    pr-12        // 우측 X 버튼 공간
    text-lg      // 큰 폰트 (18px)
    border-2
    focus:border-[oklch(0.7_0.18_90)]
  "
/>
```

### 아이콘
- 검색 아이콘: 좌측 16px 위치, gray-500
- X 버튼: 우측 16px 위치, gray-400, hover시 gray-700

---

## 접근성 (Accessibility)

### ARIA 속성
```typescript
<div role="search">
  <label htmlFor="resource-search" className="sr-only">
    리소스 검색
  </label>
  <input
    id="resource-search"
    type="search"
    aria-label="리소스 제목 및 설명 검색"
    aria-describedby="search-help"
  />
  <span id="search-help" className="sr-only">
    검색어를 입력하면 제목과 설명에서 일치하는 리소스를 찾습니다
  </span>
</div>
```

### 키보드 지원
- Tab: 입력 필드 및 X 버튼 포커스
- Escape: 검색어 초기화
- Ctrl/Cmd + K: 글로벌 검색 포커스

---

## 구현 예시

```typescript
'use client'

import { useState, useCallback, useEffect } from 'react'
import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface SearchBarProps {
  onSearch: (query: string) => void
  placeholder?: string
  defaultValue?: string
}

export default function SearchBar({
  onSearch,
  placeholder = '리소스 검색...',
  defaultValue = ''
}: SearchBarProps) {
  const [query, setQuery] = useState(defaultValue)

  // Debounce 검색 (300ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query)
    }, 300)

    return () => clearTimeout(timer)
  }, [query, onSearch])

  // 초기화
  const handleClear = useCallback(() => {
    setQuery('')
    // 입력 필드에 포커스
    document.getElementById('resource-search')?.focus()
  }, [])

  // Ctrl/Cmd + K 단축키
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        document.getElementById('resource-search')?.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div role="search" className="relative w-full max-w-2xl mb-8">
      {/* 검색 아이콘 */}
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />

      {/* 입력 필드 */}
      <Input
        id="resource-search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="h-14 pl-12 pr-12 text-lg border-2 focus:border-[oklch(0.7_0.18_90)]"
        aria-label="리소스 제목 및 설명 검색"
      />

      {/* 초기화 버튼 */}
      {query && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleClear}
          className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 p-0"
          aria-label="검색어 지우기"
        >
          <X className="w-4 h-4 text-gray-400 hover:text-gray-700" />
        </Button>
      )}

      {/* 스크린리더용 설명 */}
      <span id="search-help" className="sr-only">
        검색어를 입력하면 제목과 설명에서 일치하는 리소스를 찾습니다
      </span>
    </div>
  )
}
```

---

## 검색 로직 (부모 컴포넌트에서 구현)

```typescript
// ResourcePageLayout.tsx에서 사용 예시
const [searchQuery, setSearchQuery] = useState('')

// 검색 필터링
const filteredResources = useMemo(() => {
  if (!searchQuery) return resources

  const lowerQuery = searchQuery.toLowerCase()

  return resources.filter(resource => {
    const titleMatch = resource.title.toLowerCase().includes(lowerQuery)
    const descMatch = resource.description.toLowerCase().includes(lowerQuery)
    const tagMatch = resource.tags.some(tag =>
      tag.toLowerCase().includes(lowerQuery)
    )

    return titleMatch || descMatch || tagMatch
  })
}, [resources, searchQuery])

// SearchBar에 전달
<SearchBar onSearch={setSearchQuery} />
```

---

## Debounce 최적화

### 왜 필요한가?
```typescript
// ❌ 나쁜 예 - 매 입력마다 필터링
onChange={(e) => onSearch(e.target.value)}
// "전세" 입력 시: 4번 렌더링 (ㅈ, 저, 전, 전세)

// ✅ 좋은 예 - 300ms 후 필터링
useEffect(() => {
  const timer = setTimeout(() => onSearch(query), 300)
  return () => clearTimeout(timer)
}, [query])
// "전세" 입력 시: 1번 렌더링 (입력 완료 후 300ms)
```

---

## URL 동기화 (선택사항)

```typescript
// URL 쿼리 파라미터와 동기화
'use client'

import { useSearchParams, useRouter, usePathname } from 'next/navigation'

export default function SearchBar({ onSearch }: SearchBarProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const [query, setQuery] = useState(
    searchParams.get('search') || ''
  )

  useEffect(() => {
    const timer = setTimeout(() => {
      // URL 업데이트
      const params = new URLSearchParams(searchParams)
      if (query) {
        params.set('search', query)
      } else {
        params.delete('search')
      }
      router.replace(`${pathname}?${params.toString()}`)

      // 부모에게 전달
      onSearch(query)
    }, 300)

    return () => clearTimeout(timer)
  }, [query])

  // ...
}
```

---

## 테스트 시나리오

1. **입력 테스트**: 검색어 입력 시 300ms 후 필터링
2. **초기화 테스트**: X 버튼 클릭 시 검색어 비워짐
3. **키보드 단축키**: Cmd+K로 포커스 이동
4. **Escape 키**: 검색어 초기화
5. **빈 검색어**: 모든 리소스 표시
6. **대소문자**: "전세"와 "JEONSE" 동일하게 검색

---

## 시니어 친화적 고려사항

### 큰 입력 필드
- 높이 56px (일반적인 40px보다 큼)
- 폰트 크기 18px

### 명확한 플레이스홀더
- "리소스 검색..." (간단명료)

### 시각적 피드백
- 포커스 시 Primary Yellow 테두리
- 입력 시 X 버튼 표시 (초기화 가능함을 명확히 표시)

### 접근성
- 스크린리더용 레이블 및 설명 제공
- 키보드만으로도 모든 기능 사용 가능

---

## 개발 체크리스트

- [x] Client Component로 선언 (`'use client'`)
- [x] shadcn/ui Input, Button 컴포넌트 사용
- [x] lucide-react Search, X 아이콘 사용
- [x] Debounce 로직 구현 (300ms)
- [x] 초기화 버튼 구현 (조건부 표시)
- [x] Cmd+K 단축키 구현
- [x] ARIA 레이블 추가
- [ ] URL 쿼리 파라미터 동기화 (선택)
- [ ] 모바일 반응형 테스트
