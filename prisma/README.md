# prisma db
## 管理
> 请确保.env文件配置已经就绪

### 如果你是新数据库

使用 `npx prisma db push` 同步数据库架构,

或者使用 `npx prisma migrate deploy` 根据迁移文件部署数据库架构

同步数据库架构后执行`pnpm run seed`初始化数据库, 有问题或需要调整也可通过`pnpm run seed:rollback`回滚初始化动作

### 如果你是现有数据库架构

`npx prisma db pull` 同步数据库架构到Prisma模型文件中

`npx prisma format` 格式化schema文件

`npx prisma generate` 生成Prisma Client文件

## 维护数据模型

根据业务实际情况调整schema.prisma文件

`npx prisma format` 格式化schema文件

`npx prisma generate` 生成Prisma Client文件,每次scheme变更后都应执行

`npx prisma-docs-generator serve` 基于generate的结果生成文档

### web浏览数据库数据

`npx prisma studio` 通过web浏览数据库数据

### 迁移管理

`npx prisma migrate dev --name [本次迁移的标题]` schema变更后创建迁移脚本

`npx prisma migrate deploy` 执行迁移脚本

`npx prisma migrate status` 查看当前迁移状态

`npx prisma migrate resolve --applied [migrate_name]` 迁移到指定记录位置

`npx prisma migrate resolve --rolled-back [migrate_name]` 回滚到指定记录位置
