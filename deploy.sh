#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 提示部署开始
echo "开始部署..."

# 构建
echo "正在构建..."
npm run build

# 进入构建输出目录
cd dist

# 如果你要部署到自定义域名
# echo 'www.example.com' > CNAME

# 创建 git 仓库并提交
echo "正在提交文件..."
git init
git add -A
git commit -m 'deploy'

# 如果你要部署在 https://<USERNAME>.github.io/<REPO>
echo "正在推送到 gh-pages 分支..."
git push -f git@github.com:LiuYiBest/DeepTodoList.git master:gh-pages

# 返回上一级目录
cd -

echo "部署完成!" 