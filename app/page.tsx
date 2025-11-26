import Image from 'next/image'
import { Home, BookOpen } from 'lucide-react'
import PageContainer from '@/components/common/PageContainer'
import CategoryCard from '@/components/common/CategoryCard'
import UnicornBackground from '@/components/common/UnicornBackground'
import AboutSection from '@/components/common/AboutSection'

/**
 * HomePage - 메인 랜딩 페이지
 *
 * Hero 섹션과 카테고리 카드 표시
 */
export default function HomePage() {
  return (
    <>
      {/* Hero Section with Animated Background - Full Width */}
      <div className="relative h-screen w-full flex items-center overflow-hidden">
        {/* Unicorn Studio 배경 애니메이션 - 높이를 늘려 워터마크를 화면 밖으로 */}
        <UnicornBackground
          projectId="KJW2rH7O15F5WUxxdd5w"
          height={1100}
        />

        {/* 좌측 하단 메시지 */}
        <div className="absolute bottom-8 left-8 z-10 max-w-2xl text-left">
          <h2 className="text-4xl md:text-5xl font-bold text-[oklch(0.25_0.08_250)] mb-4 leading-tight drop-shadow-md">
            세상에 <span className="text-[oklch(0.7_0.18_90)]">빛</span>을 비춰주었던 당신의 길<br />
            그 길을 비춰줄 새로운 <span className="text-[oklch(0.7_0.18_90)]">빛</span>
          </h2>
          <blockquote className="mt-6 text-lg md:text-xl text-gray-700 leading-relaxed drop-shadow-sm">
            <p className="mb-2">
              오! 하나님,<br />
              내가 늙고 머리가 희어졌다고 나를 버리지 마소서
            </p>
            <p className="mb-2">
              내가 늙어 죽을 때까지<br />
              내 후손에게 주의 크신 능력을 전하겠습니다.
            </p>
            <cite className="block text-sm text-gray-600 mt-2 not-italic">
              - 시편 71:18
            </cite>
          </blockquote>
        </div>
      </div>

      {/* About Section - Team Introduction, Mission, Vision */}
      <AboutSection />

      {/* Category Cards - Contained Width */}
      <div className="relative z-0 bg-white">
        <PageContainer>
          {/* 카테고리 섹션 헤더 */}
          <div className="text-center pt-16 mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-[oklch(0.25_0.08_250)] leading-tight">
              필요한 <span className="text-[oklch(0.7_0.18_90)]">주거, 생활</span> 정보를 한곳에서
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <CategoryCard
              title="주거"
              description="임대주택, 내집마련, 주택자금, 주거복지 등 주거 생활 정보"
              href="/housing"
              icon={<Home className="w-8 h-8" />}
              variant="yellow"
            />
            <CategoryCard
              title="생활"
              description="복지혜택, 건강관리, 행정민원, 상담 등 생활 전반의 정보"
              href="/life"
              icon={<BookOpen className="w-8 h-8" />}
              variant="navy"
            />
          </div>
        </PageContainer>
      </div>
    </>
  )
}
