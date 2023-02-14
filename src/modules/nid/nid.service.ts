import { HttpStatus, Injectable } from '@nestjs/common';
import {
  LoggerLevel,
  LoggerResponse,
  LoggerResponseErrorMessages,
  NIDValidatorErrorMessages,
} from 'src/entity';
import {
  APIResponse,
  IResponse,
} from 'src/internal/api-response/api-response.service';
import { APIException } from 'src/internal/exception/api.exception';
import { LoggerRepository } from '../logger/repository/logger.repository';
import { GetAllResultsQueryEnum } from './dto';

@Injectable()
export class NIDService {
  constructor(
    private readonly response: APIResponse,
    private loggerRepo: LoggerRepository,
  ) {}

  async uploadAndVerifyNID(
    file: Express.Multer.File,
    req: any,
  ): Promise<IResponse<any>> {
    if (req.fileExtensionValidationError || !file)
      throw new APIException(
        NIDValidatorErrorMessages.UNSUPPORTED_FILE,
        'UNSUPPORTED_FILE',
        HttpStatus.BAD_REQUEST,
      );

    //TODO: NID matching
    return this.response.success({ message: 'success' });
  }

  async getAllResults(
    email: string,
    query: { offset?: number; limit?: number; type: GetAllResultsQueryEnum },
  ): Promise<IResponse<LoggerResponse[]>> {
    const { type, offset, limit } = query;
    if (type === GetAllResultsQueryEnum.IMMEDIATE && (offset || limit)) {
      throw new APIException(
        LoggerResponseErrorMessages.NO_NEED_TO_PASS_OFFSET_OR_LIMIT,
        'NO_NEED_TO_PASS_OFFSET_OR_LIMIT',
        HttpStatus.BAD_REQUEST,
      );
    }

    //? Need to clarify the immediate & past upload responses
    // consider -> immediate responses means the last 5 nid verify requests and responses
    const loggers = await this.loggerRepo.getAllLoggers(
      {
        email,
        level: LoggerLevel.NID_VERIFY,
      },
      type === GetAllResultsQueryEnum.PAST ? (query.offset || 0) + 5 : 0,
      type === GetAllResultsQueryEnum.PAST ? query.limit : 5,
    );
    return this.response.success(loggers || []);
  }
}
