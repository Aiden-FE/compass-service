import { Injectable } from '@nestjs/common';
import { DBService } from '@app/db';
import { HttpResponse, PaginationParams, PaginationResponse, ResponseCode } from '@shared';
import { CreateTodoDto, ModifyTodoDto, TodoListQueryDto } from './todo.dto';

@Injectable()
export class TodoService {
  constructor(private dbService: DBService) {}

  async deleteTodo(id: number, userId: string) {
    const todo = await this.dbService.todo.findFirst({
      where: {
        id,
        userId,
      },
    });
    if (!todo) {
      return new HttpResponse(null, {
        statusCode: ResponseCode.NOT_FOUND,
        message: '未找到可被删除的资源',
      });
    }
    return this.dbService.todo.delete({
      where: {
        id,
      },
    });
  }

  async modifyTodo(body: ModifyTodoDto, userId: string) {
    const todo = await this.dbService.todo.findFirst({
      where: {
        id: body.id,
        userId,
      },
    });
    if (!todo) {
      return new HttpResponse(null, {
        statusCode: ResponseCode.NOT_FOUND,
        message: '未找到要更新的资源',
      });
    }
    return this.dbService.todo.update({
      where: {
        id: body.id,
      },
      data: body,
    });
  }

  async getTodoList(query: TodoListQueryDto, userId: string) {
    const pagination = PaginationParams(query);
    const where = {
      userId,
      title: {
        contains: query.keyword,
      },
    };
    const [total, list] = await this.dbService.$transaction([
      this.dbService.todo.count({ where }),
      this.dbService.todo.findMany({
        skip: pagination.skip,
        take: pagination.take,
        where,
        orderBy: [{ updatedAt: 'desc' }],
        select: {
          id: true,
          title: true,
          description: true,
          isFinished: true,
          updatedAt: true,
        },
      }),
    ]);

    return new PaginationResponse({
      total,
      list,
      ...pagination,
    });
  }

  createTodo(todo: CreateTodoDto & { userId: string }) {
    return this.dbService.todo.create({
      data: {
        ...todo,
      },
    });
  }
}
