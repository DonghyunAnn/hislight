'use client'

import { useState } from 'react'
import Image from 'next/image'
import PageContainer from '@/components/common/PageContainer'
import CategoryCard from '@/components/common/CategoryCard'
import AboutSection from '@/components/common/AboutSection'
import KakaoFloatingButton from '@/components/common/KakaoFloatingButton'
import UnicornBackground from '@/components/common/UnicornBackground'
import ResourceCard from '@/components/resource/ResourceCard'
import SearchBar from '@/components/resource/SearchBar'
import FilterSidebar from '@/components/resource/FilterSidebar'
import SubcategoryFilter from '@/components/resource/SubcategoryFilter'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis } from '@/components/ui/pagination'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { Home, BookOpen, Search, Mail, Lock, User, Download, Settings } from 'lucide-react'

/**
 * Components Demo Page
 * HisLight 프로젝트의 주요 컴포넌트를 시각적으로 확인하고 테스트할 수 있는 데모 페이지
 */
export default function ComponentsDemoPage() {
  // Sheet demo state
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  // SearchBar demo state
  const [searchQuery, setSearchQuery] = useState('')

  // SubcategoryFilter demo state
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null)

  // Pagination demo state
  const [currentPage, setCurrentPage] = useState(1)

  // Demo data
  const demoSubcategories = [
    { id: 'house', name: '주택 구입', categoryId: 'housing', description: '주택 구입 관련 서비스' },
    { id: 'rent', name: '전월세', categoryId: 'housing', description: '전월세 관련 서비스' },
    { id: 'loan', name: '대출/보증', categoryId: 'housing', description: '대출/보증 관련 서비스' }
  ]

  const demoSubcategoryCounts = {
    'house': 5,
    'rent': 8,
    'loan': 12
  }

  return (
    <PageContainer>
      <div className="space-y-12">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold mb-2 text-[oklch(0.25_0.08_250)]">
            Components Demo
          </h1>
          <p className="text-gray-600">
            HisLight 프로젝트의 재사용 가능한 컴포넌트들을 확인하고 반응형 테스트를 할 수 있습니다.
          </p>
        </div>

        {/* PageContainer */}
        <Card>
          <CardHeader>
            <CardTitle>PageContainer</CardTitle>
            <p className="text-sm text-gray-500 mt-2">
              components/common/PageContainer.tsx · Server Component
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600 leading-relaxed">
              모든 페이지를 감싸는 공통 컨테이너 컴포넌트. 최대 너비 제한(1280px), 중앙 정렬, 반응형 패딩을 자동으로 제공하여 일관된 레이아웃을 유지합니다.
            </p>
            <div className="bg-gray-50 border-2 border-dashed border-gray-300 p-8 rounded-lg">
              <p className="text-center text-gray-500 text-sm">
                현재 이 페이지가 PageContainer로 감싸져 있습니다.
                <br />
                max-w-7xl · mx-auto · 반응형 패딩
              </p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900 font-semibold mb-2">주요 기능</p>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• 최대 너비 1280px</li>
                <li>• 반응형 패딩 (모바일: 16px, 태블릿: 24px, PC: 32px)</li>
                <li>• 모든 페이지에서 일관된 레이아웃</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Logo */}
        <Card>
          <CardHeader>
            <CardTitle>브랜드 로고</CardTitle>
            <p className="text-sm text-gray-500 mt-2">
              public/logo.svg
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600 leading-relaxed">
              HisLight 브랜드 로고. 다양한 사이즈로 사용 가능하며 Next.js Image 컴포넌트로 최적화됩니다.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="flex flex-col items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Image src="/logo.svg" alt="Logo" width={24} height={24} />
                <p className="text-sm text-gray-600">24px</p>
              </div>
              <div className="flex flex-col items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Image src="/logo.svg" alt="Logo" width={32} height={32} />
                <p className="text-sm text-gray-600">32px</p>
              </div>
              <div className="flex flex-col items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Image src="/logo.svg" alt="Logo" width={48} height={48} />
                <p className="text-sm text-gray-600">48px</p>
              </div>
              <div className="flex flex-col items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Image src="/logo.svg" alt="Logo" width={64} height={64} />
                <p className="text-sm text-gray-600">64px</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Header */}
        <Card>
          <CardHeader>
            <CardTitle>Header</CardTitle>
            <p className="text-sm text-gray-500 mt-2">
              components/layout/Header.tsx · Client Component
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600 leading-relaxed">
              전역 헤더 컴포넌트. 로고와 네비게이션을 제공하며, 화면 크기에 따라 PC는 가로 메뉴, 모바일은 햄버거 메뉴로 표시됩니다.
            </p>
            <div className="space-y-3">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-900 mb-2">
                  <strong>PC (768px+):</strong> 로고 + 가로 네비게이션
                </p>
              </div>
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-900 mb-2">
                  <strong>Mobile (~767px):</strong> 로고 + 햄버거 메뉴
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-500 italic">
              * 페이지 상단에서 실제 동작을 확인할 수 있습니다
            </p>
          </CardContent>
        </Card>

        {/* Footer */}
        <Card>
          <CardHeader>
            <CardTitle>Footer</CardTitle>
            <p className="text-sm text-gray-500 mt-2">
              components/layout/Footer.tsx · Server Component
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600 leading-relaxed">
              전역 푸터 컴포넌트. Navy 배경색에 시편 71:18 전문과 저작권 정보를 표시합니다.
            </p>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <p className="text-sm text-purple-900 font-semibold mb-2">주요 기능</p>
              <ul className="text-sm text-purple-800 space-y-1">
                <li>• Navy 배경색 (oklch 색상 시스템)</li>
                <li>• 시편 71:18 전문 (Yellow 강조)</li>
                <li>• 현재 연도 자동 표시</li>
              </ul>
            </div>
            <p className="text-sm text-gray-500 italic">
              * 페이지 하단에서 실제 동작을 확인할 수 있습니다
            </p>
          </CardContent>
        </Card>

        {/* CategoryCard */}
        <Card>
          <CardHeader>
            <CardTitle>CategoryCard</CardTitle>
            <p className="text-sm text-gray-500 mt-2">
              components/common/CategoryCard.tsx · Server Component
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-600 leading-relaxed">
              홈페이지에서 각 카테고리로 이동하는 큰 클릭 영역을 제공하는 카드 컴포넌트.
              아이콘, 제목, 설명, 링크 개수를 표시하며 hover 시 확대 효과를 적용합니다.
            </p>

            <div>
              <h3 className="font-semibold text-lg mb-3">예시</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CategoryCard
                  title="주거"
                  description="은퇴 후 주거와 관련된 유용한 정보와 리소스를 제공합니다"
                  href="/housing"
                  icon={<Home className="w-8 h-8" />}
                  count={14}
                />
                <CategoryCard
                  title="생활"
                  description="일상 생활에 필요한 다양한 정보와 서비스를 안내합니다"
                  href="/life"
                  icon={<BookOpen className="w-8 h-8" />}
                  count={27}
                />
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900 font-semibold mb-2">주요 기능</p>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Next.js Link로 전체 카드 래핑</li>
                <li>• hover 시 scale + shadow 효과</li>
                <li>• 큰 클릭 영역으로 시니어 친화적</li>
                <li>• 부드러운 transition 애니메이션</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* ResourceCard */}
        <Card>
          <CardHeader>
            <CardTitle>ResourceCard</CardTitle>
            <p className="text-sm text-gray-500 mt-2">
              components/resource/ResourceCard.tsx · Server Component
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-600 leading-relaxed">
              개별 리소스를 카드 형태로 표시하는 컴포넌트.
              제목, 설명, 태그, 외부 링크를 포함하며 시니어 친화적인 큰 텍스트와 버튼을 사용합니다.
            </p>

            <div>
              <h3 className="font-semibold text-lg mb-3">예시</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ResourceCard
                  title="버팀목 전세자금대출"
                  description="소득과 전세금을 입력하면 받을 수 있는 대출 금액을 바로 계산해볼 수 있습니다. 자격이 되면 신청 방법도 상세히 안내합니다."
                  url="https://www.hf.go.kr"
                />
                <ResourceCard
                  title="국민연금 예상 수령액 조회"
                  description="가입 기간과 납부 금액을 기반으로 미래에 받을 수 있는 연금 금액을 미리 확인할 수 있습니다."
                  url="https://www.nps.or.kr"
                />
                <ResourceCard
                  title="시니어 일자리 지원 센터"
                  description="60세 이상 어르신을 위한 다양한 일자리 정보와 교육 프로그램을 제공하는 정부 지원 서비스입니다."
                  url="https://www.seniorsaenghwal.go.kr"
                />
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900 font-semibold mb-2">주요 기능</p>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• 큰 폰트 크기 (제목 20px, 본문 16px) - 시니어 친화적</li>
                <li>• 제목 2줄, 설명 3줄 line-clamp로 일관된 높이</li>
                <li>• 태그 배지로 필터링 가능</li>
                <li>• hover 시 scale + shadow 효과</li>
                <li>• 큰 버튼 (48px) 으로 클릭하기 쉬움</li>
                <li>• 새 탭에서 열기 (target="_blank")</li>
                <li>• ARIA 레이블로 접근성 향상</li>
                <li>• 최소 높이 280px로 일관된 그리드</li>
              </ul>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-900 font-semibold mb-2">반응형 테스트</p>
              <p className="text-sm text-green-800">
                브라우저 창 크기를 조절하여 카드가 어떻게 배치되는지 확인해보세요.
                모바일(1열), 태블릿(2열), PC(3열)로 자동 조정됩니다.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Button Component */}
        <Card>
          <CardHeader>
            <CardTitle>Button (ShadCN UI)</CardTitle>
            <p className="text-sm text-gray-500 mt-2">
              components/ui/button.tsx · Client Component
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-600 leading-relaxed">
              다양한 스타일과 크기를 지원하는 버튼 컴포넌트. CVA를 활용한 variant 시스템으로 일관된 디자인을 제공합니다.
            </p>

            {/* Variants */}
            <div>
              <h3 className="font-semibold text-lg mb-3">Variants</h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="default">Default</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
              </div>
            </div>

            {/* Sizes */}
            <div>
              <h3 className="font-semibold text-lg mb-3">Sizes</h3>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>

            {/* Icon Buttons */}
            <div>
              <h3 className="font-semibold text-lg mb-3">Icon Buttons</h3>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="icon-sm" variant="outline">
                  <Search className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="outline">
                  <Search className="h-4 w-4" />
                </Button>
                <Button size="icon-lg" variant="outline">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* With Icons */}
            <div>
              <h3 className="font-semibold text-lg mb-3">With Icons</h3>
              <div className="flex flex-wrap gap-3">
                <Button>
                  <Mail className="h-4 w-4" />
                  Email
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4" />
                  Download
                </Button>
                <Button variant="secondary">
                  <User className="h-4 w-4" />
                  Profile
                </Button>
              </div>
            </div>

            {/* Disabled State */}
            <div>
              <h3 className="font-semibold text-lg mb-3">Disabled State</h3>
              <div className="flex flex-wrap gap-3">
                <Button disabled>Disabled</Button>
                <Button variant="outline" disabled>Disabled Outline</Button>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900 font-semibold mb-2">주요 기능</p>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• 6가지 variant: default, destructive, outline, secondary, ghost, link</li>
                <li>• 6가지 size: sm, default, lg, icon-sm, icon, icon-lg</li>
                <li>• Radix UI Slot 지원 (asChild prop)</li>
                <li>• Focus-visible ring과 aria-invalid 상태 지원</li>
                <li>• 부드러운 transition 효과</li>
              </ul>
            </div>

            <div className="bg-gray-50 border border-gray-300 rounded-lg p-4">
              <p className="text-sm text-gray-700 font-mono">
                import {'{ Button }'} from &apos;@/components/ui/button&apos;
                <br />
                <br />
                &lt;Button variant=&quot;outline&quot; size=&quot;sm&quot;&gt;
                <br />
                &nbsp;&nbsp;Click me
                <br />
                &lt;/Button&gt;
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Input Component */}
        <Card>
          <CardHeader>
            <CardTitle>Input (ShadCN UI)</CardTitle>
            <p className="text-sm text-gray-500 mt-2">
              components/ui/input.tsx · Client Component
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-600 leading-relaxed">
              접근성과 스타일링이 완비된 입력 필드 컴포넌트. Focus 상태, validation 피드백, dark mode를 지원합니다.
            </p>

            {/* Basic Inputs */}
            <div>
              <h3 className="font-semibold text-lg mb-3">Basic Input Types</h3>
              <div className="space-y-3 max-w-md">
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Text Input</label>
                  <Input type="text" placeholder="Enter your name" />
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Email Input</label>
                  <Input type="email" placeholder="your@email.com" />
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Password Input</label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Search Input</label>
                  <Input type="search" placeholder="Search..." />
                </div>
              </div>
            </div>

            {/* With Icons */}
            <div>
              <h3 className="font-semibold text-lg mb-3">With Icons</h3>
              <div className="space-y-3 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input type="search" placeholder="Search resources..." className="pl-9" />
                </div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input type="email" placeholder="Email address" className="pl-9" />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input type="password" placeholder="Password" className="pl-9" />
                </div>
              </div>
            </div>

            {/* Disabled State */}
            <div>
              <h3 className="font-semibold text-lg mb-3">Disabled State</h3>
              <div className="max-w-md">
                <Input type="text" placeholder="Disabled input" disabled />
              </div>
            </div>

            {/* File Input */}
            <div>
              <h3 className="font-semibold text-lg mb-3">File Input</h3>
              <div className="max-w-md">
                <Input type="file" />
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900 font-semibold mb-2">주요 기능</p>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• 높이 36px (h-9), 적절한 padding과 border radius</li>
                <li>• Focus-visible ring 효과 (3px ring)</li>
                <li>• aria-invalid 상태 자동 스타일링</li>
                <li>• File input 커스텀 스타일링</li>
                <li>• Dark mode 지원 (dark:bg-input/30)</li>
                <li>• Placeholder 색상 자동 조정</li>
                <li>• 부드러운 transition 효과</li>
              </ul>
            </div>

            <div className="bg-gray-50 border border-gray-300 rounded-lg p-4">
              <p className="text-sm text-gray-700 font-mono">
                import {'{ Input }'} from &apos;@/components/ui/input&apos;
                <br />
                <br />
                &lt;Input
                <br />
                &nbsp;&nbsp;type=&quot;email&quot;
                <br />
                &nbsp;&nbsp;placeholder=&quot;your@email.com&quot;
                <br />
                /&gt;
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Badge Component */}
        <Card>
          <CardHeader>
            <CardTitle>Badge (ShadCN UI)</CardTitle>
            <p className="text-sm text-gray-500 mt-2">
              components/ui/badge.tsx · Client Component
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-600 leading-relaxed">
              태그나 상태를 표시하는 작은 라벨 컴포넌트. 다양한 variant를 지원하며 태그 필터링에 사용됩니다.
            </p>

            {/* Variants */}
            <div>
              <h3 className="font-semibold text-lg mb-3">Variants</h3>
              <div className="flex flex-wrap gap-3">
                <Badge variant="default">Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="destructive">Destructive</Badge>
                <Badge variant="outline">Outline</Badge>
              </div>
            </div>

            {/* With Icons */}
            <div>
              <h3 className="font-semibold text-lg mb-3">With Icons</h3>
              <div className="flex flex-wrap gap-3">
                <Badge variant="default">
                  <User className="w-3 h-3" />
                  청년
                </Badge>
                <Badge variant="secondary">
                  <Home className="w-3 h-3" />
                  주거
                </Badge>
                <Badge variant="outline">
                  <Settings className="w-3 h-3" />
                  설정
                </Badge>
              </div>
            </div>

            {/* Real Usage Example */}
            <div>
              <h3 className="font-semibold text-lg mb-3">실제 사용 예시 (ResourceCard)</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">전세</Badge>
                <Badge variant="outline">대출</Badge>
                <Badge variant="outline">무주택</Badge>
                <Badge variant="outline">청년</Badge>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900 font-semibold mb-2">주요 기능</p>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• 4가지 variant: default, secondary, destructive, outline</li>
                <li>• Rounded-full 스타일로 pill 형태</li>
                <li>• 아이콘 자동 크기 조정 (size-3)</li>
                <li>• Radix UI Slot 지원 (asChild prop)</li>
                <li>• Focus-visible과 aria-invalid 상태 지원</li>
              </ul>
            </div>

            <div className="bg-gray-50 border border-gray-300 rounded-lg p-4">
              <p className="text-sm text-gray-700 font-mono">
                import {'{ Badge }'} from &apos;@/components/ui/badge&apos;
                <br />
                <br />
                &lt;Badge variant=&quot;outline&quot;&gt;청년&lt;/Badge&gt;
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Sheet Component */}
        <Card>
          <CardHeader>
            <CardTitle>Sheet (ShadCN UI)</CardTitle>
            <p className="text-sm text-gray-500 mt-2">
              components/ui/sheet.tsx · Client Component
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-600 leading-relaxed">
              사이드에서 슬라이드되는 오버레이 패널 컴포넌트. Radix UI Dialog를 기반으로 하며, 모바일 메뉴나 필터 사이드바에 사용됩니다.
            </p>

            {/* Demo */}
            <div>
              <h3 className="font-semibold text-lg mb-3">인터랙티브 데모</h3>
              <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline">
                    <Settings className="w-4 h-4" />
                    Sheet 열기
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>설정</SheetTitle>
                    <SheetDescription>
                      프로필과 계정 설정을 변경할 수 있습니다.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="py-6 space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">이름</label>
                      <Input placeholder="홍길동" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">이메일</label>
                      <Input type="email" placeholder="example@email.com" />
                    </div>
                    <Button className="w-full">저장</Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Side Options */}
            <div>
              <h3 className="font-semibold text-lg mb-3">4가지 방향 지원</h3>
              <div className="flex flex-wrap gap-3">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm">Right (기본)</Button>
                  </SheetTrigger>
                  <SheetContent side="right">
                    <SheetHeader>
                      <SheetTitle>오른쪽</SheetTitle>
                      <SheetDescription>오른쪽에서 열립니다</SheetDescription>
                    </SheetHeader>
                  </SheetContent>
                </Sheet>

                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm">Left</Button>
                  </SheetTrigger>
                  <SheetContent side="left">
                    <SheetHeader>
                      <SheetTitle>왼쪽</SheetTitle>
                      <SheetDescription>왼쪽에서 열립니다</SheetDescription>
                    </SheetHeader>
                  </SheetContent>
                </Sheet>

                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm">Top</Button>
                  </SheetTrigger>
                  <SheetContent side="top">
                    <SheetHeader>
                      <SheetTitle>위</SheetTitle>
                      <SheetDescription>위에서 열립니다</SheetDescription>
                    </SheetHeader>
                  </SheetContent>
                </Sheet>

                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm">Bottom</Button>
                  </SheetTrigger>
                  <SheetContent side="bottom">
                    <SheetHeader>
                      <SheetTitle>아래</SheetTitle>
                      <SheetDescription>아래에서 열립니다</SheetDescription>
                    </SheetHeader>
                  </SheetContent>
                </Sheet>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900 font-semibold mb-2">주요 기능</p>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• 4가지 방향: right, left, top, bottom</li>
                <li>• 자동 오버레이와 닫기 버튼</li>
                <li>• 부드러운 슬라이드 애니메이션</li>
                <li>• 외부 클릭 또는 ESC 키로 닫기</li>
                <li>• 접근성 완비 (Radix UI 기반)</li>
              </ul>
            </div>

            <div className="bg-gray-50 border border-gray-300 rounded-lg p-4">
              <p className="text-sm text-gray-700 font-mono">
                import {'{ Sheet, SheetContent, SheetHeader, SheetTitle }'} from &apos;@/components/ui/sheet&apos;
                <br />
                <br />
                &lt;Sheet&gt;
                <br />
                &nbsp;&nbsp;&lt;SheetTrigger&gt;Open&lt;/SheetTrigger&gt;
                <br />
                &nbsp;&nbsp;&lt;SheetContent&gt;...&lt;/SheetContent&gt;
                <br />
                &lt;/Sheet&gt;
              </p>
            </div>
          </CardContent>
        </Card>

        {/* SearchBar Component */}
        <Card>
          <CardHeader>
            <CardTitle>SearchBar (Custom)</CardTitle>
            <p className="text-sm text-gray-500 mt-2">
              components/resource/SearchBar.tsx · Client Component
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-600 leading-relaxed">
              검색 기능을 제공하는 커스텀 컴포넌트. Input과 Button을 조합하여 만들었으며, debounce와 키보드 단축키를 지원합니다.
            </p>

            {/* Demo */}
            <div>
              <h3 className="font-semibold text-lg mb-3">인터랙티브 데모</h3>
              <SearchBar
                onSearch={setSearchQuery}
                placeholder="리소스를 검색해보세요..."
              />
              {searchQuery && (
                <p className="mt-3 text-sm text-gray-600">
                  검색어: <strong>{searchQuery}</strong>
                </p>
              )}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900 font-semibold mb-2">주요 기능</p>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• 300ms debounce로 성능 최적화</li>
                <li>• Cmd/Ctrl + K 단축키로 포커스</li>
                <li>• ESC 키로 검색어 초기화</li>
                <li>• 검색 아이콘과 초기화 버튼 (X)</li>
                <li>• 큰 입력 필드 (h-14) - 시니어 친화적</li>
                <li>• 접근성 레이블 포함</li>
              </ul>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-900 font-semibold mb-2">키보드 단축키</p>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• <kbd className="px-2 py-1 bg-white rounded border text-xs">Cmd/Ctrl + K</kbd>: 검색창 포커스</li>
                <li>• <kbd className="px-2 py-1 bg-white rounded border text-xs">ESC</kbd>: 검색어 초기화</li>
              </ul>
            </div>

            <div className="bg-gray-50 border border-gray-300 rounded-lg p-4">
              <p className="text-sm text-gray-700 font-mono">
                import SearchBar from &apos;@/components/resource/SearchBar&apos;
                <br />
                <br />
                &lt;SearchBar
                <br />
                &nbsp;&nbsp;onSearch={'{(query) => console.log(query)}'}
                <br />
                &nbsp;&nbsp;placeholder=&quot;검색...&quot;
                <br />
                /&gt;
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Filter Components */}
        <Card>
          <CardHeader>
            <CardTitle>Filter Components (Custom)</CardTitle>
            <p className="text-sm text-gray-500 mt-2">
              components/resource/* · Client Components
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-600 leading-relaxed">
              리소스 필터링을 위한 커스텀 컴포넌트 세트. SubcategoryFilter(라디오), FilterSidebar(반응형 레이아웃)를 포함합니다.
            </p>

            {/* SubcategoryFilter Demo */}
            <div>
              <h3 className="font-semibold text-lg mb-3">SubcategoryFilter (라디오 선택)</h3>
              <div className="max-w-md">
                <SubcategoryFilter
                  subcategories={demoSubcategories}
                  selectedId={selectedSubcategory}
                  onChange={setSelectedSubcategory}
                  totalCount={25}
                  counts={demoSubcategoryCounts}
                />
              </div>
              {selectedSubcategory && (
                <p className="mt-3 text-sm text-gray-600">
                  선택된 중분류: <strong>{demoSubcategories.find(s => s.id === selectedSubcategory)?.name}</strong>
                </p>
              )}
            </div>

            {/* FilterSidebar Demo */}
            <div>
              <h3 className="font-semibold text-lg mb-3">FilterSidebar (반응형 레이아웃)</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-3">
                  실제 사용 시 모바일에서는 접기/펼치기 버튼, 데스크톱에서는 고정 사이드바로 표시됩니다.
                </p>
                <FilterSidebar>
                  <div className="space-y-4">
                    <div className="p-3 bg-white rounded border">필터 1</div>
                    <div className="p-3 bg-white rounded border">필터 2</div>
                    <div className="p-3 bg-white rounded border">필터 3</div>
                  </div>
                </FilterSidebar>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900 font-semibold mb-2">주요 기능</p>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• <strong>SubcategoryFilter</strong>: 라디오 버튼 스타일, 단일 선택, 아이템별 개수 표시</li>
                <li>• <strong>FilterSidebar</strong>: 반응형 (모바일: 접기, 데스크톱: 고정), sticky 포지션</li>
                <li>• 모든 필터 컴포넌트는 ARIA 레이블과 role 속성으로 접근성 보장</li>
                <li>• 큰 클릭 영역과 명확한 시각적 피드백</li>
              </ul>
            </div>

            <div className="bg-gray-50 border border-gray-300 rounded-lg p-4">
              <p className="text-sm text-gray-700 font-mono">
                import SubcategoryFilter from &apos;@/components/resource/SubcategoryFilter&apos;
                <br />
                import FilterSidebar from &apos;@/components/resource/FilterSidebar&apos;
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Pagination Component */}
        <Card>
          <CardHeader>
            <CardTitle>Pagination (shadcn/ui)</CardTitle>
            <p className="text-sm text-gray-500 mt-2">
              components/ui/pagination.tsx · Server Component
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-600 leading-relaxed">
              페이지네이션 컴포넌트. 리소스 목록을 페이지 단위로 나눠서 표시할 때 사용합니다. 이전/다음 버튼, 페이지 번호, 생략 기호(...) 등을 제공합니다.
            </p>

            <div>
              <h3 className="font-semibold text-lg mb-3">기본 예시 (5페이지)</h3>
              <div className="flex flex-col items-center gap-4">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          setCurrentPage(prev => Math.max(1, prev - 1))
                        }}
                        className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                      />
                    </PaginationItem>
                    {[1, 2, 3, 4, 5].map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault()
                            setCurrentPage(page)
                          }}
                          isActive={currentPage === page}
                          className="cursor-pointer"
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          setCurrentPage(prev => Math.min(5, prev + 1))
                        }}
                        className={currentPage === 5 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
                <p className="text-sm text-gray-600">
                  현재 페이지: <strong>{currentPage}</strong> / 5
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3">생략 기호 포함 (10페이지)</h3>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>
                      2
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">10</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900 font-semibold mb-2">주요 기능</p>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• <strong>PaginationPrevious/Next</strong>: 이전/다음 페이지 버튼 (모바일에서는 아이콘만)</li>
                <li>• <strong>PaginationLink</strong>: 페이지 번호 버튼, isActive로 현재 페이지 표시</li>
                <li>• <strong>PaginationEllipsis</strong>: 페이지 생략 기호 (...)</li>
                <li>• 접근성: ARIA 레이블, 키보드 네비게이션 지원</li>
                <li>• 반응형: 모바일에서는 Previous/Next 텍스트 숨김</li>
              </ul>
            </div>

            <div className="bg-gray-50 border border-gray-300 rounded-lg p-4">
              <p className="text-sm text-gray-700 font-mono">
                import {'{ Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis }'} from &apos;@/components/ui/pagination&apos;
              </p>
            </div>
          </CardContent>
        </Card>

        {/* HoverCard + ResourceCard */}
        <Card>
          <CardHeader>
            <CardTitle>HoverCard + ResourceCard (shadcn/ui)</CardTitle>
            <p className="text-sm text-gray-500 mt-2">
              components/ui/hover-card.tsx + components/resource/ResourceCard.tsx
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-600 leading-relaxed">
              ResourceCard에 HoverCard를 적용하여 긴 설명이 잘릴 때 전체 내용을 표시합니다.
              데스크톱에서는 hover로, 모바일에서는 터치로 전체 내용을 볼 수 있습니다.
            </p>

            <div>
              <h3 className="font-semibold text-lg mb-3">실제 ResourceCard 예시</h3>
              <p className="text-sm text-gray-600 mb-4">
                카드에 마우스를 올리면 (또는 터치하면) 전체 설명이 팝업으로 표시됩니다.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ResourceCard
                  title="버팀목 전세자금대출"
                  description="소득과 전세금을 입력하면 받을 수 있는 대출 금액을 바로 계산해볼 수 있습니다. 자격이 되면 신청 방법도 상세히 안내합니다. 이 설명은 4줄을 넘어가서 ...으로 표시됩니다."
                  url="https://www.hf.go.kr"
                />
                <ResourceCard
                  title="국민연금 예상 수령액 조회"
                  description="가입 기간과 납부 금액을 기반으로 미래에 받을 수 있는 연금 금액을 미리 확인할 수 있습니다. 온라인으로 간편하게 조회 가능합니다."
                  url="https://www.nps.or.kr"
                />
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3">기본 HoverCard 예시</h3>
              <div className="flex gap-4">
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button variant="outline">hover 해보세요</Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold">HoverCard</h4>
                      <p className="text-sm text-gray-600">
                        마우스를 올리거나 터치하면 추가 정보를 표시하는 컴포넌트입니다.
                      </p>
                    </div>
                  </HoverCardContent>
                </HoverCard>

                <HoverCard>
                  <HoverCardTrigger asChild>
                    <span className="underline cursor-pointer">@shadcn</span>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="flex justify-between space-x-4">
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold">@shadcn</h4>
                        <p className="text-sm text-gray-600">
                          shadcn/ui 컴포넌트 라이브러리 제작자
                        </p>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900 font-semibold mb-2">주요 기능</p>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• <strong>데스크톱</strong>: hover 시 전체 내용 표시</li>
                <li>• <strong>모바일</strong>: 터치 시 전체 내용 표시</li>
                <li>• <strong>접근성</strong>: 키보드 네비게이션, ARIA 레이블 지원</li>
                <li>• <strong>ResourceCard 적용</strong>: 긴 설명(line-clamp-4)을 전체 표시</li>
                <li>• <strong>딜레이 설정</strong>: openDelay={`{200}`}, closeDelay={`{100}`}</li>
              </ul>
            </div>

            <div className="bg-gray-50 border border-gray-300 rounded-lg p-4">
              <p className="text-sm text-gray-700 font-mono">
                import {'{ HoverCard, HoverCardContent, HoverCardTrigger }'} from &apos;@/components/ui/hover-card&apos;
              </p>
            </div>
          </CardContent>
        </Card>

        {/* AboutSection */}
        <Card>
          <CardHeader>
            <CardTitle>AboutSection</CardTitle>
            <p className="text-sm text-gray-500 mt-2">
              components/common/AboutSection.tsx · Server Component
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-600 leading-relaxed">
              홈페이지의 About 섹션. 프로젝트 소개와 비전을 표시합니다.
            </p>

            <div>
              <h3 className="font-semibold text-lg mb-3">실제 컴포넌트</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50">
                <AboutSection />
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900 font-semibold mb-2">주요 기능</p>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• 프로젝트 비전과 목적 설명</li>
                <li>• Navy 배경색으로 브랜드 아이덴티티 강조</li>
                <li>• 시편 71:18 인용</li>
                <li>• 깔끔한 타이포그래피</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* KakaoFloatingButton */}
        <Card>
          <CardHeader>
            <CardTitle>KakaoFloatingButton</CardTitle>
            <p className="text-sm text-gray-500 mt-2">
              components/common/KakaoFloatingButton.tsx · Client Component
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-600 leading-relaxed">
              화면 우하단에 고정되는 카카오톡 플로팅 버튼. 클릭 시 카카오톡 채널로 연결됩니다.
            </p>

            <div>
              <h3 className="font-semibold text-lg mb-3">위치</h3>
              <div className="relative h-48 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                <p className="absolute top-4 left-4 text-sm text-gray-500">
                  화면
                </p>
                <div className="absolute bottom-6 right-6">
                  <KakaoFloatingButton />
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                * 실제 페이지에서는 우하단에 고정됩니다 (fixed position)
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900 font-semibold mb-2">주요 기능</p>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• 우하단 fixed 포지션 (bottom-6 right-6)</li>
                <li>• 큰 클릭 영역 (64x64px) - 시니어 친화적</li>
                <li>• Hover 시 확대 효과</li>
                <li>• 카카오톡 브랜드 컬러 (#FEE500)</li>
                <li>• 그림자 효과로 깊이감 표현</li>
                <li>• 모바일/PC 모두 반응형 지원</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* UnicornBackground */}
        <Card>
          <CardHeader>
            <CardTitle>UnicornBackground</CardTitle>
            <p className="text-sm text-gray-500 mt-2">
              components/common/UnicornBackground.tsx · Client Component
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-600 leading-relaxed">
              Unicorn Studio에서 제작된 인터랙티브 배경 애니메이션. 홈페이지 히어로 섹션의 배경으로 사용됩니다.
            </p>

            <div>
              <h3 className="font-semibold text-lg mb-3">특징</h3>
              <div className="space-y-2">
                <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                  <p className="text-sm text-purple-900">
                    <strong>Canvas 기반</strong>: Three.js/WebGL로 구현된 고성능 애니메이션
                  </p>
                </div>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-900">
                    <strong>반응형</strong>: 화면 크기에 자동으로 조정
                  </p>
                </div>
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-900">
                    <strong>최적화</strong>: lazyOnload 전략으로 성능 최적화
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-900 font-semibold mb-2">사용 위치</p>
              <ul className="text-sm text-yellow-800 space-y-1">
                <li>• 홈페이지 (`app/page.tsx`) 히어로 섹션 배경</li>
                <li>• absolute 포지션으로 콘텐츠 뒤에 배치</li>
                <li>• z-index -10으로 레이어 분리</li>
              </ul>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900 font-semibold mb-2">주요 기능</p>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Script 태그로 CDN에서 로드 (lazyOnload)</li>
                <li>• 접근성: aria-hidden으로 스크린리더에서 숨김</li>
                <li>• 반응형: w-full h-full로 부모 크기에 맞춤</li>
                <li>• 브랜드 컬러 (Yellow/Navy) 통합</li>
              </ul>
            </div>
          </CardContent>
        </Card>

      </div>
    </PageContainer>
  )
}
