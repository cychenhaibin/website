import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { gsap } from 'gsap'
import CamilaLogo from './CamilaLogo'

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false)
      }
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      // 检测当前活跃的section
      const sections = ['home', 'services', 'team', 'cases', 'projects', 'github', 'contact']
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
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
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
    { id: 'services', label: t('nav.services') },
    { id: 'team', label: t('nav.team') },
    { id: 'cases', label: t('nav.cases') },
    { id: 'projects', label: t('nav.projects') },
    { id: 'github', label: t('nav.github') },
    { id: 'contact', label: t('nav.contact') }
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
      className="fixed inset-x-0 top-0 z-50 pointer-events-none"
    >
      <div
        className={`pointer-events-auto mx-auto transition-all duration-500 ease-out ${
          isScrolled
            ? 'px-3 pt-3 md:w-fit md:max-w-[calc(100vw-1.5rem)]'
            : 'max-w-7xl px-4 sm:px-6 lg:px-8 pt-0'
        }`}
      >
        <div
          className={`transition-all duration-500 ease-out ${
            isScrolled
              ? 'rounded-[9999px] bg-white/60 px-4 ring-[0.5px] ring-gray-200/80 shadow-[0_2px_16px_-6px_rgba(0,0,0,0.08),0_0_0_0.5px_rgba(0,0,0,0.02)] backdrop-blur-2xl'
              : 'px-0'
          }`}
        >
          <div className={`flex items-center md:hidden ${isScrolled ? 'h-12' : 'h-16'}`}>
            <button
              onClick={() => scrollToSection('home')}
              className="flex items-center space-x-2 text-xl font-normal text-gray-900 hover:text-[#4285F4] transition-colors group"
            >
              <CamilaLogo size={28} className="text-gray-900 group-hover:text-[#4285F4] transition-colors" />
              <span>Camila</span>
            </button>

            <button
              className="ml-auto p-2 text-gray-700 hover:text-[#4285F4] transition-colors"
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

          {isScrolled ? (
            <div className="hidden h-12 md:flex md:w-fit md:items-center md:gap-4 lg:gap-6">
              <div className="shrink-0">
                <button
                  onClick={() => scrollToSection('home')}
                  className="flex items-center space-x-2 text-xl font-normal text-gray-900 hover:text-[#4285F4] transition-colors group"
                >
                  <CamilaLogo size={28} className="text-gray-900 group-hover:text-[#4285F4] transition-colors" />
                  <span>Camila</span>
                </button>
              </div>

              <nav className="flex shrink-0 items-center justify-center space-x-0.5 lg:space-x-1 whitespace-nowrap">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`nav-item relative font-light px-4 py-2 md:py-1.5 text-sm transition-colors duration-200 ${activeSection === item.id
                        ? 'text-[#4285F4]'
                        : 'text-gray-700 hover:text-[#4285F4]'
                      }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>

              <div className="flex shrink-0 items-center space-x-1 pl-3 border-l border-gray-200">
                <button
                  onClick={() => i18n.changeLanguage('zh')}
                  className={`px-3 py-1.5 md:py-1 text-xs font-light rounded transition-colors ${i18n.language.startsWith('zh') ? 'text-[#4285F4] bg-[#4285F4]/10' : 'text-[#9aa0a6] hover:text-gray-900 hover:bg-white/5'}`}
                  aria-label="切换到中文"
                >
                  {t('common.lang.zh')}
                </button>
                <button
                  onClick={() => i18n.changeLanguage('en')}
                  className={`px-3 py-1.5 md:py-1 text-xs font-light rounded transition-colors ${i18n.language.startsWith('en') ? 'text-[#4285F4] bg-[#4285F4]/10' : 'text-[#9aa0a6] hover:text-gray-900 hover:bg-white/5'}`}
                  aria-label="Switch to English"
                >
                  {t('common.lang.en')}
                </button>
              </div>
            </div>
          ) : (
            <div className="hidden h-16 w-full md:flex md:items-center md:justify-between">
              <button
                onClick={() => scrollToSection('home')}
                className="flex items-center space-x-2 text-xl font-normal text-gray-900 hover:text-[#4285F4] transition-colors group"
              >
                <CamilaLogo size={28} className="text-gray-900 group-hover:text-[#4285F4] transition-colors" />
                <span>Camila</span>
              </button>

              <div className="flex items-center gap-4 lg:gap-6">
                <nav className="flex items-center justify-center space-x-0.5 lg:space-x-1 whitespace-nowrap">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`nav-item relative font-light px-4 py-2 md:py-1.5 text-sm transition-colors duration-200 ${activeSection === item.id
                          ? 'text-[#4285F4]'
                          : 'text-gray-700 hover:text-[#4285F4]'
                        }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </nav>

                <div className="flex shrink-0 items-center space-x-1 pl-3 border-l border-gray-200">
                  <button
                    onClick={() => i18n.changeLanguage('zh')}
                    className={`px-3 py-1.5 md:py-1 text-xs font-light rounded transition-colors ${i18n.language.startsWith('zh') ? 'text-[#4285F4] bg-[#4285F4]/10' : 'text-[#9aa0a6] hover:text-gray-900 hover:bg-white/5'}`}
                    aria-label="切换到中文"
                  >
                    {t('common.lang.zh')}
                  </button>
                  <button
                    onClick={() => i18n.changeLanguage('en')}
                    className={`px-3 py-1.5 md:py-1 text-xs font-light rounded transition-colors ${i18n.language.startsWith('en') ? 'text-[#4285F4] bg-[#4285F4]/10' : 'text-[#9aa0a6] hover:text-gray-900 hover:bg-white/5'}`}
                    aria-label="Switch to English"
                  >
                    {t('common.lang.en')}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 移动端菜单 */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden bg-white/95 backdrop-blur-sm ${isMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
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
