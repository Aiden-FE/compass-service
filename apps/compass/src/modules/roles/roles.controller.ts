import {Body, Controller, Delete, Get, Post, Put} from '@nestjs/common';
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {Authorization, PermissionsEnum} from "@common";
import {RolesCreateDto} from "./roles.dto";
import {RolesService} from "./roles.service";

@ApiTags('角色管理')
@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {
  }
  @ApiOperation({
    summary: '创建角色'
  })
  @Authorization(PermissionsEnum.COMMON_ROLE_CREATE)
  @Post()
  create (@Body() body: RolesCreateDto) {
    return this.rolesService.createRole(body)
  }
  
  @ApiOperation({
    summary: '删除角色'
  })
  @Authorization(PermissionsEnum.COMMON_ROLE_DELETE)
  @Delete(':id')
  delete () {}
  
  @ApiOperation({
    summary: '更新角色'
  })
  @Authorization(PermissionsEnum.COMMON_ROLE_UPDATE)
  @Put(':id')
  update () {}
  
  @ApiOperation({
    summary: '查询指定角色'
  })
  @Authorization(PermissionsEnum.COMMON_ROLE_QUERY)
  @Get(':id')
  query () {}
  
  @ApiOperation({
    summary: '创建角色'
  })
  @Authorization(PermissionsEnum.COMMON_ROLE_QUERY)
  @Get()
  all () {}
}
