# Header 컴포넌트

## 위치
`components/Header.tsx`

## 타입
Client Component ('use client')

## Task List

- [x] LighthouseIcon + "HisLight" 텍스트 로고 배치 ✅
- [x] nav 태그로 메인 네비게이션 구현 (홈/주거/생활) ✅
- [x] Next.js Link 사용 ✅
- [x] sticky top-0 포지션 적용 ✅
- [x] 큰 폰트 사이즈 (text-xl 이상) ✅
- [x] 배경색 white, border-bottom 추가 ✅
- [x] 모바일: 햄버거 메뉴 (shadcn Sheet 사용) ✅
- [x] PC: 가로 네비게이션 ✅
- [x] 넉넉한 패딩 (px-6 py-4) ✅
- [x] z-index로 다른 요소 위에 표시 ✅

## 구현 완료 ✅

## 레이아웃
```
<header className="sticky top-0 z-50 bg-white border-b">
  <div className="container flex justify-between items-center">
    <Link href="/">
      <LighthouseIcon /> HisLight
    </Link>
    <nav>
      <Link href="/">홈</Link>
      <Link href="/housing">주거</Link>
      <Link href="/life">생활</Link>
    </nav>
  </div>
</header>
```
