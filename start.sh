set -e

npm config set registry https://registry.npmmirror.com/

npm install --production

node dist/apps/compass/main.js
