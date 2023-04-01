export const IS_PUBLIC_KEY = 'isPublic';

export const PERMISSIONS_KEY = 'PERMISSIONS';

export enum PERMISSIONS {
  /** 权限相关 */
  COMMON_PERMISSION_CREATE = 'common.permission.create',
  COMMON_PERMISSION_DELETE = 'common.permission.delete',
  COMMON_PERMISSION_UPDATE = 'common.permission.update',
  COMMON_PERMISSION_QUERY = 'common.permission.query',
  /** 角色相关 */
  COMMON_ROLE_CREATE = 'common.role.create',
  COMMON_ROLE_DELETE = 'common.role.delete',
  COMMON_ROLE_UPDATE = 'common.role.update',
  COMMON_ROLE_QUERY = 'common.role.query',
  /** 用户相关 */
  COMMON_USER_CREATE = 'common.user.create',
  COMMON_USER_DELETE = 'common.user.delete',
  COMMON_USER_UPDATE = 'common.user.update',
  COMMON_USER_QUERY = 'common.user.query',
}
