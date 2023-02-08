import { Injectable } from '@nestjs/common';
import { ConfigurationThreshold } from 'src/entity';
import { ConfigurationThresholdModel } from './configuration.model';

@Injectable()
export class ConfigurationRepository {
  async updateConfigurationThreshold(
    data: Partial<ConfigurationThreshold>,
  ): Promise<ConfigurationThreshold | null> {
    try {
      return await ConfigurationThresholdModel.findOneAndUpdate({}, data, {
        new: true,
        upsert: true,
      })
        .select('-_id')
        .lean();
    } catch (error) {
      console.log(error.message);
      return null;
    }
  }

  async getConfigurationThreshold(): Promise<ConfigurationThreshold | null> {
    try {
      return await ConfigurationThresholdModel.findOneAndUpdate({})
        .select('-_id')
        .lean();
    } catch (error) {
      console.log(error.message);
      return null;
    }
  }
}
