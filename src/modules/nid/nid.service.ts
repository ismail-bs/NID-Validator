import { HttpStatus, Injectable } from '@nestjs/common';
import {
  LoggerLevel,
  LoggerResponse,
  NIDValidatorErrorMessages,
} from 'src/entity';
import {
  APIResponse,
  IResponse,
} from 'src/internal/api-response/api-response.service';
import { APIException } from 'src/internal/exception/api.exception';
import { LoggerRepository } from '../logger/repository/logger.repository';

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
    query: { offset?: number; limit?: number },
  ): Promise<IResponse<LoggerResponse[]>> {
    const { offset, limit } = query;
    const loggers = await this.loggerRepo.getAllLoggers(
      {
        email,
        level: LoggerLevel.NID_VERIFY,
      },
      offset,
      limit,
    );
    return this.response.success(loggers || []);
  }
}
