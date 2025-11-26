'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FilterSidebarProps {
  /** 사이드바에 표시할 자식 컴포넌트들 */
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
