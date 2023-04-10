import { CompassEnv, getEnv, HttpResponse, ResponseCode } from '@shared';

const forge = require('node-forge');

export function encodeMD5(msg: string, secret = getEnv(CompassEnv.PRIVACY_DATA_SECRET)) {
  if (!secret) {
    throw new HttpResponse(null, {
      statusCode: ResponseCode.INTERNAL_SERVER_ERROR,
      message: 'Not found secret',
    });
  }
  const hmac = forge.hmac.create();
  hmac.start('sha1', secret);
  hmac.update(msg);
  return hmac.digest().toHex();
}
