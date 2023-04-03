set -e

npm config set registry https://registry.npmmirror.com/

npm install --production

npx prisma generate

node dist/apps/compass/main.js
