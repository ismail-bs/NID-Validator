import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsNumber, IsDate } from 'class-validator';
import {
  DailyStatisticsPaginationQuery,
  DateWiseStatisticsPaginationQuery,
  PaginationQuery,
} from 'src/entity';

export class StatisticsPaginationQueryDto implements PaginationQuery {
  @ApiProperty({ required: false, type: Number })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  offset?: number;

  @ApiProperty({ required: false, type: Number })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number;
}

export class DailyStatisticsPaginationQueryDto
  extends StatisticsPaginationQueryDto
  implements DailyStatisticsPaginationQuery
{
  @ApiProperty({ type: Date })
  @Type(() => Date)
  @IsDate()
  date: Date;
}

export class DateWiseStatisticsPaginationQueryDto
  extends StatisticsPaginationQueryDto
  implements DateWiseStatisticsPaginationQuery
{
  @ApiProperty({ type: Date })
  @Type(() => Date)
  @IsDate()
  startDate: Date;

  @ApiProperty({ type: Date })
  @Type(() => Date)
  @IsDate()
  endDate: Date;
}
