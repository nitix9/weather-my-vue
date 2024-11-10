set -e
npm run build
cd docs
git init
git add -A
git commit -m 'deploy'
# если вы публикуете по адресу https://<USERNAME>.github.io/<REPO>
git push -f https://github.com/nitix9/weather-my.git master