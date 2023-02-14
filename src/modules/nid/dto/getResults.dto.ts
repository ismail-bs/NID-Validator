import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsNumber, IsEnum } from 'class-validator';
import { PaginationQuery } from 'src/entity';

export enum GetAllResultsQueryEnum {
  IMMEDIATE = 'IMMEDIATE',
  PAST = 'PAST',
}

export class GetAllResultsQueryExtends {
  type: GetAllResultsQueryEnum;
}

export class GetAllResultsQueryDto
  extends GetAllResultsQueryExtends
  implements PaginationQuery
{
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

  @ApiProperty({ enum: GetAllResultsQueryEnum, isArray: false })
  @IsEnum(GetAllResultsQueryEnum)
  type: GetAllResultsQueryEnum;
}
