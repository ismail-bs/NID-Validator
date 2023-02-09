export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

export class User {
  id: string;
  email: string;
  name: string;
  password: string;
  role: Role;
  resetPasswordToken?: string;
  resetPasswordExpires?: number;
}

export class UpdateUserRequest {
  name: string;
}

export class Token {
  token: string;
}

export class PaginationQuery {
  offset?: number;
  limit?: number;
}
