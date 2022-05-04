# The FROM instruction sets the Base Image for subsequent instructions.
# Using Nginx as Base Image
FROM node:12.22.12-slim
MAINTAINER Aiden FE <Aiden_FE@outlook.com>

ENV APP_DIR=/compass

# The RUN instruction will execute any commands
# Adding HelloWorld page into Nginx server
RUN mkdir -p "${APP_DIR}" \
    ls ${APP_DIR}

WORKDIR ${APP_DIR}
COPY . ${APP_DIR}

# The EXPOSE instruction informs Docker that the container listens on the specified network ports at runtime
EXPOSE 8080

CMD ["npm", "run", "start:prod"]
