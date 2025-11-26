# ResourcePageLayout.md

## 컴포넌트 개요

**목적**: 모든 resource 관련 컴포넌트를 조합하고, 데이터 로딩 및 필터링 로직을 처리하는 메인 레이아웃

**위치**: `components/resource/ResourcePageLayout.tsx`

**타입**: Client Component (`'use client'` - 복잡한 상태 관리)

**역할**:
- 전체 레이아웃 구성
- JSON 데이터 로딩
- 필터링 로직 구현
- URL 쿼리 파라미터 관리
- 모든 하위 컴포넌트 조합

---

## Props 정의

```typescript
interface ResourcePageLayoutProps {
  /** 카테고리 ID ("housing" 또는 "life") */
  categoryId: string
}
```

---

## UI 구조

```
┌──────────────────────────────────────────────────┐
│ PageContainer                                     │
│ ┌──────────────────────────────────────────────┐ │
│ │ 🔍 SearchBar                                 │ │
│ └──────────────────────────────────────────────┘ │
│                                                   │
│ ┌──────────┬──────────────────────────────────┐ │
│ │          │  ┌──────┐ ┌──────┐ ┌──────┐     │ │
│ │  Filter  │  │ Card │ │ Card │ │ Card │     │ │
│ │  Sidebar │  └──────┘ └──────┘ └──────┘     │ │
│ │          │  ┌──────┐ ┌──────┐ ┌──────┐     │ │
│ │          │  │ Card │ │ Card │ │ Card │     │ │
│ │          │  └──────┘ └──────┘ └──────┘     │ │
│ └──────────┴──────────────────────────────────┘ │
└──────────────────────────────────────────────────┘
```

---

## 핵심 기능

### 1. 데이터 로딩
```typescript
// 4개의 JSON 파일 import
import categoriesData from '@/data/categories.json'
import subcategoriesData from '@/data/subcategories.json'
import resourcesData from '@/data/resources.json'
import tagsData from '@/data/tags.json'

// 타입 캐스팅
const categories = categoriesData as Category[]
const subcategories = subcategoriesData as Subcategory[]
const resources = resourcesData as Resource[]
const tags = tagsData as Tag[]
```

### 2. 필터링 로직
```typescript
// 3단계 필터링
1. categoryId로 subcategories 필터링
2. selectedSubcategoryId로 resources 필터링
3. searchQuery로 resources 필터링
4. selectedTags로 resources 필터링 (AND 조건)
```

### 3. URL 쿼리 파라미터 관리
```typescript
// /housing?subcategory=housing-finance&tags=청년,무주택&search=전세

- subcategory: 선택된 중분류 ID
- tags: 쉼표로 구분된 태그 이름들
- search: 검색어
```

### 4. 개수 계산
```typescript
- 전체 리소스 개수
- 각 중분류별 리소스 개수
- 각 태그별 리소스 개수 (현재 필터 적용 후)
```

---

## 상태 관리

```typescript
'use client'

import { useState, useMemo } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'

export default function ResourcePageLayout({ categoryId }: Props) {
  // URL에서 초기값 읽기
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  // 3가지 필터 상태
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get('search') || ''
  )
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<string | null>(
    searchParams.get('subcategory') || null
  )
  const [selectedTags, setSelectedTags] = useState<string[]>(
    searchParams.get('tags')?.split(',').filter(Boolean) || []
  )

  // URL 동기화
  useEffect(() => {
    const params = new URLSearchParams()

    if (searchQuery) params.set('search', searchQuery)
    if (selectedSubcategoryId) params.set('subcategory', selectedSubcategoryId)
    if (selectedTags.length > 0) params.set('tags', selectedTags.join(','))

    router.replace(`${pathname}?${params.toString()}`)
  }, [searchQuery, selectedSubcategoryId, selectedTags])
}
```

---

## 필터링 로직 구현

```typescript
// 1. categoryId로 subcategories 필터링
const categorySubcategories = useMemo(() => {
  return subcategories.filter(s => s.categoryId === categoryId)
}, [categoryId])

// 2. categoryId로 resources 필터링
const categoryResources = useMemo(() => {
  return resources.filter(r => {
    const subcategory = subcategories.find(s => s.id === r.subcategoryId)
    return subcategory?.categoryId === categoryId
  })
}, [categoryId])

// 3. 필터 적용
const filteredResources = useMemo(() => {
  let result = categoryResources

  // 중분류 필터
  if (selectedSubcategoryId) {
    result = result.filter(r => r.subcategoryId === selectedSubcategoryId)
  }

  // 검색어 필터
  if (searchQuery) {
    const lowerQuery = searchQuery.toLowerCase()
    result = result.filter(r =>
      r.title.toLowerCase().includes(lowerQuery) ||
      r.description.toLowerCase().includes(lowerQuery) ||
      r.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    )
  }

  // 태그 필터 (AND 조건)
  if (selectedTags.length > 0) {
    result = result.filter(r =>
      selectedTags.every(tag => r.tags.includes(tag))
    )
  }

  return result
}, [categoryResources, selectedSubcategoryId, searchQuery, selectedTags])

// 4. 개수 계산
const subcategoryCounts = useMemo(() => {
  const counts: Record<string, number> = {}
  categoryResources.forEach(r => {
    counts[r.subcategoryId] = (counts[r.subcategoryId] || 0) + 1
  })
  return counts
}, [categoryResources])

const tagCounts = useMemo(() => {
  const counts: Record<string, number> = {}
  filteredResources.forEach(r => {
    r.tags.forEach(tag => {
      counts[tag] = (counts[tag] || 0) + 1
    })
  })
  return counts
}, [filteredResources])
```

