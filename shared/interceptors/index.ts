import { PERMISSIONS } from '@shared/config';

export { default as ResponseInterceptor } from './response.interceptor';

export interface PermissionsOption {
  mode: 'AND' | 'OR';
  permissions: PERMISSIONS[];
}
