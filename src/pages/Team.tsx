import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

interface InternshipExperience {
  id: number
  company: string
  position: string
  duration: string
  logo: string
  description: string
  achievements: string[]
  skills: string[]
  companyUrl?: string
  color: string
  bgGradient: string
}

const Team: React.FC = () => {
  const internshipRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const internshipExperiences: InternshipExperience[] = [
    {
      id: 1,
      company: "美团",
      position: "前端开发实习生",
      duration: "2024.06 - 2024.09",
      logo: "src/assets/meituan.jpg",
      description: "负责CRM系统的前端开发，参与用户界面优化和性能提升项目",
      achievements: [
        "优化页面加载速度提升40%",
        "重构核心组件库，提高代码复用率",
        "参与移动端适配，提升用户体验"
      ],
      skills: ["React", "TypeScript", "Ant Design", "Webpack"],
      companyUrl: "https://www.meituan.com",
      color: "from-yellow-400 to-orange-500",
      bgGradient: "from-yellow-500/10 to-orange-500/10"
    },
    {
      id: 2,
      company: "Shopee",
      position: "前端开发实习生",
      duration: "2024.03 - 2024.06",
      logo: "src/assets/shopee.jpg",
      description: "参与电商平台开发，负责商品管理系统和用户界面优化",
      achievements: [
        "开发商品管理核心功能",
        "优化购物车交互体验",
        "实现多语言国际化支持"
      ],
      skills: ["Vue.js", "Node.js", "MySQL", "Redis"],
      companyUrl: "https://shopee.com",
      color: "from-orange-400 to-red-500",
      bgGradient: "from-orange-500/10 to-red-500/10"
    },
    {
      id: 3,
      company: "智慧通",
      position: "前端开发实习生",
      duration: "2023.12 - 2024.03",
      logo: "src/assets/zhihuitong.png",
      description: "参与智慧城市平台开发，负责数据可视化和管理后台开发",
      achievements: [
        "开发数据大屏展示系统",
        "优化图表渲染性能",
        "实现拖拽式组件编辑器"
      ],
      skills: ["React", "D3.js", "ECharts", "Canvas"],
      companyUrl: "#",
      color: "from-blue-400 to-purple-500",
      bgGradient: "from-blue-500/10 to-purple-500/10"
    }
  ]

  // 切换到下一个
  const nextSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prev) => (prev + 1) % internshipExperiences.length)
    setTimeout(() => setIsTransitioning(false), 500)
  }

  // 切换到上一个
  const prevSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prev) => (prev - 1 + internshipExperiences.length) % internshipExperiences.length)
    setTimeout(() => setIsTransitioning(false), 500)
  }

  // 直接跳转到指定索引
  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentIndex) return
    setIsTransitioning(true)
    setCurrentIndex(index)
    setTimeout(() => setIsTransitioning(false), 500)
  }

  // 触摸滑动支持
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 30  // 降低滑动阈值，更容易触发
    const isRightSwipe = distance < -30

    if (isLeftSwipe) {
      nextSlide()
    } else if (isRightSwipe) {
      prevSlide()
    }
  }

  useEffect(() => {
    if (internshipRef.current) {
      // 卡片入场动画
      gsap.fromTo(internshipRef.current.querySelector('.internship-card'),
        { y: 100, opacity: 0, rotateX: 45, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out'
        }
      )
    }
  }, [currentIndex])

  // 自动播放
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000) // 5秒自动切换

    return () => clearInterval(interval)
  }, [currentIndex])

  return (
    <div id="team" className="min-h-screen">
      <section className="pt-20 pb-10 px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          <span className="text-gradient glow">实习</span> 经历
        </h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          来自不同公司的实习经历
        </p>
      </section>

      <section className="py-5 px-0 lg:px-4">
        <div className="lg:max-w-5xl lg:mx-auto">
          {/* 轮播容器 */}
          <div className="relative group">
            {/* 主轮播区域 */}
            <div 
              ref={internshipRef}
              className="relative overflow-hidden w-full"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {internshipExperiences.map((experience, index) => (
                  <div
                    key={experience.id}
                    className="internship-card group relative overflow-hidden w-full flex-shrink-0 px-4 lg:px-0"
                  >
                    {/* 主卡片容器 */}
                    <div className={`relative bg-black/40 backdrop-blur-xl rounded-2xl lg:rounded-3xl border border-white/10 hover:border-white/30 transition-all duration-700 overflow-hidden 
                      flex flex-col-reverse lg:flex-row ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                      } min-h-[calc(100vh-200px)] lg:min-h-[320px]`}>

                      {/* 动态背景渐变 */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${experience.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>

                      {/* 光效边框 */}
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                      {/* 内容区域 */}
                      <div className="relative z-10 flex-1 p-6 lg:p-8 flex flex-col justify-center">
                        {/* 公司标题 */}
                        <div className="mb-4 lg:mb-6">
                          <div className="flex items-center space-x-2 lg:space-x-3 mb-2 lg:mb-3">
                            <div className="w-2 h-2 lg:w-3 lg:h-3 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                            <span className="text-gray-400 text-xs lg:text-sm font-medium tracking-wider uppercase">
                              {experience.duration}
                            </span>
                          </div>
                          <h3 className="text-2xl lg:text-4xl font-bold text-white mb-6 lg:mb-6 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-cyan-400 transition-all duration-500">
                            {experience.company}
                          </h3>
                          <div className="relative inline-block">
                            <div className={`relative px-4 py-2 lg:px-6 lg:py-3 bg-gradient-to-r ${experience.color} text-white text-sm lg:text-base font-bold rounded-2xl shadow-xl group-hover:shadow-2xl transition-all duration-500 transform group-hover:scale-105 border border-white/20 backdrop-blur-sm overflow-hidden`}>
                              <span className="relative z-10">{experience.position}</span>
                              {/* 内部光效 */}
                              <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                              {/* 流光效果 */}
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 skew-x-12"></div>
                            </div>
                            {/* 外部光晕 */}
                            <div className={`absolute -inset-1 bg-gradient-to-r ${experience.color} rounded-2xl blur-sm opacity-0 group-hover:opacity-60 transition-opacity duration-500 -z-10`}></div>
                            {/* 装饰性小点 */}
                            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 lg:w-3 lg:h-3 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full opacity-80 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500 animate-pulse"></div>
                          </div>
                        </div>

                        {/* 描述 */}
                        <p className="text-gray-300 text-sm lg:text-base mb-4 lg:mb-6 leading-relaxed group-hover:text-white transition-colors duration-500">
                          {experience.description}
                        </p>

                        {/* 成就列表 */}
                        <div className="mb-4 lg:mb-6">
                          <h4 className="text-white font-semibold mb-2 lg:mb-3 flex items-center text-sm lg:text-base">
                            <span className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-cyan-400 rounded-full mr-2 lg:mr-3"></span>
                            核心成就
                          </h4>
                          <ul className="space-y-1.5 lg:space-y-2">
                            {experience.achievements.map((achievement, achievementIndex) => (
                              <li key={achievementIndex} className="text-gray-400 text-xs lg:text-sm flex items-start group-hover:text-gray-300 transition-colors duration-500">
                                <span className="text-cyan-400 mr-2 lg:mr-3 mt-0.5 lg:mt-1">▸</span>
                                <span className="flex-1">{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* 技能标签 */}
                        <div className="mb-4 lg:mb-6">
                          <div className="flex flex-wrap gap-2 lg:gap-3">
                            {experience.skills.map((skill, skillIndex) => (
                              <span
                                key={skillIndex}
                                className="px-3 py-1 lg:px-4 lg:py-2 bg-white/10 text-gray-300 text-xs lg:text-sm rounded-full border border-white/20 group-hover:bg-white/20 group-hover:text-white group-hover:border-cyan-400/50 transition-all duration-500 hover:scale-105"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* 图片区域 */}
                      <div className="relative w-full h-64 lg:flex-1 lg:h-auto lg:min-h-[320px] overflow-hidden">
                        {/* 图片容器 */}
                        <div className="absolute inset-0 group-hover:scale-110 transition-transform duration-700">
                          <img
                            src={experience.logo}
                            alt={experience.company}
                            className="w-full h-full object-cover"
                          />
                          {/* 图片遮罩 */}
                          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-l from-black/60 via-black/20 to-transparent lg:from-transparent lg:via-black/20 lg:to-black/60 group-hover:from-black/40 group-hover:via-black/10 group-hover:to-transparent lg:group-hover:from-transparent lg:group-hover:via-black/10 lg:group-hover:to-black/40 transition-all duration-700"></div>
                        </div>

                        {/* 装饰性几何图形 - 仅在大屏显示 */}
                        <div className="hidden lg:block absolute top-6 right-6 w-16 h-16 border-2 border-white/20 rounded-full group-hover:border-cyan-400/50 group-hover:scale-125 transition-all duration-700"></div>
                        <div className="hidden lg:block absolute bottom-6 right-6 w-10 h-10 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 rounded-lg group-hover:scale-150 group-hover:rotate-45 transition-all duration-700"></div>

                        {/* 悬停时的粒子效果 - 仅在大屏显示 */}
                        <div className="hidden lg:block absolute top-1/4 right-1/4 w-2 h-2 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-700"></div>
                        <div className="hidden lg:block absolute bottom-1/3 right-1/3 w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-700 delay-200"></div>

                        {/* 移动端底部链接 */}
                        {experience.companyUrl && experience.companyUrl !== '#' && (
                          <div className="absolute bottom-4 right-4 lg:hidden">
                            <a
                              href={experience.companyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center space-x-2 px-3 py-2 bg-black/60 backdrop-blur-sm hover:bg-black/80 text-white rounded-lg transition-all duration-300 text-sm"
                            >
                              <span>了解更多</span>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 左右箭头 - 仅桌面端显示 */}
            <button
              onClick={prevSlide}
              disabled={isTransitioning}
              className="hidden lg:block absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/60 backdrop-blur-sm hover:bg-black/80 text-white rounded-full transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed border border-white/20 hover:border-cyan-400/50 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              disabled={isTransitioning}
              className="hidden lg:block absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/60 backdrop-blur-sm hover:bg-black/80 text-white rounded-full transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed border border-white/20 hover:border-cyan-400/50 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* 指示器 */}
            {/* <div className="flex justify-center space-x-3 mt-6 lg:mt-8 px-4 lg:px-0">
              {internshipExperiences.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  disabled={isTransitioning}
                  className={`w-3 h-3 lg:w-4 lg:h-4 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-gradient-to-r from-cyan-400 to-purple-500 scale-125'
                      : 'bg-white/30 hover:bg-white/50'
                  } disabled:cursor-not-allowed`}
                />
              ))}
            </div> */}

            {/* 进度条 */}
            {/* <div className="mt-4 mx-4 lg:mx-0 bg-white/10 rounded-full h-1 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-300 rounded-full"
                style={{ width: `${((currentIndex + 1) / internshipExperiences.length) * 100}%` }}
              />
            </div> */}

            {/* 移动端滑动提示 */}
            <div className="lg:hidden flex justify-center items-center space-x-2 px-4 text-gray-400 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              <span>左右滑动切换</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Team
