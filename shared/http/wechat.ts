import httpCore from '@shared/http/core';
import { WechatAuthParams } from './http.interfaces';

/**
 * @description 获取微信授权信息
 * @link https://developers.weixin.qq.com/miniprogram/dev/OpenApiDoc/user-login/code2Session.html
 * @param params
 */
export function getWechatAuthInfo(params: WechatAuthParams) {
  return httpCore
    .chain()
    .domain('wechat')
    .get('sns/jscode2session')
    .searchParams({
      ...params,
      grant_type: 'authorization_code',
    })
    .request()
    .json();
}
