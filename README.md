# compass-service 2.0

## 项目启动

`pnpm install` 安装依赖

根目录新建 .env 文件, 复制 .env.example 内容到 .env 文件,并按需调整配置内容.

`pnpm start:dev` 开发模式启动

`pnpm format` 执行代码格式化

`pnpm lint` 执行代码检查

根据自身业务实际情况,修改项目内 FIXME: 部分的逻辑

## 特性

### Monorepo 结构,易于扩展服务及公共资源沉淀

`nest g app [project_name]` 创建一个子应用到monorepo

`nest g lib [library_name]` 创建一个包到monorepo

### Typescript/Jest/Airbnb Eslint/Prettier

* 支持Typescript环境
* `npm run format` 进行代码格式化
* `npm run lint` 进行代码检查,默认基于Airbnb规范
* `npm run test` 进行单元测试
* `npm run test:e2e` 进行端到端测试

### 支持环境变量控制

支持.env文件控制环境变量,示例可见: .env.example,复制示例文件进入.env文件后按需配置即可

### 支持Swagger文档

`npm run start:dev` 或其他start启动项目后,访问/docs路径

### helmet 安全的响应头设置

在 `apps/compass-service/src/middleware/index.ts` 路径内启用

### 接口多版本支持

用法示例如下:

```typescript
@Controller('example')
export class ExampleController {
  // 访问地址: /v1/example/test
  @Get('test')
  test(): string {
    return 'This is v1 endpoint.';
  }

  // 访问地址: /v2/example/test
  @Version('2')
  @Get('test')
  test2(): string {
    return 'This is v2 endpoint.';
  }
}
```

### 接口限流保护

默认一个IP一个端点每分钟仅允许调用20次,特例场景可以通过装饰器跳过限流或局部修改限流,示例如下:

```typescript
@Controller('example')
export class ExampleController {
  // 该接口跳过节流保护
  @SkipThrottle()
  @Get('test')
  test(): string {
    return 'Hello world.';
  }

  // 该接口每分钟调用不超过3次
  @Throttle(3, 60)
  @Get('test2')
  test(): string {
    return 'Hello world.';
  }

  // 默认采用全局节流配置
  @Get('test3')
  test(): string {
    return 'Hello world.';
  }
}
```

### 默认启用 express json,urlencoded 中间件

在 `apps/compass-service/src/middleware/express.middleware.ts` 内启用

### 约束接口进参,移除非白名单属性,自动转换数据为符合预期的类型

通过`shared/config/index.ts`下的validationOption可调整选项

当遇见多个Dto联合类型时,内置ValidationPipe失效,可按照下列示例处理:

```typescript
import { IsNumber, IsString } from 'class-validator';
import { Body } from '@nestjs/common';
import { validateMultipleDto } from '@shared';

class ADto {
  @IsString()
  id: string;
}

class BDto {
  @IsNumber()
  age: number;
}

@Controller('example')
export class ExampleController {
  @Get('test')
  test(@Body() body: ADto | BDto): string {
    // 验证失败会抛出异常终止程序,第三个参数AND,OR来控制处理逻辑,默认是OR逻辑
    validateMultipleDto(body, [ADto, BDto]);
    return 'Hello world.';
  }
}
```

### Prisma ORM 支持

[使用引导](./prisma/README.md)

### 统一的响应拦截器,规范返回数据

在`shared/interceptors/response.interceptor.ts`定义的默认拦截逻辑,示例如下:

```typescript
@Controller('example')
export class ExampleController {
  @Get('test')
  test() {
    return 'Hello world.'; // 实际响应: { statusCode: 200, data: 'Hello world.', message: '' }
  }

  @Get('test2')
  test2(): string {
    return new Response('Hello world.', { responseType: 'text' }); // 实际响应: 'Hello world.'
  }
}
```

### EMail邮件服务支持

.env 文件内提供正确的 COMPASS_EMAIL_USER 及 COMPASS_EMAIL_PASSWORD 变量, 示例如下:

```typescript
import { EmailModule, EmailService } from '@app/email';

// example.module.ts
@Module({
  imports: [
    // 默认使用outlook服务,请按需调整, 详见: https://nodemailer.com/usage/#setting-it-up
    EmailModule.forRoot({
      service: 'outlook365',
      auth: {
        user: emailUser,
        pass: emailPassword,
      },
    }),
  ],
})
export class ExampleModule {}

// example.service.ts
@Injectable()
export class ExampleService {
  constructor(private emailService: EmailService) {}
  
  sendEmailMsg(msg: string) {
    // 具体参考 https://nodemailer.com/message/#common-fields
    this.emailService.sendMail({
      from: 'example@outlook.com',
      to: 'target@example.com',
      subject: '邮件主题',
      html: `
        邮件内容
        ${msg}
      `
    })
  }
}
```

### 支持连接redis服务

按需调整.env文件内 COMPASS_REDIS_HOST,COMPASS_REDIS_PORT,COMPASS_REDIS_PASSWORD 等变量,使用示例如下:

```typescript
// example.service.ts
import { RedisService } from '@liaoliaots/nestjs-redis';

@Injectable()
export class ExampleService {
  constructor(private redisService: RedisService) {
  }

  setCache(msg: string) {
    // 具体参考 https://github.com/liaoliaots/nestjs-redis/blob/HEAD/docs/latest/redis.md
    this.redisService.set('key', msg);
  }
}
```

### 支持JWT校验 + 用户权限集验证

支持JWT授权,并按权限给予访问能力, 示例如下:

```typescript
@Controller('oauth')
export class OauthController {
  constructor(private jwtService: JwtService) {}

  @Public() // public装饰器指明该接口跳过jwt验证,跳过权限验证,接口对外开放
  @Post('login')
  async login(@Body() body: EMailLoginDto | TelephoneLoginDto) {
    validateMultipleDto(body, [EMailLoginDto, TelephoneLoginDto]);
    // 查询用户信息
    const userInfo = { ...body };
    // FIXME: 请验证合规后再签发授权信息
    const signStr = this.jwtService.sign(userInfo);
    return { ...userInfo, token: signStr };
  }

  /**
   * @description 该接口必须通过JWT验证后再通过用户权限验证,用户必须拥有对应权限
   * Permissions 接受两个参数,第一个参数类型必须是 PERMISSIONS | PERMISSIONS[]
   * 第二个参数可选,类型是 'AND' | 'OR',默认是'AND',即所有声明的权限都必须具备,OR则代表声明的权限具备任意一个均可
   * @param user @User()装饰器可以快捷的拿到授权通过后的用户信息数据
   */
  @Permissions(PERMISSIONS.COMMON_USER_QUERY)
  @Get('test')
  async test(@User() user: any) {
    return user;
  }
}
```

⚠️: 通常用户的权限数据不会签发在JWT内,所以请在`shared/guards/jwt-auth.guard.ts`内按需调整逻辑,根据用户拥有的的角色去聚合他所有的权限集,以提供给权限逻辑验证是否许可访问

### 添加日志中间件,监控入站请求

默认会将所有入站请求打印在控制台,日志级别为log级.

### 集成circleci pipeline

详见`.circleci/config.yml`

### 2.0 移除的特性

* compression 移除,压缩支持应该在nginx层处理,而不在服务器
* csurf 已废弃,不再采用
* LoggerService 已移除,改为采用 @nestjs/common 内置的 Logger
* 扩展的HttpException已被移除,改为采用 @nestjs/common 内置的 HttpException
* SessionModule已被移除,这个模块并不适合在生产环境使用
