import { PERMISSIONS } from '@shared/config';

export { default as ResponseInterceptor } from './response.interceptor';

export interface AuthOption {
  mode: 'AND' | 'OR';
  permissions: PERMISSIONS[];
}
