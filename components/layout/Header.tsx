'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Menu } from 'lucide-react'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

/**
 * Header - 전역 헤더 컴포넌트
 *
 * 로고와 네비게이션 제공
 * PC: 가로 네비게이션 / 모바일: 햄버거 메뉴
 * 홈페이지: 스크롤 시 배경색과 텍스트 색상 변경
 * 하위 페이지: 처음부터 하얀 배경 고정
 */
export default function Header() {
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  const [open, setOpen] = useState(false)
  // 홈페이지가 아니면 처음부터 스크롤된 상태로 시작
  const [isScrolled, setIsScrolled] = useState(!isHomePage)

  const navLinks = [
    { href: '/', label: '홈' },
    { href: '/housing', label: '주거' },
    { href: '/life', label: '생활' },
  ]

  // 스크롤 이벤트 리스너 (홈페이지에서만 작동)
  useEffect(() => {
    // 홈페이지가 아니면 스크롤 감지 불필요
    if (!isHomePage) {
      setIsScrolled(true)
      return
    }

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isHomePage])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-[400ms] ease-in-out ${
      isScrolled
        ? 'bg-white border-b border-gray-200 shadow-sm'
        : 'bg-transparent'
    }`}>
      <div className="mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* 로고 */}
          <Link
            href="/"
            className={`flex items-center gap-2 text-xl font-bold hover:text-[oklch(0.7_0.18_90)] transition-colors ${
              isScrolled ? 'text-[oklch(0.25_0.08_250)]' : 'text-white'
            }`}
          >
            <Image
              src="/logo.svg"
              alt="HisLight Logo"
              width={32}
              height={32}
              priority
            />
            <span>HisLight</span>
          </Link>

          {/* PC 네비게이션 */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-lg font-medium hover:text-[oklch(0.7_0.18_90)] transition-colors px-4 py-2 ${
                  isScrolled ? 'text-gray-700' : 'text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* 모바일 햄버거 메뉴 */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                aria-label="메뉴 열기"
                className={`${
                  isScrolled
                    ? 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                    : 'text-white hover:text-white hover:bg-white/10'
                }`}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2 text-[oklch(0.25_0.08_250)]">
                  <Image
                    src="/logo.svg"
                    alt="HisLight Logo"
                    width={24}
                    height={24}
                  />
                  <span>HisLight</span>
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-lg font-medium text-gray-700 hover:text-[oklch(0.7_0.18_90)] transition-colors py-3 px-4 rounded-md hover:bg-gray-50"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
