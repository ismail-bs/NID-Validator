import { Injectable } from '@nestjs/common';
import { LoggerLevel, LoggerResponse } from 'src/entity';
import {
  APIResponse,
  IResponse,
} from 'src/internal/api-response/api-response.service';
import { ConfigurationRepository } from '../configuration/repository/configuration.repository';
import { LoggerRepository } from '../logger/repository/logger.repository';
import { NIDHelper } from './helper/nid.helper';
// TODO: remove this mockResponse
const mockResponse = {
  name: 'AL AMIN SORKAR',
  nameBn: 'আল আমিন সরকার',
  dob: '2000-12-20',
  nid: '1918277771',
  fatherBn: 'হুমায়ুন মিয়াজী',
  motherBn: 'মরিয়ম বেগম',
};

@Injectable()
export class NIDService {
  constructor(
    private readonly apiResponse: APIResponse,
    private configurationRepo: ConfigurationRepository,
    private loggerRepo: LoggerRepository,
  ) {}

  async uploadAndVerifyNID(
    files: Express.Multer.File[],
  ): Promise<IResponse<any>> {
    // TODO: remove all any response type.
    // convert images to base64 string
    const requestBody = {
      data: {
        front: Buffer.from((files as any).front[0].buffer).toString('base64'),
        back: Buffer.from((files as any).back[0].buffer).toString('base64'),
      },
    };

    //get ocrResponse and configure threshold values
    const { ocrResponse, configurationThreshold } =
      await NIDHelper.getOCRResponseAndConfigurationThreshold(
        requestBody,
        this.configurationRepo,
      );

    // check string similarity
    const matchingResponse = NIDHelper.compareNIDResponse(
      ocrResponse.front,
      mockResponse, // TODO: govt nid verification api call.
    );

    // match with the configuration threshold values
    NIDHelper.compareConfigurationThresholdValues(
      matchingResponse,
      configurationThreshold,
    );
    return this.apiResponse.success(matchingResponse);
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
    return this.apiResponse.success(loggers || []);
  }
}
