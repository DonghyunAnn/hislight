import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface CategoryCardProps {
  title: string
  description: string
  href: string
  icon?: React.ReactNode
  count?: number
  variant?: 'yellow' | 'navy' | 'default'
}

/**
 * CategoryCard - 홈페이지 카테고리 카드
 *
 * 카테고리로 연결되는 큰 클릭 영역 제공
 * hover 시 scale + shadow 효과
 */
export default function CategoryCard({
  title,
  description,
  href,
  icon,
  count,
  variant = 'default',
}: CategoryCardProps) {
  // variant에 따른 그라데이션 클래스
  const gradientClass = {
    yellow: 'bg-gradient-to-br from-white to-[oklch(0.7_0.18_90)]/5',
    navy: 'bg-gradient-to-br from-white to-[oklch(0.25_0.08_250)]/5',
    default: '',
  }[variant]

  return (
    <Link href={href} className="block group">
      <Card className={cn(
        "h-full min-h-[200px] flex flex-col transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 hover:border-[oklch(0.7_0.18_90)]",
        gradientClass
      )}>
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              {icon && (
                <div className="text-[oklch(0.7_0.18_90)] flex-shrink-0">
                  {icon}
                </div>
              )}
              <div>
                <CardTitle className="text-2xl text-[oklch(0.25_0.08_250)]">
                  {title}
                </CardTitle>
                {count !== undefined && (
                  <span className="text-sm text-gray-500 mt-1 inline-block">
                    ({count}개)
                  </span>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-gray-600 text-lg leading-relaxed">
            {description}
          </p>
        </CardContent>
        <CardFooter>
          <div className="flex items-center gap-2 text-[oklch(0.7_0.18_90)] font-medium group-hover:gap-4 transition-all">
            <span>더 보기</span>
            <ArrowRight className="w-5 h-5" />
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
