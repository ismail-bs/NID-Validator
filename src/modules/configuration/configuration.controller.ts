import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Role } from 'src/entity';
import { ConfigurationService } from './configuration.service';
import { RolesGuard } from 'src/authentication/guards/auth.guard';
import { UpdateConfigurationThresholdRequestDto } from './dto';

@ApiTags('Configuration Threshold API (Admin)')
@Controller('configurations')
@ApiBearerAuth()
export class ConfigurationController {
  constructor(private configurationService: ConfigurationService) {}

  @Get()
  @UseGuards(new RolesGuard([Role.ADMIN]))
  @ApiOperation({ summary: 'Get configuration threshold values.' })
  async getConfigurationThreshold() {
    return await this.configurationService.getConfigurationThreshold();
  }

  @Patch()
  @UseGuards(new RolesGuard([Role.ADMIN]))
  @ApiOperation({ summary: 'Update configuration threshold values.' })
  async updateConfigurationThreshold(
    @Body() data: UpdateConfigurationThresholdRequestDto,
  ) {
    return await this.configurationService.updateConfigurationThreshold(data);
  }
}
