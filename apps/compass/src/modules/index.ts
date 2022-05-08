import { UsersModule } from './users/users.module';
import { PermissionsModule } from './permissions/permissions.module';
import { RolesModule } from './roles/roles.module';
import { OpenModule } from './open/open.module';
import { CategoriesModule } from './categories/categories.module';
import {BookmarksModule} from "./bookmarks/bookmarks.module";

export default [
  UsersModule,
  PermissionsModule,
  RolesModule,
  OpenModule,
  CategoriesModule,
  BookmarksModule,
];
