import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '@shared';

@ApiTags('用户管理')
@Controller('user')
export class UserController {
  // eslint-disable-next-line class-methods-use-this
  @ApiOperation({
    summary: '获取当前用户信息',
    description: '返回当前用户的脱敏信息',
  })
  @Get('info')
  async getCurrentUserInfo(@User() user: unknown) {
    return user;
  }
}
