import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Authorization, AuthorizationGuard, PermissionsEnum } from '@common';
import { RolesCreateDto, RolesListQueryDto, RolesUpdateDto } from './roles.dto';
import { RolesService } from './roles.service';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('角色管理')
@UseGuards(AuthGuard(), AuthorizationGuard)
@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}
  @ApiOperation({
    summary: '创建角色',
  })
  @Authorization(PermissionsEnum.COMMON_ROLE_CREATE)
  @Post()
  create(@Body() body: RolesCreateDto) {
    return this.rolesService.createRole(body);
  }

  @ApiOperation({
    summary: '删除角色',
  })
  @Authorization(PermissionsEnum.COMMON_ROLE_DELETE)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.rolesService.deleteRoleById(id);
    return true;
  }

  @ApiOperation({
    summary: '更新角色',
  })
  @Authorization(PermissionsEnum.COMMON_ROLE_UPDATE)
  @Put(':id')
  update(@Param('id') id: number, @Body() body: RolesUpdateDto) {
    return this.rolesService.updateRoleById(id, body);
  }

  @ApiOperation({
    summary: '查询指定角色',
  })
  @Authorization(PermissionsEnum.COMMON_ROLE_QUERY)
  @Get(':id')
  query(@Param('id') id: number) {
    return this.rolesService.findRoleById(id);
  }

  @ApiOperation({
    summary: '查询角色列表',
  })
  @Authorization(PermissionsEnum.COMMON_ROLE_QUERY)
  @Get()
  async all(@Query() query: Partial<RolesListQueryDto>) {
    return this.rolesService.findRoles(query);
  }
}
