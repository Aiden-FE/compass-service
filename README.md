<!-- TOC -->
* [compass-service 2.0](#compass-service-20)
  * [项目启动](#项目启动)
  * [特性](#特性)
    * [Monorepo 结构,易于扩展服务及公共资源沉淀](#monorepo-结构易于扩展服务及公共资源沉淀)
    * [Typescript/Jest/Airbnb Eslint/Prettier](#typescriptjestairbnb-eslintprettier)
    * [支持环境变量控制](#支持环境变量控制)
    * [支持Google reCAPTCHA v3 人机校验](#支持google-recaptcha-v3-人机校验)
    * [接口多版本支持](#接口多版本支持)
    * [接口限流保护](#接口限流保护)
    * [约束接口进参,移除非白名单属性,自动转换数据为符合预期的类型](#约束接口进参移除非白名单属性自动转换数据为符合预期的类型)
    * [<span id="prisma">PrismaORM 管理</span>](#span-idprisma-prismaorm-管理-span)
      * [如果你是新数据库](#如果你是新数据库)
      * [如果你是现有数据库架构](#如果你是现有数据库架构)
      * [维护数据模型](#维护数据模型)
      * [web浏览数据库数据](#web浏览数据库数据)
      * [迁移管理](#迁移管理)
    * [统一的响应拦截器,规范返回数据](#统一的响应拦截器规范返回数据)
    * [支持JWT校验 + 用户权限集验证](#支持jwt校验--用户权限集验证)
    * [EMail邮件服务支持](#email邮件服务支持)
    * [支持连接redis服务](#支持连接redis服务)
    * [添加日志中间件,监控入站请求](#添加日志中间件监控入站请求)
    * [支持Swagger API文档](#支持swagger-api文档)
    * [helmet 安全的响应头设置](#helmet-安全的响应头设置)
    * [默认启用 express json,urlencoded 中间件](#默认启用-express-jsonurlencoded-中间件)
    * [集成circleciCI自动集成部署](#集成circlecici自动集成部署)
  * [2.0 移除的特性](#20-移除的特性)
  * [更多文档信息](#更多文档信息)
<!-- TOC -->

# compass-service 2.0

本项目会以具体业务为实例不断完善内容,如果你希望使用本项目作为基础模板快速搭建项目,可使用[Compass Template](https://github.com/Aiden-FE/compass-template)内的Nest模板

## 项目启动
> 首次启动请先参考下方 [Prisma ORM 管理](#prisma) 部分同步数据库架构
> 
> 如果您不具备可用的mysql,redis或是可选的postgres环境,可以参考[部署基础环境](./deploy/README.md#部署基础环境)一键启动基础环境

`npm install` 安装依赖

根目录新建 .env 文件, 复制 .env.example 内容到 .env 文件,并按需调整配置内容.

`npm run start:dev` 开发模式启动

`npm run start:prod` 生产模式启动

`npm run format` 执行代码格式化

`npm run lint` 执行代码检查

根据自身业务实际情况,修改项目内 "FIXME: " 标记部分的逻辑

`npm run build` 构建项目

## 特性

### Monorepo 结构,易于扩展服务及公共资源沉淀

`nest g app [project_name]` 创建一个子应用到monorepo

`nest g lib [library_name]` 创建一个包到monorepo

`./shared` 文件夹内直接添加可被共享的资源文件

### Typescript/Jest/Airbnb Eslint/Prettier

* 支持Typescript环境
* `npm run format` 进行代码格式化
* `npm run lint` 进行代码检查,默认基于Airbnb规范
* `npm run test` 进行单元测试
* `npm run test:e2e` 进行端到端测试

### 支持环境变量控制

支持.env文件控制环境变量,示例可见: .env.example,复制示例文件进入.env文件后按需配置即可

### 支持Google reCAPTCHA v3 人机校验

客户端:

```html
<!-- 插入recaptcha脚本并指定key,如果是国内host需要替换为www.recaptcha.net -->
<script src="https://www.google.com/recaptcha/api.js?render=reCAPTCHA_site_key"></script>

<script>
  // 当点击某个提交按钮时进行人机静默校验,否则应该进行双重认证或拒绝认证
  function onClick(e) {
    e.preventDefault();
    // 提示: reCAPTCHA_site_key为您在Google ReCaptcha注册的网站key
    grecaptcha.ready(function() {
      // action各种含义参考: https://developers.google.com/recaptcha/docs/v3?hl=zh-cn#interpreting_the_score
      grecaptcha.execute('reCAPTCHA_site_key', {action: 'login'}).then(function(token) {
        // 在此处添加您的逻辑,把表单数据跟token一起提供给后端校验
        fetch('/api/v1/recaptcha/validate', {
          method: 'POST',
          body: JSON.stringify({ token }),
        })
          .then(resp => resp.json())
          .then(result => {
            if (result.statusCode === 100200 && result.data) {
              console.log('签发的许可 token: ', result.data);
            }
          });
      });
    });
  }
</script>
```

服务端:
.env文件内 设置 COMPASS_RECAPTCHA_SECRET 环境变量为您在Google ReCaptcha注册的后台key

对应受保护接口在执行逻辑前将收到的 token 提交 apps/compass-service/src/modules/oauth/oauth.service.ts内的 verifyRecaptchaToken 方法处理

### 接口多版本支持

用法示例如下:

```typescript
@Controller('example')
export class ExampleController {
  // 访问地址: /api/v1/example/test
  @Get('test')
  test(): string {
    return 'This is v1 endpoint.';
  }

  // 访问地址: /api/v2/example/test
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

### 约束接口进参,移除非白名单属性,自动转换数据为符合预期的类型

通过`shared/config/index.ts`下的validationOption可调整选项

当遇见多个Dto联合类型时,内置ValidationPipe失效,可按照下列示例处理:

```typescript
import { IsNumber, IsString } from 'class-validator';
import { Body, Optional } from '@nestjs/common';
import { validateMultipleDto } from '@shared';

class ADto {
  @IsString()
  id: string;
}

class BDto {
  @IsNumber()
  age: number;
}

class CDto {
  @IsString()
  name: string;

  @Optional()
  @IsString()
  address?: string
}

@Controller('example')
export class ExampleController {
  @Get('test')
  test(@Body() body: ADto | BDto): string {
    // 验证失败会抛出异常终止程序,第三个参数AND,OR来控制处理逻辑,默认是OR逻辑
    validateMultipleDto(body, [ADto, BDto]);
    return 'Hello world.';
  }

  /**
   * @description 假如入参是 { name: 'test', test: 'test' }
   * 实际body会是 { name: 'test' }, test属性会被自动移除
   */
  @Get('test2')
  test2(@Body() body: CDto) {
    return 'Hello world.';
  }
}
```

### <span id="prisma">PrismaORM 管理</span>
> 请确保.env文件配置已经就绪

####  如果你是新数据库

使用 `npx prisma db push` 同步数据库架构

同步数据库架构后执行`pnpm run seed`初始化数据库, 有问题或需要调整也可通过`pnpm run seed:rollback`回滚初始化动作

#### 如果你是现有数据库架构

`npx prisma db pull` 同步数据库架构到Prisma模型文件中

`npx prisma format` 格式化schema文件

`npx prisma generate` 生成Prisma Client文件

#### 维护数据模型

根据业务实际情况调整schema.prisma文件

`npx prisma format` 格式化schema文件

`npx prisma generate` 生成Prisma Client文件,每次scheme变更后都应执行

`npx prisma-docs-generator serve` 基于generate的结果生成模型文档

#### web浏览数据库数据

`npx prisma studio` 通过web浏览数据库数据

#### 迁移管理

`npx prisma migrate dev --name [本次迁移的标题]` schema变更后创建迁移脚本

`npx prisma migrate deploy` 执行迁移脚本

`npx prisma migrate status` 查看当前迁移状态

`npx prisma migrate resolve --applied [migrate_name]` 迁移到指定记录位置

`npx prisma migrate resolve --rolled-back [migrate_name]` 回滚到指定记录位置

### 统一的响应拦截器,规范返回数据

在`shared/interceptors/response.interceptor.ts`定义的默认拦截逻辑,示例如下:

```typescript
@Controller('example')
export class ExampleController {
  @Get('test')
  test() {
    return 'Hello world.'; // 实际响应: { statusCode: 100200, data: 'Hello world.', message: '请求成功' } HttpStatus = 200
  }

  @Get('test2')
  test2() {
    return new HttpResponse('Hello world.', { responseType: 'text' }); // 实际响应: 'Hello world.'
  }
  
  @Get('test3')
  test3() {
    // 尽管是throw,但是客户端收到的返回依旧以HttpResponse配置为准,可以用来快捷中断程序逻辑执行,又控制响应的状态与数据
    // 实际响应: { statusCode: 100400, data: 'Hello world.', message: '请求成功' } HttpStatus = 403
    throw new HttpResponse('Hello world.', {
      statusCode: ResponseCode.BAD_REQUEST,
      httpStatus: HttpStatus.FORBIDDEN,
    });
  }
}
```

### 支持JWT校验 + 用户权限集验证

支持JWT授权,并按权限给予访问能力, 示例如下:

```typescript
@Controller('oauth')
export class OauthController {
  constructor(
    private jwtService: JwtService,
    private oauthService: OauthService,
  ) {}

  @Public() // public装饰器指明该接口跳过jwt验证,跳过权限验证,接口对外开放
  @Post('login')
  async login(@Body() body: EMailLoginDto | TelephoneLoginDto) {
    validateMultipleDto(body, [EMailLoginDto, TelephoneLoginDto]);
    // 验证登录是否有效,通过后签发token
    const result = await this.oauthService.validateLogin(body);
    const signStr = this.jwtService.sign(result);
    return { ...userInfo, token: signStr };
  }

  /**
   * @description 该接口必须通过JWT验证后再通过用户权限验证,用户必须拥有对应权限
   * Permissions 接受两个参数,第一个参数类型必须是 PERMISSIONS | PERMISSIONS[]
   * 第二个参数可选,类型是 'AND' | 'OR',默认是'AND',即所有声明的权限都必须具备,OR则代表声明的权限具备任意一个均可
   * @param user @User()装饰器可以快捷的拿到授权通过后的用户信息数据
   */
  @Auth(PERMISSIONS.COMMON_USER_QUERY)
  @Get('test')
  async test(@User() user: any) {
    return user;
  }

  /**
   * @description 访问该接口必须先通过JWT验证
   */
  @Get('test2')
  async test2(@User() user: any) {
    return user;
  }
}
```

`shared/utils/jwt.strategy.ts` 内会根据用户所具备的角色去聚合用户权限集

`shared/guards/jwt-auth.guard.ts` 具体在处理用户访问权限守卫

### EMail邮件服务支持

.env 文件内提供正确的 COMPASS_EMAIL_USER 及 COMPASS_EMAIL_PASSWORD 变量, 使用示例如下:

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
    // 发出邮件
    return this.emailService.sendMail({
      from: SYSTEM_EMAIL_FROM, // 声明发送方
      to: data.email, // 发送的目标
      subject: '邮箱验证', // 主题
      // 实际发送内容, replaceVariablesInString用来对模板内的变量做替换
      html: replaceVariablesInString(EMAIL_CAPTCHA_TEMPLATE, {
        context: 'Compass Service',
        code: code.toString(),
      }),
    });
  }
}
```

### 支持连接redis服务

按需调整.env文件内 COMPASS_REDIS_HOST,COMPASS_REDIS_PORT,COMPASS_REDIS_PASSWORD 等变量,使用示例如下:

```typescript
// example.service.ts
import { RedisService } from '@liaoliaots/nestjs-redis';
import { RedisManagerService, CAPTCHA_REDIS_KEY } from '@app/redis-manager';

@Injectable()
export class ExampleService {
  constructor(private redisService: RedisManagerService,) {}

  async getCache(msg: string) {
    // 具体参考 https://github.com/liaoliaots/nestjs-redis/blob/HEAD/docs/latest/redis.md
    await this.redisService.get(CAPTCHA_REDIS_KEY, {
      // 通过params替换CAPTCHA_REDIS_KEY内的变量值以定位到具体key
      params: {
        type: 'email',
        uid: user.id,
      }
    });
  }
  
  async setCache() {
    const code = random(100000, 999999);
    // 将code码记入缓存
    await this.redisService.set(CAPTCHA_REDIS_KEY, String(code), {
      params: { type: 'email', account: data.email },
    });
  }
}
```

### 添加日志中间件,监控入站请求

默认会将所有入站请求打印在控制台,日志级别为log级.逻辑详见`shared/middleware/logger.middleware.ts`

### 支持Swagger API文档

`npm run start:dev` 或其他start启动项目后,访问/api/docs路径

### helmet 安全的响应头设置

在 `apps/compass-service/src/middleware/index.ts` 路径内启用

### 默认启用 express json,urlencoded 中间件

在 `apps/compass-service/src/middleware/express.middleware.ts` 内启用

### 集成circleciCI自动集成部署

详见`.circleci/config.yml`

## 2.0 移除的特性

* compression 移除,压缩支持应该在nginx层处理,而不在服务器
* csurf 已废弃,不再采用
* LoggerService 已移除,改为采用 @nestjs/common 内置的 Logger
* 扩展的HttpException已被移除,改为采用 @nestjs/common 内置的 HttpException
* SessionModule已被移除,这个模块并不适合在生产环境使用

## 更多文档信息

`npx prisma-docs-generator serve` 数据模型文档

`npm run start:dev` 启动服务后访问: `http://localhost:8080/api/docs`
