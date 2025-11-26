import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useTranslation } from 'react-i18next'

interface GitHubStats {
  totalStars: number
  totalForks: number
  totalRepos: number
  totalCommits: number
  topLanguages: { name: string; count: number }[]
  recentActivity: { repo: string; action: string; date: string }[]
}

interface GitHubRepo {
  id: number
  name: string
  full_name: string
  description: string
  stargazers_count: number
  forks_count: number
  language: string
  updated_at: string
  pushed_at: string
}

interface GitHubUser {
  public_repos: number
  followers: number
  following: number
}

const GitHub: React.FC = () => {
  const statsRef = useRef<HTMLDivElement>(null)
  const { t } = useTranslation()
  const [stats, setStats] = useState<GitHubStats>({
    totalStars: 0,
    totalForks: 0,
    totalRepos: 0,
    totalCommits: 0,
    topLanguages: [],
    recentActivity: []
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // GitHub用户名配置
  const GITHUB_USERNAME = 'cychenhaibin' // 可以配置为实际的GitHub用户名

  // 获取GitHub用户数据
  const fetchGitHubUser = async (): Promise<GitHubUser> => {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`)
    if (!response.ok) {
      throw new Error(`获取用户数据失败: ${response.status}`)
    }
    return response.json()
  }

  // 获取GitHub仓库数据
  const fetchGitHubRepos = async (): Promise<GitHubRepo[]> => {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`)
    if (!response.ok) {
      throw new Error(`获取仓库数据失败: ${response.status}`)
    }
    return response.json()
  }

  // 获取GitHub事件数据（最近活动）
  const fetchGitHubEvents = async (): Promise<any[]> => {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events?per_page=20`)
    if (!response.ok) {
      throw new Error(`获取活动数据失败: ${response.status}`)
    }
    return response.json()
  }

  // 获取GitHub贡献数据（包含commit数量）
  const fetchGitHubContributions = async (): Promise<number> => {
    try {
      // 尝试获取用户的贡献图数据
      const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}`)
      debugger
      if (response.ok) {
        const data = await response.json()
        console.log(data)
        // 计算总的贡献数（包括commits, issues, pull requests等）
        let totalContributions = 0
        // total: {2022: 60, 2023: 13, 2024: 486, 2025: 246}
        if (data.total) {
          totalContributions = Object.values(data.total as Record<string, number>).reduce((a: number, b: number) => a + b, 0)
        }
        console.log(totalContributions)
        return totalContributions
      }
    } catch (error) {
      console.warn('无法获取贡献数据，使用备用方法:', error)
    }

    // 备用方法：通过仓库获取commit数量
    try {
      const repos = await fetchGitHubRepos()
      let totalCommits = 0
      
      // 获取前10个主要仓库的commit数量
      const topRepos = repos.slice(0, 10)
      const commitPromises = topRepos.map(async (repo) => {
        try {
          const commitResponse = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/commits?per_page=1`)
          if (commitResponse.ok) {
            const commitData = await commitResponse.json()
            // 获取总commit数量（通过Link header）
            const linkHeader = commitResponse.headers.get('Link')
            if (linkHeader) {
              const match = linkHeader.match(/page=(\d+)>; rel="last"/)
              if (match) {
                return parseInt(match[1], 10)
              }
            }
            return commitData.length
          }
        } catch (error) {
          console.warn(`获取仓库 ${repo.name} 的commit数据失败:`, error)
        }
        return 0
      })

      const commitCounts = await Promise.all(commitPromises)
      totalCommits = commitCounts.reduce((sum, count) => sum + count, 0)
      
      return totalCommits
    } catch (error) {
      console.warn('获取commit数据失败:', error)
      return 0
    }
  }

  // 处理语言统计
  const processLanguageStats = (repos: GitHubRepo[]) => {
    const languageCount: { [key: string]: number } = {}
    
    repos.forEach(repo => {
      if (repo.language) {
        languageCount[repo.language] = (languageCount[repo.language] || 0) + 1
      }
    })

    return Object.entries(languageCount)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)
  }

  // 处理最近活动
  const processRecentActivity = (events: any[]) => {
    const activities: { repo: string; action: string; date: string }[] = []

    console.log(events, 'events')
    events.forEach(event => {
      if (event.repo && event.type && event.created_at) {
        let action = ''
        switch (event.type) {
          case 'PushEvent':
            action = '推送代码'
            break
          case 'CreateEvent':
            action = event.payload.ref_type === 'repository' ? '创建仓库' : '创建分支'
            break
          case 'ForkEvent':
            action = 'Fork仓库'
            break
          case 'WatchEvent':
            action = 'Star仓库'
            break
          case 'IssuesEvent':
            action = event.payload.action === 'opened' ? '创建Issue' : '更新Issue'
            break
          case 'PullRequestEvent':
            action = event.payload.action === 'opened' ? '创建PR' : '更新PR'
            break
          default:
            action = '其他活动'
        }

        const repoName = event.repo.name
        const date = new Date(event.created_at)
        const now = new Date()
        const diffTime = Math.abs(now.getTime() - date.getTime())
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        
        let timeAgo = ''
        if (diffDays === 0) {
          const diffHours = Math.ceil(diffTime / (1000 * 60 * 60))
          timeAgo = `${diffHours}小时前`
        } else if (diffDays === 1) {
          timeAgo = '1天前'
        } else {
          timeAgo = `${diffDays}天前`
        }

        activities.push({
          repo: repoName,
          action,
          date: timeAgo
        })
      }
    })

    return activities.slice(0, 4)
  }

  // 获取所有GitHub数据
  const fetchAllGitHubData = async () => {
    try {
      setLoading(true)
      setError(null)

      const [user, repos, events, totalCommits] = await Promise.all([
        fetchGitHubUser(),
        fetchGitHubRepos(),
        fetchGitHubEvents(),
        fetchGitHubContributions()
      ])

      // 计算统计数据
      const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0)
      const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0)
      const topLanguages = processLanguageStats(repos)
      const recentActivity = processRecentActivity(events)

      setStats({
        totalStars,
        totalForks,
        totalCommits,
        totalRepos: user.public_repos,
        topLanguages,
        recentActivity
      })
    } catch (err) {
      console.error('获取GitHub数据失败:', err)
      setError(err instanceof Error ? err.message : '获取数据失败')
      
      // 如果API调用失败，使用备用数据
      const fallbackStats: GitHubStats = {
        totalStars: 3247,
        totalForks: 456,
        totalRepos: 67,
        totalCommits: 2847,
        topLanguages: [
          { name: "TypeScript", count: 15 },
          { name: "JavaScript", count: 12 },
          { name: "Python", count: 8 },
          { name: "Go", count: 6 },
          { name: "Rust", count: 4 }
        ],
        recentActivity: [
          { repo: "lanshan-ui", action: "发布新版本 v2.1.0", date: "2小时前" },
          { repo: "quantum-db", action: "合并PR #123", date: "4小时前" },
          { repo: "neural-flow", action: "修复bug #456", date: "6小时前" },
          { repo: "eco-tracker", action: "添加新功能", date: "1天前" }
        ]
      }
      setStats(fallbackStats)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAllGitHubData()
  }, [])

  useEffect(() => {
    if (!loading && stats.totalStars > 0) {
      // 数字动画
      gsap.fromTo('.stat-number',
        { textContent: 0 },
        { 
          textContent: (_index: number, target: Element) => {
            const dataValue = (target as HTMLElement).getAttribute('data-value') || '0'
            return parseInt(dataValue, 10)
          },
          duration: 2,
          ease: 'power2.out',
          snap: { textContent: 1 }
        }
      )
    }
  }, [loading, stats])

  useEffect(() => {
    if (statsRef.current && !loading) {
      gsap.fromTo(statsRef.current.querySelectorAll('.stat-card'), 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 }
      )
    }
  }, [stats, loading])

  return (
    <div id="github" className="min-h-screen">
      {/* 页面标题 */}
      <section className="pt-20 pb-10 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-normal text-gray-900 mb-6">
          GitHub{" "}
          <span className="text-gradient glow text-gray-900">
            {t("github.titleData")}
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
          {t("github.subtitle")}
        </p>
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-500 text-sm">
            注意: {error}，显示的是备用数据
          </div>
        )}
      </section>

      {/* 统计数据 */}
      <section className="py-5 px-4">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#4285F4]"></div>
              <p className="mt-4 text-gray-600 font-light">正在获取GitHub数据...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-4 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-8 mb-16" ref={statsRef}>
              <div className="stat-card text-center pt-2 md:pt-8 pb-2 md:pb-8 md:p-8 bg-white rounded-lg md:border md:border-gray-200 hover:border-[#4285F4]/50 hover:shadow-md transition-all duration-200">
                  <div className="text-2xl md:text-4xl font-light text-[#4285F4] mb-2">
                    <span className="stat-number" data-value={stats.totalStars}>
                      0
                    </span>
                  </div>
                  <div className="text-gray-900 font-light">{t("github.totalStars")}</div>
                </div>
                <div className="stat-card text-center pt-2 md:pt-8 pb-2 md:pb-8 md:p-8 bg-white rounded-lg md:border md:border-gray-200 hover:border-[#4285F4]/50 hover:shadow-md transition-all duration-200">
                  <div className="text-2xl md:text-4xl font-normal text-[#4285F4] mb-2">
                    <span className="stat-number" data-value={stats.totalForks}>
                      0
                    </span>
                  </div>
                  <div className="text-gray-900 font-light">{t("github.totalForks")}</div>
                </div>
                <div className="stat-card text-center pt-2 md:pt-8 pb-2 md:pb-8 md:p-8 bg-white rounded-lg md:border md:border-gray-200 hover:border-[#4285F4]/50 hover:shadow-md transition-all duration-200">
                  <div className="text-2xl md:text-4xl font-normal text-[#4285F4] mb-2">
                    <span className="stat-number" data-value={stats.totalRepos}>
                      0
                    </span>
                  </div>
                  <div className="text-gray-900 font-light">{t("github.repos")}</div>
                </div>
                <div className="stat-card text-center pt-2 md:pt-8 pb-2 md:pb-8 md:p-8 bg-white rounded-lg md:border md:border-gray-200 hover:border-[#4285F4]/50 hover:shadow-md transition-all duration-200">
                  <div className="text-2xl md:text-4xl font-normal text-[#4285F4] mb-2">
                    <span className="stat-number" data-value={stats.totalCommits}>
                      0
                    </span>
                  </div>
                  <div className="text-gray-900 font-light">总提交数</div>
                </div>
              </div>

              {/* 技术栈分布 & 最近活动 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="stat-card p-6 bg-white rounded-lg border border-gray-200 hover:border-[#4285F4]/40 hover:shadow-md transition-all duration-200">
                  <h3 className="text-2xl font-normal text-gray-900 mb-4">
                    {t("github.techStack")}
                  </h3>
                  <div className="space-y-4">
                    {stats.topLanguages.map((lang, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-gray-700 font-light text-sm">{lang.name}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-gray-100 rounded-full h-2">
                            <div
                              className="bg-[#4285F4] h-2 rounded-full transition-all duration-1000"
                              style={{
                                width: `${
                                  (lang.count /
                                    Math.max(...stats.topLanguages.map((l) => l.count))) *
                                  100
                                }%`,
                              }}
                            ></div>
                          </div>
                          <span className="text-[#4285F4] font-light w-8 text-right text-sm">
                            {lang.count}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 最近活动 */}
                <div className="stat-card p-6 bg-white rounded-lg border border-gray-200 hover:border-[#4285F4]/40 hover:shadow-md transition-all duration-200">
                  <h3 className="text-2xl font-normal text-gray-900 mb-4">
                    {t("github.recentActivity")}
                  </h3>
                  {stats.recentActivity.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-6 text-center text-gray-500 text-sm font-light">
                      <div className="w-10 h-10 mb-3 flex items-center justify-center text-gray-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="w-8 h-8"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={0.8}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 7.5L12 3.75l8.25 3.75M3.75 7.5V18a2.25 2.25 0 002.25 2.25h12A2.25 2.25 0 0020.25 18V7.5M3.75 7.5L12 11.25M20.25 7.5L12 11.25m0 0v8.25"
                          />
                        </svg>
                      </div>
                      <p>最近还没有公开活动</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {stats.recentActivity.map((activity, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="w-2 h-2 bg-[#4285F4] rounded-full"></div>
                          <div className="flex-1">
                            <div className="text-gray-900 text-sm font-normal">
                              {activity.repo}
                            </div>
                            <div className="text-gray-600 text-xs">
                              {activity.action}
                            </div>
                          </div>
                          <div className="text-gray-500 text-xs">{activity.date}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  )
}

export default GitHub
