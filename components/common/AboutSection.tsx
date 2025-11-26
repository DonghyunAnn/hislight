import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

/**
 * AboutSection - 팀 소개, 미션, 비전 섹션
 *
 * 히어로 섹션과 카테고리 카드 사이에 위치
 * 데스크톱: 3열 그리드, 모바일: 1열 세로 스택
 */
export default function AboutSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[oklch(0.25_0.08_250)] mb-4">
            <span className="text-[oklch(0.7_0.18_90)]">HisLight</span>를 소개합니다
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            은퇴 선교사의 새로운 시작을 비추는 빛
          </p>
        </div>

        {/* 3개 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 팀 소개 카드 */}
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-2xl text-[oklch(0.7_0.18_90)]">
                팀 소개
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-base leading-relaxed text-gray-700 font-bold">
                히즈라이트는 복음의 빛을 비췄던 이들의 새로운 삶을 응원하고 조명합니다.
              </p>
              <p className="text-base leading-relaxed text-gray-700">
                히즈라이트는 은퇴 선교사의 한국 사회 재적응과 새로운 사역을 돕기 위해 시작되었습니다. 주거와 생활에 대한 정보를 쉽게 찾아볼 수 있도록 필요한 생활 정보를 한곳에 모은 리소스 허브와 카카오톡 챗봇 서비스를 제공합니다.
              </p>
              <blockquote className="mt-6 pt-4 border-t border-gray-200">
                <p className="text-base italic text-[oklch(0.25_0.08_250)] leading-relaxed">
                  "너희는 세상의 빛이라 산 위에 있는 동네가 숨겨지지 못할 것이요"
                </p>
                <cite className="block text-sm text-gray-600 mt-2 not-italic">
                  - 마태복음 5:14
                </cite>
              </blockquote>
            </CardContent>
          </Card>

          {/* 미션 카드 */}
          <Card className="hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br from-white to-[oklch(0.7_0.18_90)]/5">
            <CardHeader>
              <CardTitle className="text-2xl text-[oklch(0.7_0.18_90)]">
                미션
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base leading-relaxed text-gray-700">
                많은 선교사님들이 은퇴 후 삶을 준비하지 못한 채 사역에 전념하여, 귀국 후 경제·사회·정서적으로 큰 어려움에 직면하고 있습니다.
              </p>
              <p className="text-base leading-relaxed text-gray-700 mt-4">
                은퇴 이후에도 그들이 소명을 따라 계속해서 주님의 빛을 비출 수 있도록 그 길을 비추는 빛이 되어 따뜻하게 동행하겠습니다.
              </p>
            </CardContent>
          </Card>

          {/* 비전 카드 */}
          <Card className="hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br from-white to-[oklch(0.25_0.08_250)]/5">
            <CardHeader>
              <CardTitle className="text-2xl text-[oklch(0.7_0.18_90)]">
                비전
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg font-semibold text-[oklch(0.25_0.08_250)]">
                주의 빛을 비추는 선교사님들께 사랑의 빛을!
              </p>
              <p className="text-base leading-relaxed text-gray-700">
                히즈라이트는 은퇴 선교사가 편안하고 안정된 생활 속에서 새로운 부르심 가운데로 나아갈 수 있도록 돕습니다.
              </p>
              <p className="text-base leading-relaxed text-gray-700">
                주께 헌신한 이들이 따뜻한 사랑과 쉼을 누릴 수 있기를, 은퇴가 사역의 끝이 아닌 새로운 시작이 되기를 소망합니다.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
