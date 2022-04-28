import { Module } from '@nestjs/common';
import { PermissionsController } from './permissions.controller';
import { PermissionsService } from './permissions.service';
import {DbService} from "@libs/db";

@Module({
  controllers: [PermissionsController],
  providers: [PermissionsService, DbService]
})
export class PermissionsModule {}
