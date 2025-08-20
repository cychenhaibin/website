import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { gsap } from 'gsap'

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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled
          ? 'bg-black/80 backdrop-blur-md border-b border-cyan-500/20'
          : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('home')}
            className="flex items-center space-x-2 text-2xl font-bold text-gradient glow hover:scale-105 transition-transform"
          >
            <span className="text-3xl">🏔️</span>
            <span>Camlia</span>
          </button>

          {/* 桌面端导航 */}
          <nav className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`nav-item relative px-3 py-2 text-sm font-medium transition-all duration-300 hover:text-cyan-400 ${activeSection === item.id
                    ? 'text-cyan-400'
                    : 'text-gray-300 hover:text-cyan-400'
                  }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-400 rounded-full"></span>
                )}
              </button>
            ))}
            {/* 语言切换 */}
            <div className="flex items-center space-x-2 pl-2 ml-2 border-l border-white/10">
              <button
                onClick={() => i18n.changeLanguage('zh')}
                className={`px-2 py-1 text-xs rounded ${i18n.language.startsWith('zh') ? 'text-cyan-400 bg-cyan-400/10' : 'text-gray-300 hover:text-cyan-400 hover:bg-cyan-400/10'}`}
                aria-label="切换到中文"
              >
                {t('common.lang.zh')}
              </button>
              <button
                onClick={() => i18n.changeLanguage('en')}
                className={`px-2 py-1 text-xs rounded ${i18n.language.startsWith('en') ? 'text-cyan-400 bg-cyan-400/10' : 'text-gray-300 hover:text-cyan-400 hover:bg-cyan-400/10'}`}
                aria-label="Switch to English"
              >
                {t('common.lang.en')}
              </button>
            </div>
          </nav>

          {/* 移动端菜单按钮 */}
          <button
            className="md:hidden p-2 text-gray-300 hover:text-cyan-400 transition-colors"
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
          <nav className="py-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`block w-full text-left px-3 py-2 text-base font-medium transition-colors ${activeSection === item.id
                    ? 'text-cyan-400 bg-cyan-400/10 rounded-lg'
                    : 'text-gray-300 hover:text-cyan-400 hover:bg-cyan-400/5 rounded-lg'
                  }`}
              >
                {item.label}
              </button>
            ))}
            {/* 语言切换（移动端） */}
            <div className="flex items-center space-x-2 px-3 pt-2">
              <button
                onClick={() => i18n.changeLanguage('zh')}
                className={`px-2 py-1 text-xs rounded ${i18n.language.startsWith('zh') ? 'text-cyan-400 bg-cyan-400/10' : 'text-gray-300 hover:text-cyan-400 hover:bg-cyan-400/10'}`}
              >
                {t('common.lang.zh')}
              </button>
              <button
                onClick={() => i18n.changeLanguage('en')}
                className={`px-2 py-1 text-xs rounded ${i18n.language.startsWith('en') ? 'text-cyan-400 bg-cyan-400/10' : 'text-gray-300 hover:text-cyan-400 hover:bg-cyan-400/10'}`}
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
