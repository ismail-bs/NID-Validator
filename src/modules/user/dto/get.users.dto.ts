import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsNumber } from 'class-validator';
import { PaginationQuery } from 'src/entity';

export class GetAllUsersQueryDto implements PaginationQuery {
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
