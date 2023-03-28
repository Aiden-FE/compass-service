import { IsString } from 'class-validator';
import { Optional } from '@nestjs/common';

export class AppQueryDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @Optional()
  description?: string;

  test?: string;
}
