import { HttpStatus, Injectable } from '@nestjs/common';
import {
  DailyStatisticsPaginationQuery,
  DateWiseStatisticsPaginationQuery,
  LoggerLevel,
  LoggerResponse,
  LoggerResponseErrorMessages,
  LoggerResponsesQueryExtendData,
  PaginationQuery,
} from 'src/entity';
import {
  APIResponse,
  IResponse,
} from 'src/internal/api-response/api-response.service';
import { APIException } from 'src/internal/exception/api.exception';
import { LoggerRepository } from './repository/logger.repository';

@Injectable()
export class LoggerService {
  constructor(
    private loggerRepo: LoggerRepository,
    private readonly response: APIResponse,
  ) {}
  async getAllLoggers(
    condition: PaginationQuery & LoggerResponsesQueryExtendData,
  ): Promise<IResponse<LoggerResponse[]>> {
    const { offset, limit } = condition;

    // A query will be created if you enter a URL or email address.
    const query: Record<string, any> = this.generateSearchQuery(condition);
    const loggers = await this.loggerRepo.getAllLoggers(query, offset, limit);
    return this.response.success(loggers || []);
  }

  async getDailySummery(
    condition: PaginationQuery &
      DailyStatisticsPaginationQuery &
      LoggerResponsesQueryExtendData,
  ): Promise<IResponse<LoggerResponse[]>> {
    const { date, offset, limit } = condition;
    // format for dates
    const startDate = new Date(date);
    const endDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 0);

    // A query will be created if you enter a URL or email address.
    const query: Record<string, any> = this.generateSearchQuery(condition);
    const summery = await this.loggerRepo.getAllLoggers(
      {
        ...query,
        createdAt: { $gte: startDate, $lte: endDate },
        level: LoggerLevel.NID_VERIFY,
      },
      offset,
      limit,
    );
    return this.response.success(summery || []);
  }

  async getWeeklySummery(
    condition: PaginationQuery &
      DateWiseStatisticsPaginationQuery &
      LoggerResponsesQueryExtendData,
  ): Promise<IResponse<LoggerResponse[]>> {
    const { offset, limit } = condition;
    // format for dates
    const startDate = new Date(condition.startDate);
    const endDate = new Date(condition.endDate);
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 0);
    // Verify the validity of the date range (week = 7 days).
    if (
      Math.ceil(
        Math.abs(endDate.getTime() - startDate.getTime()) /
          (1000 * 60 * 60 * 24),
      ) !== 7 ||
      startDate > endDate
    ) {
      throw new APIException(
        LoggerResponseErrorMessages.INCORRECT_DATE_RANGE,
        'INCORRECT_DATE_RANGE',
        HttpStatus.BAD_REQUEST,
      );
    }

    // A query will be created if you enter a URL or email address.
    const query: Record<string, any> = this.generateSearchQuery(condition);
    const summery = await this.loggerRepo.getAllLoggers(
      {
        ...query,
        createdAt: { $gte: startDate, $lte: endDate },
        level: LoggerLevel.NID_VERIFY,
      },
      offset,
      limit,
    );
    return this.response.success(summery || []);
  }

  async getMonthlySummery(
    condition: PaginationQuery &
      DateWiseStatisticsPaginationQuery &
      LoggerResponsesQueryExtendData,
  ): Promise<IResponse<LoggerResponse[]>> {
    const { offset, limit } = condition;
    // format for dates
    const startDate = new Date(condition.startDate);
    const endDate = new Date(condition.endDate);
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 0);

    const dayDiff = Math.ceil(
      Math.abs(endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
    );
    // Verify the validity of the date range (month = 28/29/30/31 days).
    if (!(dayDiff >= 28 && dayDiff <= 31) || startDate > endDate) {
      throw new APIException(
        LoggerResponseErrorMessages.INCORRECT_DATE_RANGE,
        'INCORRECT_DATE_RANGE',
        HttpStatus.BAD_REQUEST,
      );
    }

    // A query will be created if you enter a URL or email address.
    const query: Record<string, any> = this.generateSearchQuery(condition);
    const summery = await this.loggerRepo.getAllLoggers(
      {
        ...query,
        createdAt: { $gte: startDate, $lte: endDate },
        level: LoggerLevel.NID_VERIFY,
      },
      offset,
      limit,
    );
    return this.response.success(summery || []);
  }

  // Query generator
  private generateSearchQuery(condition: {
    url?: string;
    email?: string;
  }): object {
    const { url, email } = condition;
    const query: Record<string, any> = {};

    if (url !== undefined && url !== '') {
      query.url = url;
    }
    if (email !== undefined && email !== '') {
      query.email = email;
    }

    return query;
  }
}
