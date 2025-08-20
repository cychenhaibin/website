import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useTranslation } from 'react-i18next'

interface Project {
  id: number
  title: string
  description: string
  technologies: string[]
  githubUrl: string
  stars: number
  forks: number
  image: string
}

const Projects: React.FC = () => {
  const projectsRef = useRef<HTMLDivElement>(null)
  const { t } = useTranslation()

  const projects: Project[] = [
    {
      id: 1,
      title: t('projects.items.cube.title'),
      description: t('projects.items.cube.description'),
      technologies: ["React", "TypeScript", "Tailwind CSS", "dumi"],
      githubUrl: "https://github.com/cychenhaibin/cube.git",
      stars: 1250,
      forks: 89,
      image: ""
    },
    {
      id: 2,
      title: t('projects.items.cubeai.title'),
      description: t('projects.items.cubeai.description'),
      technologies: ["React", "TypeScript", "Tailwind CSS", "WebSocket"],
      githubUrl: "https://github.com/cychenhaibin/ChatAI_FE.git",
      stars: 856,
      forks: 67,
      image: ""
    },
    {
      id: 3,
      title: t('projects.items.zhiyi.title'),
      description: t('projects.items.zhiyi.description'),
      technologies: ["Vue", "TypeScript", "Tailwind CSS"],
      githubUrl: "https://github.com/cychenhaibin/zhi_Yi.git",
      stars: 634,
      forks: 45,
      image: ""
    },
    {
      id: 4,
      title: t('projects.items.wxlxai.title'),
      description: t('projects.items.wxlxai.description'),
      technologies: ["Vue", "TypeScript", "uniapp"],
      githubUrl: "https://github.com/cychenhaibin/WX-LXAI.git",
      stars: 442,
      forks: 32,
      image: ""
    },
    // {
    //   id: 5,
    //   title: "SecureChat",
    //   description: "端到端加密的即时通讯应用，保护用户隐私和数据安全，支持群聊和文件传输",
    //   technologies: ["Flutter", "Firebase", "WebRTC", "AES-256"],
    //   githubUrl: "https://github.com/lanshanteam/secure-chat",
    //   stars: 789,
    //   forks: 56,
    //   image: ""
    // },
    // {
    //   id: 6,
    //   title: "DevOpsHub",
    //   description: "一站式DevOps工具集成平台，简化部署流程，提供完整的CI/CD解决方案",
    //   technologies: ["Go", "Docker", "Kubernetes", "React"],
    //   githubUrl: "https://github.com/lanshanteam/devops-hub",
    //   stars: 567,
    //   forks: 41,
    //   image: ""
    // }
  ]

  useEffect(() => {
    if (projectsRef.current) {
      gsap.fromTo(projectsRef.current.querySelectorAll('.project-card'),
        { y: 100, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out' }
      )
    }
  }, [])

  return (
    <div id="projects" className="min-h-screen">
      {/* 页面标题 */}
      <section className="pt-20 pb-10 px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          Camila <span className="text-gradient glow">{t('projects.titleWord')}</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          {t('projects.subtitle')}
        </p>
      </section>

      {/* 项目网格 */}
      <section ref={projectsRef} className="py-5 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="project-card group relative p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-cyan-500/50 transition-all duration-300 transform hover:scale-105 hover:bg-white/10 cursor-pointer overflow-hidden"
              >
                {/* 霓虹光效 */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* 项目图标 */}
                {/* <div className="text-5xl mb-4 text-center group-hover:scale-110 transition-transform duration-300">
                  {project.image}
                </div> */}

                {/* 项目信息 */}
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h3>

                <p className="text-gray-400 mb-4 leading-relaxed group-hover:text-gray-300 transition-colors">
                  {project.description}
                </p>

                {/* 技术标签 */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-cyan-500/20 text-cyan-400 text-sm rounded-full border border-cyan-500/30 group-hover:bg-cyan-500/30 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* GitHub统计 */}
                {/* <div className="flex items-center justify-between mb-4 text-sm text-gray-400">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center space-x-1">
                      <span>⭐</span>
                      <span>{project.stars}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <span>🔀</span>
                      <span>{project.forks}</span>
                    </span>
                  </div>
                </div> */}

                {/* 操作按钮 */}
                <div className="flex space-x-3">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-center rounded-lg hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 text-sm font-medium transform hover:scale-105"
                  >
                    {t('projects.viewSource')}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 贡献号召 */}
      {/* <section className="py-20 px-4 bg-gradient-to-t from-black/20 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {t('common.cta.joinCommunity')}
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            无论是贡献代码、报告问题，还是提出建议，我们都欢迎你的参与
          </p>
          <a
            href="https://github.com/lanshanteam"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25"
          >
            <span>🚀</span>
            <span>{t('common.cta.startContributing')}</span>
          </a>
        </div>
      </section> */}
    </div>
  )
}

export default Projects
