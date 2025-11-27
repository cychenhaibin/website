import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { gsap } from 'gsap'
import CamilaLogo from './CamilaLogo'

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      // 检测当前活跃的section
      const sections = ['home', 'team', 'projects', 'github']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // 导航动画
    gsap.fromTo('.nav-item',
      { y: -50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out'
      }
    )
  }, [])

  const { t, i18n } = useTranslation()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navItems = [
    { id: 'home', label: t('nav.home') },
    { id: 'team', label: t('nav.team') },
    { id: 'projects', label: t('nav.projects') },
    { id: 'github', label: t('nav.github') }
  ]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
    setIsMenuOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-200 ${isScrolled
          ? 'bg-white/95 border-b border-gray-200 shadow-sm'
          : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('home')}
            className="flex items-center space-x-2 text-xl font-normal text-gray-900 hover:text-[#4285F4] transition-colors group"
          >
            <CamilaLogo size={28} className="text-gray-900 group-hover:text-[#4285F4] transition-colors" />
            <span>Camila</span>
          </button>

          {/* 桌面端导航 */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`nav-item relative font-light px-4 py-2 text-sm transition-colors duration-200 ${activeSection === item.id
                    ? 'text-[#4285F4]'
                    : 'text-gray-700 hover:text-[#4285F4]'
                  }`}
              >
                {item.label}
              </button>
            ))}
            {/* 语言切换 */}
            <div className="flex items-center space-x-1 pl-2 ml-2 border-l border-gray-200">
              <button
                onClick={() => i18n.changeLanguage('zh')}
                className={`px-3 py-1.5 text-xs font-light rounded transition-colors ${i18n.language.startsWith('zh') ? 'text-[#4285F4] bg-[#4285F4]/10' : 'text-[#9aa0a6] hover:text-gray-900 hover:bg-white/5'}`}
                aria-label="切换到中文"
              >
                {t('common.lang.zh')}
              </button>
              <button
                onClick={() => i18n.changeLanguage('en')}
                className={`px-3 py-1.5 text-xs font-light rounded transition-colors ${i18n.language.startsWith('en') ? 'text-[#4285F4] bg-[#4285F4]/10' : 'text-[#9aa0a6] hover:text-gray-900 hover:bg-white/5'}`}
                aria-label="Switch to English"
              >
                {t('common.lang.en')}
              </button>
            </div>
          </nav>

          {/* 移动端菜单按钮 */}
          <button
            className="md:hidden p-2 text-gray-700 hover:text-[#4285F4] transition-colors"
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* 移动端菜单 */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
            }`}
        >
          <nav className="py-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`block w-full font-light text-left px-4 py-2 text-sm transition-colors ${activeSection === item.id
                    ? 'text-[#4285F4] bg-[#4285F4]/10 rounded'
                    : 'text-gray-700 hover:text-[#4285F4] hover:bg-gray-100 rounded'
                  }`}
              >
                {item.label}
              </button>
            ))}
            {/* 语言切换（移动端） */}
            <div className="flex items-center space-x-2 px-4 pt-2">
              <button
                onClick={() => i18n.changeLanguage('zh')}
                className={`px-3 py-1.5 text-xs font-light rounded transition-colors ${i18n.language.startsWith('zh') ? 'text-[#4285F4] bg-[#4285F4]/10' : 'text-[#9aa0a6] hover:text-gray-900 hover:bg-white/5'}`}
              >
                {t('common.lang.zh')}
              </button>
              <button
                onClick={() => i18n.changeLanguage('en')}
                className={`px-3 py-1.5 text-xs font-light rounded transition-colors ${i18n.language.startsWith('en') ? 'text-[#4285F4] bg-[#4285F4]/10' : 'text-[#9aa0a6] hover:text-gray-900 hover:bg-white/5'}`}
              >
                {t('common.lang.en')}
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
