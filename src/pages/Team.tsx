import React from "react";
import { useTranslation } from "react-i18next";
// import meituanLogo from "../assets/meituan.jpg";
import shopeeLogo from "../assets/shopee_boy.jpg";
// import zhihuitongLogo from "../assets/zhihuitong.png";
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

const getInternshipExperiences = (t: any): InternshipExperience[] => [
  {
    id: 1,
    company: t("team.experiences.oasyce.company"),
    position: t("team.position"),
    duration: "2024.09 - 2024.12",
    description: t("team.experiences.oasyce.description"),
    companyUrl: undefined,
    color: "from-emerald-400 to-cyan-500",
    bgGradient: "from-emerald-500/40 via-emerald-400/10 to-cyan-400/30",
    logo: oasyce,
    achievements: t("team.experiences.oasyce.achievements", {
      returnObjects: true,
    }),
    skills: t("team.experiences.oasyce.skills", { returnObjects: true }),
  },
  {
    id: 2,
    company: t("team.experiences.meituan.company"),
    position: t("team.position"),
    duration: "2025.06 - 2025.09",
    description: t("team.experiences.meituan.description"),
    companyUrl: "https://www.meituan.com",
    color: "from-yellow-400 to-orange-500",
    bgGradient: "from-yellow-500/40 via-orange-400/10 to-amber-400/30",
    logo: "https://s3.meituan.net/static-prod01/com.sankuai.metadatadrive.tools.kaai/home/assets/png/kangaroo-logo-BXZL65ZR.png",
    achievements: t("team.experiences.meituan.achievements", {
      returnObjects: true,
    }),
    skills: t("team.experiences.meituan.skills", { returnObjects: true }),
  },
  {
    id: 3,
    company: t("team.experiences.shopee.company"),
    position: t("team.position"),
    duration: "2025.03 - 2025.06",
    description: t("team.experiences.shopee.description"),
    companyUrl: "https://shopee.com",
    color: "from-orange-400 to-red-500",
    bgGradient: "from-orange-500/40 via-red-400/10 to-rose-400/30",
    logo: shopeeLogo,
    achievements: t("team.experiences.shopee.achievements", {
      returnObjects: true,
    }),
    skills: t("team.experiences.shopee.skills", { returnObjects: true }),
  },
  {
    id: 4,
    company: t("team.experiences.zhihuitong.company"),
    position: t("team.position"),
    duration: "2024.12 - 2025.03",
    description: t("team.experiences.zhihuitong.description"),
    companyUrl: undefined,
    color: "from-blue-400 to-purple-500",
    bgGradient: "from-blue-500/40 via-indigo-400/10 to-purple-400/30",
    logo: "https://ipraclass.com/static/img/logo.214a1f84.png",
    achievements: t("team.experiences.zhihuitong.achievements", {
      returnObjects: true,
    }),
    skills: t("team.experiences.zhihuitong.skills", { returnObjects: true }),
  },
];

const Team: React.FC = () => {
  const { t } = useTranslation();
  const internshipExperiences = getInternshipExperiences(t);

  return (
    <div id="team">
      {/* 标题区域 */}
      <section className="pt-20 pb-10 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-normal text-gray-900 mb-4">
          <span className="text-[#4285F4] font-semibold">
            {t("team.titleWord")}
          </span>{" "}
          {t("team.title")}
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-light">
          {t("team.subtitle")}
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
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl overflow-hidden border border-gray-200 bg-gray-50 flex-none">
                          <img
                            src={experience.logo}
                            alt={experience.company}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex flex-col gap-1 flex-1 min-w-0">
                          <div className="flex flex-row justify-between items-center w-full gap-2">
                            <div className="flex flex-col gap-0.5 md:flex-row md:items-center md:gap-3 min-w-0 flex-1">
                              <h3 className="text-base md:text-lg font-normal text-gray-900 group-hover:text-[#4285F4] transition-colors">
                                {experience.company}
                              </h3>
                              {/* 描述 */}
                              {experience.description && (
                                <p className="text-xs md:text-sm text-gray-600 leading-relaxed font-light">
                                  {experience.description}
                                </p>
                              )}
                            </div>
                            {experience.companyUrl && (
                              <a
                                href={experience.companyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-xs text-[#4285F4] hover:underline whitespace-nowrap flex-shrink-0"
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
                                <span>{t("team.companyHomepage")}</span>
                              </a>
                            )}
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
