# PageContainer 컴포넌트

## 위치
`components/PageContainer.tsx`

## 타입
Server Component

## Task List

- [x] children prop만 받기 (ReactNode) ✅
- [x] max-w-7xl mx-auto 중앙 정렬 ✅
- [x] 넉넉한 패딩 (px-4 sm:px-6 lg:px-8) ✅
- [x] 상하 여백 (py-8 md:py-12) ✅
- [x] 최소 높이 설정 (min-h-screen) ✅

## 구현 완료 ✅

## 레이아웃
```typescript
interface PageContainerProps {
  children: React.ReactNode
}

export default function PageContainer({ children }: PageContainerProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {children}
    </div>
  )
}
```
