# prisma db
## 管理
> 请确保.env文件配置已经就绪

`npx prisma format` 格式化schema文件

`npx prisma generate` 生成Prisma Client文件,每次scheme变更后都应执行

`npx prisma-docs-generator serve` 基于generate的结果生成文档

`npx prisma studio` 通过web浏览数据库数据

`npx prisma migrate dev --name [本次迁移的标题]` schema变更后创建迁移脚本

`npx prisma migrate deploy` 执行迁移脚本

`npx prisma migrate status` 查看当前迁移状态

`npx prisma migrate resolve --applied [migrate_name]` 迁移到指定记录位置

`npx prisma migrate resolve --rolled-back [migrate_name]` 回滚到指定记录位置

`npx prisma db pull` 同步数据库架构到Prisma模型

`npx prisma db push` 同步Prisma模型到数据库
