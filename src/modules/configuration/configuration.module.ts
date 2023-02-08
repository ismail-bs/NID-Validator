import { Module } from '@nestjs/common';
import { ConfigurationRepository } from './repository/configuration.repository';
import { ConfigurationController } from './configuration.controller';
import { ConfigurationService } from './configuration.service';

@Module({
  controllers: [ConfigurationController],
  providers: [ConfigurationService, ConfigurationRepository],
})
export class ConfigurationModule {}
