import { Injectable } from '@nestjs/common';
import { Configuration as AIConfiguration, OpenAIApi } from 'openai';
import { CompassEnv, getEnv, getProxyConfig, HttpResponse, ResponseCode } from '@shared';
import { DBService } from '@app/db';
import { AIChat } from './ai.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AIService {
  private openaiInstance?: OpenAIApi;

  constructor(private userService: UserService, private dbService: DBService) {}

  async isAllowUseAI(userId: string) {
    const userProfile = await this.userService.getProfileByUser(userId);
    return !!userProfile?.aiBalance;
  }

  async createCompletion(chat: AIChat, userId: string) {
    const userProfile = await this.userService.getProfileByUser(userId);
    if (!userProfile.aiBalance) {
      return new HttpResponse(null, {
        statusCode: ResponseCode.PAYMENT_REQUIRED,
        message: '当前用户不存在可用额度',
      });
    }
    const openAI = this.getOpenAI();
    let content: string;
    try {
      if (!chat.model || chat.model.startsWith('text-davinci')) {
        const resp = await openAI.createCompletion(
          {
            max_tokens: 2048,
            temperature: 0.8,
            model: chat.model || 'text-davinci-003',
            prompt: chat.choices.map((item) => item.content).join('<|endoftext|>'),
          },
          {
            proxy: getProxyConfig(),
          },
        );
        content = resp?.data.choices.pop().text;
      } else if (chat.model.startsWith('gpt')) {
        const resp = await openAI.createChatCompletion(
          {
            max_tokens: 2048,
            temperature: 0.8,
            model: chat.model,
            messages: chat.choices,
          },
          {
            proxy: getProxyConfig(),
          },
        );
        content = resp?.data.choices.pop().message?.content;
      }
    } catch (e) {
      return new HttpResponse({
        statusCode: ResponseCode.BAD_REQUEST,
        message: e?.message || e?.toString() || e,
      });
    }
    if (content) {
      await this.userService.updateProfileByUser(
        {
          aiBalance: userProfile.aiBalance - 1,
        },
        userId,
      );
      return {
        content,
        role: 'assistant',
      };
    }
    return new HttpResponse({
      statusCode: ResponseCode.BAD_REQUEST,
      message: '业务异常,请重试',
    });
  }

  // eslint-disable-next-line class-methods-use-this
  private async streamCompletion(streamRes: any) {
    try {
      streamRes.data.on('data', (data) => {
        const lines = data
          .toString()
          .split('\n')
          .filter((line) => line.trim() !== '');
        // eslint-disable-next-line no-restricted-syntax
        for (const line of lines) {
          const message = line.replace(/^data: /, '');
          if (message === '[DONE]') {
            return; // Stream finished
          }
          try {
            const parsed = JSON.parse(message);
            console.log(parsed.choices[0].text);
          } catch (error) {
            console.error('Could not JSON parse stream message', message, error);
          }
        }
      });
    } catch (error) {
      if (error.response?.status) {
        console.error(error.response.status, error.message);
        error.response.data.on('data', (data) => {
          const message = data.toString();
          try {
            const parsed = JSON.parse(message);
            console.error('An error occurred during OpenAI request: ', parsed);
          } catch (e) {
            console.error('An error occurred during OpenAI request: ', message);
          }
        });
      } else {
        console.error('An error occurred during OpenAI request', error);
      }
    }
  }

  private getOpenAI() {
    if (this.openaiInstance) return this.openaiInstance;
    this.openaiInstance = new OpenAIApi(
      new AIConfiguration({
        apiKey: getEnv(CompassEnv.CHATGPT_API_KEY),
      }),
    );
    return this.openaiInstance;
  }
}
