import React from "react";
import meituanLogo from "../assets/meituan.jpg";
import shopeeLogo from "../assets/shopee_boy.jpg";
import zhihuitongLogo from "../assets/zhihuitong.png";
import oasyce from "../assets/oasyce.png";

interface InternshipExperience {
  id: number;
  company: string;
  position: string;
  duration: string;
  description: string;
  companyUrl?: string;
  color: string; // 用在职位标签上
  bgGradient: string; // 用在卡片背景渐变上
  logo: string;
  achievements: string[];
  skills: string[];
}

const internshipExperiences: InternshipExperience[] = [
  {
    id: 1,
    company: "绿洲时空",
    position: "前端开发实习生",
    duration: "2024.09 - 2024.12",
    description: "",
    companyUrl: undefined,
    color: "from-emerald-400 to-cyan-500",
    bgGradient: "from-emerald-500/40 via-emerald-400/10 to-cyan-400/30",
    logo: oasyce,
    achievements: [
      "负责到家业务核心页面重构，将首屏加载时间优化约 30%。",
      "基于业务数据梳理交互流程，推动 2 个重要功能的体验改版落地。",
      "与后端、产品、高频沟通需求，保证功能按时上线并可观测。",
    ],
    skills: ["React", "TypeScript", "前端工程化", "性能优化", "业务抽象"],
  },
  {
    id: 2,
    company: "美团",
    position: "前端开发实习生",
    duration: "2025.06 - 2025.09",
    description: "到家事业群",
    companyUrl: "https://www.meituan.com",
    color: "from-yellow-400 to-orange-500",
    bgGradient: "from-yellow-500/40 via-orange-400/10 to-amber-400/30",
    logo: "https://s3.meituan.net/static-prod01/com.sankuai.metadatadrive.tools.kaai/home/assets/png/kangaroo-logo-BXZL65ZR.png",
    achievements: [
      "搭建营销活动组件库，沉淀 10+ 复用组件，减少重复开发工作量。",
      "参与 A/B 实验方案实现，支持多版本页面按配置快速切换。",
      "协助排查线上问题，优化监控埋点并输出问题复盘。",
    ],
    skills: ["React", "前端监控", "A/B 实验", "组件化", "协同沟通"],
  },
  {
    id: 3,
    company: "Shopee",
    position: "前端开发实习生",
    duration: "2025.03 - 2025.06",
    description: "供应链",
    companyUrl: "https://shopee.com",
    color: "from-orange-400 to-red-500",
    bgGradient: "from-orange-500/40 via-red-400/10 to-rose-400/30",
    logo: shopeeLogo,
    achievements: [
      "参与供应链运营平台的多个模块开发，提升内部流程效率。",
      "将零散页面重构为可配置表单与表格，提高需求响应速度。",
      "与后端约定统一的数据接口规范，降低前后端联调成本。",
    ],
    skills: ["React", "中后台设计", "表单与表格", "可配置化", "跨时区协作"],
  },
  {
    id: 4,
    company: "智慧通",
    position: "前端开发实习生",
    duration: "2024.12 - 2025.03",
    description: "数字教育",
    companyUrl: undefined,
    color: "from-blue-400 to-purple-500",
    bgGradient: "from-blue-500/40 via-indigo-400/10 to-purple-400/30",
    logo: "https://ipraclass.com/static/img/logo.214a1f84.png",
    achievements: [
      "参与教务管理、课程排课等业务需求实现，打磨交互体验。",
      "针对弱网环境做加载与占位优化，减少页面白屏时间。",
      "帮助团队整理组件库使用规范，降低样式与交互分裂。",
    ],
    skills: ["React", "Tailwind CSS", "教育行业理解", "体验优化", "设计协作"],
  },
];

