import { Injectable } from '@nestjs/common';
import {DbService} from "@libs/db";
import {RolesCreateDto} from "./roles.dto";

@Injectable()
export class RolesService {
  constructor(
    private dbService: DbService
  ) {
  }
  
  createRole (data: RolesCreateDto) {
    return this.dbService.role.create({
      data: {
        ...data,
        permissions: {
          connect: data.permissions?.map(key => ({key})) || []
        }
      },
    })
  }
}
