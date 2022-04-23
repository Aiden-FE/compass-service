import { Module } from '@nestjs/common';
import { ClayController } from './clay.controller';
import { ClayService } from './clay.service';

@Module({
  imports: [],
  controllers: [ClayController],
  providers: [ClayService],
})
export class ClayModule {}
