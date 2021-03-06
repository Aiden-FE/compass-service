import { Injectable } from '@nestjs/common';
import { DbService } from '@libs/db';
import { PaginationResponse, wrapPaginationQuery } from '@common';
import { RolesCreateDto, RolesListQueryDto, RolesUpdateDto } from './roles.dto';

@Injectable()
export class RolesService {
  constructor(private dbService: DbService) {}

  createRole(data: RolesCreateDto) {
    return this.dbService.role.create({
      data: {
        ...data,
        permissions: {
          connect: data.permissions?.map((key) => ({ key })) || [],
        },
      },
    });
  }

  deleteRoleById(id: number) {
    return this.dbService.role.delete({
      where: { id },
    });
  }

  async updateRoleById(id: number, data: RolesUpdateDto) {
    const updateData = {
      name: data.name,
      description: data.description,
      permissions: undefined,
    };
    if (data.permissions !== undefined) {
      updateData.permissions = {
        set: data.permissions.map((key) => ({ key })),
      };
    }
    return this.dbService.role.update({
      where: { id },
      data: updateData,
    });
  }

  async findRoleById(id: number) {
    const role = await this.dbService.role.findFirst({
      where: { id },
      include: {
        permissions: {
          select: {
            key: true
          }
        }
      },
    });
    if (role?.permissions) {
      // @ts-ignore
      role.permissions = role.permissions.map(permission => permission.key)
      return role
    }
    return role
  }

  async findRoles(data: RolesListQueryDto) {
    const [total, roles] = await this.dbService.$transaction([
      this.dbService.role.count({
        where: {
          name: {
            contains: data.keyword,
          },
        },
      }),
      this.dbService.role.findMany({
        ...wrapPaginationQuery(data),
        where: {
          name: {
            contains: data.keyword,
          },
        },
        include: {
          permissions: {
            select: {
              key: true
            }
          }
        },
        orderBy: [{ createdAt: 'desc' }],
      }),
    ]);

    return new PaginationResponse(roles.map(role => {
      // @ts-ignore
      role.permissions = role.permissions.map(permission => permission.key)
      return role
    }), data, total);
  }
}
