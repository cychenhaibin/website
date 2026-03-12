# 双平台部署说明

本项目支持同时部署到 **GitHub Pages** 和 **Cloudflare Pages**。

---

## 🚀 方案一：GitHub Pages（自动部署）

### 访问地址
`https://cychenhaibin.github.io/website`

### 部署步骤

#### 1. 首次配置

1. 进入 GitHub 仓库
2. 点击 **Settings** → **Pages**
3. 在 **Source** 部分选择 **GitHub Actions**
4. 点击 **Save**

#### 2. 自动部署

只需推送代码到 `main` 或 `master` 分支：

```bash
git add .
git commit -m "更新内容"
git push origin main
```

GitHub Actions 会自动：
- ✅ 安装依赖
- ✅ 使用 `build:github` 构建（base 路径：`/website/`）
- ✅ 部署到 GitHub Pages

#### 3. 查看部署状态

在仓库的 **Actions** 标签页查看部署进度。

---

## ☁️ 方案二：Cloudflare Pages

### 访问地址
`https://website.pages.dev`（首次部署后会获得）

### 部署方式

#### 方式 A：通过 Cloudflare Dashboard（推荐）

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 进入 **Workers & Pages** → **Create application** → **Pages**
3. 选择 **Connect to Git**
4. 连接您的 GitHub 仓库
5. 配置构建设置：
   - **Production branch**: `main`
   - **Build command**: `npm run build:cloudflare`
   - **Build output directory**: `dist`
   - **Framework preset**: Vite
6. 点击 **Save and Deploy**

**后续更新**：每次推送代码到 GitHub，Cloudflare 会自动重新部署。

#### 方式 B：通过 Wrangler CLI 手动部署

1. **安装 Wrangler（首次）**：
```bash
npm install -g wrangler
```

2. **登录 Cloudflare**：
```bash
wrangler login
```

3. **一键部署**：
```bash
npm run deploy:cloudflare
```

此命令会自动：
- ✅ 使用 `build:cloudflare` 构建（base 路径：`/`）
- ✅ 部署到 Cloudflare Pages

---

## 📋 可用命令

```bash
# 开发环境（本地开发）
npm run dev

# GitHub Pages 构建（base: /website/）
npm run build:github

# Cloudflare Pages 构建（base: /）
npm run build:cloudflare

# 通用构建（默认为 Cloudflare）
npm run build

# 预览构建结果
npm run preview

# 部署到 Cloudflare Pages
npm run deploy:cloudflare

# 类型检查
npm run type-check

# 代码检查
npm run lint
```

---

## 🔑 关键配置说明

### base 路径配置

项目使用环境变量 `DEPLOY_TARGET` 来区分部署目标：

- **GitHub Pages**：`base: '/website/'`（匹配仓库名）
- **Cloudflare Pages**：`base: '/'`（根路径）

这在 `vite.config.ts` 中自动处理：

```typescript
base: process.env.DEPLOY_TARGET === 'github' ? '/website/' : '/'
```

### 文件结构

```
.github/workflows/deploy.yml  # GitHub Actions 工作流
wrangler.toml                  # Cloudflare Pages 配置
vite.config.ts                 # Vite 构建配置
```

---

## ⚠️ 注意事项

1. **GitHub Pages**
   - 仓库必须是公开的（免费版）
   - 首次部署需要几分钟
   - 确保仓库名称与 base 路径匹配

2. **Cloudflare Pages**
   - 需要 Cloudflare 账户（免费）
   - 构建速度更快
   - 支持全球 CDN 加速
   - 每月 500 次构建免费额度

3. **路径问题**
   - GitHub Pages 使用子路径：`/website/`
   - Cloudflare Pages 使用根路径：`/`
   - 项目已自动处理，无需手动修改

---

## 🛠️ 故障排除

### GitHub Pages 显示 404

1. 检查 **Settings → Pages** 中是否启用 GitHub Actions
2. 查看 **Actions** 标签页的部署日志
3. 确认 `base` 路径配置正确

### Cloudflare Pages 构建失败

1. 检查构建日志
2. 确认 build 命令使用 `npm run build:cloudflare`
3. 验证 Node.js 版本（推荐 18+）

### 资源加载失败

1. 打开浏览器开发者工具
2. 检查 Console 中的错误信息
3. 确认使用了正确的构建命令

---

## 🎉 推荐工作流

1. **日常开发**：本地 `npm run dev` 开发
2. **提交代码**：推送到 GitHub
3. **自动部署**：
   - GitHub Actions 自动部署到 GitHub Pages
   - Cloudflare 自动部署到 Cloudflare Pages（如果连接了 Git）
4. **访问网站**：两个平台都可以访问

---

## 📊 性能对比

| 特性 | GitHub Pages | Cloudflare Pages |
|------|-------------|------------------|
| 部署速度 | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| 全球 CDN | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| 构建限制 | 较宽松 | 500次/月（免费） |
| 自定义域名 | ✅ | ✅ |
| HTTPS | ✅ | ✅ |
| 配置难度 | 简单 | 简单 |

---

## 📚 相关链接

- [GitHub Pages 文档](https://docs.github.com/en/pages)
- [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)
- [Vite 文档](https://vitejs.dev/)
- [Wrangler CLI 文档](https://developers.cloudflare.com/workers/wrangler/)
