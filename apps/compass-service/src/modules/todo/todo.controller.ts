import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '@shared';
import { TodoService } from './todo.service';
import { CreateTodoDto, DeleteTodoDto, ModifyTodoDto, TodoListQueryDto } from './todo.dto';
import { UserContextDto } from '../user/user.dto';

@ApiTags('待办事项')
@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @ApiOperation({
    summary: '获取待办事项列表',
  })
  @Get()
  getTodos(@Query() query: TodoListQueryDto, @User() user: UserContextDto) {
    return this.todoService.getTodoList(query, user.id);
  }

  @ApiOperation({
    summary: '创建待办事项',
  })
  @Post()
  createTodo(@Body() body: CreateTodoDto, @User() user: UserContextDto) {
    return this.todoService.createTodo({
      ...body,
      userId: user.id,
    });
  }

  @ApiOperation({
    summary: '修改待办事项',
  })
  @Put()
  modifyTodo(@Body() body: ModifyTodoDto, @User() user: UserContextDto) {
    return this.todoService.modifyTodo(body, user.id);
  }

  @ApiOperation({
    summary: '删除待办事项',
  })
  @Delete()
  deleteTodo(@Body() body: DeleteTodoDto, @User() user: UserContextDto) {
    return this.todoService.deleteTodo(body.id, user.id);
  }
}
