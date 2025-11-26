# ResourceCard.md

## 컴포넌트 개요

**목적**: Resource 데이터를 카드 형태로 시각화하여 사용자에게 정보를 제공하고 외부 링크로 연결

**위치**: `components/resource/ResourceCard.tsx`

**타입**: 프레젠테이션 컴포넌트 (Presentational Component)

---

## Props 정의

```typescript
interface ResourceCardProps {
  /** 리소스 제목 (20자 이내) */
  title: string

  /** 리소스 상세 설명 (100자 내외) */
  description: string

  /** 외부 링크 URL */
  url: string

  /** 태그 배열 */
  tags: string[]
}
```

---

## UI 구조

```
┌─────────────────────────────────────┐
│ 버팀목 전세자금대출                  │ ← title (20px, bold)
├─────────────────────────────────────┤
│ 소득과 전세금을 입력하면 받을 수     │
│ 있는 대출 금액을 바로 계산해볼 수    │ ← description
│ 있습니다. 자격이 되면...            │    (16px, 3줄 제한)
├─────────────────────────────────────┤
│ #전세 #대출 #무주택 #청년            │ ← tags (badges)
├─────────────────────────────────────┤
│         [방문하기 →]                 │ ← CTA button
└─────────────────────────────────────┘
```

---

## 기능 요구사항

### 1. 카드 레이아웃
- **최소 높이**: 280px
- **여백**: padding 24px
- **테두리**: border 1px solid gray-200
- **모서리**: rounded-lg (8px)
- **그림자**: hover 시 shadow-lg

### 2. Title 표시
- **폰트 크기**: 20px
- **폰트 굵기**: semibold (600)
- **색상**: oklch(0.25 0.08 250) - Navy
- **줄 제한**: 2줄 (line-clamp-2)
- **말줄임**: 넘치면 "..." 표시

### 3. Description 표시
- **폰트 크기**: 16px
- **줄 높이**: 1.6 (leading-relaxed)
- **색상**: gray-700
- **줄 제한**: 3줄 (line-clamp-3)
- **여백**: 상단 12px

### 4. Tags 표시
- **레이아웃**: flex-wrap (여러 줄 허용)
- **간격**: gap 8px
- **스타일**: Badge 컴포넌트 사용 (shadcn/ui)
- **색상**: 기본 secondary variant
- **최대 표시**: 모든 태그 표시

### 5. 방문하기 버튼
- **전체 너비**: w-full
- **높이**: 48px (큰 클릭 영역)
- **스타일**: outline variant
- **색상**: Primary Yellow
- **아이콘**: ExternalLink (lucide-react)
- **동작**:
  - 새 탭에서 열기 (target="_blank")
  - rel="noopener noreferrer"

### 6. 호버 효과
```typescript
// Card hover
- scale: 1.02 (확대)
- shadow: shadow-xl
- transition: duration-200

// Button hover
- background: oklch(0.95 0.05 90)
- color: oklch(0.6 0.18 90)
```

---

## 접근성 (Accessibility)

### ARIA 속성
```typescript
<article role="article" aria-labelledby={titleId}>
  <h3 id={titleId}>{title}</h3>
  <p>{description}</p>
  <div role="list" aria-label="태그">
    {tags.map(tag => <span role="listitem">{tag}</span>)}
  </div>
  <a
    href={url}
    aria-label={`${title} 페이지로 이동`}
  >
    방문하기
  </a>
</article>
```

### 키보드 네비게이션
- Tab으로 카드 내 버튼 접근
- Enter/Space로 링크 활성화

### 시각적 피드백
- Focus 시 outline 표시
- 고대비 모드 지원

---

## 스타일링 가이드

### Tailwind Classes
```typescript
<Card className="
  group
  h-full
  min-h-[280px]
  flex
  flex-col
  transition-all
  duration-200
  hover:scale-[1.02]
  hover:shadow-xl
  border-2
  hover:border-[oklch(0.7_0.18_90)]
">
```

### shadcn/ui 컴포넌트 사용
- `Card`, `CardHeader`, `CardTitle`, `CardContent`, `CardFooter`
- `Badge` (태그 표시용)

---

## 구현 예시

```typescript
import { ExternalLink } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function ResourceCard({
  title,
  description,
  url,
  tags
}: ResourceCardProps) {
  return (
    <Card className="group h-full min-h-[280px] flex flex-col transition-all duration-200 hover:scale-[1.02] hover:shadow-xl border-2 hover:border-[oklch(0.7_0.18_90)]">
      <CardHeader>
        <CardTitle className="text-xl text-[oklch(0.25_0.08_250)] line-clamp-2">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-grow">
        <p className="text-gray-700 text-base leading-relaxed line-clamp-3">
          {description}
        </p>

        <div className="flex flex-wrap gap-2 mt-4">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full h-12 text-[oklch(0.7_0.18_90)] hover:text-[oklch(0.6_0.18_90)] font-medium border border-[oklch(0.7_0.18_90)] rounded-md hover:bg-[oklch(0.95_0.05_90)] transition-colors"
          aria-label={`${title} 페이지로 이동`}
        >
          방문하기
          <ExternalLink className="w-4 h-4" />
        </a>
      </CardFooter>
    </Card>
  )
}
```

---

## 테스트 시나리오

1. **긴 제목 처리**: 20자 이상 제목이 2줄로 제한되고 말줄임 표시
2. **긴 설명 처리**: 100자 이상 설명이 3줄로 제한되고 말줄임 표시
3. **태그 많을 때**: 5개 이상 태그가 여러 줄로 wrap
4. **링크 동작**: 새 탭에서 올바른 URL 열림
5. **호버 효과**: 마우스 오버 시 확대 및 그림자 효과
6. **키보드 접근**: Tab으로 버튼 접근 후 Enter로 링크 이동

---

## 시니어 친화적 고려사항

### 큰 텍스트
- 제목 20px (일반적인 16px보다 큼)
- 본문 16px (일반적인 14px보다 큼)

### 명확한 시각적 구분
- 각 섹션 명확히 구분
- 고대비 색상 사용

### 큰 클릭 영역
- 버튼 높이 48px (최소 44px 권장보다 큼)
- 전체 너비 버튼

### 명확한 레이블
- "방문하기" 명확한 액션 동사
- 아이콘으로 외부 링크 표시

---

## 개발 체크리스트

- [x] Props 타입 정의 (Resource 타입 사용)
- [x] shadcn/ui Card, Badge 컴포넌트 설치
- [x] lucide-react ExternalLink 아이콘 사용
- [x] line-clamp 스타일 적용 (제목 2줄, 설명 3줄)
- [x] hover 애니메이션 구현 (scale, shadow)
- [x] 새 탭 열기 설정 (target, rel)
- [x] ARIA 레이블 추가
- [ ] 반응형 테스트 (mobile, tablet, desktop)
