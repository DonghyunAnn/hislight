'use client'

import { useState, useEffect } from 'react'

/**
 * 미디어 쿼리 매칭 여부를 반환하는 커스텀 훅
 *
 * @param query - CSS 미디어 쿼리 문자열 (예: "(min-width: 768px)")
 * @returns 미디어 쿼리가 매칭되는지 여부
 *
 * @example
 * const isMobile = useMediaQuery('(max-width: 640px)')
 * const isDesktop = useMediaQuery('(min-width: 1024px)')
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    // 서버 사이드 렌더링 환경 체크
    if (typeof window === 'undefined') {
      return
    }

    const media = window.matchMedia(query)

    // 초기값 설정
    setMatches(media.matches)

    // 미디어 쿼리 변경 감지
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    // 이벤트 리스너 등록
    media.addEventListener('change', listener)

    // 클린업
    return () => {
      media.removeEventListener('change', listener)
    }
  }, [query])

  return matches
}
