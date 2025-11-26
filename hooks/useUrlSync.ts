import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

interface UrlParams {
  search?: string
  subcategory?: string | null
  page?: number
}

/**
 * URL 쿼리 파라미터 동기화를 담당하는 커스텀 훅
 *
 * 필터/페이지 상태가 변경될 때마다 URL을 자동으로 업데이트합니다.
 * 브라우저 히스토리에 영향을 주지 않도록 replace를 사용합니다.
 *
 * @param params - 동기화할 파라미터 객체
 */
export function useUrlSync(params: UrlParams) {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const urlParams = new URLSearchParams()

    // 검색어 추가
    if (params.search) {
      urlParams.set('search', params.search)
    }

    // 중분류 필터 추가
    if (params.subcategory) {
      urlParams.set('subcategory', params.subcategory)
    }

    // 페이지 번호 추가 (1페이지는 생략)
    if (params.page && params.page > 1) {
      urlParams.set('page', String(params.page))
    }

    // URL 업데이트 (히스토리에 추가하지 않음)
    const queryString = urlParams.toString()
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname

    router.replace(newUrl)
  }, [params.search, params.subcategory, params.page, router, pathname])
}
