import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'

interface YuqueStats {
  wordCount: number
  docs: number
  knowledgeBases: number
}

const Home: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null)
  const { t } = useTranslation()
  const [yuqueStats, setYuqueStats] = useState<YuqueStats>({
    wordCount: 0,
    docs: 0,
    knowledgeBases: 0
  })
  const [loading, setLoading] = useState(true)
  const [, setError] = useState<string | null>(null)

  // 计算与语雀相伴的天数
  const yuqueStartDate = '2024-08-23' // 根据362天推算的开始日期
  const daysWithYuque = dayjs().diff(dayjs(yuqueStartDate), 'day')

  // 获取语雀统计数据
  const fetchYuqueStats = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // 语雀用户名
      const username = 'cychenhaibin'
      
      // 获取用户信息
      const userResponse = await fetch(`https://www.yuque.com/api/users/${username}`)
      if (userResponse.ok) {
        const userData = await userResponse.json()
        console.log('语雀用户数据:', userData)
      }

      // 获取知识库列表
      const reposResponse = await fetch(`https://www.yuque.com/api/users/${username}/repos`)
      if (reposResponse.ok) {
        const reposData = await reposResponse.json()
        console.log('语雀知识库数据:', reposData)
        
        // 计算总文档数和字数
        let totalDocs = 0
        let totalWordCount = 0
        
        // 获取每个知识库的文档
        for (const repo of reposData.data || []) {
          try {
            const docsResponse = await fetch(`https://www.yuque.com/api/repos/${repo.id}/docs`)
            if (docsResponse.ok) {
              const docsData = await docsResponse.json()
              totalDocs += docsData.data?.length || 0
              
              // 获取每个文档的详细内容来计算字数
              for (const doc of docsData.data || []) {
                try {
                  const docDetailResponse = await fetch(`https://www.yuque.com/api/repos/${repo.id}/docs/${doc.id}`)
                  if (docDetailResponse.ok) {
                    const docDetail = await docDetailResponse.json()
                    // 计算文档字数（去除HTML标签）
                    const content = docDetail.data?.body || ''
                    const textContent = content.replace(/<[^>]*>/g, '').trim()
                    totalWordCount += textContent.length
                  }
                } catch (error) {
                  console.warn(`获取文档 ${doc.id} 详情失败:`, error)
                }
              }
            }
          } catch (error) {
            console.warn(`获取知识库 ${repo.id} 文档失败:`, error)
          }
        }
        
        setYuqueStats({
          wordCount: totalWordCount,
          docs: totalDocs,
          knowledgeBases: reposData.data?.length || 0
        })
      }
    } catch (error) {
      console.error('获取语雀数据失败:', error)
      // 如果API调用失败，使用备用数据
      setYuqueStats({
        wordCount: 1070000, // 107万字
        docs: 445,
        knowledgeBases: 22
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // 获取语雀数据
    fetchYuqueStats()
    
    // 英雄区域动画
    if (heroRef.current) {
      gsap.fromTo(heroRef.current.querySelector('.hero-title'),
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out'
        }
      )

      gsap.fromTo(heroRef.current.querySelector('.hero-subtitle'),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3,
          ease: 'power2.out'
        }
      )

      gsap.fromTo(heroRef.current.querySelector('.hero-cta'),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.6,
          ease: 'power2.out'
        }
      )
    }
  }, [])

  const features = [
    {
      icon: (
        <svg className="w-12 h-12 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: t('home.features.items.fe.title'),
      href: 'https://www.yuque.com/cychenhaibin/face',
      description: t('home.features.items.fe.description')
    },
    {
      icon: (
        <svg className="w-12 h-12 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: t('home.features.items.rd.title'),
      href: 'https://www.yuque.com/cychenhaibin/rd',
      description: t('home.features.items.rd.description')
    },
    {
      icon: (
        <svg className="w-12 h-12 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: t('home.features.items.ai.title'),
      href: 'https://www.yuque.com/cychenhaibin/ai',
      description: t('home.features.items.ai.description')
    },
    {
      icon: (
        <svg className="w-12 h-12 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      title: t('home.features.items.update.title'),
      href: '',
      description: t('home.features.items.update.description')
    }
  ]

  return (
    <div id="home" className="min-h-screen">
      {/* 英雄区域 */}
      <section
        id="home"
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      >
        {/* 动态背景装饰 */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/5 to-transparent"></div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="hero-title text-5xl md:text-7xl font-bold mb-6">
            <span className="text-gradient glow">{t('home.hero.title1')} </span>
            <span className="text-white">{t('home.hero.title2')}</span>
          </h1>

          <p className="hero-subtitle text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            {t('home.hero.subtitleLine1')}
            <br />
            <span className="text-cyan-400 font-medium text-xl">{t('home.hero.subtitleLine2')}</span>
          </p>

          <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center">
            <div className="flex space-x-4 justify-center">
              <a
                href="https://github.com/cychenhaibin"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 rounded-lg hover:bg-cyan-500/20 hover:text-cyan-400 transition-all duration-300"
                title="GitHub"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://www.yuque.com/cychenhaibin"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 rounded-lg hover:bg-cyan-500/20 hover:text-cyan-400 transition-all duration-300"
                title="语雀"
              >
                <div className="w-5 h-5">
                  {/* <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"> */}
                  <img src='https://mdn.alipayobjects.com/huamei_0prmtq/afts/img/A*PXAJTYXseTsAAAAAAAAAAAAADvuFAQ/original' alt="语雀" />
                  {/* </svg> */}
                </div>
              </a>
              <a
                href="mailto:haibinchenleo@outlook.com"
                className="p-2 bg-white/10 rounded-lg hover:bg-cyan-500/20 hover:text-cyan-400 transition-all duration-300"
                title="Email"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 特色介绍 */}
      <section id="features" className="py-10 px-4 bg-gradient-to-b from-transparent to-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center pb-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              <span className="text-gradient glow">Camila</span> <span className="text-3xl">{t('home.features.title')}</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {t('home.hero.subtitleLine2')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-cyan-500/50 transition-all duration-300 transform hover:scale-105 hover:bg-white/10 cursor-pointer"
              >
                <a href={feature.href}>
                  <div className="mb-4 text-center group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                    {feature.description}
                  </p>
                  {/* 悬停时的光效 */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 统计数据 */}
      <section className="py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {loading ? (
              <>
                <div className="col-span-2 md:col-span-4 text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
                  <p className="mt-2 text-gray-400">正在获取语雀数据...</p>
                </div>
              </>
            ) : (
              <>
            <div className="group">
              <div className="text-4xl md:text-5xl font-bold text-gradient mb-2 group-hover:scale-110 transition-transform duration-300">
                {daysWithYuque}
              </div>
              <div className="text-gray-400 group-hover:text-gray-300 transition-colors">
                {t('home.stats.daysWithYuque')}
              </div>
            </div>
            <div className="group">
              <div className="text-4xl md:text-5xl font-bold text-gradient mb-2 group-hover:scale-110 transition-transform duration-300">
                {yuqueStats.wordCount > 10000 ? `${Math.round(yuqueStats.wordCount / 10000)}W` : yuqueStats.wordCount}
              </div>
              <div className="text-gray-400 group-hover:text-gray-300 transition-colors">
                {t('home.stats.wordCount')}
              </div>
            </div>
            <div className="group">
              <div className="text-4xl md:text-5xl font-bold text-gradient mb-2 group-hover:scale-110 transition-transform duration-300">
                {yuqueStats.docs}
              </div>
              <div className="text-gray-400 group-hover:text-gray-300 transition-colors">
                {t('home.stats.docs')}
              </div>
            </div>
            <div className="group">
              <div className="text-4xl md:text-5xl font-bold text-gradient mb-2 group-hover:scale-110 transition-transform duration-300">
                {yuqueStats.knowledgeBases}
              </div>
              <div className="text-gray-400 group-hover:text-gray-300 transition-colors">
                {t('home.stats.knowledgeBases')}
              </div>
            </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
