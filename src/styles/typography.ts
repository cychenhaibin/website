/**
 * 响应式字号常量 —— 全局统一管理
 * 修改这里即可影响整个项目的字号表现
 */

export const fontSize = {
  // ─── Section Header ───
  eyebrow: 'text-xs md:text-sm',
  sectionTitle: 'text-3xl md:text-4xl lg:text-5xl',
  sectionSubtitle: 'text-base md:text-lg lg:text-xl',

  // ─── Hero (Home) ───
  heroTitle: 'text-4xl md:text-5xl lg:text-7xl',
  heroSubtitle: 'text-lg md:text-xl lg:text-2xl',
  heroBody: 'text-sm md:text-base lg:text-lg',

  // ─── Card ───
  cardTitle: 'text-lg md:text-xl',
  cardBody: 'text-sm md:text-base',

  // ─── General ───
  body: 'text-sm md:text-base',
  bodyLg: 'text-base md:text-lg',
  caption: 'text-xs md:text-sm',
} as const
