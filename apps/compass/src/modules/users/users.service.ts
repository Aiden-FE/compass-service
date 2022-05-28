import { Injectable } from '@nestjs/common';
import { DbService } from '@libs/db';
const { encodePhoneNumber, useMd5EncodeContent } = require('@compass-aiden/utils/lib/cjs/main.cjs')
import { format } from 'date-fns';
import { PaginationResponse, wrapPaginationQuery } from '@common';
import { uniq } from 'lodash';
import { APP_KEY_COMPASS } from '../../config';
import {
  UserEmailRegisterDto,
  UserPhoneRegisterDto,
  UsersListQueryDto,
  UserUpdatePrivacyDto,
  UserModel,
} from './users.dto';

@Injectable()
export class UsersService {
  constructor(private dbService: DbService) {
    this.usersMiddleware();
  }

  createUser(
    data: Omit<UserEmailRegisterDto, 'emailCaptcha'> | UserPhoneRegisterDto,
  ) {
    return this.dbService.user.create({
      data: {
        email: (data as UserEmailRegisterDto).email,
        password: useMd5EncodeContent(data.password, APP_KEY_COMPASS),
        telephone: (data as UserPhoneRegisterDto).telephone,
        roles: {
          connect: data.roles?.map((id) => ({ id })),
        },
      },
    });
  }

  deleteUserById(id: string) {
    return this.dbService.user.delete({
      where: { id },
    });
  }

  updateUserInfo(
    id: string,
    data: Partial<
      Omit<UserModel, 'birthday'> & { roles?: number[]; birthday: string }
    >,
  ) {
    return this.dbService.user.update({
      where: { id },
      data: {
        ...data,
        birthday: data.birthday ? new Date(data.birthday) : undefined,
        roles: data.roles && { set: data.roles.map((roleId) => ({ id: roleId })) },
      },
    });
  }

  updatePrivacyUserInfo(id: string, data: UserUpdatePrivacyDto) {
    return this.dbService.user.update({
      where: { id },
      data: {
        telephone: data.telephone,
        password: useMd5EncodeContent(data.password, APP_KEY_COMPASS),
        email: data.email,
      },
    });
  }

  async getUserInfoByParams(
    params: Partial<UserModel>,
    joinPermissions = false,
  ) {
    const userInfo = await this.dbService.user.findFirst({
      where: params,
      select: {
        id: true,
        telephone: true,
        email: true,
        name: true,
        nickname: true,
        gender: true,
        birthday: true,
        enabled: true,
        lastLoginTime: true,
        roles: {
          select: {
            id: true,
            permissions: {
              select: {
                key: joinPermissions,
              },
            },
          },
        },
      },
    });
    if (!userInfo) return userInfo;
    if (userInfo.telephone) {
      userInfo.telephone = encodePhoneNumber(userInfo.telephone, {
        isCountry: true,
      });
    }
    if (joinPermissions) (userInfo as any).permissions = [];
    userInfo.roles =
      userInfo.roles &&
      (userInfo.roles.map((role) => {
        if (joinPermissions && role.permissions?.length) {
          (userInfo as any).permissions = (userInfo as any).permissions.concat(
            role.permissions.map((permission) => permission.key),
          );
        }
        return role.id;
      }) as any[]);
    if (joinPermissions && (userInfo as any).permissions.length) {
      (userInfo as any).permissions = uniq((userInfo as any).permissions);
    }
    return userInfo;
  }

  async getUsers(data: UsersListQueryDto) {
    const conditions = data.keyword && {
      OR: [
        { name: data.keyword || undefined },
        { nickname: data.keyword || undefined },
        { telephone: data.keyword || undefined },
        { email: data.keyword || undefined },
      ],
    };
    const [total, users] = await this.dbService.$transaction([
      this.dbService.user.count({
        where: conditions,
      }),
      this.dbService.user.findMany({
        ...wrapPaginationQuery(data),
        where: conditions,
        orderBy: [{ createdAt: 'desc' }],
        select: {
          id: true,
          telephone: true,
          email: true,
          name: true,
          nickname: true,
          gender: true,
          birthday: true,
          enabled: true,
          lastLoginTime: true,
          roles: {
            select: {
              id: true,
            },
          },
        },
      }),
    ]);
    return new PaginationResponse(
      users.map((user) => {
        if (user.telephone) {
          // eslint-disable-next-line no-param-reassign
          user.telephone = encodePhoneNumber(user.telephone, {
            isCountry: true,
          });
        }
        return user;
      }),
      data,
      total,
    );
  }

  private usersMiddleware() {
    this.dbService.$use(async (params, next) => {
      if (params.model === 'User' && params.action === 'findFirst') {
        const result = await next(params);
        if (result?.birthday)
          result.birthday = format(result.birthday, 'yyyy-MM-dd');
        return result;
      }
      if (params.model === 'User' && params.action === 'findMany') {
        const result = await next(params);
        return (
          result?.map((user) => {
            if (user.birthday)
              // eslint-disable-next-line no-param-reassign
              user.birthday = format(user.birthday, 'yyyy-MM-dd');
            return user;
          }) || result
        );
      }
      return next(params);
    });
  }
}
