import { GoogleRecaptchaRequest, GoogleRecaptchaResponse } from '../interfaces';

/**
 * @description 验证recaptcha token
 * @param params
 */
export async function verifyRecaptcha(params: GoogleRecaptchaRequest): Promise<GoogleRecaptchaResponse> {
  return (await import('got')).got
    .post('https://recaptcha.net/recaptcha/api/siteverify', {
      body: new URLSearchParams(Object.entries(params)).toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    .json();
}
