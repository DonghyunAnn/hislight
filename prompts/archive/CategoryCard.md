# CategoryCard 컴포넌트

## 위치
`components/CategoryCard.tsx`

## 타입
Server Component

## Props
```typescript
interface CategoryCardProps {
  title: string
  description: string
  href: string
  icon?: React.ReactNode
  count?: number
}
```

## Task List

- [x] shadcn Card 사용 ✅
- [x] Next.js Link로 전체 카드 래핑 ✅
- [x] 아이콘 + 제목 + 설명 + 링크 개수 표시 ✅
- [x] hover 효과 (scale, shadow) ✅
- [x] 큰 클릭 영역 (min-h-[200px]) ✅
- [x] transition 애니메이션 ✅
- [x] 화살표 아이콘 추가 (ArrowRight) ✅

## 구현 완료 ✅

## 레이아웃
```
<Link href={href}>
  <Card className="hover:scale-105 hover:shadow-xl transition">
    <CardHeader>
      {icon}
      <CardTitle>{title}</CardTitle>
      {count && <span className="text-sm">({count}개)</span>}
    </CardHeader>
    <CardContent>
      <p>{description}</p>
    </CardContent>
    <CardFooter>
      더 보기 <ArrowRight />
    </CardFooter>
  </Card>
</Link>
```
