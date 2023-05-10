import { Module } from '@nestjs/common';
import { AIController } from './ai.controller';
import { AIService } from './ai.service';
import { DBService } from '@app/db';
import { UserService } from '../user/user.service';

@Module({
  controllers: [AIController],
  providers: [AIService, DBService, UserService],
})
export class AIModule {}
