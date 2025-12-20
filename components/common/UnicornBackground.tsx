'use client'

import { useEffect, useRef, useState } from 'react'
import Script from 'next/script'
import { cn } from '@/lib/utils'

/**
 * UnicornBackground - Unicorn Studio 애니메이션 배경 컴포넌트
 *
 * Hero section 등의 배경으로 사용되는 애니메이션
 * Client Component로 브라우저에서 Unicorn Studio SDK 실행
 *
 * 성능 최적화:
 * - 조건부 렌더링: Chrome + 고성능 기기에서만 애니메이션 표시
 * - 뷰포트 기반 로딩: 화면에 보일 때만 애니메이션 활성화
 * - 접근성: prefers-reduced-motion 지원
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
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [shouldRenderAnimation, setShouldRenderAnimation] = useState(true)

  // 1. 조건부 렌더링: 브라우저/성능/접근성 체크
  useEffect(() => {
    // Chrome 브라우저 체크
    const isChrome = /Chrome/.test(navigator.userAgent) &&
                     /Google Inc/.test(navigator.vendor)

    // CPU 코어 수 체크 (4코어 이상 권장)
    const cpuCores = navigator.hardwareConcurrency || 0

    // 애니메이션 감소 선호도 체크 (접근성)
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    // 모든 조건 충족 시에만 애니메이션 렌더링
    const canRender = isChrome && cpuCores >= 4 && !prefersReducedMotion

    setShouldRenderAnimation(canRender)

    // 디버깅용 로그
    if (!canRender) {
      console.log('UnicornBackground: 정적 배경으로 대체', {
        isChrome,
        cpuCores,
        prefersReducedMotion,
      })
    }
  }, [])

  // 2. 뷰포트 기반 로딩: 화면에 보일 때만 애니메이션 활성화
  useEffect(() => {
    if (!shouldRenderAnimation) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting)
        })
      },
      {
        threshold: 0.3, // 30% 보일 때 활성화
        rootMargin: '0px',
      }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
      observer.disconnect()
    }
  }, [shouldRenderAnimation])

  // 3. Unicorn Studio 초기화 (화면에 보일 때만)
  useEffect(() => {
    if (isVisible && typeof window !== 'undefined' && window.UnicornStudio) {
      window.UnicornStudio.init()
    }
  }, [isVisible, projectId])

  // 스크립트 로드 완료 핸들러
  const handleScriptLoad = () => {
    if (isVisible && typeof window !== 'undefined' && window.UnicornStudio) {
      window.UnicornStudio.init()
    }
  }

  // 너비와 높이를 스타일 객체로 변환
  const containerStyle = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  }

  // 조건 미충족 시: 대체 UI (애니메이션 비디오 루프)
  if (!shouldRenderAnimation) {
    return (
      <div
        style={containerStyle}
        className={cn(
          'absolute inset-0 overflow-hidden -z-10',
          className
        )}
        aria-hidden="true"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/hero.jpg"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/hero_long.mp4" type="video/mp4" />
        </video>
      </div>
    )
  }

  // 애니메이션 렌더링
  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden -z-10">
      {/* Unicorn Studio CDN 스크립트 (조건 충족 시에만 로드) */}
      {shouldRenderAnimation && (
        <Script
          src="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.34/dist/unicornStudio.umd.js"
          strategy="lazyOnload"
          onLoad={handleScriptLoad}
        />
      )}

      {/* 애니메이션 컨테이너 (화면에 보일 때만 렌더링) */}
      {isVisible && (
        <div
          data-us-project={projectId}
          style={containerStyle}
          className={cn(
            'unicorn-container',
            'absolute inset-0 overflow-hidden',
            className
          )}
          aria-hidden="true"
        />
      )}
    </div>
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
