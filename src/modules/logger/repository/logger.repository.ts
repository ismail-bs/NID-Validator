import { Injectable } from '@nestjs/common';
import { LoggerResponse } from 'src/entity';
import { LoggerModel } from './logger.model';

@Injectable()
export class LoggerRepository {
  async getAllLoggers(
    query: Record<string, any>,
  ): Promise<LoggerResponse[] | null> {
    try {
      return await LoggerModel.find(query)
        .sort({ createdAt: -1 })
        .select('-_id -createdAt')
        .lean();
    } catch (error) {
      console.log(error.message);
      return null;
    }
  }

  static async addResponse(
    response: LoggerResponse,
  ): Promise<LoggerResponse | null> {
    try {
      return await LoggerModel.create(response);
    } catch (error) {
      console.log(error.message);
      return null;
    }
  }
}
