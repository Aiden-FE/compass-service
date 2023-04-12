import { Injectable } from '@nestjs/common';
import { DBService } from '@app/db';
import { RoleCreateDto } from './role.dto';

@Injectable()
export class RoleService {
  constructor(private dbService: DBService) {}

  async getRolesByIds(ids: number[]) {
    return this.dbService.role.findMany({
      where: {
        OR: ids.map((id) => ({ id })),
      },
      include: {
        permissions: true,
      },
    });
  }

  async createRole(body: RoleCreateDto) {
    return this.dbService.role.create({
      data: {
        ...body,
        permissions: {
          connect: body.permissions?.map((key) => ({ key })) || [],
        },
      },
    });
  }
}
