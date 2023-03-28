# compass-service 2.0

## 项目启动

`pnpm install` 安装依赖

根目录新建 .env 文件, 复制 .env.example 内容到 .env 文件,并按需调整配置内容.

`pnpm start:dev` 开发模式启动

`pnpm format` 执行代码格式化

`pnpm lint` 执行代码检查

## 特性

* Monorepo 结构,易于扩展服务及公共资源沉淀
* 支持.env文件控制环境变量,示例可见: .env.example,复制示例文件进入.env文件后按需配置即可
* 支持Swagger文档
* helmet 安全的响应头设置
* 接口限流保护,默认一个IP一个端点每分钟仅允许调用10次,特例场景可以通过装饰器跳过限流或局部修改限流
