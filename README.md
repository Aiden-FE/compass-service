# Compass Service

## Development Feature

- [x] [Typescript](https://www.tslang.cn/index.html)
- [x] [Nest](https://docs.nestjs.cn/)
- [x] [Nest Swagger](https://github.com/nestjs/swagger)
- [x] [date-fns](https://github.com/date-fns/date-fns)
- [x] [Prisma](https://prisma.yoga)
- [x] [Class validator](https://github.com/typestack/class-validator)

## Script

```shell
# 环境部署
cd deploy
docker compose up -d # 启动redis与mysql数据库 (已存在可忽略,供参考)
docker compose down # 移除启动的redis与mysql容器

# 根目录脚本
npm run start # 启动本地开发项目
npm run start:prod # 启动生产项目
npm run lint # 执行eslint检查
npm run test # 执行单元测试
npm run format # 执行代码格式化

# DB相关
# 所需环境变量: DATABASE_URL="mysql://demo:demo123456@localhost:3306/dbname"
prisma db pull # 读取数据库并将其转换为 Prisma 架构
prisma migrate dev --name init # 生成迁移文件 并直接执行
prisma migrate deploy # 运行迁移文件
prisma format # 格式化.prisma配置文件
prisma generate # 读取prisma生成更改, 每当.prisma架构发生变化后都应执行
prisma-docs-generator serve # 基于当前generate的结果 启动文档服务
```
