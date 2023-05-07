import { Module } from '@nestjs/common';
import { DBService } from '@app/db';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

@Module({
  controllers: [TodoController],
  providers: [TodoService, DBService],
})
export class TodoModule {}
