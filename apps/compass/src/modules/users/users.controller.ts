import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Session,
  UseGuards,
} from '@nestjs/common';
import {
  Authorization,
  AuthorizationGuard,
  PermissionsEnum,
  ResponseCode,
  ResponseException,
  SessionCompass,
} from '@common';
const { useMd5EncodeContent } = require('@compass-aiden/utils/dist/main.cjs')
import { format } from 'date-fns';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { APP_KEY_COMPASS } from '../../config';
import { UsersService } from './users.service';
import {
  UserEmailRegisterDto,
  UsersListQueryDto,
  UsersLoginDto,
  UserUpdateDto,
  UserUpdatePrivacyDto,
} from './users.dto';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  @Post('register/email')
  async emailRegister(
    @Body() body: UserEmailRegisterDto,
    @Session() session: SessionCompass,
  ) {
    if (!session.emailCaptcha) {
      return new ResponseException({
        status: ResponseCode.NOT_FOUND,
        message: '未找到邮件注册码',
      });
    }
    if (body.emailCaptcha !== Number(session.emailCaptcha)) {
      return new ResponseException({
        status: ResponseCode.UNAUTHORIZED,
        message: '邮件注册码不正确',
      });
    }
    await this.usersService.createUser({
      email: body.email,
      password: body.password,
      roles: body.roles,
    });
    return true;
  }

  @Delete(':id')
  @UseGuards(AuthGuard(), AuthorizationGuard)
  @Authorization(PermissionsEnum.COMMON_USER_DELETE)
  async deleteUser(@Param('id') id: string) {
    await this.usersService.deleteUserById(id);
    return true;
  }

  @Put(':id')
  @UseGuards(AuthGuard(), AuthorizationGuard)
  @Authorization(PermissionsEnum.COMMON_USER_UPDATE)
  async updateUserInfo(@Param('id') id: string, @Body() body: UserUpdateDto) {
    await this.usersService.updateUserInfo(id, body);
    return true;
  }

  @Put('/privacy/:id')
  @UseGuards(AuthGuard(), AuthorizationGuard)
  @Authorization(PermissionsEnum.COMMON_USER_UPDATE)
  async updatePrivacyUserInfo(
    @Session() session: SessionCompass,
    @Param('id') id: string,
    @Body() body: UserUpdatePrivacyDto,
  ) {
    if (!body.emailCaptcha && !body.smsCaptcha) {
      return new ResponseException({
        message: '请提供验证码',
      });
    }
    if (!session.emailCaptcha && !session.smsCaptcha) {
      return new ResponseException({
        message: '请先发送验证码',
      });
    }
    const conditionEmail =
      body.emailCaptcha && body.emailCaptcha === Number(session.emailCaptcha);
    const conditionPhone =
      body.smsCaptcha && body.smsCaptcha === Number(session.smsCaptcha);
    if (conditionEmail || conditionPhone) {
      await this.usersService.updatePrivacyUserInfo(id, body);
      return true;
    }
    return new ResponseException({
      message: '验证码不正确',
    });
  }

  @Get(':id')
  @UseGuards(AuthGuard(), AuthorizationGuard)
  @Authorization(PermissionsEnum.COMMON_USER_QUERY)
  getUserInfo(@Param('id') id: string) {
    return this.usersService.getUserInfoByParams({ id }, true);
  }

  @Get()
  @Authorization(PermissionsEnum.COMMON_USER_QUERY)
  @UseGuards(AuthGuard(), AuthorizationGuard)
  getUsers(@Query() query: UsersListQueryDto) {
    return this.usersService.getUsers(query);
  }

  @Post('login')
  async login(@Session() session: SessionCompass, @Body() body: UsersLoginDto) {
    if (!body.emailCaptcha && !body.smsCaptcha) {
      return new ResponseException({
        message: '请提供验证码',
      });
    }
    if (!session.emailCaptcha && !session.smsCaptcha) {
      return new ResponseException({
        message: '请先发送验证码',
      });
    }
    const conditionEmail =
      body.emailCaptcha && body.emailCaptcha === Number(session.emailCaptcha);
    const conditionPhone =
      body.smsCaptcha && body.smsCaptcha === Number(session.smsCaptcha);
    if (conditionEmail || conditionPhone) {
      const userInfo = await this.usersService.getUserInfoByParams(
        {
          password: useMd5EncodeContent(body.password, APP_KEY_COMPASS),
          ...(conditionEmail
            ? { email: body.email }
            : { telephone: body.telephone }),
        },
        true,
      );
      if (!userInfo) {
        return new ResponseException({
          message: '账号或密码不正确',
        });
      }
      if (!userInfo.enabled) {
        return new ResponseException({
          message: '该账号已被禁用,详情请咨询管理员',
        });
      }
      (userInfo as any).lastLoginTime = format(new Date(), 'yyyy-MM-dd');
      await this.usersService.updateUserInfo(userInfo.id, {
        lastLoginTime: new Date(userInfo.lastLoginTime),
      });
      const token = this.jwtService.sign(userInfo);
      return {
        ...userInfo,
        token: `Bearer ${token}`,
      };
    }
    return new ResponseException({
      message: '验证码不正确',
    });
  }
}
