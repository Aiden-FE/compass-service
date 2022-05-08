import { Module } from '@nestjs/common';
import { DbService } from '@libs/db';
import { PassportModule } from '@nestjs/passport';
import { PermissionsController } from './permissions.controller';
import { PermissionsService } from './permissions.service';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
  ],
  controllers: [PermissionsController],
  providers: [PermissionsService, DbService],
})
export class PermissionsModule {}
