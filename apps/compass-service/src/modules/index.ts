import { OauthModule } from './oauth/oauth.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { TodoModule } from './todo/todo.module';

export default [OauthModule, UserModule, RoleModule, PermissionModule, TodoModule];
