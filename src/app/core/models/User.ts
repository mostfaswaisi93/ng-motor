export class User {
  [x: string]: any;
  _id: number;
  id: string;
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  isAdmin: boolean;
  password: string;
  newPassword: string;
  confirmNewPassword: string;
  createdAt: Date;
  updatedAt: Date;
}
