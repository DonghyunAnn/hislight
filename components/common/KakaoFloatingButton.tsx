'use client'

import { Button } from '@/components/ui/button'
import KakaoTalkIcon from '@/components/icons/KakaoTalkIcon'

/**
 * KakaoFloatingButton - 카카오톡 챗봇 플로팅 버튼
 *
 * 화면 우측 하단에 고정되는 플로팅 버튼
 * 카카오톡 채널로 연결
 */

// 카카오톡 채널 ID
// 형식: http://pf.kakao.com/_your_channel_id
const KAKAO_CHANNEL_ID = '_xoWKpn'

export default function KakaoFloatingButton() {
  const handleClick = () => {
    if (!KAKAO_CHANNEL_ID) {
      alert('카카오톡 채널이 준비 중입니다. 문의는 kls24.hislight@gmail.com으로 부탁드립니다.')
      return
    }

    // 카카오톡 채널로 이동
    window.open(`http://pf.kakao.com/${KAKAO_CHANNEL_ID}`, '_blank')
  }

  return (
    <Button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-[#FEE500] hover:bg-[#FDD835] text-[#3C1E1E]"
      size="icon"
      aria-label="카카오톡 챗봇 열기"
    >
      <KakaoTalkIcon size={28} />
    </Button>
  )
}
