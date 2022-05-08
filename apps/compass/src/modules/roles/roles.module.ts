import { Module } from '@nestjs/common';
import { DbService } from '@libs/db';
import { PassportModule } from '@nestjs/passport';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
  ],
  controllers: [RolesController],
  providers: [RolesService, DbService],
})
export class RolesModule {}
