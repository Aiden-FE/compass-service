set -e

npm config set registry https://registry.npmmirror.com/

npm install --production

NODE_ENV=production node dist/apps/compass/main.js
