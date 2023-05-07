/**
 * @description 用来向数据库插入初始化数据的脚本
 */

import { PrismaClient } from '@prisma/client';
import { Logger } from '@nestjs/common';
import { INIT_PERMISSIONS, INIT_ROLE, INIT_USER, SEED_CONTEXT } from './constants';

const client = new PrismaClient();

async function main() {
  Logger.log('开始向数据库插入初始化数据', SEED_CONTEXT);
  await client.user.create({
    data: {
      ...INIT_USER,
      roles: {
        create: {
          ...INIT_ROLE,
          permissions: {
            create: INIT_PERMISSIONS,
          },
        },
      },
    },
  });
  Logger.log(
    `初始化数据创建完成,管理员账号: ${INIT_USER.email}, 初始密码为: example123456 请尽快修改密码`,
    SEED_CONTEXT,
  );
}

main()
  .catch((err) => Logger.error(err))
  .finally(() => client.$disconnect());
