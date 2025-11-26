import { Suspense } from 'react'
import ResourcePageLayout from '@/components/resource/ResourcePageLayout'

/**
 * LifePage - 생활 정보 페이지
 *
 * ResourcePageLayout을 사용하여 생활 관련 리소스를 표시
 */

export const metadata = {
  title: '생활 정보 | HisLight',
  description: '은퇴 후 일상생활에 필요한 정보를 제공합니다',
}

export default function LifePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResourcePageLayout categoryId="life" />
    </Suspense>
  )
}
