import { Injectable } from '@nestjs/common';
import { MiddlewareResponse } from 'src/entity';
import {
  APIResponse,
  IResponse,
} from 'src/internal/api-response/api-response.service';
import { MiddlewareResponseRepository } from './repository/response.repository';

@Injectable()
export class MiddlewareResponseService {
  constructor(
    private middlewareResponseRepo: MiddlewareResponseRepository,
    private readonly response: APIResponse,
  ) {}
  async getAllMiddlewareResponses(): Promise<IResponse<MiddlewareResponse[]>> {
    const middlewareResponses =
      await this.middlewareResponseRepo.getAllMiddlewareResponses({});
    return this.response.success(middlewareResponses || []);
  }
}
