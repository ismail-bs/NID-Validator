import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Role } from 'src/entity';
import { LoggerService } from './logger.service';
import { RolesGuard } from 'src/authentication/guards/auth.guard';
import { GetAllResponsesQueryDto } from './dto';

@ApiTags('Logger Response API')
@Controller('logger')
@ApiBearerAuth()
@UseGuards(new RolesGuard([Role.SUPER_ADMIN, Role.ADMIN]))
export class LoggerController {
  constructor(private loggerService: LoggerService) {}

  @Get('/responses')
  @ApiOperation({ summary: 'Get all logger responses.' })
  async getAllLoggers(@Query() query: GetAllResponsesQueryDto) {
    return await this.loggerService.getAllLoggers(query);
  }
}
