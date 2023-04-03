FROM node:18.15.0-slim
MAINTAINER Aiden_FE <Aiden_FE@outlook.com>

# 警告: 这种方式设置env的方式很危险,容器被pull后是可以inspect看到的.
# 准确的做法是敏感的env需要通过运行前指定,而不是镜像阶段指定,例如:
# docker run --env key=value
# docker compose 文件内声明 environment
# 下面设置的env都是默认值,可在运行时覆盖, 被注释掉的内容请在运行时提供

# 声明构建环境 development/production
ENV NODE_ENV production
# JWT验证密钥
#ENV COMPASS_JWT_SECRET
# mysql连接地址
#ENV COMPASS_MYSQL_DATABASE_URL
# redis host
#ENV COMPASS_REDIS_HOST
# redis port
ENV COMPASS_REDIS_PORT 6379
# redis 连接密码
#ENV COMPASS_REDIS_PASSWORD
# Recaptcha 密钥
#ENV COMPASS_RECAPTCHA_SECRET
# 系统邮箱账号
#ENV COMPASS_EMAIL_USER
# 系统邮箱密码
#ENV COMPASS_EMAIL_PASSWORD

ARG WORKDIR_DIR=/root/compass

WORKDIR ${WORKDIR_DIR}

COPY . ${WORKDIR_DIR}

EXPOSE 8080

CMD ["npm", "run", "start:prod"]
