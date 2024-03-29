import { Injectable } from '@nestjs/common';
import { DBService } from '@app/db';
import { User, Profile } from '@prisma/client';
import { UserContextDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(private dbService: DBService) {}

  async updateProfileByUser(profile: Partial<Profile>, userId: string) {
    const userProfile = await this.getProfileByUser(userId);
    await this.dbService.profile.update({
      where: { id: userProfile.id },
      data: profile,
    });
  }

  async getProfileByUser(userId: string) {
    let userProfile = await this.dbService.profile.findFirst({
      where: {
        userId,
      },
    });
    if (!userProfile) {
      userProfile = await this.dbService.profile.create({
        data: {
          userId,
        },
      });
    }

    return userProfile;
  }

  updateUser(userId: string, user: Omit<Partial<User>, 'id'>) {
    return this.dbService.user.update({
      where: { id: userId },
      data: user,
    });
  }

  /**
   * @description 创建用户
   * @param user
   * @param selectOption
   */
  async createUser(user: Partial<User>, selectOption: any = {}) {
    const userModel = await this.dbService.user.create({
      data: {
        ...user,
      },
      select: {
        id: true,
        telephone: true,
        email: true,
        nickname: true,
        gender: true,
        roles: {
          select: {
            id: true,
          },
        },
        ...selectOption,
      },
    });
    return this.handleDisplayUserInfo(userModel);
  }

  /**
   * @description 查找用户信息
   * @param user
   * @param selectOption
   */
  async findUser(user: Partial<User>, selectOption: any = {}) {
    const userModel = await this.dbService.user.findFirst({
      where: user,
      select: {
        id: true,
        telephone: true,
        email: true,
        nickname: true,
        gender: true,
        roles: {
          select: {
            id: true,
          },
        },
        ...selectOption,
      },
    });
    return this.handleDisplayUserInfo(userModel);
  }

  // eslint-disable-next-line class-methods-use-this
  private handleDisplayUserInfo(user: any): UserContextDto | null {
    if (user?.roles?.length) {
      // eslint-disable-next-line no-param-reassign
      user.roles = user.roles.map((role) => role.id);
    }
    if (user?.telephone) {
      // eslint-disable-next-line no-param-reassign
      user.telephone = `*******${user.telephone.slice(user.telephone.length - 4)}`;
    }
    return user || null;
  }
}
