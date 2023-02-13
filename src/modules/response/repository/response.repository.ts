import { Injectable } from '@nestjs/common';
import { MiddlewareResponse } from 'src/entity';
import { MiddlewareResponseModel } from 'src/middleware/database/model';

@Injectable()
export class MiddlewareResponseRepository {
  async getAllMiddlewareResponses(
    query: Record<string, any>,
  ): Promise<MiddlewareResponse[] | null> {
    try {
      return await MiddlewareResponseModel.find(query)
        .sort({ createdAt: -1 })
        .select('-_id -createdAt')
        .lean();
    } catch (error) {
      console.log(error.message);
      return null;
    }
  }
}
