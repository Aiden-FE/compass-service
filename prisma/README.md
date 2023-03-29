
## 首次运行
> 请确保.env文件配置已经就绪

`npx prisma db pull` 同步数据库架构

## 管理

`npx prisma format` 格式化schema文件

`npx prisma generate` 生成Prisma Client文件,每次scheme变更后都应执行

`npx prisma-docs-generator serve` 基于generate的结果生成文档

## 迁移

`npx prisma migrate dev --name [本次迁移的标题]`

`npx prisma migrate deploy` 执行迁移
