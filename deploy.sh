#!/bin/bash

# GitHub Pages 部署脚本

echo "🚀 开始部署到 GitHub Pages..."

# 检查是否有未提交的更改
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  检测到未提交的更改，请先提交或暂存更改"
    git status
    exit 1
fi

# 构建项目
echo "📦 构建项目..."
npm run build

# 检查构建是否成功
if [ $? -ne 0 ]; then
    echo "❌ 构建失败，请检查错误信息"
    exit 1
fi

echo "✅ 构建成功！"

# 提交构建文件
echo "📝 提交构建文件..."
git add .
git commit -m "🚀 部署到 GitHub Pages - $(date)"

# 推送到远程仓库
echo "🌐 推送到远程仓库..."
git push origin main

echo "🎉 部署完成！"
echo "📱 你的网站将在几分钟后在以下地址可用："
echo "   https://cychenhaibin.github.io/website"
echo ""
echo "💡 提示："
echo "   - 确保已在 GitHub 仓库设置中启用 Pages"
echo "   - 选择 gh-pages 分支作为源"
echo "   - 首次部署可能需要几分钟时间"
