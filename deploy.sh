# #!/bin/bash
# # 自动部署脚本：将 Vue 项目构建结果部署到 GitHub Pages
# # 用户名：LiuYiBest
# # 仓库名：DeepTodoList
# # 部署分支：gh-pages

# # 配置变量
# USERNAME="LiuYiBest"
# REPO="DeepTodoList"
# DEPLOY_BRANCH="gh-pages"

# # 1. 执行项目构建
# echo "开始构建项目..."
# npm run build || { echo "项目构建失败，请检查错误信息。"; exit 1; }
# echo "项目构建完成！"

# # 2. 进入构建输出目录（一般为 dist）
# if [ ! -d "dist" ]; then
#   echo "构建目录 'dist' 不存在，请检查项目配置。"
#   exit 1
# fi
# cd dist

# # 3. 初始化临时 Git 仓库
# echo "初始化临时 Git 仓库..."
# git init

# # 4. 可选：设置 Git 用户信息（如果未全局配置，可在此设置）
# git config user.name "LiuYiBest"
# git config user.email "1070692044@qq.com"  # 请替换为实际邮箱地址

# # 5. 添加所有文件并提交
# git add -A
# git commit -m "自动部署：更新部署 $(date +"%Y-%m-%d %H:%M:%S")"

# # 6. 强制推送到 GitHub 仓库的指定分支
# echo "开始部署到 GitHub 仓库..."
# git push -f https://github.com/LiuYiBest/DeepTodoList.git master:gh-pages

# echo "部署完成！"