---

## 전체 구현 예시

```typescript
'use client'

import { useState, useMemo, useEffect } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import PageContainer from '@/components/common/PageContainer'
import SearchBar from './SearchBar'
import FilterSidebar from './FilterSidebar'
import SubcategoryFilter from './SubcategoryFilter'
import TagFilter from './TagFilter'
import ResourceCard from './ResourceCard'

import categoriesData from '@/data/categories.json'
import subcategoriesData from '@/data/subcategories.json'
import resourcesData from '@/data/resources.json'
import tagsData from '@/data/tags.json'

import type { Category, Subcategory, Resource, Tag } from '@/lib/types'

interface ResourcePageLayoutProps {
  categoryId: string
}

export default function ResourcePageLayout({ categoryId }: ResourcePageLayoutProps) {
  // 데이터 로드
  const categories = categoriesData as Category[]
  const subcategories = subcategoriesData as Subcategory[]
  const resources = resourcesData as Resource[]
  const tags = tagsData as Tag[]

  // URL 파라미터
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  // 필터 상태
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<string | null>(
    searchParams.get('subcategory') || null
  )
  const [selectedTags, setSelectedTags] = useState<string[]>(
    searchParams.get('tags')?.split(',').filter(Boolean) || []
  )

  // URL 동기화
  useEffect(() => {
    const params = new URLSearchParams()
    if (searchQuery) params.set('search', searchQuery)
    if (selectedSubcategoryId) params.set('subcategory', selectedSubcategoryId)
    if (selectedTags.length > 0) params.set('tags', selectedTags.join(','))

    router.replace(`${pathname}?${params.toString()}`)
  }, [searchQuery, selectedSubcategoryId, selectedTags, router, pathname])

  // 현재 카테고리
  const currentCategory = useMemo(
    () => categories.find(c => c.id === categoryId),
    [categoryId]
  )

  // 카테고리별 subcategories
  const categorySubcategories = useMemo(
    () => subcategories.filter(s => s.categoryId === categoryId),
    [categoryId]
  )

  // 카테고리별 resources
  const categoryResources = useMemo(() => {
    return resources.filter(r => {
      const subcategory = subcategories.find(s => s.id === r.subcategoryId)
      return subcategory?.categoryId === categoryId
    })
  }, [categoryId])

  // 필터링된 resources
  const filteredResources = useMemo(() => {
    let result = categoryResources

    // 중분류 필터
    if (selectedSubcategoryId) {
      result = result.filter(r => r.subcategoryId === selectedSubcategoryId)
    }

    // 검색어 필터
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase()
      result = result.filter(r =>
        r.title.toLowerCase().includes(lowerQuery) ||
        r.description.toLowerCase().includes(lowerQuery) ||
        r.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
      )
    }

    // 태그 필터 (AND)
    if (selectedTags.length > 0) {
      result = result.filter(r =>
        selectedTags.every(tag => r.tags.includes(tag))
      )
    }

    return result
  }, [categoryResources, selectedSubcategoryId, searchQuery, selectedTags])

  // 개수 계산
  const subcategoryCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    categoryResources.forEach(r => {
      counts[r.subcategoryId] = (counts[r.subcategoryId] || 0) + 1
    })
    return counts
  }, [categoryResources])

  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    filteredResources.forEach(r => {
      r.tags.forEach(tag => {
        counts[tag] = (counts[tag] || 0) + 1
      })
    })
    return counts
  }, [filteredResources])

  return (
    <PageContainer>
      {/* 페이지 헤더 */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-[oklch(0.25_0.08_250)] mb-3">
          {currentCategory?.name}
        </h1>
        <p className="text-lg text-gray-600">
          {currentCategory?.description}
        </p>
      </header>

      {/* 검색바 */}
      <SearchBar
        onSearch={setSearchQuery}
        defaultValue={searchQuery}
        placeholder={`${currentCategory?.name} 리소스 검색...`}
      />

      {/* 메인 레이아웃 */}
      <div className="flex gap-8">
        {/* 좌측 필터 사이드바 */}
        <FilterSidebar>
          <SubcategoryFilter
            subcategories={categorySubcategories}
            selectedId={selectedSubcategoryId}
            onChange={setSelectedSubcategoryId}
            totalCount={categoryResources.length}
            counts={subcategoryCounts}
          />
          <TagFilter
            tags={tags}
            selectedTags={selectedTags}
            onChange={setSelectedTags}
            counts={tagCounts}
          />
        </FilterSidebar>

        {/* 우측 리소스 그리드 */}
        <main className="flex-1">
          {/* 결과 개수 */}
          <div className="mb-6">
            <p className="text-gray-600">
              <strong className="text-gray-900">{filteredResources.length}개</strong>의 리소스
            </p>
          </div>

          {/* 리소스 그리드 */}
          {filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource) => (
                <ResourceCard
                  key={resource.id}
                  title={resource.title}
                  description={resource.description}
                  url={resource.url}
                  tags={resource.tags}
                />
              ))}
            </div>
          ) : (
            // 빈 상태
            <div className="text-center py-16">
              <p className="text-xl text-gray-500 mb-2">
                검색 결과가 없습니다
              </p>
              <p className="text-gray-400">
                다른 검색어나 필터를 시도해보세요
              </p>
            </div>
          )}
        </main>
      </div>
    </PageContainer>
  )
}
```

