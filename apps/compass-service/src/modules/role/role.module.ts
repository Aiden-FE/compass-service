import { Module } from '@nestjs/common';
import { DBService } from '@app/db';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';

@Module({
  controllers: [RoleController],
  providers: [RoleService, DBService],
})
export class RoleModule {}
