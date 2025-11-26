'use client'

import { cn } from '@/lib/utils'
import type { Subcategory } from '@/lib/types'

interface SubcategoryFilterProps {
  /** 표시할 중분류 목록 */
  subcategories: Subcategory[]

  /** 현재 선택된 중분류 ID (null이면 "전체") */
  selectedId: string | null

  /** 선택 변경 콜백 */
  onChange: (id: string | null) => void

  /** 전체 리소스 개수 */
  totalCount: number

  /** 각 중분류별 개수 */
  counts: Record<string, number>
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
              <span>{subcategory.name}</span>
              <span className="text-sm text-gray-500">({count})</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
