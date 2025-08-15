# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
pnpm run build

# 进入生成的文件夹
cd dist

# 如果是发布到自定义域名（请替换为你的域名）
echo 'simple-maker.fun' > CNAME

git init
git add -A
git commit -m 'deploy'

# 发布到 GitHub Pages (使用HTTPS)
# 请将下面的仓库名替换为新的仓库名
git push -f https://github.com/Miles2048/simple-maker.git main:gh-pages


cd -
