import { ExternalLink } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'

interface ResourceCardProps {
  /** 리소스 제목 (20자 이내) */
  title: string

  /** 리소스 상세 설명 (100자 내외) */
  description: string

  /** 외부 링크 URL */
  url: string
}

export default function ResourceCard({
  title,
  description,
  url
}: ResourceCardProps) {
  // URL에서 도메인 추출
  const getHostname = (urlString: string) => {
    try {
      return new URL(urlString).hostname
    } catch {
      return urlString
    }
  }

  return (
    <Card className="group h-full min-h-[280px] flex flex-col transition-all duration-200 hover:scale-[1.02] hover:shadow-xl border-2 hover:border-[oklch(0.7_0.18_90)]">
      <HoverCard openDelay={200} closeDelay={100}>
        <HoverCardTrigger
          asChild
          aria-label={`${title} 전체 내용 보기`}
        >
          <div className="cursor-help flex-grow flex flex-col">
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
                {getHostname(url)}
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
