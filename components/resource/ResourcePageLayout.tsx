'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import PageContainer from '@/components/common/PageContainer'
import SearchBar from './SearchBar'
import FilterSidebar from './FilterSidebar'
import SubcategoryFilter from './SubcategoryFilter'
import ResourceCard from './ResourceCard'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from '@/components/ui/pagination'
import { useResourceFilter } from '@/hooks/useResourceFilter'
import { usePagination } from '@/hooks/usePagination'
import { useUrlSync } from '@/hooks/useUrlSync'
import { useMediaQuery } from '@/hooks/useMediaQuery'

interface ResourcePageLayoutProps {
  /** 카테고리 ID ("housing" 또는 "life") */
  categoryId: string
}

export default function ResourcePageLayout({ categoryId }: ResourcePageLayoutProps) {
  const searchParams = useSearchParams()

  // 커스텀 훅: 반응형 화면 크기 감지
  const isSmallMobile = useMediaQuery('(max-width: 640px)')
  const isMediumMobile = useMediaQuery('(max-width: 768px)')
  const isTablet = useMediaQuery('(max-width: 1024px)')

  // 화면 크기에 따른 페이지 그룹 크기 설정
  const pageGroupSize = isSmallMobile ? 3 : isMediumMobile ? 5 : isTablet ? 7 : 10

  // 커스텀 훅: 필터링
  const {
    searchQuery,
    selectedSubcategoryId,
    setSearchQuery,
    setSelectedSubcategoryId,
    currentCategory,
    categorySubcategories,
    filteredResources,
    subcategoryCounts,
    totalCount,
  } = useResourceFilter(categoryId, {
    search: searchParams.get('search') || '',
    subcategoryId: searchParams.get('subcategory'),
  })

  // 커스텀 훅: 페이지네이션
  const {
    currentPage,
    totalPages,
    paginatedItems: paginatedResources,
    pageGroup,
    goToPage,
    resetPage,
    goToPrevGroup,
    goToNextGroup,
  } = usePagination(
    filteredResources,
    Number(searchParams.get('page')) || 1,
    9,
    pageGroupSize
  )

  // 커스텀 훅: URL 동기화
  useUrlSync({
    search: searchQuery,
    subcategory: selectedSubcategoryId,
    page: currentPage,
  })

  // 필터 변경 시 1페이지로 리셋
  useEffect(() => {
    resetPage()
  }, [searchQuery, selectedSubcategoryId, resetPage])

  // 카테고리 검증
  if (!currentCategory) {
    return (
      <PageContainer>
        <div className="text-center py-16">
          <h1 className="text-2xl font-bold text-red-600 mb-2">
            카테고리를 찾을 수 없습니다
          </h1>
          <p className="text-gray-600">올바른 카테고리 ID를 사용해주세요</p>
        </div>
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      {/* 페이지 헤더 */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-[oklch(0.25_0.08_250)] mb-3">
          {currentCategory.name}
        </h1>
        <p className="text-lg text-gray-600">{currentCategory.description}</p>
      </header>

      {/* 검색바 */}
      <SearchBar
        onSearch={setSearchQuery}
        defaultValue={searchQuery}
        placeholder={`${currentCategory.name} 리소스 검색...`}
      />

      {/* 메인 레이아웃 */}
      <div className="flex gap-8">
        {/* 좌측 필터 사이드바 */}
        <FilterSidebar>
          <SubcategoryFilter
            subcategories={categorySubcategories}
            selectedId={selectedSubcategoryId}
            onChange={setSelectedSubcategoryId}
            totalCount={totalCount}
            counts={subcategoryCounts}
          />
        </FilterSidebar>

        {/* 우측 리소스 그리드 */}
        <main className="flex-1">
          {/* 결과 개수 */}
          <div className="mb-6">
            <p className="text-gray-600">
              <strong className="text-gray-900">{filteredResources.length}개</strong>의
              리소스
              {totalPages > 1 && (
                <span className="text-gray-500 ml-2">
                  (페이지 {currentPage} / {totalPages})
                </span>
              )}
            </p>
          </div>

          {/* 리소스 그리드 */}
          {filteredResources.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedResources.map((resource) => (
                  <ResourceCard
                    key={resource.id}
                    title={resource.title}
                    description={resource.description}
                    url={resource.url}
                  />
                ))}
              </div>

              {/* 페이지네이션 */}
              {totalPages > 1 && (
                <div className="mt-12 flex justify-center">
                  <Pagination>
                    <PaginationContent className="gap-1 md:gap-2">
                      {/* 이전 그룹 버튼 */}
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          onClick={(e) => {
                            e.preventDefault()
                            goToPrevGroup()
                          }}
                          className={
                            !pageGroup.hasPrevGroup
                              ? 'pointer-events-none opacity-50'
                              : 'cursor-pointer'
                          }
                          aria-label="이전 페이지 그룹"
                        />
                      </PaginationItem>

                      {/* 페이지 번호 (현재 그룹만, 반응형) */}
                      {Array.from(
                        { length: pageGroup.endPage - pageGroup.startPage + 1 },
                        (_, i) => pageGroup.startPage + i
                      ).map((page) => (
                        <PaginationItem key={page}>
                          <PaginationLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault()
                              goToPage(page)
                            }}
                            isActive={currentPage === page}
                            className="cursor-pointer min-w-10 min-h-12 md:min-h-10"
                            aria-label={`페이지 ${page}`}
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      ))}

                      {/* 다음 그룹 버튼 */}
                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          onClick={(e) => {
                            e.preventDefault()
                            goToNextGroup()
                          }}
                          className={
                            !pageGroup.hasNextGroup
                              ? 'pointer-events-none opacity-50'
                              : 'cursor-pointer'
                          }
                          aria-label="다음 페이지 그룹"
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          ) : (
            // 빈 상태
            <div className="text-center py-16">
              <p className="text-xl text-gray-500 mb-2">검색 결과가 없습니다</p>
              <p className="text-gray-400">다른 검색어나 필터를 시도해보세요</p>
            </div>
          )}
        </main>
      </div>
    </PageContainer>
  )
}
