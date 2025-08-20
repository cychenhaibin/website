# GitHub Pages 部署说明

## 部署步骤

### 1. 准备 GitHub 仓库

1. 确保你的项目已经推送到 GitHub 仓库
2. 仓库名称应该是 `website`（与 vite.config.ts 中的 base 路径匹配）

### 2. 配置 GitHub Pages

1. 进入你的 GitHub 仓库
2. 点击 `Settings` 标签页
3. 在左侧菜单中找到 `Pages`
4. 在 `Source` 部分选择 `Deploy from a branch`
5. 选择 `gh-pages` 分支
6. 点击 `Save`

### 3. 更新配置文件

**重要：** 在 `package.json` 中将 `homepage` 字段中的 `你的用户名` 替换为你的实际 GitHub 用户名：

```json
"homepage": "https://cychenhaibin.github.io/website"
```

### 4. 推送代码触发部署

当你推送代码到 `main` 或 `master` 分支时，GitHub Actions 会自动：

1. 安装依赖
2. 构建项目
3. 部署到 `gh-pages` 分支
4. 更新 GitHub Pages

### 5. 访问你的网站

部署完成后，你的网站将在以下地址可用：
`https://cychenhaibin.github.io/website`

## 注意事项

- 确保 `vite.config.ts` 中的 `base` 路径与仓库名称匹配
- 首次部署可能需要几分钟时间
- 如果遇到 404 错误，请检查 `base` 路径配置是否正确
- 确保仓库是公开的（GitHub Pages 免费版要求）

## 故障排除

### 如果部署失败：

1. 检查 GitHub Actions 日志
2. 确认所有依赖都已正确安装
3. 验证构建命令是否成功
4. 检查 `gh-pages` 分支是否已创建

### 如果网站显示空白：

1. 检查浏览器控制台是否有错误
2. 确认 `base` 路径配置正确
3. 验证所有资源路径是否正确
