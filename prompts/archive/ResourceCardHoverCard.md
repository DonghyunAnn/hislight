# ResourceCard HoverCard 구현 가이드

## 📋 개요

### 목적
ResourceCard에서 긴 설명이 `...`으로 잘리는 문제를 HoverCard로 해결하여 전체 내용을 표시합니다.

### 목표
- **문제**: 설명이 4줄 이상일 때 `line-clamp-4`로 잘림
- **해결**: HoverCard로 전체 내용 표시
- **UX**: 데스크톱(hover) + 모바일(click) 모두 지원
- **대상**: 50+ 사용자 친화적

---

## 🎯 현재 상태 vs 개선 후

### 현재 (문제)
```
┌─────────────────────┐
│ 버팀목 전세자금대출  │
│                     │
│ 소득과 전세금을     │
│ 입력하면 받을 수... │  ← 4줄 이후 잘림
│                     │
│ [방문하기]          │
└─────────────────────┘
```

### 개선 후 (HoverCard)
```
┌─────────────────────┐
│ 버팀목 전세자금대출  │ ← hover/click
│                     │
│ 소득과 전세금을     │
│ 입력하면 받을 수... │
│                     │
│ [방문하기]          │
└─────────────────────┘
         ↓
┌──────────────────────────┐
│ 버팀목 전세자금대출      │
│ ────────────────────────│
│ 소득과 전세금을 입력하면│
│ 받을 수 있는 대출 금액을│
│ 바로 계산해볼 수        │
│ 있습니다. 자격이 되면   │
│ 신청 방법도 상세히      │
│ 안내합니다.             │
│                         │
│ 🔗 www.hf.go.kr         │
└──────────────────────────┘
```

---

## ✅ 구현 체크리스트

### Phase 1: shadcn/ui HoverCard 설치

- [ ] **1.1. HoverCard 컴포넌트 설치**
  ```bash
  npx shadcn@latest add hover-card
  ```
  - 설치 위치 확인: `components/ui/hover-card.tsx`
  - 의존성 확인: `@radix-ui/react-hover-card`

- [ ] **1.2. 설치 확인**
  ```typescript
  import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from '@/components/ui/hover-card'
  ```

---

### Phase 2: ResourceCard 수정

- [ ] **2.1. HoverCard import 추가**
  ```typescript
  import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from '@/components/ui/hover-card'
  ```

- [ ] **2.2. 카드 콘텐츠를 HoverCard로 감싸기**
  ```typescript
  <Card>
    <HoverCard openDelay={200} closeDelay={100}>
      <HoverCardTrigger asChild>
        <div>
          <CardHeader>
            <CardTitle className="line-clamp-2">
              {title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="line-clamp-4">
              {description}
            </p>
          </CardContent>
        </div>
      </HoverCardTrigger>

      <HoverCardContent
        className="w-80 p-4"
        side="top"
        align="center"
      >
        <div className="space-y-3">
          <h3 className="font-semibold text-lg">
            {title}
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            {description}
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <ExternalLink className="w-3 h-3" />
            <span className="truncate">{url}</span>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>

    <CardFooter>
      {/* 방문하기 버튼 */}
    </CardFooter>
  </Card>
  ```

- [ ] **2.3. 스타일 조정**
  - HoverCard 너비: `w-80` (320px)
  - 패딩: `p-4`
  - 위치: `side="top"` (카드 위에 표시)
  - 정렬: `align="center"`

---

### Phase 3: 접근성 개선

- [ ] **3.1. ARIA 레이블 추가**
  ```typescript
  <HoverCardTrigger
    asChild
    aria-label={`${title} 전체 내용 보기`}
  >
  ```

- [ ] **3.2. 키보드 네비게이션 테스트**
  - Tab으로 HoverCard 트리거 포커스
  - Space/Enter로 HoverCard 열기
  - Escape로 HoverCard 닫기

- [ ] **3.3. 스크린리더 호환성**
  - HoverCard가 열릴 때 내용 읽힘 확인
  - role 속성 확인

---

### Phase 4: 모바일 최적화

- [ ] **4.1. 터치 이벤트 지원**
  - 모바일에서 카드 터치 시 HoverCard 표시
  - 외부 터치 시 HoverCard 닫힘

- [ ] **4.2. HoverCard 크기 조정**
  ```typescript
  <HoverCardContent
    className="w-[90vw] max-w-80"  // 모바일: 90vw, 데스크톱: 최대 320px
  >
  ```

