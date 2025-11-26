import { useState, useMemo, useEffect, useCallback } from 'react'

interface PageGroup {
  startPage: number
  endPage: number
  hasPrevGroup: boolean
  hasNextGroup: boolean
}

/**
 * 페이지네이션을 담당하는 커스텀 훅
 *
 * @param items - 페이지네이션할 아이템 배열
 * @param initialPage - 초기 페이지 번호 (기본: 1)
 * @param itemsPerPage - 페이지당 아이템 수 (기본: 9)
 * @returns 페이지네이션 상태, 액션, 계산된 데이터
 */
export function usePagination<T>(
  items: T[],
  initialPage: number = 1,
  itemsPerPage: number = 9
) {
  const [currentPage, setCurrentPage] = useState(initialPage)

  // 총 페이지 수
  const totalPages = useMemo(
    () => Math.ceil(items.length / itemsPerPage),
    [items.length, itemsPerPage]
  )

  // 현재 페이지의 아이템들
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return items.slice(startIndex, endIndex)
  }, [items, currentPage, itemsPerPage])

  // 페이지 그룹 계산 (1~5, 6~10 방식)
  const pageGroup = useMemo<PageGroup>(() => {
    const pageGroupSize = 5
    const currentGroup = Math.ceil(currentPage / pageGroupSize)
    const start = (currentGroup - 1) * pageGroupSize + 1
    const end = Math.min(currentGroup * pageGroupSize, totalPages)

    return {
      startPage: start,
      endPage: end,
      hasPrevGroup: start > 1,
      hasNextGroup: end < totalPages,
    }
  }, [currentPage, totalPages])

  // 페이지 범위 초과 방지
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages)
    }
  }, [currentPage, totalPages])

  // 페이지 이동 (스크롤 포함)
  const goToPage = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    },
    [totalPages]
  )

  // 1페이지로 리셋
  const resetPage = useCallback(() => {
    setCurrentPage(1)
  }, [])

  // 이전 그룹으로 이동
  const goToPrevGroup = useCallback(() => {
    if (pageGroup.hasPrevGroup) {
      goToPage(pageGroup.startPage - 1)
    }
  }, [pageGroup.hasPrevGroup, pageGroup.startPage, goToPage])

  // 다음 그룹으로 이동
  const goToNextGroup = useCallback(() => {
    if (pageGroup.hasNextGroup) {
      goToPage(pageGroup.endPage + 1)
    }
  }, [pageGroup.hasNextGroup, pageGroup.endPage, goToPage])

  // 이전 페이지로 이동
  const goToPrevPage = useCallback(() => {
    goToPage(currentPage - 1)
  }, [currentPage, goToPage])

  // 다음 페이지로 이동
  const goToNextPage = useCallback(() => {
    goToPage(currentPage + 1)
  }, [currentPage, goToPage])

  return {
    // 상태
    currentPage,
    totalPages,
    itemsPerPage,

    // 계산된 데이터
    paginatedItems,
    pageGroup,
    hasItems: items.length > 0,
    hasPagination: totalPages > 1,

    // 액션
    setCurrentPage,
    goToPage,
    resetPage,
    goToPrevPage,
    goToNextPage,
    goToPrevGroup,
    goToNextGroup,
  }
}
