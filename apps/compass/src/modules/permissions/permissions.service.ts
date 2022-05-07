import { Injectable } from '@nestjs/common';
import { DbService } from '@libs/db';
import {
  PermissionCreateDto,
  PermissionUpdateDto,
} from './permissions.dto';
import { OwnerApp, OwnerAppType } from '@common';

@Injectable()
export class PermissionsService {
  constructor(private dbService: DbService) {}

  createPermission(data: PermissionCreateDto & { ownerApp: OwnerAppType }) {
    return this.dbService.permission.create({
      data,
    });
  }

  async deletePermission(key: string) {
    return this.dbService.permission.delete({
      where: { key },
    });
  }

  updatePermission(key: string, data: PermissionUpdateDto) {
    return this.dbService.permission.update({
      where: { key },
      data: data,
    });
  }

  getPermissionInfoByKey(key: string) {
    return this.dbService.permission.findUnique({
      where: { key },
    });
  }

  getPermissionsInfo(ownerApp: OwnerAppType) {
    let orConditions: { ownerApp: OwnerAppType }[] = [{ ownerApp: 'COMMON' }];
    if (ownerApp !== 'COMMON') {
      orConditions.push({ ownerApp });
    } else {
      orConditions = orConditions.concat(
        Object.keys(OwnerApp).map((key) => ({
          ownerApp: OwnerApp[key],
        })),
      );
    }
    return this.dbService.permission.findMany({
      where: {
        OR: orConditions,
      },
    });
  }
}
