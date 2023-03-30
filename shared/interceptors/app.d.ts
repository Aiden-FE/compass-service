declare global {
  namespace Express {
    export interface User extends UserModel {
      id: number;
      name: string;
    }
  }
}
