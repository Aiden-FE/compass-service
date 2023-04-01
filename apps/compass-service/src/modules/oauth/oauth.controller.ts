import { Body, Controller, Get, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HttpResponse, Public, User, validateMultipleDto } from '@shared';
import { EMailLoginDto, TelephoneLoginDto } from './oauth.dto';
import { OauthService } from './oauth.service';

@Controller('oauth')
export class OauthController {
  constructor(private jwtService: JwtService, private oauthService: OauthService) {}

  @Public()
  @Post('login')
  async login(@Body() body: EMailLoginDto | TelephoneLoginDto) {
    validateMultipleDto(body, [EMailLoginDto, TelephoneLoginDto]);
    const result = await this.oauthService.validateLogin(body);

    if (result instanceof HttpResponse) {
      return result;
    }

    // FIXME: 请验证合规后再签发授权信息
    const signStr = this.jwtService.sign(result);
    return { ...result, token: signStr };
  }

  // @Permissions(PERMISSIONS.COMMON_USER_QUERY)
  // eslint-disable-next-line class-methods-use-this
  @Get('test')
  async test(@User() user: any) {
    return user;
  }
}
