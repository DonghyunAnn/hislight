import { Suspense } from 'react'
import ResourcePageLayout from '@/components/resource/ResourcePageLayout'

/**
 * HousingPage - 주거 정보 페이지
 *
 * ResourcePageLayout을 사용하여 주거 관련 리소스를 표시
 */

export const metadata = {
  title: '주거 정보 | HisLight',
  description: '은퇴 후 주거와 관련된 정보를 제공합니다',
}

export default function HousingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResourcePageLayout categoryId="housing" />
    </Suspense>
  )
}
