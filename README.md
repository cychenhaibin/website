# Camila 个人网站

一个具有科技感和未来感的动态视觉效果网站，融入了深空主题和现代化的交互体验。

## ✨ 特色功能

- 🎨 **深空蓝黑渐变背景** + 霓虹光效
- 🌊 **流体粒子动画** - 跟随鼠标/滚动的动态效果
- 🎯 **光标特效** - 鼠标移动产生同心圆波纹
- 📱 **响应式设计** - 完美适配各种设备
- 🚀 **性能优化** - WebGL渲染，流畅的60fps动画
- 🎭 **GSAP动画** - 专业的滚动触发和入场动画
- 🌐 **多语言支持** - 国际化支持

## 🛠️ 技术栈

- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite
- **样式框架**: Tailwind CSS
- **3D渲染**: Three.js
- **动画库**: GSAP (GreenSock)
- **路由**: React Router DOM
- **字体**: Inter + JetBrains Mono
- **国际化**: i18next

## 🚀 快速开始

### 环境要求

- Node.js 18+
- npm 或 yarn 或 pnpm

### 安装依赖

```bash
npm install
# 或
yarn install
# 或
pnpm install
```

### 启动开发服务器

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

### 构建生产版本

```bash
npm run build
# 或
yarn build
# 或
pnpm build
```

### 预览生产版本

```bash
npm run preview
# 或
yarn preview
# 或
pnpm preview
```

## 🚀 双平台部署

本项目支持同时部署到 **GitHub Pages** 和 **Cloudflare Pages**！

### GitHub Pages（自动部署）

项目已配置 GitHub Actions，推送代码到 `main` 分支即可自动部署。

**快速开始：**
```bash
git push origin main  # 自动触发部署
```

**访问地址：**
`https://cychenhaibin.github.io/website`

### Cloudflare Pages（更快的全球 CDN）

**方式一：自动部署（推荐）**
1. 访问 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Workers & Pages → Create → Connect to Git
3. 配置：Build command: `npm run build:cloudflare`，Output: `dist`

**方式二：手动部署**
```bash
npm run deploy:cloudflare
```

**访问地址：**
`https://shopee-website.pages.dev`

### 📚 详细部署说明

- 完整文档：[DEPLOYMENT.md](./DEPLOYMENT.md)
- 快速指南：[DEPLOY_QUICK_START.md](./DEPLOY_QUICK_START.md)

## 📁 项目结构

```
src/
├── components/          # 可复用组件
│   ├── Header.tsx      # 导航头部
│   ├── Footer.tsx      # 页脚
│   ├── ParticleBackground.tsx  # Three.js粒子背景
│   └── CursorEffect.tsx        # 光标特效
├── pages/              # 页面组件
│   ├── Home.tsx        # 首页
│   ├── Projects.tsx    # 项目展示
│   ├── Team.tsx        # 团队介绍
│   └── GitHub.tsx      # GitHub数据
├── assets/             # 静态资源
├── App.tsx             # 主应用组件
├── main.tsx            # 应用入口
├── i18n.ts             # 国际化配置
└── index.css           # 全局样式
```

## 🎨 设计特色

### 色彩系统
- **主色调**: 深空蓝 (#0a192f) + 霓虹青 (#64ffda)
- **辅助色**: 量子紫 (#8a2be2) + 能量橙 (#ff6b6b)
- **背景渐变**: 径向渐变，营造深邃的太空感

### 动效设计
- **粒子系统**: 青色/紫色粒子组成流动的动态效果
- **路径动画**: 项目展示时的连接线生长动画
- **模块入场**: 滚动触发的3D翻转/缩放效果
- **动态着色**: 悬停时元素的霓虹发光变化

## 📱 响应式支持

- **桌面端**: 完整的3D效果和粒子系统
- **平板端**: 优化的触摸交互和性能
- **移动端**: 简化的粒子数量，手势驱动的视差效果

## 🔧 性能优化

- Web Worker处理粒子计算
- 滚动监听节流
- 按需加载Three.js模块
- 帧率监控和优化
- 代码分割和懒加载

## 🌟 浏览器支持

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📄 许可证

MIT License

## 🤝 贡献指南

我们欢迎所有形式的贡献！请查看我们的贡献指南：

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📞 联系我们

- **GitHub**: [@cychenhaibin](https://github.com/cychenhaibin)
- **网站**: [https://cychenhaibin.github.io/website](https://cychenhaibin.github.io/website)

## 🙏 致谢

感谢所有为这个项目做出贡献的开发者和设计师！

---

**Made with ❤️ by Camila**
