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
        titleWord: '工作',
        title: '经历',
        subtitle: '用时间轴的方式回顾几段工作，把「做过什么」和「解决了什么问题」讲清楚。',
        companyHomepage: '公司主页',
        position: '前端开发实习生',
        experiences: {
          oasyce: {
            company: '绿洲时空',
            description: '',
            achievements: [
              '负责到家业务核心页面重构，将首屏加载时间优化约 30%。',
              '基于业务数据梳理交互流程，推动 2 个重要功能的体验改版落地。',
              '与后端、产品、高频沟通需求，保证功能按时上线并可观测。'
            ],
            skills: ['React', 'TypeScript', '前端工程化', '性能优化', '业务抽象']
          },
          meituan: {
            company: '美团',
            description: '到家事业群',
            achievements: [
              '搭建营销活动组件库，沉淀 10+ 复用组件，减少重复开发工作量。',
              '参与 A/B 实验方案实现，支持多版本页面按配置快速切换。',
              '协助排查线上问题，优化监控埋点并输出问题复盘。'
            ],
            skills: ['React', '前端监控', 'A/B 实验', '组件化', '协同沟通']
          },
          shopee: {
            company: 'Shopee',
            description: '供应链',
            achievements: [
              '参与供应链运营平台的多个模块开发，提升内部流程效率。',
              '将零散页面重构为可配置表单与表格，提高需求响应速度。',
              '与后端约定统一的数据接口规范，降低前后端联调成本。'
            ],
            skills: ['React', '中后台设计', '表单与表格', '可配置化', '跨时区协作']
          },
          zhihuitong: {
            company: '智慧通',
            description: '数字教育',
            achievements: [
              '参与教务管理、课程排课等业务需求实现，打磨交互体验。',
              '针对弱网环境做加载与占位优化，减少页面白屏时间。',
              '帮助团队整理组件库使用规范，降低样式与交互分裂。'
            ],
            skills: ['React', 'Tailwind CSS', '教育行业理解', '体验优化', '设计协作']
          }
        }
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
        titleWord: 'Work',
        title: 'Experience',
        subtitle: 'Review several work experiences through a timeline, clearly explaining "what I did" and "what problems I solved".',
        companyHomepage: 'Company',
        position: 'Frontend Development Intern',
        experiences: {
          oasyce: {
            company: 'Oasyce',
            description: '',
            achievements: [
              'Responsible for refactoring core pages of home delivery business, optimizing first-screen loading time by approximately 30%.',
              'Organized interaction flows based on business data, and promoted the implementation of experience improvements for 2 important features.',
              'Frequently communicated with backend, product teams to ensure features were delivered on time and observable.'
            ],
            skills: ['React', 'TypeScript', 'Frontend Engineering', 'Performance Optimization', 'Business Abstraction']
          },
          meituan: {
            company: 'Meituan',
            description: 'CLC',
            achievements: [
              'Built a marketing activity component library, accumulated 10+ reusable components, reducing redundant development work.',
              'Participated in A/B testing implementation, supporting quick switching between multiple page versions via configuration.',
              'Assisted in troubleshooting production issues, optimized monitoring and produced post-mortem reports.'
            ],
            skills: ['React', 'Frontend Monitoring', 'A/B Testing', 'Componentization', 'Cross-functional Communication']
          },
          shopee: {
            company: 'Shopee',
            description: 'Supply Chain',
            achievements: [
              'Participated in developing multiple modules of the supply chain operations platform, improving internal process efficiency.',
              'Refactored scattered pages into configurable forms and tables, increasing demand response speed.',
              'Established unified data interface standards with backend, reducing frontend-backend integration costs.'
            ],
            skills: ['React', 'Admin Panel Design', 'Forms & Tables', 'Configurability', 'Cross-timezone Collaboration']
          },
          zhihuitong: {
            company: 'Zhihuitong',
            description: 'Digital Education',
            achievements: [
              'Participated in implementing business requirements such as academic management and course scheduling, refining interaction experience.',
              'Optimized loading and placeholders for weak network environments, reducing page white screen time.',
              'Helped the team organize component library usage standards, reducing style and interaction fragmentation.'
            ],
            skills: ['React', 'Tailwind CSS', 'Education Industry Understanding', 'Experience Optimization', 'Design Collaboration']
          }
        }
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


