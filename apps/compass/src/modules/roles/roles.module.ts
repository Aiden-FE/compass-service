import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import {DbService} from "@libs/db";

@Module({
  imports: [],
  controllers: [RolesController],
  providers: [RolesService, DbService]
})
export class RolesModule {}
