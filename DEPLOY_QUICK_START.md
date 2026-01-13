# 🚀 快速部署指南

## GitHub Pages（推荐新手）

### 一次性设置
```bash
# 1. 推送代码到 GitHub
git add .
git commit -m "Initial commit"
git push origin main

# 2. 在 GitHub 仓库设置中启用 GitHub Actions
# Settings → Pages → Source: GitHub Actions
```

### 后续更新
```bash
git add .
git commit -m "更新内容"
git push origin main
# 自动部署！🎉
```

### 访问地址
```
https://cychenhaibin.github.io/website
```

---

## Cloudflare Pages

### 方法一：自动部署（推荐）

1. 访问 https://dash.cloudflare.com/
2. Workers & Pages → Create → Connect to Git
3. 选择仓库，配置：
   - Build command: `npm run build:cloudflare`
   - Build output: `dist`
4. Save and Deploy

**完成！** 以后推送代码会自动部署到两个平台。

### 方法二：手动部署

```bash
# 1. 登录 Cloudflare（首次）
npx wrangler login

# 2. 部署
npm run deploy:cloudflare
```

### 访问地址
```
https://shopee-website.pages.dev
（或您的自定义域名）
```

---

## 🎯 最简单的方式

1. **推送代码到 GitHub**
2. **在 GitHub 和 Cloudflare 都启用自动部署**
3. **以后只需 `git push`，两边自动部署！**

---

## ❓ 遇到问题？

查看详细文档：[DEPLOYMENT.md](./DEPLOYMENT.md)
