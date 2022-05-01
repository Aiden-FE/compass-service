# Compass Service

## TODO List

- [ ] 对接短信模板
- [ ] 支持邮箱注册
- [ ] 支持JWT登录授权

## Development Feature

- [x] [Typescript](https://www.tslang.cn/index.html)
- [x] [Nest](https://docs.nestjs.cn/)
- [x] [Nest Swagger](https://github.com/nestjs/swagger)
- [x] [date-fns](https://github.com/date-fns/date-fns)
- [x] [Prisma](https://prisma.yoga)
- [x] [Class validator](https://github.com/typestack/class-validator)

## Script

```shell
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

## Deploy

### 环境变量
```text
# 参考prisma所需的数据库连接
DATABASE_URL="mysql://demo:demo123456@localhost:3306/dbname"
# 阿里云短信服务Access
ACCESS_KEY_ID="短信ak id字符串"
ACCESS_KEY_SECRET="短信ak secret字符串"
```

### 环境部署

```shell
cd deploy
docker compose up -d # 启动redis与mysql数据库 (已存在可忽略,供参考)
docker compose down # 移除启动的redis与mysql容器
```


## Api Document

https://www.apifox.cn/apidoc/shared-7e08225b-7c61-4afd-a951-933d06f3aaf4
