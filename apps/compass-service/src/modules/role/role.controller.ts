import { Body, Controller, Post } from '@nestjs/common';
import { Auth, PERMISSIONS } from '@shared';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RoleCreateDto } from './role.dto';
import { RoleService } from './role.service';

@ApiTags('角色管理')
@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @ApiOperation({
    summary: '创建角色',
  })
  @Auth(PERMISSIONS.COMMON_ROLE_CREATE)
  @Post('create')
  createRole(@Body() body: RoleCreateDto) {
    return this.roleService.createRole(body);
  }
}
