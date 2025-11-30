/**
 * Footer - 전역 푸터 컴포넌트
 *
 * 미션 스테이트먼트, 문의처, 저작권 정보 표시
 */
export default function Footer() {
  return (
    <footer className="bg-[oklch(0.2_0.06_250)] text-white border-t border-[oklch(0.22_0.06_250)]">
      <div className="max-w-7xl mx-auto text-center py-12 px-6">
        <p className="text-lg mb-4 text-white">
          은퇴 선교사의 새로운 시작을 응원합니다
        </p>

        {/* 마태복음 5:14 */}
        <p className="text-2xl font-semibold mb-2 text-[oklch(0.85_0.15_90)]">
          너희는 세상의 빛이라
        </p>
        <p className="text-sm mb-8 text-gray-300">
          마태복음 5:14
        </p>

        <div className="space-y-2 mb-6">
          <p className="text-base text-gray-300">
            이메일 문의: <a href="mailto:kls24.hislight@gmail.com" className="hover:text-[oklch(0.7_0.18_90)] transition-colors underline decoration-gray-400 hover:decoration-[oklch(0.7_0.18_90)]">kls24.hislight@gmail.com</a>
          </p>
          <p className="text-base text-gray-300">
            카카오톡 채널: <a href="http://pf.kakao.com/_xoWKpn" target="_blank" rel="noopener noreferrer" className="hover:text-[oklch(0.7_0.18_90)] transition-colors underline decoration-gray-400 hover:decoration-[oklch(0.7_0.18_90)]">@HisLight</a>
          </p>
        </div>

        <p className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} HisLight. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
