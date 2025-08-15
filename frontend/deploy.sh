# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
pnpm run build

# 进入生成的文件夹
cd dist

# 使用GitHub Pages默认域名，不使用自定义域名
# echo 'simple-maker.fun' > CNAME

git init
git add -A
git commit -m 'deploy'

# 发布到 GitHub Pages (使用HTTPS)
# 使用正确的仓库名
git push -f https://github.com/Miles2048/tier-ranking.git main:gh-pages


cd -
