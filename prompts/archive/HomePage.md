# HomePage

## 위치
`app/page.tsx`

## 타입
Server Component

## Task List

- [x] Hero 섹션 구현 (제목 + 설명) ✅
- [x] 브랜드 로고 큰 사이즈로 표시 (logo.svg) ✅
- [x] 시편 71:18 인용구 포함 ✅
- [x] CategoryCard 2개 배치 (주거, 생활) ✅
- [x] grid-cols-1 md:grid-cols-2 레이아웃 ✅
- [x] 넉넉한 간격 (gap-8) ✅
- [x] PageContainer로 래핑 ✅
- [x] 텍스트 중앙 정렬 ✅
- [x] Header와 Footer 추가 ✅

## 구현 완료 ✅

## 레이아웃
```
<PageContainer>
  <div className="text-center mb-12">
    <LighthouseIcon className="w-24 h-24 mx-auto" />
    <h1 className="text-4xl font-bold">HisLight</h1>
    <p className="text-xl">은퇴 후 삶을 안내하는 등대</p>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    <CategoryCard title="주거" href="/housing" ... />
    <CategoryCard title="생활" href="/life" ... />
  </div>
</PageContainer>
```
