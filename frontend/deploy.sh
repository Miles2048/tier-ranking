# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
pnpm run build

# 进入生成的文件夹
cd dist

# 如果是发布到自定义域名（如果你有域名的话）
# echo 'simple-maker.fun' > CNAME

git init
git add -A
git commit -m 'deploy'

# 发布到 GitHub Pages (使用HTTPS)
# 请将下面的 USERNAME 和 REPO 替换为你的 GitHub 用户名和仓库名
git push -f https://github.com/Miles2048/tier-ranking.git main:gh-pages


cd -
