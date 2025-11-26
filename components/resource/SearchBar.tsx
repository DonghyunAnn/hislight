'use client'

import { useState, useCallback, useEffect } from 'react'
import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface SearchBarProps {
  /** 검색어 변경 콜백 */
  onSearch: (query: string) => void

  /** 플레이스홀더 텍스트 */
  placeholder?: string

  /** 초기 검색어 (URL 쿼리에서 복원용) */
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

  // Escape 키로 초기화
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setQuery('')
    }
  }, [])

  // Ctrl/Cmd + K 단축키
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        document.getElementById('resource-search')?.focus()
      }
    }

    window.addEventListener('keydown', handleGlobalKeyDown)
    return () => window.removeEventListener('keydown', handleGlobalKeyDown)
  }, [])

  return (
    <div role="search" className="relative w-full max-w-2xl mb-8">
      {/* 검색 아이콘 */}
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />

      {/* 입력 필드 */}
      <Input
        id="resource-search"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
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