- [ ] **4.3. 위치 조정 (모바일)**
  - 화면 밖으로 나가지 않도록 자동 조정
  - `side="top"` 또는 `side="bottom"` 동적 선택

---

### Phase 5: UX 개선

- [ ] **5.1. 애니메이션 추가**
  ```typescript
  <HoverCardContent
    className="animate-in fade-in-0 zoom-in-95"
  >
  ```

- [ ] **5.2. 딜레이 설정**
  ```typescript
  <HoverCard
    openDelay={200}   // 200ms 후 열림
    closeDelay={100}  // 100ms 후 닫힘
  >
  ```

- [ ] **5.3. 시각적 구분**
  - HoverCard 배경: 흰색
  - 그림자: `shadow-lg`
  - 테두리: `border`

---

### Phase 6: 스타일링

- [ ] **6.1. HoverCard 내부 레이아웃**
  ```typescript
  <div className="space-y-3">
    {/* 제목 */}
    <h3 className="font-semibold text-lg text-[oklch(0.25_0.08_250)]">
      {title}
    </h3>

    {/* 구분선 */}
    <div className="border-t border-gray-200" />

    {/* 전체 설명 */}
    <p className="text-sm text-gray-600 leading-relaxed">
      {description}
    </p>

    {/* URL 프리뷰 */}
    <div className="flex items-center gap-2 text-xs text-gray-500 pt-2 border-t border-gray-100">
      <ExternalLink className="w-3 h-3" />
      <span className="truncate">{new URL(url).hostname}</span>
    </div>
  </div>
  ```

- [ ] **6.2. 브랜드 컬러 적용**
  - 제목: `text-[oklch(0.25_0.08_250)]` (네이비)
  - 구분선: `border-gray-200`
  - 설명: `text-gray-600`

- [ ] **6.3. 반응형 폰트 크기**
  - 제목: `text-lg` (18px)
  - 설명: `text-sm` (14px)
  - URL: `text-xs` (12px)

---

## 🧪 테스트 체크리스트

### 기능 테스트
- [ ] 데스크톱: hover 시 HoverCard 표시
- [ ] 모바일: 터치 시 HoverCard 표시
- [ ] HoverCard 외부 클릭 시 닫힘
- [ ] Escape 키로 HoverCard 닫힘
- [ ] 전체 설명이 잘림 없이 표시됨
- [ ] URL 프리뷰가 올바르게 표시됨

### 접근성 테스트
- [ ] Tab 키로 HoverCard 트리거 포커스 가능
- [ ] Space/Enter로 HoverCard 열림
- [ ] 스크린리더가 내용 읽음
- [ ] ARIA 레이블 확인

### 반응형 테스트
- [ ] 모바일 (375px)
- [ ] 태블릿 (768px)
- [ ] 데스크톱 (1280px)
- [ ] HoverCard가 화면 밖으로 안 나감

### 성능 테스트
- [ ] HoverCard 열림/닫힘이 부드러움
- [ ] 애니메이션 끊김 없음
- [ ] 다수의 카드에서도 성능 저하 없음

---

## 🎨 디자인 스펙

### HoverCard 크기
```
최소 너비: 280px
최대 너비: 320px
모바일: 90vw
패딩: 16px (p-4)
```

### 색상
```typescript
배경: bg-white
테두리: border border-gray-200
그림자: shadow-lg
제목: text-[oklch(0.25_0.08_250)]
설명: text-gray-600
URL: text-gray-500
```

### 타이포그래피
```typescript
제목: font-semibold text-lg (18px)
설명: text-sm leading-relaxed (14px)
URL: text-xs (12px)
```

### 애니메이션
```typescript
열림: fade-in-0 zoom-in-95
duration: 200ms
닫힘: fade-out-0 zoom-out-95
duration: 100ms
```

---

## 🔧 코드 예시

### 최종 구현 (ResourceCard.tsx)

