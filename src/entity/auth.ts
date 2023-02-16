export class UserJwtPayload {
  _id: string;
  email: string;
  logInTime: number;
  role: string;
}

export class ForgotPasswordRequest {
  email: string;
}

export class ResetPasswordRequest {
  password: string;
}

export class UserRegisterRequest {
  email: string;
  password: string;
}

export class CreateNewAdminRequest {
  name: string;
  email: string;
}

export class LoginRequest {
  email: string;
  password: string;
}

export class ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}
