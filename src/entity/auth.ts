export class UserJwtPayload {
  id: string;
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

export class RegisterRequest {
  email: string;
  password: string;
}

export class LoginRequest {
  email: string;
  password: string;
}

export class ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}