```typescript
import { ExternalLink } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'

interface ResourceCardProps {
  title: string
  description: string
  url: string
}

export default function ResourceCard({
  title,
  description,
  url
}: ResourceCardProps) {
  return (
    <Card className="group h-full min-h-[280px] flex flex-col transition-all duration-200 hover:scale-[1.02] hover:shadow-xl border-2 hover:border-[oklch(0.7_0.18_90)]">
      <HoverCard openDelay={200} closeDelay={100}>
        <HoverCardTrigger
          asChild
          aria-label={`${title} 전체 내용 보기`}
        >
          <div className="cursor-help">
            <CardHeader>
              <CardTitle className="text-xl text-[oklch(0.25_0.08_250)] line-clamp-2">
                {title}
              </CardTitle>
            </CardHeader>

            <CardContent className="flex-grow">
              <p className="text-gray-700 text-base leading-relaxed line-clamp-4">
                {description}
              </p>
            </CardContent>
          </div>
        </HoverCardTrigger>

        <HoverCardContent
          className="w-[90vw] max-w-80 p-4 animate-in fade-in-0 zoom-in-95"
          side="top"
          align="center"
        >
          <div className="space-y-3">
            {/* 제목 */}
            <h3 className="font-semibold text-lg text-[oklch(0.25_0.08_250)]">
              {title}
            </h3>

            {/* 구분선 */}
            <div className="border-t border-gray-200" />

            {/* 전체 설명 */}
            <p className="text-sm text-gray-600 leading-relaxed">
              {description}
            </p>

            {/* URL 프리뷰 */}
            <div className="flex items-center gap-2 text-xs text-gray-500 pt-2 border-t border-gray-100">
              <ExternalLink className="w-3 h-3" />
              <span className="truncate">
                {new URL(url).hostname}
              </span>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>

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

## 🚨 트러블슈팅

### 문제 1: HoverCard가 화면 밖으로 나감
**증상**: 모바일에서 HoverCard가 화면 밖으로 튀어나옴
**해결**:
```typescript
<HoverCardContent
  className="w-[90vw] max-w-80"
  sideOffset={5}
  collisionPadding={10}
>
```

### 문제 2: 모바일에서 HoverCard가 안 열림
**증상**: 터치 시 반응 없음
**해결**: Radix UI는 기본적으로 터치 이벤트 지원. 확인 사항:
- `asChild` prop 확인
- 부모 요소에 `pointer-events-none` 없는지 확인

### 문제 3: HoverCard와 방문하기 버튼 충돌
**증상**: HoverCard 트리거 영역이 버튼과 겹침
**해결**:
```typescript
<HoverCardTrigger asChild>
  <div className="cursor-help">
    {/* CardHeader + CardContent만 */}
  </div>
</HoverCardTrigger>

{/* CardFooter는 HoverCard 밖에 */}
<CardFooter>
  {/* 방문하기 버튼 */}
</CardFooter>
```

### 문제 4: HoverCard 열림이 너무 빠름
**증상**: 카드에 살짝만 닿아도 HoverCard가 열림
**해결**:
```typescript
<HoverCard
  openDelay={300}  // 300ms로 증가
  closeDelay={100}
>
```

---

## 📚 참고 자료

- [shadcn/ui HoverCard](https://ui.shadcn.com/docs/components/hover-card)
- [Radix UI HoverCard](https://www.radix-ui.com/primitives/docs/components/hover-card)
- [WCAG Hover Content](https://www.w3.org/WAI/WCAG21/Understanding/content-on-hover-or-focus.html)

---

## ✨ 추가 개선 사항 (옵션)

### 옵션 1: 아이콘 표시
HoverCard를 열 수 있다는 것을 시각적으로 표시:
```typescript
<CardHeader className="relative">
  <CardTitle className="line-clamp-2">
    {title}
  </CardTitle>
  <Info className="absolute top-2 right-2 w-4 h-4 text-gray-400" />
</CardHeader>
```

### 옵션 2: 긴 설명만 HoverCard 적용
짧은 설명은 HoverCard 불필요:
```typescript
const isLongDescription = description.length > 100

{isLongDescription ? (
  <HoverCard>
    {/* HoverCard 버전 */}
  </HoverCard>
) : (
  <div>
    {/* 일반 버전 */}
  </div>
)}
```

### 옵션 3: 이미지 프리뷰
URL의 og:image 표시:
```typescript
<HoverCardContent>
  <img src={ogImage} alt="" className="w-full h-32 object-cover rounded" />
  <div className="space-y-3">
    {/* 내용 */}
  </div>
</HoverCardContent>
```

---

## 🚀 완료 기준

- [ ] 모든 Phase 체크리스트 완료
- [ ] 모든 테스트 통과
- [ ] 데스크톱 + 모바일 모두 정상 작동
- [ ] 접근성 검증 완료
- [ ] 50+ 사용자 테스트 완료
- [ ] 코드 리뷰 완료

---

**구현 시작 날짜**:
**구현 완료 예정일**:
**담당자**: Claude Code
**우선순위**: 🟡 Medium (UX 개선)
