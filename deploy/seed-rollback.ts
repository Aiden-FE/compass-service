/**
 * @description 用来回滚seed.ts插入的初始化数据
 */

import { PrismaClient } from '@prisma/client';
import { Logger } from '@nestjs/common';
import { INIT_PERMISSIONS, INIT_ROLE, INIT_USER, SEED_CONTEXT } from './constants';

const client = new PrismaClient();

async function main() {
  Logger.log('开始抹除数据库初始化数据', SEED_CONTEXT);
  Logger.log('正在抹除用户', SEED_CONTEXT);
  await client.user.delete({ where: { email: INIT_USER.email } });
  Logger.log('正在抹除角色', SEED_CONTEXT);
  const roleEntity = await client.role.findFirst({ where: { name: INIT_ROLE.name } });
  if (roleEntity) {
    await client.role.delete({ where: { id: roleEntity.id } });
  }
  Logger.log('正在抹除权限', SEED_CONTEXT);
  await client.permission.deleteMany({
    where: {
      OR: INIT_PERMISSIONS.map((data) => ({ key: data.key })),
    },
  });
  Logger.log('回滚完成', SEED_CONTEXT);
}

main()
  .catch((err) => Logger.error(err))
  .finally(() => client.$disconnect());
