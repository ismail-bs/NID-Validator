import { Module } from '@nestjs/common';
import { LoggerRepository } from '../logger/repository/logger.repository';
import { NIDController } from './nid.controller';
import { NIDService } from './nid.service';

@Module({
  controllers: [NIDController],
  providers: [NIDService, LoggerRepository],
})
export class NIDModule {}
