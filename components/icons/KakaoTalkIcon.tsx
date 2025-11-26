/**
 * KakaoTalkIcon - 카카오톡 말풍선 로고 아이콘
 *
 * 카카오톡의 상징적인 말풍선 모양 SVG 아이콘
 */

interface KakaoTalkIconProps {
  className?: string
  size?: number
}

export default function KakaoTalkIcon({
  className = '',
  size = 24
}: KakaoTalkIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="카카오톡 로고"
    >
      {/* 카카오톡 말풍선 */}
      <path d="M12 3C6.477 3 2 6.477 2 11c0 2.758 1.64 5.19 4.156 6.697-.176.64-.653 2.385-.747 2.754-.113.447.164.44.345.32.148-.098 2.347-1.558 3.243-2.154C9.66 18.86 10.81 19 12 19c5.523 0 10-3.477 10-8s-4.477-8-10-8z" />
    </svg>
  )
}