const Team: React.FC = () => {
  return (
    <div id="team">
      {/* 标题区域 */}
      <section className="pt-20 pb-10 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-normal text-gray-900 mb-4">
          <span className="text-[#4285F4] font-semibold">工作</span> 经历
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-light">
          用时间轴的方式回顾几段工作，把「做过什么」和「解决了什么问题」讲清楚。
        </p>
      </section>

      {/* 时间轴区域 */}
      <section className="pb-16 px-4">
        <div className="max-w-5xl mx-auto relative">
          {/* 中心竖线（移动端靠左，卡片在右侧；桌面端居中交错） */}
          <div className="absolute left-5 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-slate-500/40 via-slate-500/20 to-transparent pointer-events-none" />

          <div className="space-y-10 md:space-y-16 relative">
            {internshipExperiences.map((experience, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div
                  key={experience.id}
                  className="relative flex items-stretch md:items-center"
                >
                  {/* 时间节点圆点 */}
                  <div className="absolute left-5 md:left-1/2 -translate-x-1/2 z-10">
                    <div className="w-3 h-3 md:w-3.5 md:h-3.5 rounded-full bg-[#4285F4] shadow-[0_0_0_6px_rgba(66,133,244,0.25)]" />
                  </div>

                  {/* 内容卡片（样式对齐「Camila 的语雀有什么」卡片） */}
                  <div
                    className={`
                      mt-3 md:mt-0 w-full md:w-1/2
                      pl-12 pr-0 md:pl-10 md:pr-0
                      ${
                        isLeft
                          ? "md:pr-10 md:pl-0 md:self-start"
                          : "md:self-end"
                      }
                      ${isLeft ? "md:mr-auto" : "md:ml-auto"}
                    `}
                  >
                    <div className="group p-6 bg-white rounded-lg border border-gray-200 hover:border-[#4285F4]/50 hover:shadow-md transition-all duration-200 cursor-pointer">
                      {/* 顶部：logo + 公司 + 时间 */}
                      <div className="flex items-start justify-between gap-4 md:gap-3">
                        <div className="flex gap-3">
                          <div className="w-10 h-10 rounded-xl overflow-hidden border border-gray-200 bg-gray-50 flex-none">
                            <img
                              src={experience.logo}
                              alt={experience.company}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="flex flex-col gap-0.5 mb-1 md:flex-row md:items-center md:gap-3">
                              <h3 className="text-base md:text-lg font-normal text-gray-900 group-hover:text-[#4285F4] transition-colors">
                                {experience.company}
                              </h3>
                              {/* 描述 */}
                              <p className="text-xs md:text-sm text-gray-600 leading-relaxed font-light">
                                {experience.description}
                              </p>
                            </div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <p className="text-xs text-gray-500">
                                {experience.duration}
                              </p>
                              <span className="px-2 py-0.5 text-xs font-normal text-[#4285F4] rounded-md bg-[#4285F4]/10 border border-[#4285F4]/30 shadow-sm">
                                {experience.position}
                              </span>
                            </div>
                          </div>
                        </div>
                        {experience.companyUrl && (
                          <a
                            href={experience.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-xs text-[#4285F4] hover:underline whitespace-nowrap mt-1"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-3.5 w-3.5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                            <span>公司主页</span>
                          </a>
                        )}
                      </div>

                      {/* 核心成就 */}
                      {/* <div className="mb-3">
                        <p className="text-xs font-normal text-gray-500 mb-1">
                          核心成就
                        </p>
                        <ul className="space-y-1.5">
                          {experience.achievements.map((achievement, aIndex) => (
                            <li
                              key={aIndex}
                              className="flex items-start text-xs text-gray-600"
                            >
                              <span className="mt-[6px] mr-2 h-1.5 w-1.5 rounded-full bg-gray-400" />
                              <span className="flex-1 leading-relaxed">
                                {achievement}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div> */}

                      {/* 技能标签 */}
                      {/* <div>
                        <p className="text-xs font-normal text-gray-500 mb-1">
                          关键技能
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {experience.skills.map((skill, sIndex) => (
                            <span
                              key={sIndex}
                              className="px-2.5 py-1 bg-gray-50 text-gray-700 text-xs rounded-full border border-gray-200"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;
