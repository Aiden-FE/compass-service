import { Injectable } from '@nestjs/common';
import { DBService } from '@app/db';

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
}
