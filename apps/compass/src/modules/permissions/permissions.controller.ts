import {Body, Controller, Post, Headers, Delete, Param, Put, Get} from '@nestjs/common';
import {PermissionCreateDto, OwnerApp, PermissionUpdateDto} from "./permissions.dto";
import {PermissionsService} from "./permissions.service";

@Controller('permissions')
export class PermissionsController {
  constructor(
    private permissionsService: PermissionsService
  ) {
  }
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
  
  @Delete(':key')
  async delete (@Param('key') key: string) {
    await this.permissionsService.deletePermission(key)
    return true
  }
  
  @Put(':key')
  async update (
    @Param('key') key: string,
    @Body() body: PermissionUpdateDto,
  ) {
    return this.permissionsService.updatePermission(key, body)
  }
  
  @Get(':key')
  async getPermissionInfoByKey (@Param('key') key: string) {
    return this.permissionsService.getPermissionInfoByKey(key)
  }
  
  @Get()
  async getPermissionsInfo (@Headers('owner_app') owner: OwnerApp) {
    return this.permissionsService.getPermissionsInfo(owner)
  }
}
