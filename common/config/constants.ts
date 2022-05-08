export enum PermissionsEnum {
  /** 权限相关 */
  COMMON_PERMISSION_CREATE = 'common_permission_create',
  COMMON_PERMISSION_DELETE = 'common_permission_delete',
  COMMON_PERMISSION_UPDATE = 'common_permission_update',
  COMMON_PERMISSION_QUERY = 'common_permission_query',
  /** 角色相关 */
  COMMON_ROLE_CREATE = 'common_role_create',
  COMMON_ROLE_DELETE = 'common_role_delete',
  COMMON_ROLE_UPDATE = 'common_role_update',
  COMMON_ROLE_QUERY = 'common_role_query',
  /** 用户相关 */
  COMMON_USER_CREATE = 'common_user_create',
  COMMON_USER_DELETE = 'common_user_delete',
  COMMON_USER_UPDATE = 'common_user_update',
  COMMON_USER_QUERY = 'common_user_query',
  /** 分类相关 */
  COMMON_CATEGORIES_CREATE = 'common_categories_create',
  COMMON_CATEGORIES_DELETE = 'common_categories_delete',
  COMMON_CATEGORIES_UPDATE = 'common_categories_update',
  COMMON_CATEGORIES_QUERY = 'common_categories_query',
  /** 书签相关 */
  COMMON_BOOKMARKS_CREATE = 'common_bookmarks_create',
  COMMON_BOOKMARKS_DELETE = 'common_bookmarks_delete',
  COMMON_BOOKMARKS_UPDATE = 'common_bookmarks_update',
  COMMON_BOOKMARKS_QUERY = 'common_bookmarks_query',
}

export const DEFAULT_PAGE_NUM = 0
export const DEFAULT_PAGE_SIZE = 9999

export const TITLE_MAX_LIMIT = 24
export const TITLE_MIN_LIMIT = 1
export const NAME_MAX_LIMIT = 255
export const NICKNAME_MAX_LIMIT = 24
export const NAME_MIN_LIMIT = 2
export const DESC_MAX_LIMIT = 255
export const TELEPHONE_MAX_LIMIT = 15
export const TELEPHONE_MIN_LIMIT = 7
export const PASSWORD_MAX_LIMIT = 64
export const PASSWORD_MIN_LIMIT = 6
export const EMAIL_MAX_LIMIT = 128
export const EMAIL_MIN_LIMIT = 12
export const KEYWORD_MAX_LIMIT = 24
export const CAPTCHA_NUMBER_MAX_LIMIT = 999999
export const CAPTCHA_NUMBER_MIN_LIMIT = 100000
export const URL_MAX_LIMIT = 2048
export const COOKIE_TIMEOUT = 1000 * 60 * 5
export const LOGIN_TIMEOUT = 1000 * 60 * 60 * 8
