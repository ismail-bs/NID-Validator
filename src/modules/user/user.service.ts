import { HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { authConfig } from 'config/auth';
import {
  ChangePasswordRequest,
  UserErrorMessages,
  UpdateUserRequest,
  User,
  UserSuccessMessages,
  Role,
} from 'src/entity';
import {
  APIResponse,
  IResponse,
} from 'src/internal/api-response/api-response.service';
import { APIException } from 'src/internal/exception/api.exception';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UserService {
  constructor(
    private userRepo: UserRepository,
    private readonly response: APIResponse,
  ) {}

  async updateUser(
    userId: string,
    data: UpdateUserRequest,
  ): Promise<IResponse<User>> {
    const updatedUser = await this.userRepo.updateUser(userId, data);
    if (!updatedUser)
      throw new APIException(
        UserErrorMessages.CANNOT_UPDATE_USER,
        'CANNOT_UPDATE_USER',
        HttpStatus.BAD_REQUEST,
      );
    return this.response.success(updatedUser);
  }

  async changePassword(
    userId: string,
    data: ChangePasswordRequest,
  ): Promise<IResponse<{ message: string }>> {
    try {
      const { currentPassword, newPassword } = data;
      const user = await this.userRepo.findUser({ id: userId });
      if (!user)
        throw new APIException(
          UserErrorMessages.CANNOT_FIND_USER,
          'CANNOT_FIND_USER',
          HttpStatus.BAD_REQUEST,
        );

      const doesPasswordMatch = await bcrypt.compare(
        currentPassword,
        user.password,
      );
      if (!doesPasswordMatch)
        throw new APIException(
          UserErrorMessages.CURRENT_PASSWORD_IS_INCORRECT,
          'CURRENT_PASSWORD_IS_INCORRECT',
          HttpStatus.BAD_REQUEST,
        );

      // hash the new password
      user.password = await bcrypt.hash(newPassword, authConfig.salt);

      // update the user password
      const updatedUser = await this.userRepo.updateUser(userId, user);
      if (!updatedUser)
        if (!updatedUser)
          throw new APIException(
            UserErrorMessages.PASSWORD_CHANGED_FAILED,
            'PASSWORD_CHANGED_FAILED',
            HttpStatus.BAD_REQUEST,
          );

      return this.response.success({
        message: UserSuccessMessages.PASSWORD_CHANGED_SUCCESSFUL,
      });
    } catch (error) {
      console.log(error.message);
      throw new APIException(
        UserErrorMessages.PASSWORD_CHANGED_FAILED,
        'PASSWORD_CHANGED_FAILED',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getUser(userId: string): Promise<IResponse<User>> {
    const user = await this.userRepo.findUser({ id: userId });
    if (!user)
      throw new APIException(
        UserErrorMessages.CANNOT_FIND_USER,
        'CANNOT_FIND_USER',
        HttpStatus.NOT_FOUND,
      );
    return this.response.success(user);
  }

  async getAllUsers(
    offset?: number,
    limit?: number,
  ): Promise<IResponse<User[]>> {
    const users = await this.userRepo.getAllUsers(
      { role: Role.USER },
      offset,
      limit,
    );
    return this.response.success(users || []);
  }

  async getAllAdmins(
    offset?: number,
    limit?: number,
  ): Promise<IResponse<User[]>> {
    const users = await this.userRepo.getAllUsers(
      { role: Role.ADMIN },
      offset,
      limit,
    );
    return this.response.success(users || []);
  }

  async deleteUser(userId: string): Promise<IResponse<{ message: string }>> {
    const user = await this.userRepo.deleteUser({ id: userId });
    if (!user)
      throw new APIException(
        UserErrorMessages.CANNOT_DELETE_USER,
        'CANNOT_DELETE_USER',
        HttpStatus.BAD_REQUEST,
      );
    return this.response.success({
      message: UserSuccessMessages.USER_DELETED_SUCCESSFUL,
    });
  }
}
