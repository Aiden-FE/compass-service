import { Body, Controller, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EMailLoginDto, TelephoneLoginDto } from './oauth.dto';
// import { Public } from '@shared';

@Controller('oauth')
export class OauthController {
  constructor(private jwtService: JwtService) {}

  @Post('login')
  async login(@Body() body: EMailLoginDto | TelephoneLoginDto) {
    const signStr = this.jwtService.sign(body);
    return { token: signStr };
  }
}
