import { INestApplication, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DBService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
    Logger.log('Prisma connected to database successfully', 'PrismaDB');
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
