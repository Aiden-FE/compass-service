import { Injectable } from '@nestjs/common';
import { DBService } from '@app/db';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private dbService: DBService) {}

  /**
   * @description 查找用户信息
   * @param user
   * @param selectOption
   */
  async findUser(user: Partial<User>, selectOption: any = {}) {
    return this.dbService.user.findFirst({
      where: user,
      select: {
        id: true,
        name: true,
        nickname: true,
        gender: true,
        birthday: true,
        lastLoginTime: true,
        roles: {
          select: {
            id: true,
          },
        },
        ...selectOption,
      },
    });
  }
}