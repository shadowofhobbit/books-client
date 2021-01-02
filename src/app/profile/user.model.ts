export interface User {
  id: number;
  username: string;
  email: string;
  confirmedEmail: boolean;
  role: AccountRole;
  description?: string;
  birthday: string;
}

export enum AccountRole {
  user = 'USER',
  admin = 'ADMIN'
}
