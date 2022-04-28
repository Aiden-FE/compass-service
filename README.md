# Compass Service

## Development Feature

- [x] [Typescript](https://www.tslang.cn/index.html)
- [x] [Nest](https://docs.nestjs.cn/)
- [x] [Nest Swagger](https://github.com/nestjs/swagger)
- [x] [date-fns](https://github.com/date-fns/date-fns)
- [x] [Prisma](https://prisma.yoga)
## Script

```shell
# DB相关
# 所需环境变量: DATABASE_URL="mysql://demo:demo123456@localhost:3306/dbname"
prisma db pull # 读取数据库并将其转换为 Prisma 架构
prisma migrate dev --name init # 生成迁移文件 并直接执行
prisma migrate deploy # 运行迁移文件
prisma format # 格式化.prisma配置文件
prisma generate # 读取prisma生成更改, 每当.prisma架构发生变化后都应执行
prisma-docs-generator serve # 基于当前generate的结果 启动文档服务
```
