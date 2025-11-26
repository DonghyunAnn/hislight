import { useState, useMemo } from 'react'
import categoriesData from '@/data/categories.json'
import subcategoriesData from '@/data/subcategories.json'
import resourcesData from '@/data/resources.json'
import type { Category, Subcategory, Resource } from '@/lib/types'

interface UseResourceFilterOptions {
  search?: string
  subcategoryId?: string | null
}

/**
 * 리소스 필터링을 담당하는 커스텀 훅
 *
 * @param categoryId - 카테고리 ID ("housing" 또는 "life")
 * @param initialFilters - 초기 필터 값
 * @returns 필터 상태, 액션, 필터링된 데이터
 */
export function useResourceFilter(
  categoryId: string,
  initialFilters?: UseResourceFilterOptions
) {
  // 데이터 로드
  const categories = categoriesData as Category[]
  const subcategories = subcategoriesData as Subcategory[]
  const resources = resourcesData as Resource[]

  // 필터 상태
  const [searchQuery, setSearchQuery] = useState(initialFilters?.search || '')
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<string | null>(
    initialFilters?.subcategoryId || null
  )

  // 현재 카테고리
  const currentCategory = useMemo(
    () => categories.find(c => c.id === categoryId),
    [categoryId, categories]
  )

  // 카테고리별 subcategories
  const categorySubcategories = useMemo(
    () => subcategories.filter(s => s.categoryId === categoryId),
    [categoryId, subcategories]
  )

  // 카테고리별 resources
  const categoryResources = useMemo(() => {
    return resources.filter(r => {
      const subcategory = subcategories.find(s => s.id === r.subcategoryId)
      return subcategory?.categoryId === categoryId
    })
  }, [categoryId, resources, subcategories])

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
        r.description.toLowerCase().includes(lowerQuery)
      )
    }

    return result
  }, [categoryResources, selectedSubcategoryId, searchQuery])

  // 중분류별 리소스 개수
  const subcategoryCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    categoryResources.forEach(r => {
      counts[r.subcategoryId] = (counts[r.subcategoryId] || 0) + 1
    })
    return counts
  }, [categoryResources])

  // 필터 초기화
  const resetFilters = () => {
    setSearchQuery('')
    setSelectedSubcategoryId(null)
  }

  return {
    // 상태
    searchQuery,
    selectedSubcategoryId,

    // 액션
    setSearchQuery,
    setSelectedSubcategoryId,
    resetFilters,

    // 데이터
    currentCategory,
    categorySubcategories,
    categoryResources,
    filteredResources,
    subcategoryCounts,
    totalCount: categoryResources.length,
    filteredCount: filteredResources.length
  }
}
