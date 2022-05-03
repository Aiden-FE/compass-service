import { Injectable } from '@nestjs/common';
import { DbService } from '@libs/db';
import {
  PermissionCreateDto,
  OwnerApp,
  PermissionUpdateDto,
} from './permissions.dto';
import { OwnerApp as OwnerAppData } from '@prisma/client';

@Injectable()
export class PermissionsService {
  constructor(private dbService: DbService) {}

  createPermission(data: PermissionCreateDto & { ownerApp: OwnerApp }) {
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

  getPermissionsInfo(ownerApp: OwnerApp) {
    let orConditions: { ownerApp: OwnerApp }[] = [{ ownerApp: 'COMMON' }];
    if (ownerApp !== 'COMMON') {
      orConditions.push({ ownerApp });
    } else {
      orConditions = orConditions.concat(
        Object.keys(OwnerAppData).map((key) => ({
          ownerApp: OwnerAppData[key],
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
