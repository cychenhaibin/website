import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  zh: {
    translation: {
      nav: {
        home: '首页',
        services: '服务',
        team: '经历',
        cases: '案例',
        projects: '项目',
        github: 'GitHub',
        contact: '联系'
      },
      home: {
        eyebrow: '',
        hero: {
          badge: '全栈工程师 / AI 应用开发者 / 开源作者',
          title1: 'Camila',
          title2: 'Site',
          subtitleLine1: '重庆邮电大学 - 计算机科学与技术',
          subtitleLine2: '热爱全栈开发，追求极致用户体验',
          summary: '专注 Web/APP 产品、AI 应用与个人官网定制，完整交付。',
          primaryCta: '发起合作',
          secondaryCta: '查看服务',
          availability: '当前开放：个人官网、活动页、AI 应用全栈、技术顾问合作'
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
      services: {
        eyebrow: 'Services',
        titleWord: '合作',
        title: '服务',
        subtitle: '如果你需要一个可靠的前端/后端伙伴，我可以从 0 到 1 帮你把产品页面做出来，也可以接入现有团队协作交付。',
        items: {
          website: {
            title: '个人官网 / 品牌站',
            description: '面向个人 IP、工作室或小团队，打造更有辨识度的官网与作品展示页面。'
          },
          ai: {
            title: 'AI 应用全栈',
            description: '聚焦对话、工作流、知识库、智能表单等 AI 场景，把产品想法快速做成可用界面。'
          },
          activity: {
            title: '活动页 / 营销页',
            description: '兼顾视觉表现与转化效率，适合产品发布、招募页、专题页和业务推广页面。'
          },
          consultant: {
            title: '全栈顾问支持',
            description: '帮助梳理组件化、性能优化、交互体验和工程质量，适合短期咨询或阶段性协作。'
          }
        }
      },
      team: {
        eyebrow: 'Experience',
        titleWord: '工作',
        title: '经历',
        subtitle: '实习 && 工作',
        companyHomepage: '公司主页',
        position: '前端开发',
        experiences: {
          shopee2: {
            company: 'Shopee',
            description: '供应链',
            achievements: [
              '参与供应链运营平台的多个模块开发，提升内部流程效率。',
              '将零散页面重构为可配置表单与表格，提高需求响应速度。',
              '与后端约定统一的数据接口规范，降低前后端联调成本。'
            ],
            skills: ['React', '中后台设计', '表单与表格', '可配置化', '跨时区协作']
          },
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
          shopee1: {
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
      cases: {
        eyebrow: 'Cases',
        titleWord: '精选',
        title: '案例',
        subtitle: '不只是做页面，更关注业务目标、用户体验和可持续迭代。',
        outcomeLabel: '结果',
        stackLabel: '技术',
        items: {
          brand: {
            title: '个人品牌官网升级',
            summary: '将传统作品集重构为更有转化能力的个人官网，突出定位、服务能力与合作路径。',
            outcome: '让访客更快理解“你是谁、你能做什么、怎么联系你”。',
            stack: 'React / TypeScript / Tailwind CSS'
          },
          ai: {
            title: '文枢智研',
            summary: '面向文档知识库，整合多源内容，串起同步、索引、检索与问答的完整链路。',
            outcome: '让研究交付更有证据链，也更容易追踪、引用与复用。',
            stack: 'Go / Python / TypeScript / Kotlin'
          },
          distribution: {
            title: 'AI 聚合分发平台',
            summary: '对标 New API、Sub2API，搭建统一接入、模型聚合与任务分发能力。',
            outcome: '让多模型调用和分发链路更统一、更易扩展。',
            stack: 'Go / TypeScript / Python'
          },
          platform: {
            title: '中后台业务系统',
            summary: '参与供应链、教育和本地生活等场景的业务平台开发，沉淀可复用表单、表格与页面结构。',
            outcome: '提升需求响应速度，降低重复开发成本。',
            stack: 'React / TypeScript / 工程化'
          }
        }
      },
      projects: {
        eyebrow: 'Projects',
        titleWord: 'Camila',
        title: '项目',
        subtitle: '探索精心打造的开源项目，每一个都凝聚着技术热情和创新精神',
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
          },
          knowviaAgent: {
            title: 'Knowvia-Agent',
            description: '面向文档知识库的 AI 研究助手，支持知识同步、检索、问答与结构化报告生成'
          }
        }
      },
      github: {
        eyebrow: 'GitHub',
        titleWord: 'GitHub',
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
      contact: {
        eyebrow: 'Contact',
        titleWord: '联系',
        title: '合作',
        subtitle: '如果你正在找人一起做官网、活动页、AI 产品前端/后端，或者想聊技术方案，欢迎直接联系我。',
        availabilityTitle: '合作方式',
        availabilityValue: '远程协作 / 短期项目 / 顾问支持 / 全职机会',
        responseTitle: '回复方式',
        responseValue: '邮件优先，也支持微信进一步沟通',
        locationTitle: '所在地',
        locationValue: '中国 · 深圳',
        primaryCta: '发邮件',
        secondaryCta: '打开 GitHub',
        emailLabel: '邮箱',
        wechatLabel: '微信',
        note: '如果你已经有明确需求，建议在邮件里附上项目背景、目标时间和参考案例。'
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
          description: '专注全栈开发、AI 应用界面与个人品牌官网定制，用更清晰的产品表达帮助想法落地。'
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
        services: 'Services',
        team: 'Experience',
        cases: 'Cases',
        projects: 'Projects',
        github: 'GitHub',
        contact: 'Contact'
      },
      home: {
        eyebrow: '',
        hero: {
          badge: 'Full-Stack Engineer / AI Builder / Open Source Author',
          title1: 'Camila',
          title2: 'Site',
          subtitleLine1: 'CQUPT - Computer Science and Technology',
          subtitleLine2: 'Passionate about full-stack development, striving for ultimate UX',
          summary: 'Focused on Web/APP products, AI apps, and personal websites, end-to-end delivery.',
          primaryCta: 'Start a Project',
          secondaryCta: 'View Services',
          availability: 'Open for personal websites, campaign pages, AI full-stack work, and technical consulting'
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
      services: {
        eyebrow: 'Services',
        titleWord: 'Our',
        title: 'Services',
        subtitle: 'If you need a dependable frontend/backend partner, I can build from zero to launch or collaborate inside an existing team.',
        items: {
          website: {
            title: 'Personal Websites',
            description: 'Official websites and portfolio experiences for individuals, studios, and small teams with a clearer brand voice.'
          },
          ai: {
            title: 'AI Product Full-Stack',
            description: 'Interfaces and backend support for chat, workflows, knowledge bases, and smart forms that turn product ideas into usable demos quickly.'
          },
          activity: {
            title: 'Campaign Pages',
            description: 'Launch pages and marketing experiences designed for both visual impact and conversion clarity.'
          },
          consultant: {
            title: 'Full-Stack Consulting',
            description: 'Support on component systems, performance, interaction quality, and engineering decisions for focused collaborations.'
          }
        }
      },
      team: {
        eyebrow: 'Experience',
        titleWord: 'Work',
        title: 'Experience',
        subtitle: 'Intern && Work',
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
      cases: {
        eyebrow: 'Cases',
        titleWord: 'Selected',
        title: 'Cases',
        subtitle: 'More than building screens, the focus is on business goals, user experience, and room for iteration.',
        outcomeLabel: 'Outcome',
        stackLabel: 'Stack',
        items: {
          brand: {
            title: 'Personal Brand Website Refresh',
            summary: 'Turned a traditional portfolio into a conversion-oriented personal website with clearer positioning, services, and contact paths.',
            outcome: 'Help visitors understand who you are, what you do, and how to reach you faster.',
            stack: 'React / TypeScript / Tailwind CSS'
          },
          ai: {
            title: 'Document Intelligence Lab',
            summary: 'Built for document knowledge bases, unifying multi-source content into a full sync-to-retrieval Q&A workflow.',
            outcome: 'Makes research delivery evidence-backed, traceable, citable, and reusable.',
            stack: 'Go / Python / TypeScript / Kotlin'
          },
          distribution: {
            title: 'AI Aggregation & Distribution Platform',
            summary: 'Benchmarked against New API and Sub2API, built to unify access, model aggregation, and task distribution.',
            outcome: 'Makes multi-model calls and distribution flows more consistent and easier to scale.',
            stack: 'Go / TypeScript / Python'
          },
          platform: {
            title: 'Business Platform Systems',
            summary: 'Built reusable forms, tables, and page structures for supply chain, education, and local services platforms.',
            outcome: 'Improved delivery speed and reduced repeated implementation cost.',
            stack: 'React / TypeScript / Frontend Engineering'
          }
        }
      },
      projects: {
        eyebrow: 'Projects',
        titleWord: 'Camila',
        title: 'Projects',
        subtitle: 'Explore crafted open-source projects, each embodying technical passion and innovation',
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
          },
          knowviaAgent: {
            title: 'Knowvia-Agent',
            description: 'An AI research assistant for document knowledge bases, with sync, retrieval, Q&A, and structured report generation.'
          }
        }
      },
      github: {
        eyebrow: 'GitHub',
        titleWord: 'GitHub',
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
      contact: {
        eyebrow: 'Contact',
        titleWord: 'Work',
        title: 'With Me',
        subtitle: 'If you need help on a website, campaign page, AI product frontend/backend, or technical direction, reach out directly.',
        availabilityTitle: 'Collaboration',
        availabilityValue: 'Remote work / Short-term projects / Consulting / Full-time opportunities',
        responseTitle: 'Preferred Reply',
        responseValue: 'Email first, WeChat available for follow-up communication',
        locationTitle: 'Location',
        locationValue: 'Shenzhen, China',
        primaryCta: 'Send Email',
        secondaryCta: 'Open GitHub',
        emailLabel: 'Email',
        wechatLabel: 'WeChat',
        note: 'If you already have a concrete project, include the background, target timeline, and a few references in your email.'
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
          description: 'Focused on full-stack development, AI product interfaces, and personal brand websites that make ideas easier to understand and launch.'
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
    lng: 'en',
    fallbackLng: 'zh',
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false
    }
  })

export default i18n
