import { encodeMD5, PERMISSIONS } from '@shared';

export const SEED_CONTEXT = 'SeedScript';

export const INIT_PERMISSIONS = [
  {
    key: PERMISSIONS.COMMON_PERMISSION_CREATE,
    name: '创建权限',
  },
  {
    key: PERMISSIONS.COMMON_PERMISSION_QUERY,
    name: '查询权限',
  },
  {
    key: PERMISSIONS.COMMON_PERMISSION_UPDATE,
    name: '更新权限',
  },
  {
    key: PERMISSIONS.COMMON_PERMISSION_DELETE,
    name: '删除权限',
  },
  {
    key: PERMISSIONS.COMMON_ROLE_CREATE,
    name: '创建角色',
  },
  {
    key: PERMISSIONS.COMMON_ROLE_QUERY,
    name: '查询角色',
  },
  {
    key: PERMISSIONS.COMMON_ROLE_UPDATE,
    name: '更新角色',
  },
  {
    key: PERMISSIONS.COMMON_ROLE_DELETE,
    name: '删除角色',
  },
  {
    key: PERMISSIONS.COMMON_USER_CREATE,
    name: '创建用户',
  },
  {
    key: PERMISSIONS.COMMON_USER_QUERY,
    name: '查询用户',
  },
  {
    key: PERMISSIONS.COMMON_USER_UPDATE,
    name: '更新用户',
  },
  {
    key: PERMISSIONS.COMMON_USER_DELETE,
    name: '删除用户',
  },
];

export const INIT_ROLE = {
  name: 'Administrator',
  description: '管理员用户',
};

export const INIT_USER = {
  password: encodeMD5('example123456'),
  email: 'root@example.com',
};
