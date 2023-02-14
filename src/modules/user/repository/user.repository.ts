import { Injectable } from '@nestjs/common';
import { User } from 'src/entity';
import { UserModel } from './user.model';

@Injectable()
export class UserRepository {
  async createUser(user: Partial<User>): Promise<User | null> {
    try {
      const createdUser = await UserModel.create(user);
      const newUser = createdUser?.toObject();
      delete newUser?.password;
      return newUser;
    } catch (error) {
      console.log(error.message);
      return null;
    }
  }

  async findUser(query: Record<string, any>): Promise<User | null> {
    try {
      return await UserModel.findOne(query)
        .select('-resetPasswordToken -resetPasswordExpires')
        .lean();
    } catch (error) {
      console.log(error.message);
      return null;
    }
  }

  async getAllUsers(
    query: Record<string, any>,
    offset?: number,
    limit?: number,
  ): Promise<User[] | null> {
    try {
      return await UserModel.find(query)
        .skip(offset)
        .limit(limit)
        .select('-resetPasswordToken -resetPasswordExpires')
        .lean();
    } catch (error) {
      console.log(error.message);
      return null;
    }
  }

  async updateUser(
    userId: string,
    user: Record<string, any>,
  ): Promise<User | null> {
    try {
      return await UserModel.findOneAndUpdate({ id: userId }, user, {
        new: true,
      })
        .select('-password -resetPasswordToken -resetPasswordExpires')
        .lean()
        .exec();
    } catch (error) {
      console.log(error.message);
      return null;
    }
  }

  async deleteUser(query: Record<string, any>): Promise<User | null> {
    try {
      return await UserModel.findOneAndRemove(query)
        .select('-resetPasswordToken -resetPasswordExpires')
        .lean();
    } catch (error) {
      console.log(error.message);
      return null;
    }
  }
}
