import {Body, Controller, Post, Headers} from '@nestjs/common';
import {PermissionCreateDto, OwnerApp, PermissionDeleteDto} from "./permissions.dto";
import {PermissionsService} from "./permissions.service";

@Controller('permissions')
export class PermissionsController {
  constructor(
    private permissionsService: PermissionsService
  ) {
  }
  @Post('create')
  async create (
    @Headers('owner_app') owner: OwnerApp,
    @Body() body: PermissionCreateDto
  ) {
    return this.permissionsService.createPermission({
      ...body,
      ownerApp: owner
    })
  }
  
  @Post('delete')
  async delete (@Body() body: PermissionDeleteDto) {
    await this.permissionsService.deletePermission(body)
    return true
  }
  
  @Post('update')
  async update () {}
}
