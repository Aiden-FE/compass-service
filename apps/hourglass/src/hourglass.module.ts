import { Module } from '@nestjs/common';
import { HourglassController } from './hourglass.controller';
import { HourglassService } from './hourglass.service';

@Module({
  imports: [],
  controllers: [HourglassController],
  providers: [HourglassService],
})
export class HourglassModule {}
