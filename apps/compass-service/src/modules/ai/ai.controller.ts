import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@shared';
import { AIChat } from './ai.dto';
import { AIService } from './ai.service';
import { UserContextDto } from '../user/user.dto';

@ApiTags('AI智能化')
@Controller('ai')
export class AIController {
  constructor(private aiService: AIService) {}

  @Post('chat')
  createChat(@Body() body: AIChat, @User() user: UserContextDto) {
    return this.aiService.createCompletion(body, user.id);
  }
}
