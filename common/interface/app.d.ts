import {UserModel} from "../../apps/compass/src/modules/users/users.dto";

declare global {
  namespace Express {
    export interface User extends UserModel {}
  }
}
