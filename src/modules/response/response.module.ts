import { Module } from '@nestjs/common';
import { MiddlewareResponseRepository } from './repository/response.repository';
import { MiddlewareResponseController } from './response.controller';
import { MiddlewareResponseService } from './response.service';

@Module({
  controllers: [MiddlewareResponseController],
  providers: [MiddlewareResponseService, MiddlewareResponseRepository],
})
export class MiddlewareResponseModule {}
