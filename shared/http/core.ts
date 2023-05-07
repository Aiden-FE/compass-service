import Telegram from '@compass-aiden/telegram';

const httpCore = new Telegram();

httpCore.register('wechat', {
  prefixUrl: 'https://api.weixin.qq.com',
});

export default httpCore;
