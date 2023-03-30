# compass-service 2.0

## 项目启动

`pnpm install` 安装依赖

根目录新建 .env 文件, 复制 .env.example 内容到 .env 文件,并按需调整配置内容.

`pnpm start:dev` 开发模式启动

`pnpm format` 执行代码格式化

`pnpm lint` 执行代码检查

## 特性

* Monorepo 结构,易于扩展服务及公共资源沉淀
* Typescript/Jest/Airbnb Eslint/Prettier
* 支持.env文件控制环境变量,示例可见: .env.example,复制示例文件进入.env文件后按需配置即可
* 支持Swagger文档
* helmet 安全的响应头设置
* 接口多版本支持
* 接口限流保护,默认一个IP一个端点每分钟仅允许调用10次,特例场景可以通过装饰器跳过限流或局部修改限流
* 默认启用 express json,urlencoded 中间件
* 约束接口进参,移除非白名单属性,自动转换数据为符合预期的类型
* Prisma ORM 支持
* 统一的响应拦截器,规范返回数据
* EMail邮件服务支持
* 支持连接redis服务

### 2.0 移除的特性

* compression 移除,压缩支持应该在nginx层处理,而不在服务器
* csurf 已废弃,不再采用
* LoggerMiddleware 已移除,改为采用 @nestjs/common 内置的 Logger
* 扩展的HttpException已被移除,改为采用 @nestjs/common 内置的 HttpException
* SessionModule已被移除,这个模块并不适合在生产环境使用
