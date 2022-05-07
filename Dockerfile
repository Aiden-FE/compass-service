# The FROM instruction sets the Base Image for subsequent instructions.
# Using Nginx as Base Image
FROM node:12.22.12-slim
MAINTAINER Aiden_FE <Aiden_FE@outlook.com>

ARG DATABASE_URL
ARG ALI_CLOUD_SMS_ACCESS_KEY_ID
ARG ALI_CLOUD_SMS_ACCESS_KEY_SECRET
ARG MY_EMAIL_AUTH_USER
ARG MY_EMAIL_AUTH_PASSWORD
ARG NODE_ENV=production

ENV NODE_ENV=${NODE_ENV}
ENV DATABASE_URL=${DATABASE_URL}
ENV ALI_CLOUD_SMS_ACCESS_KEY_ID=${ALI_CLOUD_SMS_ACCESS_KEY_ID}
ENV ALI_CLOUD_SMS_ACCESS_KEY_SECRET=${ALI_CLOUD_SMS_ACCESS_KEY_SECRET}
ENV MY_EMAIL_AUTH_USER=${MY_EMAIL_AUTH_USER}
ENV MY_EMAIL_AUTH_PASSWORD=${MY_EMAIL_AUTH_PASSWORD}
ENV APP_DIR=/root/compass

# The RUN instruction will execute any commands
# Adding HelloWorld page into Nginx server
WORKDIR ${APP_DIR}

RUN apt-get update
RUN apt-get install openssl -q -y

COPY . ${APP_DIR}

# The EXPOSE instruction informs Docker that the container listens on the specified network ports at runtime
EXPOSE 8080

CMD ["npm", "run", "start:prod"]
