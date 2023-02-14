import { Module } from '@nestjs/common';
import { LoggerRepository } from './repository/logger.repository';
import { LoggerController } from './logger.controller';
import { LoggerService } from './logger.service';

@Module({
  controllers: [LoggerController],
  providers: [LoggerService, LoggerRepository],
})
export class LoggerModule {}
