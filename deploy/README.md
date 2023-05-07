# Deploy
> 部署环境,作为迅速搭建项目依赖环境使用

## 部署基础环境

当前目录下创建 `.env` 文件并把.env.example文件内容复制进去,按需调整.

`docker compose up -d` 一键启动mysql, redis, postgres容器环境,也可修改`docker-compose.yml`文件,按需启动所需容器

使用 `docker compose stop` 停止容器,被停止的容器可通过 `docker compose start` 启动

使用 `docker compose down` 销毁容器

## 数据库数据初始化
> 执行前需要确保已经同步Prisma数据库架构,如未同步请参考 [Prisma ORM](../README.md#prisma)

根据需要调整当前目录下的 `constants.ts` 文件

项目根目录执行 `npm run seed` 进行数据初始化, 如果有问题需要回滚可执行 `npm run seed:rollback`.
