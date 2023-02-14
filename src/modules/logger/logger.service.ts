import { Injectable } from '@nestjs/common';
import { LoggerResponse, PaginationQuery } from 'src/entity';
import {
  APIResponse,
  IResponse,
} from 'src/internal/api-response/api-response.service';
import { LoggerRepository } from './repository/logger.repository';

@Injectable()
export class LoggerService {
  constructor(
    private loggerRepo: LoggerRepository,
    private readonly response: APIResponse,
  ) {}
  async getAllLoggers(
    query: PaginationQuery,
  ): Promise<IResponse<LoggerResponse[]>> {
    const loggers = await this.loggerRepo.getAllLoggers(
      {},
      query.offset,
      query.limit,
    );
    return this.response.success(loggers || []);
  }
}
