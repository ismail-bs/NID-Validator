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
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async findUser(query: Record<string, any>): Promise<User | null> {
    return await UserModel.findOne(query)
      .select('-_id -resetPasswordToken -resetPasswordExpires')
      .lean();
  }

  async getAllUsers(
    query: Record<string, any>,
    offset?: number,
    limit?: number,
  ): Promise<User[] | null> {
    return await UserModel.find(query)
      .skip(offset)
      .limit(limit)
      .select('-_id -resetPasswordToken -resetPasswordExpires')
      .lean();
  }

  async updateUser(
    userId: string,
    user: Record<string, any>,
  ): Promise<User | null> {
    return await UserModel.findOneAndUpdate({ id: userId }, user, { new: true })
      .select('-password -_id -resetPasswordToken -resetPasswordExpires')
      .lean()
      .exec();
  }

  async deleteUser(query: Record<string, any>): Promise<User | null> {
    return await UserModel.findOneAndRemove(query)
      .select('-_id -resetPasswordToken -resetPasswordExpires')
      .lean();
  }
}
