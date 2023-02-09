import { HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import { authConfig } from 'config/auth';
import {
  UserJwtPayload,
  AuthErrorMessages,
  LoginRequest,
  UserErrorMessages,
  Token,
  AuthSuccessMessages,
  RegisterRequest,
  Role,
} from 'src/entity';
import { UserRepository } from 'src/modules/user/repository/user.repository';
import { MailService } from 'src/helper/mailService';
import {
  APIResponse,
  IResponse,
} from 'src/internal/api-response/api-response.service';
import { APIException } from 'src/internal/exception/api.exception';
import { coreConfig } from 'config/core';
const ONE_HOUR_IN_MILLI_SEC = 3600000; // 1 hour = 3600000 milliseconds

@Injectable()
export class AuthService {
  constructor(
    private userRepo: UserRepository,
    private mailService: MailService,
    private jwtService: JwtService,
    private readonly response: APIResponse,
  ) {}

  async register(
    data: RegisterRequest,
    role: string,
  ): Promise<IResponse<{ message: string }>> {
    const doesUserExist = await this.userRepo.findUser({
      email: data.email,
      role,
    });
    if (doesUserExist)
      throw new APIException(
        AuthErrorMessages.EMAIL_ALREADY_EXITS,
        'EMAIL_ALREADY_EXITS',
        HttpStatus.BAD_REQUEST,
      );

    data.password = await bcrypt.hash(data.password, authConfig.salt);
    data.email = data.email.toLowerCase();
    const user = await this.userRepo.createUser({
      ...data,
      role: role as Role,
    });
    if (!user)
      throw new APIException(
        AuthErrorMessages.CANNOT_CREATE_USER,
        'CANNOT_CREATE_USER',
        HttpStatus.BAD_REQUEST,
      );

    return this.response.success({
      message:
        role === Role.USER
          ? AuthSuccessMessages.USER_SIGN_UP_SUCCESSFULLY
          : AuthSuccessMessages.ADMIN_SIGN_UP_SUCCESSFULLY,
    });
  }

  async login(data: LoginRequest, role: string): Promise<IResponse<Token>> {
    try {
      const user = await this.userRepo.findUser({ email: data.email, role });
      if (!user)
        throw new APIException(
          AuthErrorMessages.INVALID_CREDENTIALS,
          'INVALID_CREDENTIALS',
          HttpStatus.BAD_REQUEST,
        );

      const doesPasswordMatch = await bcrypt.compare(
        data.password,
        user.password,
      );

      if (!doesPasswordMatch)
        throw new APIException(
          AuthErrorMessages.INVALID_CREDENTIALS,
          'INVALID_CREDENTIALS',
          HttpStatus.BAD_REQUEST,
        );

      const payload: UserJwtPayload = {
        id: user.id,
        email: user.email,
        role: user.role,
        logInTime: Date.now(),
      };
      const token = this.jwtService.sign(payload);

      return this.response.success({ token });
    } catch (error) {
      console.log(error.message);
      throw new APIException(
        AuthErrorMessages.INVALID_CREDENTIALS,
        'INVALID_CREDENTIALS',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async superAdminLogin(): Promise<IResponse<Token>> {
    try {
      // TODO: implement login logic for super admin.
      const payload = {
        role: Role.SUPER_ADMIN,
        logInTime: Date.now(),
      };
      const token = this.jwtService.sign(payload);
      return this.response.success({ token });
    } catch (error) {
      console.log(error.message);
    }
  }

  async forgotPassword(
    email: string,
    baseUrl: string,
    role: string,
  ): Promise<IResponse<{ message: string }>> {
    const user = await this.userRepo.findUser({ email, role });
    if (!user)
      throw new APIException(
        AuthErrorMessages.INVALID_CREDENTIALS,
        'INVALID_CREDENTIALS',
        HttpStatus.BAD_REQUEST,
      );

    const token = crypto.randomBytes(20).toString('hex');
    const updates = {
      resetPasswordToken: token,
      resetPasswordExpires: Date.now() + ONE_HOUR_IN_MILLI_SEC,
    };

    const updatedUser = await this.userRepo.updateUser(user.id, updates);
    if (!updatedUser)
      throw new APIException(
        UserErrorMessages.CANNOT_UPDATE_USER,
        'CANNOT_UPDATE_USER',
        HttpStatus.BAD_REQUEST,
      );

    const resetUrl =
      baseUrl + '/' + coreConfig.restApiPrefix + '/reset-password/' + token;

    try {
      //TODO: add a proper email template & format
      this.mailService.sendMail(
        user.email,
        'Password Reset Link',
        resetUrl,
        resetUrl,
      );

      return this.response.success({
        message:
          'An email has been sent to ' +
          user.email +
          ' with further instructions.',
      });
    } catch (error) {
      console.log(error.message);
      throw new APIException(
        UserErrorMessages.CANNOT_UPDATE_PASSWORD,
        'CANNOT_UPDATE_PASSWORD',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async resetPassword(
    token: string,
    password: string,
  ): Promise<IResponse<{ message: string }>> {
    const user = await this.userRepo.findUser({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user)
      throw new APIException(
        AuthErrorMessages.TOKEN_TIME_EXPIRED,
        'TOKEN_TIME_EXPIRED',
        HttpStatus.BAD_REQUEST,
      );

    user.password = await bcrypt.hash(password, authConfig.salt);
    user.resetPasswordExpires = null;
    user.resetPasswordToken = null;

    const updatedUser = await this.userRepo.updateUser(user.id, user);
    if (!updatedUser)
      throw new APIException(
        AuthErrorMessages.PASSWORD_RESET_FAILED,
        'PASSWORD_RESET_FAILED',
        HttpStatus.BAD_REQUEST,
      );

    return this.response.success({
      message: AuthSuccessMessages.PASSWORD_RESET_SUCCESSFUL,
    });
  }
}
