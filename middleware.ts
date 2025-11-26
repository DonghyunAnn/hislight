import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Middleware - 프로덕션 환경에서 개발용 페이지 접근 차단
 */
export function middleware(request: NextRequest) {
  // 프로덕션에서 /components-demo 접근 시 홈으로 리다이렉트
  if (
    process.env.NODE_ENV === 'production' &&
    request.nextUrl.pathname === '/components-demo'
  ) {
    return NextResponse.redirect(new URL('/', request.url))
  }
}

// /components-demo 경로에만 미들웨어 적용
export const config = {
  matcher: '/components-demo',
}
