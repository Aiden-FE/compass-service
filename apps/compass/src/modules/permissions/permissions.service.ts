import { Injectable } from '@nestjs/common';
import {DbService} from "@libs/db";
import {PermissionCreateDto, OwnerApp, PermissionDeleteDto} from "./permissions.dto";

@Injectable()
export class PermissionsService {
  constructor(
    private dbService: DbService
  ) {
  }
  
  createPermission (data: PermissionCreateDto & {ownerApp: OwnerApp}) {
    return this.dbService.permission.create({
      data
    })
  }
  
  deletePermission (data: PermissionDeleteDto) {
    return this.dbService.permission.delete({
      where: data
    })
  }
}