---

## 사용 예시

```typescript
// app/housing/page.tsx
import ResourcePageLayout from '@/components/resource/ResourcePageLayout'

export const metadata = {
  title: '주거 정보 | HisLight',
  description: '은퇴 후 주거와 관련된 정보를 제공합니다',
}

export default function HousingPage() {
  return <ResourcePageLayout categoryId="housing" />
}

// app/life/page.tsx
import ResourcePageLayout from '@/components/resource/ResourcePageLayout'

export const metadata = {
  title: '생활 정보 | HisLight',
  description: '은퇴 후 일상생활에 필요한 정보를 제공합니다',
}

export default function LifePage() {
  return <ResourcePageLayout categoryId="life" />
}
```

---

## 최적화 고려사항

### 1. useMemo로 계산 캐싱
```typescript
// 필터링은 비용이 큰 연산
// 의존성 배열이 변하지 않으면 재계산 안 함
const filteredResources = useMemo(() => {
  // ...
}, [categoryResources, selectedSubcategoryId, searchQuery, selectedTags])
```

### 2. URL 동기화 Debounce (선택)
```typescript
// searchQuery는 debounce 적용 (SearchBar에서 처리)
// 나머지는 즉시 URL 업데이트
```

### 3. 클라이언트 사이드 렌더링
```typescript
// JSON 데이터가 작아서 (총 ~50개 항목) 클라이언트 렌더링으로 충분
// 나중에 데이터가 커지면 서버 컴포넌트로 전환 고려
```

---

## 에러 처리

```typescript
// categoryId 검증
if (!currentCategory) {
  return (
    <PageContainer>
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold text-red-600 mb-2">
          카테고리를 찾을 수 없습니다
        </h1>
        <p className="text-gray-600">
          올바른 카테고리 ID를 사용해주세요
        </p>
      </div>
    </PageContainer>
  )
}
```

---

## 테스트 시나리오

1. **데이터 로딩**: 4개 JSON 파일 정상 로드
2. **카테고리 필터링**: housing/life에 맞는 데이터만 표시
3. **중분류 필터**: 선택 시 해당 리소스만 표시
4. **검색 필터**: title/description/tags에서 검색
5. **태그 필터**: AND 조건으로 필터링
6. **복합 필터**: 검색 + 중분류 + 태그 동시 적용
7. **URL 동기화**: 필터 변경 시 URL 업데이트
8. **북마크**: URL 복사 후 새 탭에서 열면 필터 상태 복원
9. **빈 결과**: 필터 조건에 맞는 리소스 없을 때 메시지 표시
10. **개수 표시**: 각 필터의 결과 개수 정확히 표시

---

## 접근성

- 페이지 헤더 (h1)
- 검색 영역 (role="search")
- 필터 사이드바 (role="complementary")
- 메인 컨텐츠 (main)
- 스크린리더 공지 (결과 개수)

---

## 개발 체크리스트

- [x] Client Component 선언 (`'use client'`)
- [x] 4개 JSON 파일 import 및 타입 캐스팅
- [x] 3가지 필터 상태 관리 (useState)
- [x] URL 쿼리 파라미터 동기화 (useSearchParams, useRouter)
- [x] 카테고리별 필터링 (useMemo)
- [x] 검색어 필터링 (대소문자 무시)
- [x] 태그 필터링 (AND 조건)
- [x] 개수 계산 (subcategories, tags)
- [x] 빈 상태 UI
- [x] 에러 처리 (잘못된 categoryId)
- [x] 모든 하위 컴포넌트 조합
- [ ] 반응형 레이아웃 테스트
- [ ] URL 북마크 테스트
