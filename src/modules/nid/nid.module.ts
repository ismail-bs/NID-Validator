import { Module } from '@nestjs/common';
import { ConfigurationRepository } from '../configuration/repository/configuration.repository';
import { LoggerRepository } from '../logger/repository/logger.repository';
import { NIDController } from './nid.controller';
import { NIDService } from './nid.service';

@Module({
  controllers: [NIDController],
  providers: [NIDService, LoggerRepository, ConfigurationRepository],
})
export class NIDModule {}
