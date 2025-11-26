import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  zh: {
    translation: {
      nav: {
        home: '首页',
        team: '经历',
        projects: '项目',
        github: 'GitHub'
      },
      home: {
        hero: {
          title1: 'Camila',
          title2: 'Site',
          subtitleLine1: '重庆邮电大学 - 计算机科学与技术',
          subtitleLine2: '热爱前端开发，追求极致用户体验'
        },
        features: {
          title: '的语雀有什么',
          items: {
            fe: {
              title: 'FE 面试小站',
              description: '专注于前端面试题的收集和整理，帮助大家更好地准备面试'
            },
            rd: {
              title: 'RD 小站',
              description: '富含了计算机所学的所有课程笔记和研发基础知识'
            },
            ai: {
              title: 'AI 赋能',
              description: '先驯服AI者先享受世界'
            },
            update: {
              title: '持续更新',
              description: '持续更新...'
            }
          }
        },
        stats: {
          daysWithYuque: '和语雀相伴',
          wordCount: '创作字数',
          docs: '文档',
          knowledgeBases: '知识库'
        }
      },
      team: {
        title: '工作经历',
        subtitle: '用时间轴的方式回顾几段工作'
      },
      projects: {
        titleWord: '项目',
        subtitle: '探索LanshanTeam精心打造的开源项目，每一个都凝聚着我们的技术热情和创新精神',
        viewSource: '查看源码',
        items: {
          cube: {
            title: 'Cube',
            description: '一个以 AI 为中心的 React 组件库，人机协作相辅相成'
          },
          cubeai: {
            title: 'ChatAI',
            description: '面向 AI 交互的聊天应用界面，提供友好高效的聊天体验'
          },
          zhiyi: {
            title: '智忆',
            description: '联合大模型的待办提取 APP'
          },
          wxlxai: {
            title: 'WX-LXAI',
            description: '在微信小程序、移动 App 与 PC 平台提供一致的 ChatAI 体验'
          }
        }
      },
      github: {
        titleData: '数据',
        subtitle: '实时追踪我们的开源项目表现和社区活跃度',
        totalStars: '总星标数',
        totalForks: '总Fork数',
        repos: '开源仓库',
        techStack: '技术栈分布',
        recentActivity: '最近活动',
        visit: '访问GitHub',
        star: '给个Star'
      },
      common: {
        cta: {
          joinCommunity: '加入我们的开源社区',
          startContributing: '开始贡献'
        },
        lang: {
          zh: '中文',
          en: 'English'
        }
      },
      footer: {
        brand: {
          description: '热爱前端开发，追求极致用户体验我相信技术的力量可以改变世界。'
        },
        quickLinks: '快速链接',
        contactMe: '联系我',
        copyright: '保留所有权利',
        madeWith: 'Made with ❤️ in China'
      }
    }
  },
  en: {
    translation: {
      nav: {
        home: 'Home',
        team: 'Experience',
        projects: 'Projects',
        github: 'GitHub'
      },
      home: {
        hero: {
          title1: 'Camila',
          title2: 'Site',
          subtitleLine1: 'CQUPT - Computer Science and Technology',
          subtitleLine2: 'Passionate about frontend, striving for ultimate UX'
        },
        features: {
          title: "'s Yuque Highlights",
          items: {
            fe: {
              title: 'FE Interview Hub',
              description: 'Curated frontend interview questions to help you prepare better'
            },
            rd: {
              title: 'RD Hub',
              description: 'Notes on CS curriculum and foundational engineering knowledge'
            },
            ai: {
              title: 'AI Empowerment',
              description: 'Notes on learning and leveraging AI'
            },
            update: {
              title: 'Keep Updating',
              description: 'Keep updating...'
            }
          }
        },
        stats: {
          daysWithYuque: 'Days with Yuque',
          wordCount: 'Words',
          docs: 'Docs',
          knowledgeBases: 'Knowledge Bases'
        }
      },
      team: {
        title: 'Internship Experience',
        subtitle: 'Internship experience from different companies'
      },
      projects: {
        titleWord: 'Projects',
        subtitle: 'Explore LanshanTeam open-source projects crafted with our passion and innovation',
        viewSource: 'View Source',
        items: {
          cube: {
            title: 'Cube',
            description: 'An AI-centric React component library with human assistance as a supplementary element.'
          },
          cubeai: {
            title: 'ChatAI',
            description: 'A chatbot interface for AI interaction, providing a user-friendly and efficient chat experience.'
          },
          zhiyi: {
            title: 'ZhiYi',
            description: 'A to-do extraction app powered by large language models.'
          },
          wxlxai: {
            title: 'WX-LXAI',
            description: 'A ChatAI implemented across WeChat Mini Program, mobile app, and desktop platforms.'
          }
        }
      },
      github: {
        titleData: 'Stats',
        subtitle: 'Track our OSS performance and community activity in real time',
        totalStars: 'Total Stars',
        totalForks: 'Total Forks',
        repos: 'Repositories',
        techStack: 'Tech Stack',
        recentActivity: 'Recent Activity',
        visit: 'Visit GitHub',
        star: 'Give a Star'
      },
      common: {
        cta: {
          joinCommunity: 'Join our open-source community',
          startContributing: 'Get Started'
        },
        lang: {
          zh: '中文',
          en: 'English'
        }
      },
      footer: {
        brand: {
          description: 'Passionate about frontend development, pursuing ultimate user experience. I believe in the power of technology to change the world.'
        },
        quickLinks: 'Quick Links',
        contactMe: 'Contact Me',
        copyright: 'All rights reserved',
        madeWith: 'Made with ❤️ in China'
      }
    }
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'zh',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false
    }
  })

export default i18n


