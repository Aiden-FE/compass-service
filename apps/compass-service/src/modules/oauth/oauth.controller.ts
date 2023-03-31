import { Body, Controller, Get, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PERMISSIONS, Permissions, Public, User, validateMultipleDto } from '@shared';
import { EMailLoginDto, TelephoneLoginDto } from './oauth.dto';

@Controller('oauth')
export class OauthController {
  constructor(private jwtService: JwtService) {}

  @Public()
  @Post('login')
  async login(@Body() body: EMailLoginDto | TelephoneLoginDto) {
    validateMultipleDto(body, [EMailLoginDto, TelephoneLoginDto]);
    // 查询用户信息
    const userInfo = { ...body };
    // FIXME: 请验证合规后再签发授权信息
    const signStr = this.jwtService.sign(userInfo);
    return { ...userInfo, token: signStr };
  }

  // eslint-disable-next-line class-methods-use-this
  @Permissions(PERMISSIONS.COMMON_USER_QUERY)
  @Get('test')
  async test(@User() user: any) {
    return user;
  }
}
