import { Injectable } from '@nestjs/common';
import { LoggerResponse } from 'src/entity';
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
  async getAllLoggers(): Promise<IResponse<LoggerResponse[]>> {
    const Loggers = await this.loggerRepo.getAllLoggers({});
    return this.response.success(Loggers || []);
  }
}
