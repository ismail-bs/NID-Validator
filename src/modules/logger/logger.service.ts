import { HttpStatus, Injectable } from '@nestjs/common';
import {
  DailyStatisticsPaginationQuery,
  DateWiseStatisticsPaginationQuery,
  LoggerLevel,
  LoggerResponse,
  LoggerResponseErrorMessages,
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
    query: PaginationQuery,
  ): Promise<IResponse<LoggerResponse[]>> {
    const loggers = await this.loggerRepo.getAllLoggers(
      {},
      query.offset,
      query.limit,
    );
    return this.response.success(loggers || []);
  }

  async getDailySummery(
    query: PaginationQuery & DailyStatisticsPaginationQuery,
  ): Promise<IResponse<LoggerResponse[]>> {
    const date = new Date(query.date);
    const endDate = new Date(query.date);
    date.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 0);
    const summery = await this.loggerRepo.getAllLoggers(
      {
        createdAt: { $gte: date, $lte: endDate },
        level: LoggerLevel.NID_VERIFY,
      },
      query.offset,
      query.limit,
    );
    return this.response.success(summery || []);
  }

  async getWeeklySummery(
    query: PaginationQuery & DateWiseStatisticsPaginationQuery,
  ): Promise<IResponse<LoggerResponse[]>> {
    const startDate = new Date(query.startDate);
    const endDate = new Date(query.endDate);
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 0);
    // check the date range is valid or not (week = 7 days)
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

    const summery = await this.loggerRepo.getAllLoggers(
      {
        createdAt: {
          $gte: startDate,
          $lte: endDate,
        },
        level: LoggerLevel.NID_VERIFY,
      },
      query.offset,
      query.limit,
    );
    return this.response.success(summery || []);
  }

  async getMonthlySummery(
    query: PaginationQuery & DateWiseStatisticsPaginationQuery,
  ): Promise<IResponse<LoggerResponse[]>> {
    const startDate = new Date(query.startDate);
    const endDate = new Date(query.endDate);
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 0);
    const dayDiff = Math.ceil(
      Math.abs(endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
    );
    // check the date range is valid or not (month = 28/29/30/31 days)
    if (!(dayDiff >= 28 && dayDiff <= 31) || startDate > endDate) {
      throw new APIException(
        LoggerResponseErrorMessages.INCORRECT_DATE_RANGE,
        'INCORRECT_DATE_RANGE',
        HttpStatus.BAD_REQUEST,
      );
    }

    const summery = await this.loggerRepo.getAllLoggers(
      {
        createdAt: {
          $gte: startDate,
          $lte: endDate,
        },
        level: LoggerLevel.NID_VERIFY,
      },
      query.offset,
      query.limit,
    );
    return this.response.success(summery || []);
  }
}
