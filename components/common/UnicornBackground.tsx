'use client'

import { useEffect } from 'react'
import Script from 'next/script'
import { cn } from '@/lib/utils'

/**
 * UnicornBackground - Unicorn Studio 애니메이션 배경 컴포넌트
 *
 * Hero section 등의 배경으로 사용되는 애니메이션
 * Client Component로 브라우저에서 Unicorn Studio SDK 실행
 */

interface UnicornBackgroundProps {
  /** Unicorn Studio 프로젝트 ID */
  projectId: string
  /** 컨테이너 너비 (기본값: '100%') */
  width?: string | number
  /** 컨테이너 높이 (기본값: '100%') */
  height?: string | number
  /** 추가 CSS 클래스 */
  className?: string
}

export default function UnicornBackground({
  projectId,
  width = '100%',
  height = '100%',
  className = '',
}: UnicornBackgroundProps) {
  // Unicorn Studio 초기화
  useEffect(() => {
    // 스크립트가 로드되고 UnicornStudio 객체가 있는지 확인
    if (typeof window !== 'undefined' && window.UnicornStudio) {
      // 페이지 이동 후에도 다시 초기화되도록 매번 init 호출
      window.UnicornStudio.init()
    }
  }, [projectId])

  // 스크립트 로드 완료 핸들러
  const handleScriptLoad = () => {
    if (typeof window !== 'undefined' && window.UnicornStudio) {
      window.UnicornStudio.init()
    }
  }

  // 너비와 높이를 스타일 객체로 변환
  const containerStyle = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  }

  return (
    <>
      {/* Unicorn Studio CDN 스크립트 */}
      <Script
        src="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.34/dist/unicornStudio.umd.js"
        strategy="lazyOnload"
        onLoad={handleScriptLoad}
      />

      {/* 애니메이션 컨테이너 */}
      <div
        data-us-project={projectId}
        style={containerStyle}
        className={cn(
          'unicorn-container',
          'absolute inset-0 overflow-hidden',
          '-z-10', // 배경으로 배치
          className
        )}
        aria-hidden="true" // 장식용 배경이므로 스크린 리더에서 숨김
      />
    </>
  )
}

// TypeScript 타입 확장 (window.UnicornStudio)
declare global {
  interface Window {
    UnicornStudio?: {
      init: () => void
    }
  }
}
