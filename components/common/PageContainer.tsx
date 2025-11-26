import { ReactNode } from 'react'

interface PageContainerProps {
  children: ReactNode
}

/**
 * PageContainer - 모든 페이지를 감싸는 공통 컨테이너
 *
 * 중앙 정렬, 반응형 패딩 적용
 */
export default function PageContainer({ children }: PageContainerProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {children}
    </div>
  )
}
