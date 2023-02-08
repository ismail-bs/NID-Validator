import { HttpStatus, Injectable } from '@nestjs/common';
import {
  ConfigurationThreshold,
  ConfigurationThresholdErrorMessages,
} from 'src/entity';
import {
  APIResponse,
  IResponse,
} from 'src/internal/api-response/api-response.service';
import { APIException } from 'src/internal/exception/api.exception';
import { ConfigurationRepository } from './repository/configuration.repository';

@Injectable()
export class ConfigurationService {
  constructor(
    private configurationRepo: ConfigurationRepository,
    private readonly response: APIResponse,
  ) {}

  async updateConfigurationThreshold(
    data: Partial<ConfigurationThreshold>,
  ): Promise<IResponse<ConfigurationThreshold>> {
    const updatedConfiguration =
      JSON.stringify(data) !== '{}' &&
      (await this.configurationRepo.updateConfigurationThreshold(data));

    if (!updatedConfiguration)
      throw new APIException(
        ConfigurationThresholdErrorMessages.CANNOT_UPDATE_CONFIGURATION_THRESHOLD,
        'CANNOT_UPDATE_CONFIGURATION_THRESHOLD',
        HttpStatus.BAD_REQUEST,
      );
    return this.response.success(updatedConfiguration);
  }

  async getConfigurationThreshold(): Promise<
    IResponse<ConfigurationThreshold>
  > {
    const configurationThreshold =
      await this.configurationRepo.getConfigurationThreshold();
    if (!configurationThreshold)
      throw new APIException(
        ConfigurationThresholdErrorMessages.CANNOT_FIND_CONFIGURATION_THRESHOLD,
        'CANNOT_FIND_CONFIGURATION_THRESHOLD',
        HttpStatus.NOT_FOUND,
      );
    return this.response.success(configurationThreshold);
  }
}
