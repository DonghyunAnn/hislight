# UnicornBackground 컴포넌트 구현 가이드

## 목적
Unicorn Studio 애니메이션을 Hero section 배경으로 사용하기 위한 컴포넌트

## 파일 경로
```
components/common/UnicornBackground.tsx
```

## 요구사항

### 기술 스펙
- **컴포넌트 타입**: Client Component (`'use client'`)
- **이유**: Unicorn Studio 스크립트가 브라우저에서 실행되어야 함
- **Next.js Script 컴포넌트 사용**: 최적화된 스크립트 로딩

### Props 인터페이스
```typescript
interface UnicornBackgroundProps {
  projectId: string        // Unicorn Studio 프로젝트 ID
  width?: string | number  // 컨테이너 너비 (기본값: '100%')
  height?: string | number // 컨테이너 높이 (기본값: '100%')
  className?: string       // 추가 CSS 클래스
}
```

### 구현 상세

#### 1. 컴포넌트 구조
```typescript
'use client'

import { useEffect } from 'react'
import Script from 'next/script'

export default function UnicornBackground({
  projectId,
  width = '100%',
  height = '100%',
  className = '',
}: UnicornBackgroundProps) {
  // 구현 내용
}
```

#### 2. 스크립트 로딩
- Next.js `Script` 컴포넌트 사용
- `strategy="lazyOnload"` - 페이지 로드 후 로딩
- Unicorn Studio CDN URL 사용
- 버전: v1.4.34

#### 3. 초기화 로직
- `useEffect`로 Unicorn Studio 초기화
- `window.UnicornStudio` 객체 확인
- 중복 초기화 방지

#### 4. 스타일링
- 컨테이너: `relative` 포지셔닝
- z-index: `-10` (배경으로 배치)
- overflow: `hidden` (넘치는 애니메이션 숨김)
- 너비/높이: props로 전달받은 값 사용

#### 5. 접근성
- `aria-hidden="true"` - 장식용 배경이므로 스크린 리더에서 숨김
- 콘텐츠에 영향을 주지 않도록 포인터 이벤트 비활성화 고려

### 사용 예시

```typescript
// app/page.tsx
import UnicornBackground from '@/components/common/UnicornBackground'

export default function HomePage() {
  return (
    <div className="relative">
      <UnicornBackground
        projectId="seRhGTp37F9i7NC3OC8T"
        height={900}
        className="absolute inset-0"
      />
      <div className="relative z-10">
        {/* Hero section 콘텐츠 */}
      </div>
    </div>
  )
}
```

## 구현 체크리스트

### Phase 1: 컴포넌트 기본 구조
- [ ] `components/common/UnicornBackground.tsx` 파일 생성
- [ ] Client Component 선언 (`'use client'`)
- [ ] Props 인터페이스 정의
- [ ] 기본 컴포넌트 함수 작성

### Phase 2: 스크립트 로딩
- [ ] Next.js Script 컴포넌트 import
- [ ] Unicorn Studio CDN 스크립트 추가
- [ ] strategy="lazyOnload" 설정
- [ ] 스크립트 로드 완료 핸들러 추가

### Phase 3: 초기화 로직
- [ ] useEffect 훅 구현
- [ ] window.UnicornStudio 존재 확인
- [ ] UnicornStudio.init() 호출
- [ ] 중복 초기화 방지 로직

### Phase 4: 스타일링
- [ ] 컨테이너 div 구현
- [ ] data-us-project 속성 설정
- [ ] 반응형 너비/높이 처리
- [ ] z-index 배경 배치
- [ ] className prop 병합 (cn 유틸리티 사용)

### Phase 5: 접근성
- [ ] aria-hidden="true" 추가
- [ ] pointer-events 처리 확인

### Phase 6: 통합
- [ ] app/page.tsx의 Hero section 수정
- [ ] UnicornBackground 배경으로 배치
- [ ] Hero 콘텐츠 z-index 조정
- [ ] 반응형 레이아웃 확인

### Phase 7: 테스트
- [ ] 개발 서버에서 동작 확인
- [ ] 애니메이션 로딩 확인
- [ ] 콘텐츠 가독성 확인 (텍스트가 잘 보이는지)
- [ ] 모바일 반응형 테스트
- [ ] 빌드 테스트 (npm run build)

## 주의사항

### 1. 텍스트 가독성
- 배경 애니메이션과 텍스트 대비가 충분한지 확인
- 필요시 텍스트에 반투명 배경 또는 텍스트 섀도우 추가
- WCAG AAA 대비 기준 유지

### 2. 성능
- lazyOnload로 초기 페이지 로드 최적화
- 애니메이션이 성능에 영향을 주지 않는지 확인
- 모바일 디바이스에서 테스트

### 3. 콘텐츠 우선순위
- 배경 애니메이션은 장식용
- 콘텐츠가 항상 읽을 수 있어야 함
- 접근성 저해하지 않도록 주의

### 4. Globals.css 워터마크 제거
- 이미 globals.css에 Unicorn Studio 워터마크 숨김 CSS 있음
- 개발/테스트 목적으로만 사용
- Unicorn Studio ToS 확인 필요

## 향후 개선 사항

### 1. 로딩 상태
- 애니메이션 로딩 중 placeholder 표시
- Skeleton UI 고려

### 2. 에러 처리
- 스크립트 로드 실패 시 fallback
- 콘솔 에러 핸들링

### 3. 프로젝트 ID 관리
- 환경 변수로 관리 고려
- 다양한 프로젝트 ID 지원

### 4. 성능 모니터링
- 애니메이션 FPS 측정
- 리소스 사용량 확인

## 참고사항

### Unicorn Studio
- 웹 기반 애니메이션 플랫폼
- JavaScript SDK 제공
- CDN을 통한 스크립트 로딩
- 프로젝트 ID로 특정 애니메이션 로드

### Next.js Script 컴포넌트
- `strategy="beforeInteractive"`: 페이지 로드 전
- `strategy="afterInteractive"`: 페이지 로드 후 (기본값)
- `strategy="lazyOnload"`: 모든 리소스 로드 후
- `strategy="worker"`: Web Worker에서 실행

### z-index 레이어 구조
```
z-index: -10   (UnicornBackground)
z-index: 0     (기본 콘텐츠)
z-index: 10    (Hero section 콘텐츠)
z-index: 50    (Header - sticky)
```

## 디자인 고려사항

### 50+ 사용자를 위한 배려
1. **애니메이션 속도**: 너무 빠르지 않게
2. **대비**: 텍스트 가독성 최우선
3. **단순함**: 과도한 애니메이션 지양
4. **안정감**: 부드럽고 차분한 움직임

### 브랜드 색상 조화
- Primary Yellow: oklch(0.7 0.18 90)
- Secondary Navy: oklch(0.25 0.08 250)
- 애니메이션이 브랜드 색상과 조화를 이루는지 확인
