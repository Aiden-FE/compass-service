# The FROM instruction sets the Base Image for subsequent instructions.
# Using Nginx as Base Image
FROM node:12.22.12-slim
MAINTAINER Aiden FE <Aiden_FE@outlook.com>

ENV APP_DIR=/root/compass

# The RUN instruction will execute any commands
# Adding HelloWorld page into Nginx server

WORKDIR ${APP_DIR}

# The EXPOSE instruction informs Docker that the container listens on the specified network ports at runtime
EXPOSE 8080

CMD ["npm", "run", "start:prod"]
