import {Body, Controller, Post, Headers, Delete, Param, Put, Get} from '@nestjs/common';
import {PermissionCreateDto, OwnerApp, PermissionUpdateDto} from "./permissions.dto";
import {PermissionsService} from "./permissions.service";
import {Authorization, PermissionsEnum} from "@common";
import {ApiOperation, ApiTags} from "@nestjs/swagger";

@ApiTags('权限管理')
@Controller('permissions')
export class PermissionsController {
  constructor(
    private permissionsService: PermissionsService
  ) {
  }
  @ApiOperation({
    summary: '创建权限'
  })
  @Authorization(PermissionsEnum.COMMON_PERMISSION_CREATE)
  @Post()
  async create (
    @Headers('owner_app') owner: OwnerApp,
    @Body() body: PermissionCreateDto
  ) {
    return this.permissionsService.createPermission({
      ...body,
      ownerApp: owner
    })
  }
  
  @ApiOperation({
    summary: '删除指定权限'
  })
  @Authorization(PermissionsEnum.COMMON_PERMISSION_DELETE)
  @Delete(':key')
  async delete (@Param('key') key: string) {
    await this.permissionsService.deletePermission(key)
    return true
  }
  
  @ApiOperation({
    summary: '更新指定权限'
  })
  @Authorization(PermissionsEnum.COMMON_PERMISSION_UPDATE)
  @Put(':key')
  async update (
    @Param('key') key: string,
    @Body() body: PermissionUpdateDto,
  ) {
    return this.permissionsService.updatePermission(key, body)
  }
  
  @ApiOperation({
    summary: '获取指定权限信息'
  })
  @Authorization(PermissionsEnum.COMMON_PERMISSION_QUERY)
  @Get(':key')
  async getPermissionInfoByKey (@Param('key') key: string) {
    return this.permissionsService.getPermissionInfoByKey(key)
  }
  
  @ApiOperation({
    summary: '获取所有通用及当前应用的权限'
  })
  @Authorization(PermissionsEnum.COMMON_PERMISSION_QUERY)
  @Get()
  async getPermissionsInfo (@Headers('owner_app') owner: OwnerApp) {
    const list = await this.permissionsService.getPermissionsInfo(owner)
    return [list]
  }
}
