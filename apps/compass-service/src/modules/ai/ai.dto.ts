import { IsArray, IsOptional, IsString } from 'class-validator';

export interface AIChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
  name?: string;
}

export class AIChat {
  @IsOptional()
  @IsString()
  model?: 'gpt-3.5-turbo' | 'gpt-3.5-turbo-0301' | 'text-davinci-003';

  @IsArray()
  choices: AIChatMessage[];
}
