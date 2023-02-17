import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Role } from 'src/entity';
import { LoggerService } from './logger.service';
import { RolesGuard } from 'src/authentication/guards/auth.guard';
import {
  DailyStatisticsPaginationQueryDto,
  DateWiseStatisticsPaginationQueryDto,
  GetAllResponsesQueryDto,
} from './dto';

@ApiTags('Logger Response API (Admin)')
@Controller('logger')
@ApiBearerAuth()
@UseGuards(new RolesGuard([Role.ADMIN]))
export class LoggerController {
  constructor(private loggerService: LoggerService) {}

  @Get('/all')
  @ApiOperation({ summary: 'Get all logger responses.' })
  async getAllLoggers(@Query() query: GetAllResponsesQueryDto) {
    return await this.loggerService.getAllLoggers(query);
  }

  @Get('/statistics/daily')
  @ApiOperation({ summary: 'Get Daily Summery.' })
  async getDailySummery(@Query() query: DailyStatisticsPaginationQueryDto) {
    return await this.loggerService.getDailySummery(query);
  }

  @Get('/statistics/weekly')
  @ApiOperation({ summary: 'Get Weekly Summery.' })
  async getWeeklySummery(@Query() query: DateWiseStatisticsPaginationQueryDto) {
    return await this.loggerService.getWeeklySummery(query);
  }

  @Get('/statistics/monthly')
  @ApiOperation({ summary: 'Get Daily Summery.' })
  async getMonthlySummery(
    @Query() query: DateWiseStatisticsPaginationQueryDto,
  ) {
    return await this.loggerService.getMonthlySummery(query);
  }
}
